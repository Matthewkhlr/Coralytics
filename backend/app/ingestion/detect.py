"""
Auto-detection: "what kind of file is this?"

When ingesting a whole export folder/zip, we don't know in advance which
file belongs to which platform -- the folder might be a renamed copy, a
zip extracted with different paths, or a teammate's export with a
slightly different layout than ours. So detection here is based on the
**shape of the data itself** (which keys are present), not on filenames
or directory paths. Filenames are only used afterwards, to build unique
ids (see ingest.py).

This keeps the system honest about the PROCESS step from the brief:
  "the data from LinkedIn and Instagram are in different formats, so you
   need a way for the system to know and parse the data accordingly"

Supported "kinds":
  - "instagram_posts"    -> posts_*.json / reels.json shape
                             (entries have "media" and/or "title" +
                             "creation_timestamp")
  - "instagram_comments" -> post_comments_*.json / reels_comments.json /
                             hype.json shape (entries have
                             "string_map_data")
  - "reddit_json"        -> list of dicts with "title"/"selftext"/
                             "subreddit" (PRAW/pushshift-style)
  - "generic"            -> simple {platform, content, created_at} dicts
                             (the dashboard's paste-data flow / sample data)
  - "linkedin" / "reddit" (CSV only) -> detected via header sniffing,
                             reusing the per-platform CSV parsers
  - "unknown"            -> doesn't match anything we recognise; the
                             caller should skip the file and record a
                             warning (FALLBACK)

Every detector here is read-only and side-effect free, so it's cheap to
call speculatively (e.g. try linkedin CSV shape, then reddit CSV shape).
"""

from __future__ import annotations

from typing import Any

from .generic import parse_generic_posts
from .instagram import parse_instagram_comments_export, parse_instagram_export
from .linkedin import parse_linkedin_csv
from .reddit import parse_reddit_csv, parse_reddit_json
from .schema import NormalizedPost

# How many entries to inspect when guessing a JSON file's shape. Looking at
# a handful is enough and keeps detection cheap even for huge files.
_SNIFF_SAMPLE_SIZE = 5


def _unwrap_list(data: Any) -> list[Any]:
    """Return a plain list of entries from either:
      - a list directly, or
      - a dict with exactly one list-valued key (e.g.
        {"ig_reels_media": [...]}, {"comments_media_comments": [...]}).

    Returns [] if neither shape matches.
    """
    if isinstance(data, list):
        return data

    if isinstance(data, dict):
        for value in data.values():
            if isinstance(value, list):
                return value

    return []


def detect_json_kind(data: Any) -> str:
    """Inspect already-parsed JSON data and return one of:
    "instagram_posts", "instagram_comments", "reddit_json", "generic",
    or "unknown".
    """
    entries = _unwrap_list(data)
    sample = [e for e in entries if isinstance(e, dict)][:_SNIFF_SAMPLE_SIZE]

    if not sample:
        return "unknown"

    if any("string_map_data" in entry for entry in sample):
        if any(
            isinstance(entry.get("string_map_data"), dict)
            and "Comment" in entry["string_map_data"]
            for entry in sample
        ):
            return "instagram_comments"

    if any("label_values" in entry for entry in sample):
        return "instagram_posts"

    if any(
        "media" in entry or ("title" in entry and "creation_timestamp" in entry)
        for entry in sample
    ):
        return "instagram_posts"

    if any(
        "selftext" in entry or ("title" in entry and "subreddit" in entry)
        for entry in sample
    ):
        return "reddit_json"

    if any(
        any(key in entry for key in ("content", "text", "body")) for entry in sample
    ):
        return "generic"

    return "unknown"


def parse_json_auto(data: Any, id_prefix: str = "file") -> tuple[list[NormalizedPost], str]:
    """Detect the kind of `data` (already-parsed JSON) and dispatch to the
    matching parser.

    Returns (posts, kind). `posts` is `[]` if the kind is "unknown" or no
    posts/comments could be extracted -- callers should treat that as a
    skip, not an error.

    `id_prefix` is forwarded to the Instagram parsers so that ids stay
    unique across multiple files of the same kind (e.g. posts_1.json and
    posts_2.json).
    """
    kind = detect_json_kind(data)

    if kind == "instagram_posts":
        return parse_instagram_export(data, id_prefix=id_prefix), kind

    if kind == "instagram_comments":
        return parse_instagram_comments_export(data, id_prefix=id_prefix), kind

    if kind == "reddit_json":
        return parse_reddit_json(_unwrap_list(data)), kind

    if kind == "generic":
        return parse_generic_posts(_unwrap_list(data)), kind

    return [], kind


def parse_csv_auto(csv_text: str, filename: str = "") -> tuple[list[NormalizedPost], str]:
    """Detect the kind of `csv_text` (raw CSV file contents) and dispatch
    to the matching parser.

    Detection order:
      1. Reddit shape check (posts: title+body+subreddit, comments: body+parent+subreddit)
      2. LinkedIn content shape check (ShareCommentary, Message+Link)
      3. LinkedIn non-content heuristic (has 'Date' column -> linkedin_skip)
      4. Unknown

    Reddit is checked FIRST because Reddit CSVs also have a 'date' column
    which would otherwise trigger the linkedin_skip fallback.

    Returns (posts, kind) where kind is one of:
      "reddit"         -- recognized Reddit CSV content file
      "linkedin"       -- recognized LinkedIn content file
      "linkedin_skip"  -- recognized LinkedIn non-content file (metadata)
      "unknown"        -- doesn't match any recognized shape
    """
    import csv as _csv
    import io as _io
    from .linkedin import _sniff_shape as _linkedin_sniff
    from .reddit import _sniff_shape as _reddit_sniff

    reader = _csv.DictReader(_io.StringIO(csv_text))
    fieldnames = reader.fieldnames or []

    if not fieldnames:
        return [], "unknown"

    # 1. Check Reddit first -- Reddit CSVs have 'date' (lowercase) and
    #    distinctive columns (subreddit, body, title/parent) that don't
    #    appear in LinkedIn exports.
    reddit_shape = _reddit_sniff(fieldnames)
    if reddit_shape is not None:
        posts = parse_reddit_csv(csv_text, filename=filename)
        # Return reddit_skip (not reddit) when recognized but empty --
        # e.g. posts.csv with header only and no data rows -- so the
        # caller doesn't log a spurious "no posts recognized" warning.
        kind = "reddit" if posts else "reddit_skip"
        return posts, kind

    # 2. Check LinkedIn content files (Shares, Comments).
    linkedin_shape = _linkedin_sniff(fieldnames)
    if linkedin_shape is not None:
        posts = parse_linkedin_csv(csv_text, filename=filename)
        return posts, "linkedin"

    # 3. LinkedIn non-content heuristic: LinkedIn uses 'Date' (capital D)
    #    for most of its metadata CSVs. If we see it and neither Reddit
    #    nor LinkedIn content matched, it's a LinkedIn metadata file.
    if "Date" in fieldnames:
        return [], "linkedin_skip"

    return [], "unknown"
