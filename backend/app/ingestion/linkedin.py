"""
Parser for LinkedIn "Get a copy of your data" CSV exports.

LinkedIn splits your data across many small CSV files. The two most
useful for analysis are:

  - Shares.csv   columns include: Date, ShareLink, ShareCommentary,
                 SharedUrl, MediaUrl, Visibility
  - Comments.csv columns include: Date, Link, Message

Rather than requiring the caller to know which file is which, this
parser sniffs the header row and dispatches accordingly. Unknown CSVs
are skipped gracefully (return an empty list) rather than raising, so
a batch upload of "every CSV in the export zip" doesn't blow up on
files we don't care about (e.g. Skills.csv, Education.csv).
"""

from __future__ import annotations

import csv
import io
import re
from typing import Any

from .schema import NormalizedPost, Platform, PostType, make_id, safe_build_post, to_iso

HASHTAG_RE = re.compile(r"#(\w+)")

# Maps a recognizable set of header columns -> (content column, post type)
_KNOWN_SHAPES: list[tuple[set[str], str, PostType]] = [
    ({"ShareCommentary"}, "ShareCommentary", PostType.post),
    ({"Message", "Link"}, "Message", PostType.comment),
    ({"Comment", "Link"}, "Comment", PostType.comment),
]


def _sniff_shape(fieldnames: list[str]) -> tuple[str, PostType] | None:
    field_set = set(fieldnames)
    for required_cols, content_col, post_type in _KNOWN_SHAPES:
        if required_cols.issubset(field_set):
            return content_col, post_type
    return None


def _first_present(row: dict[str, Any], *keys: str) -> Any:
    for key in keys:
        if row.get(key):
            return row[key]
    return None


def parse_linkedin_csv(csv_text: str, filename: str = "") -> list[NormalizedPost]:
    """Parse the raw text contents of a single LinkedIn export CSV file.

    Returns an empty list (rather than raising) if the CSV doesn't match
    a recognized shape -- callers can loop over every file in an export
    zip and just concatenate results.
    """
    reader = csv.DictReader(io.StringIO(csv_text))
    fieldnames = reader.fieldnames or []

    shape = _sniff_shape(fieldnames)
    if shape is None:
        return []

    content_col, post_type = shape
    posts: list[NormalizedPost] = []

    for index, row in enumerate(reader):
        content = (row.get(content_col) or "").strip()

        # Skip rows with no actual text (e.g. a pure-media share).
        if not content:
            continue

        date_value = _first_present(row, "Date", "Created Date")
        url = _first_present(row, "ShareLink", "Link", "SharedUrl")
        visibility = row.get("Visibility")

        post = safe_build_post(
            id=make_id(Platform.linkedin, f"{filename or 'linkedin'}-{index}"),
            platform=Platform.linkedin,
            content=content,
            created_at=to_iso(date_value),
            post_type=post_type,
            source_context=visibility,
            url=url,
            hashtags=HASHTAG_RE.findall(content),
        )
        if post is not None:
            posts.append(post)

    return posts


def parse_linkedin_export(files: dict[str, str]) -> list[NormalizedPost]:
    """Parse a whole LinkedIn export at once.

    `files` maps filename -> raw CSV text (e.g. {"Shares.csv": "...",
    "Comments.csv": "..."}). Files that don't match a known shape are
    silently skipped.
    """
    posts: list[NormalizedPost] = []
    for filename, content in files.items():
        if not filename.lower().endswith(".csv"):
            continue
        posts.extend(parse_linkedin_csv(content, filename=filename))
    return posts
