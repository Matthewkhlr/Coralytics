"""Resumable v1 → v2 upload migration.

Migrates legacy Firestore file/chunk payloads to:
  1. Cloud Storage object (reconstructed export archive of raw files)
  2. Normalized post documents under the upload
  3. schema_version=2 + has_normalized_posts=true

Legacy files/chunks are retained until an explicit cleanup pass.
"""

from __future__ import annotations

import json
import zipfile
from datetime import datetime, timedelta, timezone
from io import BytesIO
from typing import Any, Iterator

from app.firebase import get_firestore_client
from app.models.persistence import SCHEMA_VERSION_V2, encode_timestamp
from app.services import ingestion_service, object_storage_service, posts_service, raw_data_service

MIGRATION_ID = "v1_to_v2_uploads"


def _migrations_collection():
    return get_firestore_client().collection("migrations")


def _checkpoint_ref(run_id: str):
    return _migrations_collection().document(run_id)


def load_checkpoint(run_id: str) -> dict[str, Any]:
    snap = _checkpoint_ref(run_id).get()
    if not snap.exists:
        return {
            "run_id": run_id,
            "migration": MIGRATION_ID,
            "cursor_user_id": None,
            "cursor_upload_id": None,
            "cursor_path": None,
            "processed": 0,
            "migrated": 0,
            "skipped": 0,
            "errors": [],
        }
    return snap.to_dict() or {}


def save_checkpoint(state: dict[str, Any]) -> None:
    state = dict(state)
    state["updated_at"] = encode_timestamp()
    state["expire_at"] = datetime.now(timezone.utc) + timedelta(days=30)
    state["schema_version"] = SCHEMA_VERSION_V2
    _checkpoint_ref(state["run_id"]).set(state, merge=True)


def _iter_upload_refs(
    *,
    user_id: str | None = None,
    start_after_path: str | None = None,
    limit: int = 50,
) -> Iterator[tuple[str, str, str]]:
    """Yield (user_id, upload_id, path) via collection group query.

    Parent `users/{uid}` documents may not exist when only subcollections were
    written, so listing the users collection is unreliable.
    """
    if user_id:
        query = (
            get_firestore_client()
            .collection("users")
            .document(user_id)
            .collection("raw_uploads")
            .order_by("__name__")
        )
        if start_after_path:
            parts = start_after_path.strip("/").split("/")
            if len(parts) >= 4 and parts[3]:
                cursor = (
                    get_firestore_client()
                    .collection("users")
                    .document(user_id)
                    .collection("raw_uploads")
                    .document(parts[3])
                    .get()
                )
                if cursor.exists:
                    query = query.start_after(cursor)
        query = query.limit(limit)
        for snap in query.stream():
            yield user_id, snap.id, snap.reference.path
        return

    query = get_firestore_client().collection_group("raw_uploads").order_by("__name__")
    if start_after_path:
        parts = start_after_path.strip("/").split("/")
        if len(parts) >= 4 and parts[0] == "users" and parts[2] == "raw_uploads":
            cursor = (
                get_firestore_client()
                .collection("users")
                .document(parts[1])
                .collection("raw_uploads")
                .document(parts[3])
                .get()
            )
            if cursor.exists:
                query = query.start_after(cursor)

    query = query.limit(limit)
    for snap in query.stream():
        path_parts = snap.reference.path.split("/")
        # users/{uid}/raw_uploads/{uploadId}
        if len(path_parts) < 4:
            continue
        yield path_parts[1], path_parts[3], snap.reference.path


def _reconstruct_archive_bytes(raw_files: list[dict[str, Any]], filename: str) -> bytes:
    """Build a zip of reconstructed raw file contents for object storage."""
    buffer = BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as archive:
        for index, raw_file in enumerate(raw_files):
            path = str(raw_file.get("path") or f"file_{index:04d}.txt")
            content = str(raw_file.get("content") or "")
            archive.writestr(path, content.encode("utf-8"))
    data = buffer.getvalue()
    if not data and filename:
        return json.dumps({"files": []}).encode("utf-8")
    return data


def migrate_upload(
    user_id: str,
    upload_id: str,
    *,
    dry_run: bool = False,
) -> dict[str, Any]:
    metadata = raw_data_service.get_raw_upload_metadata(
        user_id, upload_id, include_non_ready=True
    )
    schema_version = int(metadata.get("schema_version") or 1)
    has_posts = bool(metadata.get("has_normalized_posts"))
    has_object = bool((metadata.get("object_storage") or {}).get("object_path"))

    if schema_version >= 2 and has_posts and has_object:
        return {"status": "skipped", "reason": "already_v2", "upload_id": upload_id}

    raw_files = raw_data_service.list_raw_files(user_id, upload_id)
    posts, ingest_report = ingestion_service.ingest_raw_files(
        raw_files, require_posts=False
    )
    confirmed = str(metadata.get("platform") or "").lower().strip()
    if confirmed and confirmed not in {"mixed", "sample", "unknown"} and posts:
        detected = ingestion_service.derive_platform(posts)
        if detected != confirmed:
            posts = ingestion_service.force_posts_platform(posts, confirmed)

    result = {
        "status": "migrated",
        "upload_id": upload_id,
        "user_id": user_id,
        "post_count": len(posts),
        "raw_file_count": len(raw_files),
        "dry_run": dry_run,
    }

    if dry_run:
        result["status"] = "dry_run"
        return result

    archive = _reconstruct_archive_bytes(
        raw_files, str(metadata.get("filename") or "export.zip")
    )
    object_meta = object_storage_service.upload_bytes(
        user_id=user_id,
        upload_id=upload_id,
        content=archive,
        filename=str(metadata.get("filename") or "export.zip"),
        content_hash=metadata.get("content_hash"),
    )
    posts_service.save_normalized_posts(user_id, upload_id, posts)

    comment_types = {"comment", "reply"}
    comment_count = sum(1 for post in posts if post.get("post_type") in comment_types)

    doc_ref = (
        get_firestore_client()
        .collection("users")
        .document(user_id)
        .collection("raw_uploads")
        .document(upload_id)
    )
    doc_ref.set(
        {
            "schema_version": SCHEMA_VERSION_V2,
            "has_normalized_posts": True,
            "object_storage": object_meta,
            "post_count": len(posts),
            "comment_count": comment_count,
            "ingest_report": ingest_report or metadata.get("ingest_report") or {},
            "updated_at": encode_timestamp(),
            "migrated_at": encode_timestamp(),
            "status": metadata.get("status") or "ready",
        },
        merge=True,
    )

    if metadata.get("content_hash"):
        raw_data_service.claim_content_hash(
            user_id, str(metadata["content_hash"]), upload_id=upload_id
        )

    return result


def run_migration(
    *,
    dry_run: bool = True,
    batch_size: int = 20,
    run_id: str = "default",
    user_id: str | None = None,
    max_uploads: int | None = None,
) -> dict[str, Any]:
    state = load_checkpoint(run_id)
    # Fresh dry-runs should not resume a previous applied checkpoint cursor.
    if dry_run:
        state = {
            "run_id": run_id,
            "migration": MIGRATION_ID,
            "cursor_user_id": None,
            "cursor_upload_id": None,
            "cursor_path": None,
            "processed": 0,
            "migrated": 0,
            "skipped": 0,
            "errors": [],
            "dry_run": True,
        }
    else:
        state["run_id"] = run_id
        state["migration"] = MIGRATION_ID
        state["dry_run"] = False

    errors: list[dict[str, Any]] = list(state.get("errors") or [])
    processed = int(state.get("processed") or 0)
    migrated = int(state.get("migrated") or 0)
    skipped = int(state.get("skipped") or 0)

    fetch_limit = batch_size
    if max_uploads is not None:
        fetch_limit = min(batch_size, max(1, max_uploads - processed))

    for uid, upload_id, path in _iter_upload_refs(
        user_id=user_id,
        start_after_path=None if dry_run else state.get("cursor_path"),
        limit=fetch_limit,
    ):
        try:
            outcome = migrate_upload(uid, upload_id, dry_run=dry_run)
            processed += 1
            if outcome.get("status") == "skipped":
                skipped += 1
            else:
                migrated += 1
        except Exception as exc:  # noqa: BLE001 — collect and continue
            errors.append(
                {
                    "user_id": uid,
                    "upload_id": upload_id,
                    "error": str(exc),
                }
            )
            processed += 1

        state.update(
            {
                "cursor_user_id": uid,
                "cursor_upload_id": upload_id,
                "cursor_path": path,
                "processed": processed,
                "migrated": migrated,
                "skipped": skipped,
                "errors": errors[-50:],
            }
        )
        if not dry_run:
            save_checkpoint(state)

        if max_uploads is not None and processed >= max_uploads:
            return state

    if not dry_run:
        save_checkpoint(state)
    return state
