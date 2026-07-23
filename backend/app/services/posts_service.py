"""Normalized post documents under each upload (v2).

Path:
    users/{userId}/raw_uploads/{uploadId}/posts/{postId}
"""

from __future__ import annotations

import re
from typing import Any

from app.firebase import get_firestore_client
from app.models.persistence import SCHEMA_VERSION_V2, encode_timestamp, parse_timestamp

_DOC_ID_PATTERN = re.compile(r"[^\w\-.:]+")


def _posts_collection(user_id: str, upload_id: str):
    return (
        get_firestore_client()
        .collection("users")
        .document(user_id)
        .collection("raw_uploads")
        .document(upload_id)
        .collection("posts")
    )


def _sanitize_doc_id(raw_id: str, fallback: str) -> str:
    doc_id = _DOC_ID_PATTERN.sub("_", raw_id).strip("._")
    if not doc_id:
        return fallback
    return doc_id[:1500]


def save_normalized_posts(
    user_id: str,
    upload_id: str,
    posts: list[dict[str, Any]],
) -> int:
    """Persist normalized posts for an upload. Replaces existing posts collection."""
    col = _posts_collection(user_id, upload_id)
    # Clear previous posts (migration / re-label).
    existing = list(col.stream())
    batch = get_firestore_client().batch()
    ops = 0
    for snap in existing:
        batch.delete(snap.reference)
        ops += 1
        if ops >= 400:
            batch.commit()
            batch = get_firestore_client().batch()
            ops = 0
    if ops:
        batch.commit()

    now = encode_timestamp()
    batch = get_firestore_client().batch()
    ops = 0
    written = 0
    for index, post in enumerate(posts):
        post_id = _sanitize_doc_id(str(post.get("id") or ""), fallback=f"post_{index:04d}")
        created = parse_timestamp(post.get("created_at"))
        record = {
            "id": post.get("id") or post_id,
            "upload_id": upload_id,
            "user_id": user_id,
            "platform": post.get("platform"),
            "content": post.get("content") or "",
            "created_at": created.isoformat() if created else post.get("created_at"),
            "created_at_ts": created,
            "post_type": post.get("post_type") or "unknown",
            "engagement": post.get("engagement"),
            "source_context": post.get("source_context"),
            "url": post.get("url"),
            "hashtags": post.get("hashtags") or [],
            "schema_version": SCHEMA_VERSION_V2,
            "stored_at": now,
        }
        batch.set(col.document(post_id), record)
        written += 1
        ops += 1
        if ops >= 400:
            batch.commit()
            batch = get_firestore_client().batch()
            ops = 0
    if ops:
        batch.commit()
    return written


def list_normalized_posts(
    user_id: str,
    upload_id: str,
    *,
    limit: int | None = None,
    start_after: str | None = None,
    platform: str | None = None,
    post_type: str | None = None,
) -> tuple[list[dict[str, Any]], str | None]:
    col = _posts_collection(user_id, upload_id)
    query = col.order_by("id")
    if start_after:
        cursor_snap = col.document(start_after).get()
        if cursor_snap.exists:
            query = query.start_after(cursor_snap)

    fetch_limit = (limit + 1) if limit is not None else None
    if fetch_limit is not None:
        query = query.limit(fetch_limit)

    rows: list[dict[str, Any]] = []
    for snap in query.stream():
        if not snap.exists:
            continue
        data = snap.to_dict() or {}
        if platform and str(data.get("platform") or "").lower() != platform.lower():
            continue
        if post_type and str(data.get("post_type") or "").lower() != post_type.lower():
            continue
        data["_upload_id"] = upload_id
        rows.append(data)

    if limit is None:
        return rows, None
    page = rows[:limit]
    next_cursor = str(page[-1]["id"]) if len(rows) > limit and page else None
    return page, next_cursor


def list_all_normalized_posts_for_user(user_id: str) -> list[dict[str, Any]]:
    """Collect normalized posts across all ready uploads."""
    from app.services import raw_data_service

    posts: list[dict[str, Any]] = []
    for upload in raw_data_service.list_raw_uploads(user_id):
        upload_id = upload["upload_id"]
        # Prefer v2 posts; callers fall back to legacy parsing when empty.
        if int(upload.get("schema_version") or 1) < 2 and not upload.get("has_normalized_posts"):
            continue
        page, _ = list_normalized_posts(user_id, upload_id)
        posts.extend(page)
    return posts


def delete_normalized_posts(user_id: str, upload_id: str) -> int:
    col = _posts_collection(user_id, upload_id)
    deleted = 0
    batch = get_firestore_client().batch()
    ops = 0
    for snap in col.stream():
        batch.delete(snap.reference)
        deleted += 1
        ops += 1
        if ops >= 400:
            batch.commit()
            batch = get_firestore_client().batch()
            ops = 0
    if ops:
        batch.commit()
    return deleted


def has_normalized_posts(user_id: str, upload_id: str) -> bool:
    snaps = list(_posts_collection(user_id, upload_id).limit(1).stream())
    return bool(snaps)
