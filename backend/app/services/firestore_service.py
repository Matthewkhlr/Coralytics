import uuid
from datetime import datetime, timezone
from typing import Any

from app.firebase import get_firestore_client

BATCH_SIZE = 400


def _uploads_collection(user_id: str):
    return get_firestore_client().collection("users").document(user_id).collection("uploads")


def _analyses_collection(user_id: str):
    return get_firestore_client().collection("users").document(user_id).collection("analyses")


def _posts_collection(user_id: str, upload_id: str):
    return _uploads_collection(user_id).document(upload_id).collection("posts")


def _commit_batches(user_id: str, upload_id: str, posts: list[dict[str, Any]]) -> None:
    db = get_firestore_client()

    for index in range(0, len(posts), BATCH_SIZE):
        batch = db.batch()
        chunk = posts[index : index + BATCH_SIZE]

        for offset, post in enumerate(chunk):
            post_id = f"{index + offset:06d}"
            batch.set(_posts_collection(user_id, upload_id).document(post_id), post)

        batch.commit()


def save_upload_with_posts(
    user_id: str,
    platform: str,
    filename: str,
    posts: list[dict[str, Any]],
) -> dict[str, Any]:
    """Persist upload metadata and parsed posts in Firestore."""
    upload_id = uuid.uuid4().hex
    now = datetime.now(timezone.utc).isoformat()

    metadata: dict[str, Any] = {
        "upload_id": upload_id,
        "user_id": user_id,
        "platform": platform,
        "filename": filename,
        "post_count": len(posts),
        "created_at": now,
        "parsed_at": now,
    }

    _uploads_collection(user_id).document(upload_id).set(metadata)
    if posts:
        _commit_batches(user_id, upload_id, posts)

    return metadata


def get_upload_metadata(user_id: str, upload_id: str) -> dict[str, Any]:
    """Fetch upload metadata from Firestore."""
    doc_ref = _uploads_collection(user_id).document(upload_id)
    snapshot = doc_ref.get()

    if not snapshot.exists:
        raise KeyError(f"Upload not found: {upload_id}")

    data = snapshot.to_dict()
    assert data is not None
    return data


def list_uploads(user_id: str) -> list[dict[str, Any]]:
    """List all uploads for a user."""
    snapshots = _uploads_collection(user_id).order_by("created_at", direction="DESCENDING").stream()
    return [doc.to_dict() for doc in snapshots if doc.exists]


def list_upload_posts(user_id: str, upload_id: str) -> list[dict[str, Any]]:
    """List parsed posts for an upload."""
    get_upload_metadata(user_id, upload_id)
    snapshots = _posts_collection(user_id, upload_id).order_by("__name__").stream()
    return [doc.to_dict() for doc in snapshots if doc.exists]


def save_analysis(
    user_id: str,
    analysis: dict[str, Any],
    upload_ids: list[str] | None = None,
) -> dict[str, Any]:
    """Persist an analysis result in Firestore."""
    analysis_id = uuid.uuid4().hex
    now = datetime.now(timezone.utc).isoformat()

    record: dict[str, Any] = {
        "analysis_id": analysis_id,
        "user_id": user_id,
        "created_at": now,
        "updated_at": now,
        "upload_ids": upload_ids or [],
        **analysis,
    }

    _analyses_collection(user_id).document(analysis_id).set(record)
    return record


def get_analysis(user_id: str, analysis_id: str) -> dict[str, Any]:
    """Fetch a single analysis result."""
    doc_ref = _analyses_collection(user_id).document(analysis_id)
    snapshot = doc_ref.get()

    if not snapshot.exists:
        raise KeyError(f"Analysis not found: {analysis_id}")

    data = snapshot.to_dict()
    assert data is not None
    return data


def list_analyses(user_id: str) -> list[dict[str, Any]]:
    """List all analyses for a user."""
    snapshots = _analyses_collection(user_id).order_by("created_at", direction="DESCENDING").stream()
    return [doc.to_dict() for doc in snapshots if doc.exists]
