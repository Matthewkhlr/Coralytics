"""Firebase Auth token verification for FastAPI."""

from __future__ import annotations

from typing import Annotated

from fastapi import Depends, HTTPException, Request
from firebase_admin import auth

from app.config import get_settings


def _extract_bearer_token(request: Request) -> str | None:
    header = request.headers.get("Authorization", "")
    if header.startswith("Bearer "):
        return header[7:].strip()
    return None


def verify_firebase_token(request: Request) -> str:
    """Verify Firebase ID token and return the authenticated uid."""
    settings = get_settings()
    token = _extract_bearer_token(request)

    if not token:
        if not settings.auth_required:
            return request.headers.get("X-User-Id", "demo-user")
        raise HTTPException(status_code=401, detail="Missing Authorization bearer token")

    try:
        decoded = auth.verify_id_token(token, check_revoked=False)
    except Exception as exc:
        raise HTTPException(status_code=401, detail=f"Invalid auth token: {exc}") from exc

    uid = decoded.get("uid")
    if not uid:
        raise HTTPException(status_code=401, detail="Token missing uid")
    return uid


def require_matching_user(
    user_id: str,
    current_uid: Annotated[str, Depends(verify_firebase_token)],
) -> str:
    """Ensure path/body user_id matches the authenticated uid."""
    if user_id != current_uid:
        raise HTTPException(status_code=403, detail="User id does not match authenticated user")
    return current_uid
