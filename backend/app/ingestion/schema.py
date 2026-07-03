"""
Shared schema for ingested social media data.

Every platform parser (Instagram, LinkedIn, Reddit, ...) must produce a list
of `NormalizedPost` objects. This is the ONE contract the rest of the app
(sentiment analysis, topic clustering, 3D organism mapping, dashboard cards)
should depend on -- nobody downstream should need to know what an Instagram
export or a LinkedIn CSV looks like.

Keep this file dependency-light (just pydantic) since it's imported
everywhere.
"""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any, Iterable, Optional

from pydantic import BaseModel, Field, ValidationError


class Platform(str, Enum):
    instagram = "instagram"
    linkedin = "linkedin"
    reddit = "reddit"
    sample = "sample"  # for pasted/manual/demo data


class PostType(str, Enum):
    post = "post"
    comment = "comment"
    share = "share"
    reply = "reply"
    unknown = "unknown"


class NormalizedPost(BaseModel):
    """A single piece of content from any platform, in a common shape."""

    # Stable-ish identifier. Doesn't need to be globally unique across
    # platforms -- normalize.py will namespace it with the platform prefix.
    id: str

    platform: Platform

    # The main text content. Always a string (possibly empty), never None,
    # so downstream NLP code doesn't have to null-check everywhere.
    content: str = ""

    # ISO 8601 string if known, otherwise None. Using a string (not
    # datetime) keeps this easy to serialize straight to JSON/Firestore.
    created_at: Optional[str] = None

    post_type: PostType = PostType.unknown

    # Optional engagement signal (likes, upvotes, reactions...).
    # Used later for things like branch thickness in the 3D view.
    engagement: Optional[int] = None

    # Subreddit name, LinkedIn visibility, etc. -- a free-form bucket for
    # platform-specific context that might still be useful.
    source_context: Optional[str] = None

    # Original URL/permalink if available.
    url: Optional[str] = None

    # Hashtags extracted from the content (Instagram especially).
    hashtags: list[str] = Field(default_factory=list)

    class Config:
        use_enum_values = True


def make_id(platform: Platform | str, raw_id: str) -> str:
    """Namespace an id with its platform so cross-platform collisions
    (e.g. two posts both originally called "1") can't happen after merging.
    """
    platform_value = platform.value if isinstance(platform, Platform) else platform
    return f"{platform_value}:{raw_id}"


def to_iso(timestamp: Optional[float | int | str]) -> Optional[str]:
    """Best-effort conversion of various timestamp formats to ISO 8601.

    Handles:
      - unix seconds (int/float), e.g. Instagram's creation_timestamp
      - unix milliseconds (int), e.g. some Reddit/LinkedIn exports
      - already-ISO strings (passed through after a sanity check)
      - None / unparseable -> None
    """
    if timestamp is None or timestamp == "":
        return None

    # Numeric (or numeric-looking string) timestamp.
    if isinstance(timestamp, (int, float)) or (
        isinstance(timestamp, str) and timestamp.replace(".", "", 1).isdigit()
    ):
        value = float(timestamp)
        # Heuristic: treat anything bigger than ~year 5138 in seconds
        # as milliseconds instead.
        if value > 1e11:
            value /= 1000
        try:
            return datetime.utcfromtimestamp(value).isoformat() + "Z"
        except (ValueError, OverflowError, OSError):
            return None

    # Already a string -- try a couple of common formats, else pass through.
    for fmt in (
        "%Y-%m-%d %H:%M:%S",        # 2024-01-12 10:00:00
        "%Y-%m-%d %H:%M:%S UTC",    # 2024-01-12 10:00:00 UTC  (Reddit export)
        "%Y-%m-%dT%H:%M:%S",        # 2024-01-12T10:00:00
        "%a %b %d %H:%M:%S %z %Y",  # Wed Jan 12 10:00:00 +0000 2024
    ):
        try:
            return datetime.strptime(timestamp, fmt).isoformat()
        except ValueError:
            continue

    # Give up gracefully -- return as-is so it's at least visible/debuggable.
    return str(timestamp)


# ---------------------------------------------------------------------------
# Safety helpers (security / fallback)
#
# These are used by every parser and by the higher-level ingest pipeline so
# that a single malformed entry, or a pathologically large field, can't
# crash a whole file's parsing or balloon memory/output size.
# ---------------------------------------------------------------------------

# Cap on how much text we keep from any single post/comment. This protects
# against a maliciously (or accidentally) huge field -- e.g. a JSON file
# with a single 50MB string -- ballooning memory usage or the JSON output.
# 5,000 characters is generous for any real post/comment/caption.
MAX_CONTENT_LENGTH = 5_000

_TRUNCATION_SUFFIX = "... [truncated]"


def clamp_text(text: str, max_length: int = MAX_CONTENT_LENGTH) -> str:
    """Truncate `text` to at most `max_length` characters, appending a
    marker so it's obvious downstream that truncation happened.
    """
    if len(text) <= max_length:
        return text
    cut = max(0, max_length - len(_TRUNCATION_SUFFIX))
    return text[:cut] + _TRUNCATION_SUFFIX


def safe_build_post(**kwargs: Any) -> Optional[NormalizedPost]:
    """Construct a `NormalizedPost`, returning `None` instead of raising if
    the data doesn't validate.

    Every parser should use this instead of calling `NormalizedPost(...)`
    directly, so that one malformed entry in an export file (e.g. an
    unexpected type for a field) is skipped rather than crashing parsing
    of the entire file.
    """
    try:
        return NormalizedPost(**kwargs)
    except ValidationError:
        return None


def finalize_posts(posts: Iterable[NormalizedPost]) -> list[NormalizedPost]:
    """Final safety + normalization pass shared by every ingestion entry
    point:

      1. Clamp overly long `content` fields (see MAX_CONTENT_LENGTH).
      2. Deduplicate by `id`, keeping the first occurrence.
      3. Sort by `created_at` (posts with no date sort last, in their
         original relative order).
    """
    seen: set[str] = set()
    result: list[NormalizedPost] = []

    for post in posts:
        if post.id in seen:
            continue
        seen.add(post.id)

        if len(post.content) > MAX_CONTENT_LENGTH:
            post = post.model_copy(update={"content": clamp_text(post.content)})

        result.append(post)

    result.sort(key=lambda p: p.created_at or "9999")
    return result
