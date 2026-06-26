import re
import uuid
from datetime import datetime, timezone
from typing import Any

from google.cloud.firestore_v1 import Query

from app.firebase import get_firestore_client

BATCH_SIZE = 400
_DOC_ID_PATTERN = re.compile(r"[^\w\-.:]+")


def _uploads_collection(user_id: str):
    return get_firestore_client().collection("users").document(user_id).collection("uploads")


def _analyses_collection(user_id: str):
    return get_firestore_client().collection("users").document(user_id).collection("analyses")


def _posts_collection(user_id: str, upload_id: str):
    return _uploads_collection(user_id).document(upload_id).collection("posts")


def _sanitize_doc_id(raw_id: str, fallback: str) -> str:
    doc_id = _DOC_ID_PATTERN.sub("_", raw_id).strip("._")
    if not doc_id:
        return fallback
    return doc_id[:1500]


def _commit_batches(user_id: str, upload_id: str, posts: list[dict[str, Any]]) -> None:
    db = get_firestore_client()

    for index in range(0, len(posts), BATCH_SIZE):
        batch = db.batch()
        chunk = posts[index : index + BATCH_SIZE]

        for offset, post in enumerate(chunk):
            fallback_id = f"{index + offset:06d}"
            doc_id = _sanitize_doc_id(str(post.get("id", "")), fallback_id)
            batch.set(_posts_collection(user_id, upload_id).document(doc_id), post)

        batch.commit()


def save_upload_with_posts(
    user_id: str,
    filename: str,
    posts: list[dict[str, Any]],
    *,
    platform: str = "mixed",
    ingest_report: dict[str, Any] | None = None,
) -> dict[str, Any]:
    """Persist upload metadata, ingest report, and parsed posts in Firestore."""
    upload_id = uuid.uuid4().hex
    now = datetime.now(timezone.utc).isoformat()
    comment_types = {"comment", "reply"}

    metadata: dict[str, Any] = {
        "upload_id": upload_id,
        "user_id": user_id,
        "platform": platform,
        "filename": filename,
        "post_count": len(posts),
        "comment_count": sum(1 for post in posts if post.get("post_type") in comment_types),
        "created_at": now,
        "parsed_at": now,
        "ingest_report": ingest_report or {},
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
    snapshots = (
        _uploads_collection(user_id)
        .order_by("created_at", direction=Query.DESCENDING)
        .stream()
    )
    return [doc.to_dict() for doc in snapshots if doc.exists]


def list_upload_posts(
    user_id: str,
    upload_id: str,
    *,
    limit: int = 100,
    start_after: str | None = None,
) -> tuple[list[dict[str, Any]], str | None]:
    """List parsed posts for an upload with simple cursor pagination."""
    get_upload_metadata(user_id, upload_id)

    collection = _posts_collection(user_id, upload_id)
    query = collection.order_by("__name__")
    if start_after:
        start_doc = collection.document(start_after).get()
        if start_doc.exists:
            query = query.start_after(start_doc)

    snapshots = list(query.limit(limit + 1).stream())
    posts = [doc.to_dict() for doc in snapshots[:limit] if doc.exists]
    next_cursor = snapshots[limit].id if len(snapshots) > limit else None
    return posts, next_cursor


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
    snapshots = (
        _analyses_collection(user_id)
        .order_by("created_at", direction=Query.DESCENDING)
        .stream()
    )
    return [doc.to_dict() for doc in snapshots if doc.exists]
