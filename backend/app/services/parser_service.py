import csv
import io
import json
from datetime import datetime, timezone
from typing import Any

ALLOWED_PLATFORMS = {"instagram", "linkedin", "reddit"}
MAX_UPLOAD_SIZE_BYTES = 25 * 1024 * 1024  # 25 MB


def _iso_timestamp(value: Any) -> str | None:
    if value is None:
        return None

    if isinstance(value, (int, float)):
        return datetime.fromtimestamp(value, tz=timezone.utc).isoformat()

    if isinstance(value, str) and value.strip():
        return value.strip()

    return None


def _normalize_post(platform: str, content: str, created_at: Any = None) -> dict[str, str] | None:
    text = content.strip()
    if not text:
        return None

    post: dict[str, str] = {
        "platform": platform,
        "content": text,
    }

    timestamp = _iso_timestamp(created_at)
    if timestamp:
        post["created_at"] = timestamp

    return post


def _parse_instagram_payload(payload: Any) -> list[dict[str, str]]:
    posts: list[dict[str, str]] = []

    if isinstance(payload, list):
        media_items = payload
    elif isinstance(payload, dict):
        media_items = (
            payload.get("media")
            or payload.get("ig_media")
            or payload.get("posts")
            or payload.get("photos")
            or []
        )
    else:
        raise ValueError("Instagram export must be a JSON object or array")

    if not isinstance(media_items, list):
        raise ValueError("Instagram export is missing a media/posts array")

    for item in media_items:
        if not isinstance(item, dict):
            continue

        content = (
            item.get("caption")
            or item.get("title")
            or item.get("description")
            or item.get("text")
            or ""
        )
        created_at = (
            item.get("creation_timestamp")
            or item.get("taken_at")
            or item.get("timestamp")
            or item.get("created_at")
        )

        post = _normalize_post("instagram", str(content), created_at)
        if post:
            posts.append(post)

    return posts


def _parse_linkedin_csv(text: str) -> list[dict[str, str]]:
    reader = csv.DictReader(io.StringIO(text))
    if not reader.fieldnames:
        raise ValueError("LinkedIn CSV export is missing headers")

    normalized_headers = {header.lower().strip(): header for header in reader.fieldnames}
    content_header = next(
        (
            normalized_headers[key]
            for key in normalized_headers
            if key in {"content", "content/description", "commentary", "text", "title", "sharecommentary"}
        ),
        None,
    )
    date_header = next(
        (
            normalized_headers[key]
            for key in normalized_headers
            if key in {"date", "created", "published", "created date", "published date", "created_at"}
        ),
        None,
    )

    if not content_header:
        raise ValueError("LinkedIn CSV export is missing a content column")

    posts: list[dict[str, str]] = []
    for row in reader:
        content = row.get(content_header, "")
        created_at = row.get(date_header, "") if date_header else None
        post = _normalize_post("linkedin", str(content), created_at)
        if post:
            posts.append(post)

    return posts


def parse_export(platform: str, content: bytes, filename: str) -> list[dict[str, str]]:
    """Parse a platform export from memory without persisting the raw file."""
    platform_key = platform.lower().strip()
    if platform_key not in ALLOWED_PLATFORMS:
        raise ValueError(f"Unsupported platform: {platform}")

    if len(content) > MAX_UPLOAD_SIZE_BYTES:
        raise ValueError(f"File exceeds {MAX_UPLOAD_SIZE_BYTES // (1024 * 1024)} MB limit")

    if platform_key == "reddit":
        raise ValueError("Reddit data is ingested via API, not file upload")

    lowered_name = filename.lower()

    if platform_key == "instagram":
        if not lowered_name.endswith(".json"):
            raise ValueError("Instagram exports must be uploaded as JSON")
        try:
            payload = json.loads(content.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise ValueError("Instagram export is not valid JSON") from exc
        return _parse_instagram_payload(payload)

    if platform_key == "linkedin":
        if not lowered_name.endswith(".csv"):
            raise ValueError("LinkedIn exports must be uploaded as CSV")
        try:
            text = content.decode("utf-8-sig")
        except UnicodeDecodeError as exc:
            raise ValueError("LinkedIn export is not valid UTF-8 CSV") from exc
        return _parse_linkedin_csv(text)

    raise ValueError(f"Unsupported platform: {platform}")
