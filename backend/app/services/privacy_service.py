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


def get_privacy_settings(user_id: str) -> dict[str, Any]:
    return firestore_service.get_privacy_settings(user_id)


def save_privacy_settings(user_id: str, settings: dict[str, Any]) -> dict[str, Any]:
    merged = {**DEFAULT_PRIVACY_SETTINGS, **settings}
    return firestore_service.save_privacy_settings(user_id, merged)


def apply_share_filters(
    analysis: dict[str, Any],
    privacy: dict[str, Any],
) -> dict[str, Any]:
    """Return a share-safe copy of an analysis payload."""
    payload = dict(analysis)
    if privacy.get("exclude_flagged_from_share"):
        red_flags = dict(payload.get("red_flags") or {})
        red_flags["flags"] = []
        payload["red_flags"] = red_flags
    payload["privacy_applied"] = True
    payload.pop("upload_ids", None)
    return payload
