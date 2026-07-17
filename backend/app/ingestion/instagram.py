"""
Parser for Instagram "Download Your Information" JSON exports.

Instagram exports come as a folder of JSON files (posts_1.json,
reels.json, stories.json, comments.json, ...). The shapes are similar
but not identical. This parser focuses on **posts** (the main content
people write captions for), since that's what's most useful for
sentiment/topic analysis -- but it's written defensively so it degrades
gracefully on slightly different shapes (reels, archived posts, etc.)
instead of crashing.

Known quirks handled here:
  - Instagram sometimes wraps the post list in a top-level dict, e.g.
    {"ig_custom_audiences": [...]} -- we unwrap the first list we find.
  - The caption text can live at the top level ("title") OR inside each
    item of "media" -- we check both and take whichever is non-empty.
  - Instagram double-encodes non-ASCII text as UTF-8 bytes interpreted
    as Latin-1 (a known export bug), which mangles emoji/accents. We
    attempt to repair that with a best-effort re-encode.
  - "creation_timestamp" is unix seconds -> converted via schema.to_iso.
"""

from __future__ import annotations

import re
from typing import Any

from .schema import NormalizedPost, Platform, PostType, make_id, safe_build_post, to_iso

HASHTAG_RE = re.compile(r"#(\w+)")


def _fix_mojibake(text: str) -> str:
    """Repair Instagram's classic latin-1/utf-8 double-encoding bug.

    If this fails for any reason, just return the original text --
    better to show slightly mangled emoji than to crash ingestion.
    """
    try:
        return text.encode("latin1").decode("utf-8")
    except (UnicodeDecodeError, UnicodeEncodeError):
        return text


def _walk_label_values(node: Any) -> list[dict[str, Any]]:
    """Flatten nested Instagram `label_values` trees from newer exports."""
    items: list[dict[str, Any]] = []
    if isinstance(node, list):
        for item in node:
            items.extend(_walk_label_values(item))
    elif isinstance(node, dict):
        items.append(node)
        for key in ("label_values", "dict"):
            child = node.get(key)
            if child is not None:
                items.extend(_walk_label_values(child))
    return items


def _extract_caption_from_label_values(entry: dict[str, Any]) -> str:
    for item in _walk_label_values(entry.get("label_values")):
        label = item.get("label")
        if label == "Caption":
            value = item.get("value")
            if isinstance(value, str) and value.strip():
                return value
        if label == "Media":
            media_items = item.get("media")
            if isinstance(media_items, list):
                for media in media_items:
                    if not isinstance(media, dict):
                        continue
                    for key in ("title", "caption"):
                        value = media.get(key)
                        if isinstance(value, str) and value.strip():
                            return value
    return ""


def _extract_caption(entry: dict[str, Any]) -> str:
    # Prefer a top-level "title" / "caption" if present and non-empty.
    for key in ("title", "caption"):
        value = entry.get(key)
        if isinstance(value, str) and value.strip():
            return value

    # Otherwise, look inside "media" entries for a title/caption.
    media = entry.get("media")
    if isinstance(media, list):
        for item in media:
            if not isinstance(item, dict):
                continue
            for key in ("title", "caption"):
                value = item.get(key)
                if isinstance(value, str) and value.strip():
                    return value

    # Newer Instagram exports nest captions under label_values.
    label_caption = _extract_caption_from_label_values(entry)
    if label_caption.strip():
        return label_caption

    return ""


def _extract_timestamp(entry: dict[str, Any]) -> Any:
    if "creation_timestamp" in entry:
        return entry["creation_timestamp"]

    if "timestamp" in entry:
        return entry["timestamp"]

    media = entry.get("media")
    if isinstance(media, list):
        for item in media:
            if isinstance(item, dict) and "creation_timestamp" in item:
                return item["creation_timestamp"]

    for item in _walk_label_values(entry.get("label_values")):
        if item.get("label") == "Update time" and "timestamp_value" in item:
            return item["timestamp_value"]
        media_items = item.get("media")
        if isinstance(media_items, list):
            for media in media_items:
                if isinstance(media, dict) and "creation_timestamp" in media:
                    return media["creation_timestamp"]

    return None


def _find_entries(data: Any) -> list[dict[str, Any]]:
    """Instagram export JSON is either a list of entries directly, or a
    dict whose first list-valued key holds the entries.
    """
    if isinstance(data, list):
        return [item for item in data if isinstance(item, dict)]

    if isinstance(data, dict):
        for value in data.values():
            if isinstance(value, list):
                return [item for item in value if isinstance(item, dict)]

    return []


def parse_instagram_export(data: Any, id_prefix: str = "post") -> list[NormalizedPost]:
    """Parse already-loaded JSON (list or dict) from an Instagram **posts**
    export file (posts_1.json, posts_2.json, ...) into NormalizedPost
    objects.

    Also works for reels.json: reels are wrapped as
    {"ig_reels_media": [...]} and each entry has no top-level "title"/
    "creation_timestamp", only a single `media` item with both -- which
    `_extract_caption`/`_extract_timestamp` already fall back to.

    `id_prefix` namespaces generated ids (e.g. "post" vs "reel") so that
    calling this twice -- once for posts_1.json and once for reels.json --
    doesn't produce colliding ids that get silently deduplicated away.

    Pass the result of `json.load(...)` -- this function doesn't touch
    the filesystem so it's easy to test with inline sample data.
    """
    entries = _find_entries(data)
    posts: list[NormalizedPost] = []

    for index, entry in enumerate(entries):
        caption = _fix_mojibake(_extract_caption(entry))

        # Skip entries with no caption text at all -- this is the common
        # case for stories.json (and many reels/posts), which are mostly
        # photos/videos with nothing written. An empty-content post adds
        # no analytical value and just bloats the output; downstream
        # NLP (sentiment/topics) needs actual text to work with anyway.
        if not caption.strip():
            continue

        timestamp = _extract_timestamp(entry)

        post = safe_build_post(
            id=make_id(Platform.instagram, f"{id_prefix}-{index}"),
            platform=Platform.instagram,
            content=caption,
            created_at=to_iso(timestamp),
            post_type=PostType.post,
            hashtags=HASHTAG_RE.findall(caption),
        )
        if post is not None:
            posts.append(post)

    return posts


def parse_instagram_comments_export(
    data: Any, id_prefix: str = "comment"
) -> list[NormalizedPost]:
    """Parse Instagram comment-history exports.

    These cover the comments *you* wrote on other people's posts/reels
    and use a totally different shape than posts_1.json -- a
    "string_map_data" dict per entry, e.g.:

        {
          "string_map_data": {
            "Comment": {"value": "..."},
            "Media Owner": {"value": "some_username"},
            "Time": {"timestamp": 1780582870}
          }
        }

    Covers comments/post_comments_1.json, comments/reels_comments.json,
    and (same shape) comments/hype.json. Entries with no comment text are
    skipped.

    `id_prefix` namespaces generated ids so calling this once per file
    (e.g. "post-comment" vs "reel-comment") doesn't collide.
    """
    entries = _find_entries(data)
    posts: list[NormalizedPost] = []

    for index, entry in enumerate(entries):
        string_map = entry.get("string_map_data")
        if not isinstance(string_map, dict):
            continue

        comment = string_map.get("Comment", {}).get("value", "")
        if not isinstance(comment, str) or not comment.strip():
            continue

        comment = _fix_mojibake(comment)
        media_owner = string_map.get("Media Owner", {}).get("value")
        timestamp = string_map.get("Time", {}).get("timestamp")

        posts_entry = safe_build_post(
            id=make_id(Platform.instagram, f"{id_prefix}-{index}"),
            platform=Platform.instagram,
            content=comment,
            created_at=to_iso(timestamp),
            post_type=PostType.comment,
            source_context=(
                f"commented on @{media_owner}" if media_owner else None
            ),
            hashtags=HASHTAG_RE.findall(comment),
        )
        if posts_entry is not None:
            posts.append(posts_entry)

    return posts
