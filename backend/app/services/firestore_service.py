"""
Firestore access layer.

DB1 raw uploads: raw_data_service
DB2 analyses: analysis_store_service
Normalized posts: posts_service

This module keeps backward-compatible helpers used by the API layer and
share/privacy features.
"""

from __future__ import annotations

from typing import Any

from app.firebase import get_firestore_client
from app.ingestion.schema import post_identity_fingerprint
from app.models.persistence import (
    SCHEMA_VERSION_V2,
    encode_timestamp,
    serialize_record_for_api,
)
from app.services import (
    analysis_store_service,
    ingestion_service,
    posts_service,
    raw_data_service,
)


def save_upload_with_posts(
    user_id: str,
    filename: str,
    posts: list[dict[str, Any]],
    *,
    platform: str = "mixed",
    ingest_report: dict[str, Any] | None = None,
    raw_files: list[dict[str, Any]] | None = None,
    content_hash: str | None = None,
    original_bytes: bytes | None = None,
) -> dict[str, Any]:
    """Persist a raw upload in DB1 with normalized posts and object storage."""
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
        original_bytes=original_bytes,
        posts=posts,
        keep_legacy_files=True,
    )

    if upload.get("is_duplicate"):
        return upload

    return raw_data_service.update_raw_upload_metadata(
        user_id,
        upload["upload_id"],
        ingest_report=ingest_report,
        platform=platform,
        post_count=len(posts),
        comment_count=comment_count,
        content_hash=content_hash,
        has_normalized_posts=True,
        schema_version=SCHEMA_VERSION_V2,
        status="ready",
    )


def find_upload_by_content_hash(user_id: str, content_hash: str) -> dict[str, Any] | None:
    return raw_data_service.find_upload_by_content_hash(user_id, content_hash)


def get_upload_metadata(user_id: str, upload_id: str) -> dict[str, Any]:
    return raw_data_service.get_raw_upload_metadata(user_id, upload_id)


def list_uploads(
    user_id: str,
    *,
    limit: int | None = None,
    start_after: str | None = None,
) -> list[dict[str, Any]]:
    return raw_data_service.list_raw_uploads(
        user_id, limit=limit, start_after=start_after
    )


def delete_upload(user_id: str, upload_id: str) -> dict[str, Any]:
    return raw_data_service.delete_raw_upload(user_id, upload_id)


def _parse_upload_posts(user_id: str, upload_id: str) -> list[dict[str, Any]]:
    """Prefer v2 normalized posts; fall back to reparsing legacy raw files."""
    metadata = get_upload_metadata(user_id, upload_id)

    if metadata.get("has_normalized_posts") or int(metadata.get("schema_version") or 1) >= 2:
        if posts_service.has_normalized_posts(user_id, upload_id):
            page, _ = posts_service.list_normalized_posts(user_id, upload_id)
            if page:
                return page

    raw_files = raw_data_service.list_raw_files(user_id, upload_id)
    if not raw_files:
        return []

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
    """Persist a user-confirmed platform label for one upload and refresh posts."""
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

    posts_service.save_normalized_posts(user_id, upload_id, posts)

    return raw_data_service.update_raw_upload_metadata(
        user_id,
        upload_id,
        platform=hint,
        ingest_report=ingest_report,
        post_count=len(posts),
        comment_count=comment_count,
        has_normalized_posts=True,
        schema_version=SCHEMA_VERSION_V2,
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
    """List posts for one upload (normalized posts preferred)."""
    get_upload_metadata(user_id, upload_id)

    metadata = raw_data_service.get_raw_upload_metadata(user_id, upload_id, include_non_ready=True)
    if metadata.get("has_normalized_posts") or int(metadata.get("schema_version") or 1) >= 2:
        if posts_service.has_normalized_posts(user_id, upload_id):
            page, next_cursor = posts_service.list_normalized_posts(
                user_id,
                upload_id,
                limit=limit,
                start_after=start_after,
            )
            merged = _merge_post_insights(page, _latest_post_insights(user_id))
            return merged, next_cursor

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


def list_analyses(
    user_id: str,
    *,
    hydrate: bool = True,
    limit: int | None = None,
    start_after: str | None = None,
) -> list[dict[str, Any]]:
    return analysis_store_service.list_analyses(
        user_id, hydrate=hydrate, limit=limit, start_after=start_after
    )


def delete_analysis(user_id: str, analysis_id: str) -> dict[str, Any]:
    return analysis_store_service.delete_analysis(user_id, analysis_id)


def _dedupe_posts_by_id(posts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Keep one canonical copy of posts repeated across overlapping exports."""
    seen_ids: set[str] = set()
    seen_fingerprints: set[str] = set()
    unique: list[dict[str, Any]] = []
    for post in posts:
        post_id = str(post.get("id") or "")
        fingerprint = post_identity_fingerprint(post)
        if (
            not post_id
            or post_id in seen_ids
            or (fingerprint is not None and fingerprint in seen_fingerprints)
        ):
            continue
        seen_ids.add(post_id)
        if fingerprint is not None:
            seen_fingerprints.add(fingerprint)
        unique.append(post)
    return unique


def list_user_posts(
    user_id: str,
    *,
    upload_ids: list[str] | None = None,
) -> list[dict[str, Any]]:
    """Load posts for a user (v2 normalized preferred, legacy fallback)."""
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
    """Load every post for a user (deduped by post id)."""
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
    return serialize_record_for_api({**defaults, **data})


def save_privacy_settings(user_id: str, settings: dict[str, Any]) -> dict[str, Any]:
    now = encode_timestamp()
    record = {**settings, "updated_at": now, "schema_version": SCHEMA_VERSION_V2}
    _user_doc(user_id).collection("settings").document("privacy").set(record, merge=True)
    return serialize_record_for_api(record)


def save_evolution_snapshot(user_id: str, analysis_id: str, snapshot: dict[str, Any]) -> None:
    record = {**snapshot, "schema_version": SCHEMA_VERSION_V2}
    if not record.get("created_at"):
        record["created_at"] = encode_timestamp()
    _user_doc(user_id).collection("evolution_snapshots").document(analysis_id).set(record)


def list_evolution_snapshots(user_id: str, limit: int = 20) -> list[dict[str, Any]]:
    snapshots = (
        _user_doc(user_id)
        .collection("evolution_snapshots")
        .order_by("created_at", direction="DESCENDING")
        .limit(limit)
        .stream()
    )
    return [serialize_record_for_api(doc.to_dict() or {}) for doc in snapshots if doc.exists]


def create_share(
    user_id: str,
    analysis_id: str,
    payload: dict[str, Any],
    *,
    expires_at,
) -> dict[str, Any]:
    import uuid

    from app.models.persistence import parse_timestamp

    token = uuid.uuid4().hex
    now = encode_timestamp()
    expiry = parse_timestamp(expires_at) or encode_timestamp()
    record: dict[str, Any] = {
        "token": token,
        "user_id": user_id,
        "analysis_id": analysis_id,
        "created_at": now,
        "expires_at": expiry,
        "expire_at": expiry,  # Firestore TTL field override target
        "revoked": False,
        "schema_version": SCHEMA_VERSION_V2,
        "payload": payload,
    }
    _shares_collection().document(token).set(record)
    return serialize_record_for_api(record)


def get_share(token: str) -> dict[str, Any]:
    snapshot = _shares_collection().document(token).get()
    if not snapshot.exists:
        raise KeyError(f"Share not found: {token}")
    data = snapshot.to_dict()
    assert data is not None
    return serialize_record_for_api(data)


def revoke_share(token: str, *, user_id: str) -> dict[str, Any]:
    snapshot = _shares_collection().document(token).get()
    if not snapshot.exists:
        raise KeyError(f"Share not found: {token}")
    data = snapshot.to_dict() or {}
    if data.get("user_id") != user_id:
        raise PermissionError("Cannot revoke a share you do not own")
    now = encode_timestamp()
    snapshot.reference.set(
        {"revoked": True, "revoked_at": now, "updated_at": now},
        merge=True,
    )
    data.update({"revoked": True, "revoked_at": now})
    return serialize_record_for_api(data)


def delete_share(token: str, *, user_id: str) -> dict[str, Any]:
    snapshot = _shares_collection().document(token).get()
    if not snapshot.exists:
        return {"deleted": False, "token": token}
    data = snapshot.to_dict() or {}
    if data.get("user_id") != user_id:
        raise PermissionError("Cannot delete a share you do not own")
    snapshot.reference.delete()
    return {"deleted": True, "token": token}


def list_user_shares(user_id: str, *, limit: int = 50) -> list[dict[str, Any]]:
    # Simple scan filtered in memory; share volume per user is expected to be small.
    rows: list[dict[str, Any]] = []
    for snap in _shares_collection().stream():
        if not snap.exists:
            continue
        data = snap.to_dict() or {}
        if data.get("user_id") != user_id:
            continue
        rows.append(serialize_record_for_api(data))
        if len(rows) >= limit:
            break
    return rows
