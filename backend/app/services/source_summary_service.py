"""Upload sources included in an analysis snapshot."""

from __future__ import annotations

from typing import Any

from app.models.persistence import UPLOAD_PLATFORM_CHOICES
from app.services import raw_data_service


def post_upload_id(post: dict[str, Any]) -> str:
    return str(post.get("_upload_id") or post.get("upload_id") or "")


def _resolve_upload_ids(
    posts: list[dict[str, Any]],
    upload_ids: list[str] | None,
) -> list[str]:
    explicit = sorted({str(uid) for uid in (upload_ids or []) if uid})
    if explicit:
        return explicit
    if posts:
        return sorted({post_upload_id(post) for post in posts if post_upload_id(post)})
    return []


def _platforms_from_posts_for_upload(
    posts: list[dict[str, Any]],
    upload_id: str,
) -> list[str]:
    return sorted(
        {
            str(post.get("platform") or "").lower().strip()
            for post in posts
            if post_upload_id(post) == upload_id
            and str(post.get("platform") or "").lower().strip() in UPLOAD_PLATFORM_CHOICES
        }
    )


def platforms_from_breakdown(platform_breakdown: list[dict[str, Any]] | None) -> list[str]:
    if not platform_breakdown:
        return []
    return sorted(
        {
            str(row.get("platform") or "").lower().strip()
            for row in platform_breakdown
            if str(row.get("platform") or "").lower().strip() in UPLOAD_PLATFORM_CHOICES
        }
    )


def build_source_summary(
    user_id: str,
    posts: list[dict[str, Any]],
    upload_ids: list[str] | None = None,
    *,
    platform_breakdown: list[dict[str, Any]] | None = None,
) -> dict[str, Any]:
    """Summarize sources for one analysis snapshot."""
    uploads_meta: list[dict[str, Any]] = []
    platforms: set[str] = set()
    confirmed_post_count = 0

    for upload_id in _resolve_upload_ids(posts, upload_ids):
        try:
            meta = raw_data_service.get_raw_upload_metadata(user_id, upload_id)
        except KeyError:
            continue

        upload_platform = str(meta.get("platform") or "").lower().strip()
        if posts:
            posts_in_upload = sum(1 for post in posts if post_upload_id(post) == upload_id)
            if posts_in_upload == 0:
                continue
        else:
            posts_in_upload = int(meta.get("post_count") or 0)

        source_platforms: list[str]
        if upload_platform in UPLOAD_PLATFORM_CHOICES:
            source_platforms = [upload_platform]
        elif posts:
            source_platforms = _platforms_from_posts_for_upload(posts, upload_id)
        else:
            source_platforms = []

        if not source_platforms:
            continue

        uploads_meta.append(
            {
                "upload_id": upload_id,
                "filename": str(meta.get("filename") or "Upload"),
                "platform": source_platforms[0],
                "platforms": source_platforms,
                "post_count": posts_in_upload,
            }
        )
        platforms.update(source_platforms)
        confirmed_post_count += posts_in_upload

    if not platforms and platform_breakdown:
        breakdown_platforms = platforms_from_breakdown(platform_breakdown)
        platforms.update(breakdown_platforms)
        if breakdown_platforms and not uploads_meta:
            for platform in breakdown_platforms:
                count = next(
                    (
                        int(row.get("post_count") or 0)
                        for row in platform_breakdown or []
                        if str(row.get("platform") or "").lower().strip() == platform
                    ),
                    0,
                )
                uploads_meta.append(
                    {
                        "upload_id": "",
                        "filename": "Analysis snapshot",
                        "platform": platform,
                        "platforms": [platform],
                        "post_count": count,
                    }
                )
            confirmed_post_count = sum(item["post_count"] for item in uploads_meta)

    return {
        "upload_count": len(uploads_meta),
        "post_count": confirmed_post_count or sum(item["post_count"] for item in uploads_meta),
        "platforms": sorted(platforms),
        "uploads": uploads_meta,
    }
