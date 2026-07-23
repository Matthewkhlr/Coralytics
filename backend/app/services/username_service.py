"""Transactional username registry operations (backend-owned).

Username documents are private. Public login lookup returns only the
email needed for Firebase Auth sign-in and never exposes the registry
via direct Firestore client reads.
"""

from __future__ import annotations

import re
from typing import Any

from google.cloud import firestore

from app.firebase import get_firestore_client
from app.models.persistence import encode_timestamp, utc_now

USERNAME_RE = re.compile(r"^[a-zA-Z0-9_]{3,20}$")


class UsernameError(ValueError):
    """Raised for validation or uniqueness conflicts."""


def normalize_username(raw: str) -> str:
    return raw.strip().lower()


def validate_username(raw: str) -> str:
    username = raw.strip()
    if not USERNAME_RE.match(username):
        raise UsernameError("Username must be 3–20 characters (letters, numbers, underscore).")
    return normalize_username(username)


def _usernames():
    return get_firestore_client().collection("usernames")


def _user_profile(user_id: str):
    return get_firestore_client().collection("users").document(user_id)


def is_available(username: str) -> bool:
    key = validate_username(username)
    snap = _usernames().document(key).get()
    return not snap.exists


def resolve_login_email(identifier: str) -> dict[str, str]:
    """Resolve a username to the email used for Firebase Auth sign-in.

    Returns only {username, email} — never the owning uid to unauthenticated callers.
    """
    trimmed = identifier.strip()
    if "@" in trimmed:
        return {"username": "", "email": trimmed}

    key = validate_username(trimmed)
    snap = _usernames().document(key).get()
    if not snap.exists:
        raise UsernameError("No account found for that username.")
    data = snap.to_dict() or {}
    email = data.get("email")
    if not email:
        raise UsernameError("That username is missing an email. Try logging in with Google.")
    return {"username": key, "email": str(email)}


def claim(
    username: str,
    *,
    uid: str,
    email: str,
) -> dict[str, Any]:
    """Claim a username for uid. Idempotent if already owned by the same uid."""
    key = validate_username(username)
    if not email or "@" not in email:
        raise UsernameError("A valid email is required to claim a username.")

    db = get_firestore_client()
    ref = _usernames().document(key)
    profile_ref = _user_profile(uid)
    now = encode_timestamp()

    @firestore.transactional
    def _txn(transaction: firestore.Transaction) -> dict[str, Any]:
        snap = ref.get(transaction=transaction)
        if snap.exists:
            existing = snap.to_dict() or {}
            if existing.get("uid") != uid:
                raise UsernameError("That username is already taken.")
            record = {
                "uid": uid,
                "email": email.strip(),
                "username": key,
                "created_at": existing.get("created_at") or existing.get("createdAt") or now,
                "updated_at": now,
                "schema_version": 2,
            }
            transaction.set(ref, record, merge=True)
            transaction.set(
                profile_ref,
                {"username": key, "email": email.strip(), "updated_at": now},
                merge=True,
            )
            return record

        record = {
            "uid": uid,
            "email": email.strip(),
            "username": key,
            "created_at": now,
            "updated_at": now,
            "schema_version": 2,
        }
        transaction.set(ref, record)
        transaction.set(
            profile_ref,
            {
                "username": key,
                "email": email.strip(),
                "created_at": now,
                "updated_at": now,
                "schema_version": 2,
            },
            merge=True,
        )
        return record

    return _txn(db.transaction())


def release(username: str, *, uid: str) -> None:
    key = validate_username(username)
    ref = _usernames().document(key)
    snap = ref.get()
    if not snap.exists:
        return
    data = snap.to_dict() or {}
    if data.get("uid") != uid:
        raise UsernameError("Cannot release a username you do not own.")
    ref.delete()


def change(
    *,
    uid: str,
    email: str,
    new_username: str,
    old_username: str | None = None,
) -> dict[str, Any]:
    """Atomically claim a new username and release the previous one."""
    new_key = validate_username(new_username)
    old_key = normalize_username(old_username) if old_username else None
    if old_key == new_key:
        return claim(new_username, uid=uid, email=email)

    db = get_firestore_client()
    new_ref = _usernames().document(new_key)
    old_ref = _usernames().document(old_key) if old_key else None
    profile_ref = _user_profile(uid)
    now = encode_timestamp()

    @firestore.transactional
    def _txn(transaction: firestore.Transaction) -> dict[str, Any]:
        new_snap = new_ref.get(transaction=transaction)
        if new_snap.exists:
            existing = new_snap.to_dict() or {}
            if existing.get("uid") != uid:
                raise UsernameError("That username is already taken.")

        if old_ref is not None:
            old_snap = old_ref.get(transaction=transaction)
            if old_snap.exists:
                old_data = old_snap.to_dict() or {}
                if old_data.get("uid") != uid:
                    raise UsernameError("Cannot release a username you do not own.")
                transaction.delete(old_ref)

        record = {
            "uid": uid,
            "email": email.strip(),
            "username": new_key,
            "created_at": now,
            "updated_at": now,
            "schema_version": 2,
        }
        transaction.set(new_ref, record)
        transaction.set(
            profile_ref,
            {
                "username": new_key,
                "email": email.strip(),
                "updated_at": now,
                "schema_version": 2,
            },
            merge=True,
        )
        return record

    return _txn(db.transaction())


def get_owned_username(uid: str) -> str | None:
    profile = _user_profile(uid).get()
    if profile.exists:
        data = profile.to_dict() or {}
        username = data.get("username")
        if username:
            return str(username)
    # Fallback scan is avoided; callers should rely on Auth displayName / profile.
    return None
