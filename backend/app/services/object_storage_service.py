"""Cloud Storage helpers for raw export payloads (v2 hybrid model).

Raw archives/files live in GCS/Firebase Storage. Firestore keeps only
object path, checksum, size, and processing metadata.
"""

from __future__ import annotations

import hashlib
import os
from typing import Any

from app.config import get_settings
from app.firebase import get_storage_bucket


def object_path_for_upload(user_id: str, upload_id: str, filename: str = "export.bin") -> str:
    safe_name = filename.replace("/", "_").replace("\\", "_") or "export.bin"
    return f"users/{user_id}/raw_uploads/{upload_id}/{safe_name}"


def upload_bytes(
    *,
    user_id: str,
    upload_id: str,
    content: bytes,
    filename: str,
    content_type: str = "application/octet-stream",
    content_hash: str | None = None,
) -> dict[str, Any]:
    """Store raw bytes in Cloud Storage and return object metadata."""
    settings = get_settings()
    digest = content_hash or hashlib.sha256(content).hexdigest()
    path = object_path_for_upload(user_id, upload_id, filename)

    if settings.use_emulators and not settings.storage_emulator_host:
        # Emulator without Storage: persist under a local cache directory.
        return _write_local_fallback(path, content, digest, content_type)

    bucket = get_storage_bucket()
    blob = bucket.blob(path)
    blob.upload_from_string(content, content_type=content_type)
    blob.metadata = {"content_hash": digest, "user_id": user_id, "upload_id": upload_id}
    blob.patch()

    return {
        "object_path": path,
        "bucket": bucket.name,
        "content_hash": digest,
        "size_bytes": len(content),
        "content_type": content_type,
        "storage_backend": "gcs",
    }


def download_bytes(object_path: str, *, bucket_name: str | None = None) -> bytes:
    settings = get_settings()
    if settings.use_emulators and not settings.storage_emulator_host:
        return _read_local_fallback(object_path)

    bucket = get_storage_bucket(bucket_name)
    blob = bucket.blob(object_path)
    return blob.download_as_bytes()


def delete_object(object_path: str, *, bucket_name: str | None = None) -> None:
    settings = get_settings()
    if settings.use_emulators and not settings.storage_emulator_host:
        _delete_local_fallback(object_path)
        return

    bucket = get_storage_bucket(bucket_name)
    blob = bucket.blob(object_path)
    try:
        blob.delete()
    except Exception:
        # Best-effort cleanup; missing objects are fine.
        pass


def _local_root() -> str:
    root = os.path.join(os.path.dirname(__file__), "..", "..", ".local_object_store")
    os.makedirs(root, exist_ok=True)
    return os.path.abspath(root)


def _local_file_path(object_path: str) -> str:
    return os.path.join(_local_root(), object_path.replace("/", os.sep))


def _write_local_fallback(
    path: str,
    content: bytes,
    digest: str,
    content_type: str,
) -> dict[str, Any]:
    file_path = _local_file_path(path)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "wb") as handle:
        handle.write(content)
    return {
        "object_path": path,
        "bucket": "local-fallback",
        "content_hash": digest,
        "size_bytes": len(content),
        "content_type": content_type,
        "storage_backend": "local_fallback",
    }


def _read_local_fallback(object_path: str) -> bytes:
    file_path = _local_file_path(object_path)
    with open(file_path, "rb") as handle:
        return handle.read()


def _delete_local_fallback(object_path: str) -> None:
    file_path = _local_file_path(object_path)
    try:
        os.remove(file_path)
    except FileNotFoundError:
        pass
