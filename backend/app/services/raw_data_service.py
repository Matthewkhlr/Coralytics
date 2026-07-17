"""
DB1: raw export storage.

Uploads are stored as extracted export files under:
    users/{userId}/raw_uploads/{uploadId}
    users/{userId}/raw_uploads/{uploadId}/files/{fileId}
    users/{userId}/raw_uploads/{uploadId}/files/{fileId}/chunks/{chunkId}
"""

from __future__ import annotations

import re
import uuid
from datetime import datetime, timezone
from typing import Any

from app.firebase import get_firestore_client

_DOC_ID_PATTERN = re.compile(r"[^\w\-.:]+")

# Firestore string fields are capped at ~1 MiB; stay under that when storing raw JSON.
FIRESTORE_MAX_CONTENT_BYTES = 900_000


def _raw_uploads_collection(user_id: str):
    return get_firestore_client().collection("users").document(user_id).collection("raw_uploads")


def _raw_files_collection(user_id: str, upload_id: str):
    return _raw_uploads_collection(user_id).document(upload_id).collection("files")


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


def save_raw_upload(
    user_id: str,
    filename: str,
    raw_files: list[dict[str, Any]],
    *,
    platform: str = "mixed",
    ingest_report: dict[str, Any] | None = None,
    content_hash: str | None = None,
) -> dict[str, Any]:
    """Persist raw extracted export files in DB1."""
    upload_id = uuid.uuid4().hex
    now = datetime.now(timezone.utc).isoformat()

    metadata: dict[str, Any] = {
        "upload_id": upload_id,
        "user_id": user_id,
        "platform": platform,
        "filename": filename,
        "raw_file_count": len(raw_files),
        "post_count": ingest_report.get("total_posts", 0) if ingest_report else 0,
        "comment_count": 0,
        "created_at": now,
        "stored_at": now,
        "ingest_report": ingest_report or {},
        "storage_layer": "db1",
    }

    if content_hash:
        metadata["content_hash"] = content_hash

    if ingest_report:
        posts = ingest_report.get("total_posts", 0)
        metadata["post_count"] = posts

    _raw_uploads_collection(user_id).document(upload_id).set(metadata)

    for index, raw_file in enumerate(raw_files):
        doc_id = _sanitize_doc_id(str(raw_file.get("path", "")), fallback=f"file_{index:04d}")
        _write_raw_file(user_id, upload_id, doc_id, raw_file)

    return metadata


def update_raw_upload_metadata(
    user_id: str,
    upload_id: str,
    *,
    ingest_report: dict[str, Any] | None = None,
    platform: str | None = None,
    post_count: int | None = None,
    comment_count: int | None = None,
    content_hash: str | None = None,
) -> dict[str, Any]:
    doc_ref = _raw_uploads_collection(user_id).document(upload_id)
    snapshot = doc_ref.get()
    if not snapshot.exists:
        raise KeyError(f"Upload not found: {upload_id}")

    updates: dict[str, Any] = {}
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

    if updates:
        doc_ref.set(updates, merge=True)

    data = doc_ref.get().to_dict()
    assert data is not None
    return data


def find_upload_by_content_hash(user_id: str, content_hash: str) -> dict[str, Any] | None:
    """Return the first existing upload with a matching content_hash, if any."""
    if not content_hash:
        return None
    for upload in list_raw_uploads(user_id):
        if upload.get("content_hash") == content_hash:
            return upload
    return None


def get_raw_upload_metadata(user_id: str, upload_id: str) -> dict[str, Any]:
    doc_ref = _raw_uploads_collection(user_id).document(upload_id)
    snapshot = doc_ref.get()

    if not snapshot.exists:
        raise KeyError(f"Upload not found: {upload_id}")

    data = snapshot.to_dict()
    assert data is not None
    return data


def list_raw_uploads(user_id: str) -> list[dict[str, Any]]:
    snapshots = (
        _raw_uploads_collection(user_id)
        .order_by("created_at", direction="DESCENDING")
        .stream()
    )
    return [doc.to_dict() for doc in snapshots if doc.exists]


def list_raw_files(user_id: str, upload_id: str) -> list[dict[str, Any]]:
    get_raw_upload_metadata(user_id, upload_id)
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
