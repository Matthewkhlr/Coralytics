"""Shareable read-only analysis links."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from app.models.persistence import parse_timestamp
from app.services import firestore_service, privacy_service


def create_share(
    user_id: str,
    analysis_id: str,
    *,
    expiry_days: int | None = None,
) -> dict[str, Any]:
    privacy = privacy_service.get_privacy_settings(user_id)
    days = expiry_days if expiry_days is not None else int(privacy.get("share_expiry_days", 30))

    analysis = firestore_service.get_analysis(user_id, analysis_id)
    share_payload = privacy_service.apply_share_filters(analysis, privacy)

    expires_at = datetime.now(timezone.utc) + timedelta(days=max(1, days))
    return firestore_service.create_share(
        user_id=user_id,
        analysis_id=analysis_id,
        payload=share_payload,
        expires_at=expires_at,
    )


def get_public_share(token: str) -> dict[str, Any]:
    share = firestore_service.get_share(token)
    if share.get("revoked"):
        raise KeyError("Share link has been revoked")

    expires_at = share.get("expires_at") or share.get("expire_at")
    if expires_at:
        expiry = parse_timestamp(expires_at)
        if expiry is not None and datetime.now(timezone.utc) > expiry:
            raise KeyError("Share link has expired")

    # Never expose owner uid on the public response.
    public = dict(share)
    public.pop("user_id", None)
    payload = public.get("payload")
    if isinstance(payload, dict):
        cleaned = dict(payload)
        cleaned.pop("user_id", None)
        cleaned.pop("upload_ids", None)
        public["payload"] = cleaned
    return public


def revoke_share(user_id: str, token: str) -> dict[str, Any]:
    return firestore_service.revoke_share(token, user_id=user_id)


def delete_share(user_id: str, token: str) -> dict[str, Any]:
    return firestore_service.delete_share(token, user_id=user_id)
