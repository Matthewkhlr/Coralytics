"""Versioned persistence contracts and timestamp helpers.

New writes use schema_version=2 with Firestore-native timestamps.
Readers accept both legacy ISO strings and native timestamps.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

SCHEMA_VERSION_V1 = 1
SCHEMA_VERSION_V2 = 2

RECORD_STATUS_PENDING = "pending"
RECORD_STATUS_READY = "ready"
RECORD_STATUS_FAILED = "failed"

ALLOWED_PLATFORMS = frozenset(
    {"instagram", "linkedin", "reddit", "sample", "mixed", "unknown"}
)
UPLOAD_PLATFORM_CHOICES = frozenset({"instagram", "linkedin", "reddit"})


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def encode_timestamp(value: datetime | None = None) -> datetime:
    """Return a timezone-aware UTC datetime for Firestore Timestamp fields."""
    if value is None:
        return utc_now()
    if value.tzinfo is None:
        return value.replace(tzinfo=timezone.utc)
    return value.astimezone(timezone.utc)


def parse_timestamp(value: Any) -> datetime | None:
    """Parse Firestore Timestamp, datetime, or legacy ISO-8601 string."""
    if value is None:
        return None
    if isinstance(value, datetime):
        if value.tzinfo is None:
            return value.replace(tzinfo=timezone.utc)
        return value.astimezone(timezone.utc)
    if hasattr(value, "timestamp") and callable(value.timestamp):
        # google.cloud.firestore DatetimeWithNanoseconds / Timestamp-like
        try:
            return datetime.fromtimestamp(value.timestamp(), tz=timezone.utc)
        except (TypeError, ValueError, OSError):
            pass
    if isinstance(value, str):
        text = value.strip()
        if not text:
            return None
        try:
            parsed = datetime.fromisoformat(text.replace("Z", "+00:00"))
        except ValueError:
            return None
        if parsed.tzinfo is None:
            return parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(timezone.utc)
    return None


def timestamp_to_iso(value: Any) -> str | None:
    parsed = parse_timestamp(value)
    return parsed.isoformat() if parsed else None


def normalize_platform(value: str | None, *, required_upload: bool = False) -> str:
    platform = (value or "").lower().strip() or "mixed"
    if required_upload and platform not in UPLOAD_PLATFORM_CHOICES:
        raise ValueError("Platform must be instagram, linkedin, or reddit")
    if platform not in ALLOWED_PLATFORMS:
        return "unknown"
    return platform


def is_ready(record: dict[str, Any] | None) -> bool:
    """True when a record should appear in normal listings.

    Legacy documents without a status field are treated as ready.
    """
    if not record:
        return False
    status = record.get("status")
    if status is None:
        return True
    return status == RECORD_STATUS_READY


def with_v2_metadata(
    record: dict[str, Any],
    *,
    status: str = RECORD_STATUS_READY,
    now: datetime | None = None,
) -> dict[str, Any]:
    """Attach schema_version/status and normalize timestamp fields for new writes."""
    stamp = encode_timestamp(now)
    out = dict(record)
    out["schema_version"] = SCHEMA_VERSION_V2
    out["status"] = status
    for key in ("created_at", "updated_at", "stored_at", "expires_at"):
        if key in out and out[key] is not None and not isinstance(out[key], datetime):
            parsed = parse_timestamp(out[key])
            if parsed is not None:
                out[key] = parsed
    if "created_at" not in out or out["created_at"] is None:
        out["created_at"] = stamp
    if "updated_at" in record or status != RECORD_STATUS_PENDING:
        out.setdefault("updated_at", stamp)
    return out


def serialize_record_for_api(record: dict[str, Any]) -> dict[str, Any]:
    """Convert Firestore timestamps to ISO strings for JSON responses."""
    out: dict[str, Any] = {}
    for key, value in record.items():
        if key in {"created_at", "updated_at", "stored_at", "expires_at", "parsed_at"}:
            iso = timestamp_to_iso(value)
            out[key] = iso if iso is not None else value
        else:
            out[key] = value
    return out
