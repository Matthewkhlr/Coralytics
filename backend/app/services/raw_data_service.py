"""
DB1: raw export storage (v1 legacy files/chunks + v2 hybrid object storage).

Uploads are stored as:
    users/{userId}/raw_uploads/{uploadId}           metadata + lifecycle
    users/{userId}/raw_uploads/{uploadId}/files/... legacy chunked text (v1)
    users/{userId}/raw_uploads/{uploadId}/posts/... normalized posts (v2)
    users/{userId}/content_hashes/{hash}            transactional dedupe claims

v2 also stores the original bytes in Cloud Storage (or local fallback).
"""

from __future__ import annotations

import re
import uuid
from typing import Any

from google.cloud import firestore

from app.firebase import get_firestore_client
from app.models.persistence import (
    RECORD_STATUS_FAILED,
    RECORD_STATUS_PENDING,
    RECORD_STATUS_READY,
    SCHEMA_VERSION_V2,
    encode_timestamp,
    is_ready,
    serialize_record_for_api,
    with_v2_metadata,
)
from app.services import object_storage_service, posts_service

_DOC_ID_PATTERN = re.compile(r"[^\w\-.:]+")

# Firestore string fields are capped at ~1 MiB; stay under that when storing raw JSON.
FIRESTORE_MAX_CONTENT_BYTES = 900_000


def _raw_uploads_collection(user_id: str):
    return get_firestore_client().collection("users").document(user_id).collection("raw_uploads")


def _raw_files_collection(user_id: str, upload_id: str):
    return _raw_uploads_collection(user_id).document(upload_id).collection("files")


def _content_hashes_collection(user_id: str):
    return get_firestore_client().collection("users").document(user_id).collection("content_hashes")


def _sanitize_doc_id(raw_id: str, fallback: str) -> str:
    doc_id = _DOC_ID_PATTERN.sub("_", raw_id).strip("._")
    if not doc_id:
        return fallback
    return doc_id[:1500]


def _chunk_text(content: str, max_bytes: int = FIRESTORE_MAX_CONTENT_BYTES) -> list[str]:
    """Split UTF-8 text into chunks that each fit within Firestore field limits."""
    encoded = content.encode("utf-8")
    if len(encoded) <= max_bytes:
        return [content]

    chunks: list[str] = []
    start = 0
    while start < len(encoded):
        end = min(start + max_bytes, len(encoded))
        while end > start and end < len(encoded) and (encoded[end] & 0xC0) == 0x80:
            end -= 1
        chunks.append(encoded[start:end].decode("utf-8"))
        start = end
    return chunks


def _write_raw_file(user_id: str, upload_id: str, doc_id: str, raw_file: dict[str, Any]) -> None:
    content = str(raw_file.get("content") or "")
    chunks = _chunk_text(content)
    doc_ref = _raw_files_collection(user_id, upload_id).document(doc_id)

    payload: dict[str, Any] = {
        "path": raw_file.get("path"),
        "content_type": raw_file.get("content_type"),
        "size_bytes": raw_file.get("size_bytes"),
        "storage_layer": "db1",
        "chunked": len(chunks) > 1,
        "chunk_count": len(chunks),
        "schema_version": SCHEMA_VERSION_V2,
    }

    if len(chunks) == 1:
        payload["content"] = chunks[0]
    else:
        payload["content"] = ""

    doc_ref.set(payload)

    if len(chunks) > 1:
        batch = get_firestore_client().batch()
        chunk_col = doc_ref.collection("chunks")
        for index, chunk in enumerate(chunks):
            batch.set(chunk_col.document(f"{index:04d}"), {"index": index, "content": chunk})
        batch.commit()


def _read_raw_file_content(doc_ref, data: dict[str, Any]) -> str:
    if not data.get("chunked"):
        return str(data.get("content") or "")

    snapshots = doc_ref.collection("chunks").order_by("index").stream()
    return "".join(str(doc.to_dict().get("content") or "") for doc in snapshots if doc.exists)


def _delete_collection_recursive(col, *, batch_size: int = 400) -> int:
    deleted = 0
    while True:
        docs = list(col.limit(batch_size).stream())
        if not docs:
            break
        batch = get_firestore_client().batch()
        for snap in docs:
            # Delete nested chunk subcollections for file docs.
            for sub in snap.reference.collections():
                _delete_collection_recursive(sub, batch_size=batch_size)
            batch.delete(snap.reference)
            deleted += 1
        batch.commit()
    return deleted


def claim_content_hash(
    user_id: str,
    content_hash: str,
    *,
    upload_id: str,
) -> dict[str, Any] | None:
    """Atomically claim a content hash for this user.

    Returns an existing claim dict when the hash is already owned by another
    ready/pending upload; returns None when this call successfully claimed it.
    """
    if not content_hash:
        return None

    db = get_firestore_client()
    ref = _content_hashes_collection(user_id).document(content_hash)
    now = encode_timestamp()

    @firestore.transactional
    def _txn(transaction: firestore.Transaction) -> dict[str, Any] | None:
        snap = ref.get(transaction=transaction)
        if snap.exists:
            existing = snap.to_dict() or {}
            existing_upload = existing.get("upload_id")
            if existing_upload and existing_upload != upload_id:
                return existing
            # Same upload reclaiming — refresh and continue.
        transaction.set(
            ref,
            {
                "content_hash": content_hash,
                "upload_id": upload_id,
                "user_id": user_id,
                "claimed_at": now,
                "schema_version": SCHEMA_VERSION_V2,
            },
        )
        return None

    return _txn(db.transaction())


def release_content_hash(user_id: str, content_hash: str, *, upload_id: str | None = None) -> None:
    if not content_hash:
        return
    ref = _content_hashes_collection(user_id).document(content_hash)
    snap = ref.get()
    if not snap.exists:
        return
    data = snap.to_dict() or {}
    if upload_id and data.get("upload_id") not in {None, upload_id}:
        return
    ref.delete()


def find_upload_by_content_hash(user_id: str, content_hash: str) -> dict[str, Any] | None:
    """Return the upload claimed by content_hash, if any."""
    if not content_hash:
        return None

    claim = _content_hashes_collection(user_id).document(content_hash).get()
    if claim.exists:
        data = claim.to_dict() or {}
        upload_id = data.get("upload_id")
        if upload_id:
            try:
                return get_raw_upload_metadata(user_id, upload_id, include_non_ready=True)
            except KeyError:
                pass

    # Legacy fallback: scan uploads that predate hash claims.
    for upload in list_raw_uploads(user_id, include_non_ready=True):
        if upload.get("content_hash") == content_hash:
            return upload
    return None


def save_raw_upload(
    user_id: str,
    filename: str,
    raw_files: list[dict[str, Any]],
    *,
    platform: str = "mixed",
    ingest_report: dict[str, Any] | None = None,
    content_hash: str | None = None,
    original_bytes: bytes | None = None,
    posts: list[dict[str, Any]] | None = None,
    keep_legacy_files: bool = True,
) -> dict[str, Any]:
    """Persist a raw upload with pending→ready lifecycle.

    Children (object storage, legacy files, normalized posts) are written first.
    The parent document is marked ready only after validation.
    """
    upload_id = uuid.uuid4().hex
    now = encode_timestamp()

    if content_hash:
        existing_claim = claim_content_hash(user_id, content_hash, upload_id=upload_id)
        if existing_claim is not None:
            existing = find_upload_by_content_hash(user_id, content_hash)
            if existing and existing.get("status") != RECORD_STATUS_FAILED:
                duplicate = dict(existing)
                duplicate["is_duplicate"] = True
                duplicate["duplicate_of"] = existing.get("upload_id")
                return serialize_record_for_api(duplicate)
            # Stale or failed claim — release then re-claim for this upload.
            release_content_hash(
                user_id,
                content_hash,
                upload_id=str(existing_claim.get("upload_id") or ""),
            )
            claim_content_hash(user_id, content_hash, upload_id=upload_id)

    metadata: dict[str, Any] = with_v2_metadata(
        {
            "upload_id": upload_id,
            "user_id": user_id,
            "platform": platform,
            "filename": filename,
            "raw_file_count": len(raw_files),
            "post_count": len(posts) if posts is not None else (
                ingest_report.get("total_posts", 0) if ingest_report else 0
            ),
            "comment_count": 0,
            "created_at": now,
            "stored_at": now,
            "updated_at": now,
            "ingest_report": ingest_report or {},
            "storage_layer": "db1",
            "has_normalized_posts": False,
            "object_storage": None,
        },
        status=RECORD_STATUS_PENDING,
        now=now,
    )
    if content_hash:
        metadata["content_hash"] = content_hash

    doc_ref = _raw_uploads_collection(user_id).document(upload_id)
    doc_ref.set(metadata)

    try:
        if original_bytes is not None:
            object_meta = object_storage_service.upload_bytes(
                user_id=user_id,
                upload_id=upload_id,
                content=original_bytes,
                filename=filename,
                content_hash=content_hash,
            )
            metadata["object_storage"] = object_meta

        if keep_legacy_files:
            for index, raw_file in enumerate(raw_files):
                doc_id = _sanitize_doc_id(
                    str(raw_file.get("path", "")), fallback=f"file_{index:04d}"
                )
                _write_raw_file(user_id, upload_id, doc_id, raw_file)

        if posts is not None:
            posts_service.save_normalized_posts(user_id, upload_id, posts)
            metadata["has_normalized_posts"] = True
            metadata["post_count"] = len(posts)

        metadata["status"] = RECORD_STATUS_READY
        metadata["updated_at"] = encode_timestamp()
        doc_ref.set(metadata)
        return serialize_record_for_api(metadata)
    except Exception as exc:
        metadata["status"] = RECORD_STATUS_FAILED
        metadata["error"] = str(exc)
        metadata["updated_at"] = encode_timestamp()
        doc_ref.set(metadata, merge=True)
        if content_hash:
            release_content_hash(user_id, content_hash, upload_id=upload_id)
        raise


def update_raw_upload_metadata(
    user_id: str,
    upload_id: str,
    *,
    ingest_report: dict[str, Any] | None = None,
    platform: str | None = None,
    post_count: int | None = None,
    comment_count: int | None = None,
    content_hash: str | None = None,
    has_normalized_posts: bool | None = None,
    schema_version: int | None = None,
    status: str | None = None,
) -> dict[str, Any]:
    doc_ref = _raw_uploads_collection(user_id).document(upload_id)
    snapshot = doc_ref.get()
    if not snapshot.exists:
        raise KeyError(f"Upload not found: {upload_id}")

    updates: dict[str, Any] = {"updated_at": encode_timestamp()}
    if ingest_report is not None:
        updates["ingest_report"] = ingest_report
    if platform is not None:
        updates["platform"] = platform
    if post_count is not None:
        updates["post_count"] = post_count
    if comment_count is not None:
        updates["comment_count"] = comment_count
    if content_hash is not None:
        updates["content_hash"] = content_hash
    if has_normalized_posts is not None:
        updates["has_normalized_posts"] = has_normalized_posts
    if schema_version is not None:
        updates["schema_version"] = schema_version
    if status is not None:
        updates["status"] = status

    doc_ref.set(updates, merge=True)
    data = doc_ref.get().to_dict()
    assert data is not None
    return serialize_record_for_api(data)


def get_raw_upload_metadata(
    user_id: str,
    upload_id: str,
    *,
    include_non_ready: bool = False,
) -> dict[str, Any]:
    doc_ref = _raw_uploads_collection(user_id).document(upload_id)
    snapshot = doc_ref.get()

    if not snapshot.exists:
        raise KeyError(f"Upload not found: {upload_id}")

    data = snapshot.to_dict()
    assert data is not None
    if not include_non_ready and not is_ready(data):
        raise KeyError(f"Upload not found: {upload_id}")
    return serialize_record_for_api(data)


def list_raw_uploads(
    user_id: str,
    *,
    limit: int | None = None,
    start_after: str | None = None,
    include_non_ready: bool = False,
) -> list[dict[str, Any]]:
    query = _raw_uploads_collection(user_id).order_by("created_at", direction="DESCENDING")
    if start_after:
        cursor = _raw_uploads_collection(user_id).document(start_after).get()
        if cursor.exists:
            query = query.start_after(cursor)

    # Over-fetch slightly when filtering non-ready rows.
    fetch_limit = None if limit is None else limit * 3
    if fetch_limit is not None:
        query = query.limit(fetch_limit)

    results: list[dict[str, Any]] = []
    for doc in query.stream():
        if not doc.exists:
            continue
        data = doc.to_dict() or {}
        if not include_non_ready and not is_ready(data):
            continue
        results.append(serialize_record_for_api(data))
        if limit is not None and len(results) >= limit:
            break
    return results


def list_raw_files(user_id: str, upload_id: str) -> list[dict[str, Any]]:
    get_raw_upload_metadata(user_id, upload_id, include_non_ready=True)
    files_col = _raw_files_collection(user_id, upload_id)
    records: list[dict[str, Any]] = []

    for snapshot in files_col.stream():
        if not snapshot.exists:
            continue
        data = snapshot.to_dict() or {}
        if data.get("chunked"):
            data["content"] = _read_raw_file_content(snapshot.reference, data)
        records.append(data)

    return records


def list_all_raw_files(user_id: str) -> list[dict[str, Any]]:
    """Return every raw file across all uploads, tagged with `_upload_id`."""
    tagged_files: list[dict[str, Any]] = []

    for upload in list_raw_uploads(user_id):
        upload_id = upload["upload_id"]
        for raw_file in list_raw_files(user_id, upload_id):
            tagged = dict(raw_file)
            tagged["_upload_id"] = upload_id
            tagged_files.append(tagged)

    return tagged_files


def delete_raw_upload(user_id: str, upload_id: str) -> dict[str, Any]:
    """Recursively delete an upload, its children, object storage, and hash claim."""
    try:
        metadata = get_raw_upload_metadata(user_id, upload_id, include_non_ready=True)
    except KeyError:
        return {"deleted": False, "upload_id": upload_id}

    object_meta = metadata.get("object_storage") or {}
    object_path = object_meta.get("object_path")
    if object_path:
        object_storage_service.delete_object(
            object_path,
            bucket_name=object_meta.get("bucket") if object_meta.get("bucket") != "local-fallback" else None,
        )

    posts_service.delete_normalized_posts(user_id, upload_id)
    _delete_collection_recursive(_raw_files_collection(user_id, upload_id))

    content_hash = metadata.get("content_hash")
    if content_hash:
        release_content_hash(user_id, str(content_hash), upload_id=upload_id)

    _raw_uploads_collection(user_id).document(upload_id).delete()
    return {"deleted": True, "upload_id": upload_id}


def cleanup_failed_uploads(user_id: str) -> int:
    """Remove failed/pending-stale uploads for a user. Returns deleted count."""
    deleted = 0
    for upload in list_raw_uploads(user_id, include_non_ready=True):
        if upload.get("status") == RECORD_STATUS_FAILED:
            delete_raw_upload(user_id, upload["upload_id"])
            deleted += 1
    return deleted
