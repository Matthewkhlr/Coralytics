"""User privacy settings for sharing and display."""

from __future__ import annotations

from typing import Any

from app.services import firestore_service

DEFAULT_PRIVACY_SETTINGS: dict[str, Any] = {
    "include_comments": True,
    "exclude_flagged_from_share": True,
    "include_post_excerpts_in_share": False,
    "share_expiry_days": 30,
    "excluded_platforms": [],
}

_COMMENT_TYPES = frozenset({"comment", "reply"})


def get_privacy_settings(user_id: str) -> dict[str, Any]:
    return firestore_service.get_privacy_settings(user_id)


def save_privacy_settings(user_id: str, settings: dict[str, Any]) -> dict[str, Any]:
    merged = {**DEFAULT_PRIVACY_SETTINGS, **settings}
    platforms = merged.get("excluded_platforms") or []
    if not isinstance(platforms, list):
        platforms = []
    merged["excluded_platforms"] = [
        str(item).lower().strip() for item in platforms if str(item).strip()
    ]
    expiry = int(merged.get("share_expiry_days") or 30)
    merged["share_expiry_days"] = max(1, min(365, expiry))
    return firestore_service.save_privacy_settings(user_id, merged)


def _strip_internal_ids(payload: dict[str, Any]) -> None:
    for key in ("user_id", "upload_ids", "analysis_id"):
        payload.pop(key, None)


def _filter_insight_item(
    item: dict[str, Any],
    *,
    include_comments: bool,
    include_excerpts: bool,
    excluded_platforms: set[str],
) -> dict[str, Any] | None:
    platform = str(item.get("platform") or "").lower().strip()
    if platform and platform in excluded_platforms:
        return None

    post_type = str(item.get("post_type") or "").lower().strip()
    if not include_comments and post_type in _COMMENT_TYPES:
        return None

    row = dict(item)
    row.pop("_upload_id", None)
    row.pop("user_id", None)
    if not include_excerpts:
        row.pop("content", None)
    return row


def apply_share_filters(
    analysis: dict[str, Any],
    privacy: dict[str, Any],
) -> dict[str, Any]:
    """Return a share-safe copy of an analysis payload."""
    payload = dict(analysis)
    include_comments = bool(privacy.get("include_comments", True))
    include_excerpts = bool(privacy.get("include_post_excerpts_in_share", False))
    excluded = {
        str(p).lower().strip()
        for p in (privacy.get("excluded_platforms") or [])
        if str(p).strip()
    }

    if privacy.get("exclude_flagged_from_share", True):
        red_flags = dict(payload.get("red_flags") or {})
        red_flags["flags"] = []
        payload["red_flags"] = red_flags

    insights = payload.get("post_insights")
    if isinstance(insights, list):
        filtered: list[dict[str, Any]] = []
        for item in insights:
            if not isinstance(item, dict):
                continue
            kept = _filter_insight_item(
                item,
                include_comments=include_comments,
                include_excerpts=include_excerpts,
                excluded_platforms=excluded,
            )
            if kept is not None:
                filtered.append(kept)
        payload["post_insights"] = filtered
        payload["post_insights_count"] = len(filtered)

    organism = payload.get("organism_data")
    if isinstance(organism, dict):
        organism = dict(organism)
        posts = organism.get("posts")
        if isinstance(posts, list):
            kept_posts: list[dict[str, Any]] = []
            for item in posts:
                if not isinstance(item, dict):
                    continue
                platform = str(item.get("platform") or "").lower().strip()
                if platform and platform in excluded:
                    continue
                post_type = str(item.get("post_type") or "").lower().strip()
                if not include_comments and post_type in _COMMENT_TYPES:
                    continue
                row = dict(item)
                row.pop("_upload_id", None)
                kept_posts.append(row)
            organism["posts"] = kept_posts
        payload["organism_data"] = organism

    platform_breakdown = payload.get("platform_breakdown")
    if isinstance(platform_breakdown, list) and excluded:
        payload["platform_breakdown"] = [
            row
            for row in platform_breakdown
            if isinstance(row, dict)
            and str(row.get("platform") or "").lower().strip() not in excluded
        ]

    _strip_internal_ids(payload)
    payload["privacy_applied"] = True
    return payload
