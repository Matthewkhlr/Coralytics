"""Shareable read-only analysis links."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

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
        expires_at=expires_at.isoformat(),
    )


def get_public_share(token: str) -> dict[str, Any]:
    share = firestore_service.get_share(token)
    expires_at = share.get("expires_at")
    if expires_at:
        expiry = datetime.fromisoformat(expires_at.replace("Z", "+00:00"))
        if expiry.tzinfo is None:
            expiry = expiry.replace(tzinfo=timezone.utc)
        if datetime.now(timezone.utc) > expiry:
            raise KeyError("Share link has expired")
    return share
