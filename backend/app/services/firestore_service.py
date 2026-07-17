"""
Firestore access layer.

DB1 raw uploads: raw_data_service
DB2 analyses: analysis_store_service

This module keeps backward-compatible helpers used by the API layer and
share/privacy features.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from app.firebase import get_firestore_client
from app.services import analysis_store_service, ingestion_service, raw_data_service


def save_upload_with_posts(
    user_id: str,
    filename: str,
    posts: list[dict[str, Any]],
    *,
    platform: str = "mixed",
    ingest_report: dict[str, Any] | None = None,
    raw_files: list[dict[str, Any]] | None = None,
    content_hash: str | None = None,
) -> dict[str, Any]:
    """Persist a raw upload in DB1. Parsed posts are preview metadata only."""
    if not raw_files:
        raise ValueError("raw_files are required for DB1 storage")

    comment_types = {"comment", "reply"}
    comment_count = sum(1 for post in posts if post.get("post_type") in comment_types)

    upload = raw_data_service.save_raw_upload(
        user_id=user_id,
        filename=filename,
        raw_files=raw_files,
        platform=platform,
        ingest_report=ingest_report,
        content_hash=content_hash,
    )

    return raw_data_service.update_raw_upload_metadata(
        user_id,
        upload["upload_id"],
        ingest_report=ingest_report,
        platform=platform,
        post_count=len(posts),
        comment_count=comment_count,
        content_hash=content_hash,
    )


def find_upload_by_content_hash(user_id: str, content_hash: str) -> dict[str, Any] | None:
    return raw_data_service.find_upload_by_content_hash(user_id, content_hash)


def get_upload_metadata(user_id: str, upload_id: str) -> dict[str, Any]:
    return raw_data_service.get_raw_upload_metadata(user_id, upload_id)


def list_uploads(user_id: str) -> list[dict[str, Any]]:
    return raw_data_service.list_raw_uploads(user_id)


def _parse_upload_posts(user_id: str, upload_id: str) -> list[dict[str, Any]]:
    raw_files = raw_data_service.list_raw_files(user_id, upload_id)
    if not raw_files:
        return []

    metadata = get_upload_metadata(user_id, upload_id)
    posts, _ = ingestion_service.ingest_raw_files(raw_files, require_posts=False)
    confirmed = str(metadata.get("platform") or "").lower().strip()
    if confirmed and confirmed not in {"mixed", "sample", "unknown"}:
        detected = ingestion_service.derive_platform(posts)
        if detected != confirmed:
            posts = ingestion_service.force_posts_platform(posts, confirmed)
    for post in posts:
        post["_upload_id"] = upload_id
    return posts


def update_upload_platform(user_id: str, upload_id: str, platform: str) -> dict[str, Any]:
    """Persist a user-confirmed platform label for one upload."""
    get_upload_metadata(user_id, upload_id)
    raw_files = raw_data_service.list_raw_files(user_id, upload_id)
    if not raw_files:
        raise KeyError(f"Upload not found: {upload_id}")

    hint = platform.lower().strip()
    posts, ingest_report = ingestion_service.ingest_raw_files(raw_files, require_posts=False)
    detected = ingestion_service.derive_platform(posts)
    if detected != hint:
        posts = ingestion_service.force_posts_platform(posts, hint)

    comment_types = {"comment", "reply"}
    comment_count = sum(1 for post in posts if post.get("post_type") in comment_types)

    return raw_data_service.update_raw_upload_metadata(
        user_id,
        upload_id,
        platform=hint,
        ingest_report=ingest_report,
        post_count=len(posts),
        comment_count=comment_count,
    )


def _merge_post_insights(
    posts: list[dict[str, Any]],
    insights_by_id: dict[str, dict[str, Any]],
) -> list[dict[str, Any]]:
    merged: list[dict[str, Any]] = []
    for post in posts:
        enriched = dict(post)
        insight = insights_by_id.get(str(post.get("id")))
        if insight:
            enriched.update(insight)
        merged.append(enriched)
    return merged


def _latest_post_insights(user_id: str) -> dict[str, dict[str, Any]]:
    latest = analysis_store_service.get_latest_analysis(user_id)
    if not latest:
        return {}

    insights: dict[str, dict[str, Any]] = {}
    for item in latest.get("post_insights") or []:
        post_id = item.get("id")
        if post_id:
            insights[str(post_id)] = item
    return insights


def list_upload_posts(
    user_id: str,
    upload_id: str,
    *,
    limit: int = 100,
    start_after: str | None = None,
) -> tuple[list[dict[str, Any]], str | None]:
    """List posts parsed from DB1 raw files for one upload."""
    get_upload_metadata(user_id, upload_id)
    posts = _merge_post_insights(
        _parse_upload_posts(user_id, upload_id),
        _latest_post_insights(user_id),
    )

    if start_after:
        start_index = next(
            (index for index, post in enumerate(posts) if str(post.get("id")) == start_after),
            -1,
        )
        posts = posts[start_index + 1 :] if start_index >= 0 else posts

    page = posts[:limit]
    next_cursor = str(page[-1]["id"]) if len(posts) > limit and page else None
    return page, next_cursor


def save_analysis(
    user_id: str,
    analysis: dict[str, Any],
    upload_ids: list[str] | None = None,
) -> dict[str, Any]:
    return analysis_store_service.save_analysis(user_id, analysis, upload_ids)


def get_analysis(user_id: str, analysis_id: str) -> dict[str, Any]:
    return analysis_store_service.get_analysis(user_id, analysis_id)


def list_analyses(user_id: str) -> list[dict[str, Any]]:
    return analysis_store_service.list_analyses(user_id)


def _dedupe_posts_by_id(posts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Keep the first occurrence of each post id across uploads."""
    seen: set[str] = set()
    unique: list[dict[str, Any]] = []
    for post in posts:
        post_id = str(post.get("id") or "")
        if not post_id or post_id in seen:
            continue
        seen.add(post_id)
        unique.append(post)
    return unique


def list_user_posts(
    user_id: str,
    *,
    upload_ids: list[str] | None = None,
) -> list[dict[str, Any]]:
    """Parse raw exports for a user, optionally scoped to upload_ids, deduped by post id."""
    uploads = list_uploads(user_id)
    if upload_ids:
        allowed = set(upload_ids)
        uploads = [upload for upload in uploads if upload.get("upload_id") in allowed]

    all_posts: list[dict[str, Any]] = []
    for upload in uploads:
        upload_id = upload["upload_id"]
        all_posts.extend(_parse_upload_posts(user_id, upload_id))

    return _dedupe_posts_by_id(all_posts)


def list_all_user_posts(user_id: str) -> list[dict[str, Any]]:
    """Parse every raw export file in DB1 for a user (deduped by post id)."""
    return list_user_posts(user_id)


def list_posts_by_topic(
    user_id: str,
    topic: str,
    *,
    limit: int = 20,
    platform: str | None = None,
) -> list[dict[str, Any]]:
    topic_lower = topic.lower().strip()
    platform_lower = platform.lower().strip() if platform else None
    insights = _latest_post_insights(user_id)
    matched: list[dict[str, Any]] = []

    for post in list_all_user_posts(user_id):
        enriched = dict(post)
        insight = insights.get(str(post.get("id")))
        if insight:
            enriched.update(insight)

        if platform_lower:
            post_platform = str(enriched.get("platform") or "").lower()
            if post_platform != platform_lower:
                continue

        topics = enriched.get("topics") or []
        if any(str(item).lower() == topic_lower for item in topics):
            matched.append(enriched)
        if len(matched) >= limit:
            break

    return matched


def _user_doc(user_id: str):
    return get_firestore_client().collection("users").document(user_id)


def _shares_collection():
    return get_firestore_client().collection("shares")


def get_privacy_settings(user_id: str) -> dict[str, Any]:
    defaults = {
        "include_comments": True,
        "exclude_flagged_from_share": True,
        "include_post_excerpts_in_share": False,
        "share_expiry_days": 30,
        "excluded_platforms": [],
    }
    snapshot = _user_doc(user_id).collection("settings").document("privacy").get()
    if not snapshot.exists:
        return defaults
    data = snapshot.to_dict() or {}
    return {**defaults, **data}


def save_privacy_settings(user_id: str, settings: dict[str, Any]) -> dict[str, Any]:
    now = datetime.now(timezone.utc).isoformat()
    record = {**settings, "updated_at": now}
    _user_doc(user_id).collection("settings").document("privacy").set(record, merge=True)
    return record


def save_evolution_snapshot(user_id: str, analysis_id: str, snapshot: dict[str, Any]) -> None:
    _user_doc(user_id).collection("evolution_snapshots").document(analysis_id).set(snapshot)


def list_evolution_snapshots(user_id: str, limit: int = 20) -> list[dict[str, Any]]:
    snapshots = (
        _user_doc(user_id)
        .collection("evolution_snapshots")
        .order_by("created_at", direction="DESCENDING")
        .limit(limit)
        .stream()
    )
    return [doc.to_dict() for doc in snapshots if doc.exists]


def create_share(
    user_id: str,
    analysis_id: str,
    payload: dict[str, Any],
    *,
    expires_at: str,
) -> dict[str, Any]:
    import uuid

    token = uuid.uuid4().hex
    now = datetime.now(timezone.utc).isoformat()
    record: dict[str, Any] = {
        "token": token,
        "user_id": user_id,
        "analysis_id": analysis_id,
        "created_at": now,
        "expires_at": expires_at,
        "payload": payload,
    }
    _shares_collection().document(token).set(record)
    return record


def get_share(token: str) -> dict[str, Any]:
    snapshot = _shares_collection().document(token).get()
    if not snapshot.exists:
        raise KeyError(f"Share not found: {token}")
    data = snapshot.to_dict()
    assert data is not None
    return data
