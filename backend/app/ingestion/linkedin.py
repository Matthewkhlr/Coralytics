"""
Parser for LinkedIn "Get a copy of your data" CSV exports.

Validated against a real LinkedIn export (June 2026). The export
contains many CSV files -- this parser focuses on the ones that contain
text written by the user:

  Shares_<id>.csv
      cols: Date, ShareLink, ShareCommentary, SharedUrl, MediaUrl, Visibility
      Posts/shares the user wrote. ShareCommentary is the caption text.
      LinkedIn double-quotes multiline content; Python's csv module
      handles escaping correctly but stray quote artifacts can appear
      at field boundaries -- _clean_content() strips these.

  Comments_<id>.csv
      cols: Date, Link, Message
      Comments the user left on other people's posts.

  InstantReposts_<id>.csv
      cols: Date, Link  (ONLY these two)
      Quick reposts with no added text -- no content to analyze.
      Recognized by exact column match and explicitly skipped.

  Reactions_<id>.csv
      cols: Date, Type, Link
      Likes/reactions -- no text content, explicitly skipped.

  messages.csv
      Private DMs -- excluded by the path-based privacy filter in
      ingest.py BEFORE this parser is even called.

  Everything else (Skills, Education, Connections, Positions, etc.)
      No content to analyze -- skipped gracefully.

Detection is purely by column headers, so the parser works correctly
regardless of filename (e.g. Shares_901849705.csv or Shares.csv).
"""

from __future__ import annotations

import csv
import io
import re
from typing import Any

from .schema import NormalizedPost, Platform, PostType, make_id, safe_build_post, to_iso

HASHTAG_RE = re.compile(r"#(\w+)")

# Files we recognize and explicitly skip -- matched by EXACT column set
# (as a frozenset) so that a file like Comments (Date, Link, Message)
# is never accidentally matched as InstantReposts (Date, Link only).
_SKIP_EXACT_COLS: list[frozenset[str]] = [
    frozenset({"Date", "Link"}),            # InstantReposts_<id>.csv
    frozenset({"Date", "Type", "Link"}),    # Reactions_<id>.csv
]

# Content files -- matched by required columns being a SUBSET of headers
# (tolerant of LinkedIn adding new columns in future exports).
# Order matters: most specific first.
_KNOWN_SHAPES: list[tuple[set[str], str, PostType]] = [
    ({"ShareCommentary"},       "ShareCommentary",  PostType.post),
    ({"Message", "Link"},       "Message",           PostType.comment),
    ({"Comment", "Link"},       "Comment",           PostType.comment),
]


def _sniff_shape(fieldnames: list[str]) -> tuple[str, PostType] | None:
    """Identify the file type from its column headers.

    Returns (content_column, PostType) for recognized content files,
    or None for:
      - explicitly skippable files (reposts, reactions)
      - unrecognized files (skills, education, connections, etc.)
    """
    field_set = set(fieldnames)
    frozen = frozenset(fieldnames)

    # Exact-match skip: InstantReposts (Date, Link) and Reactions
    # (Date, Type, Link). Using exact match prevents Comments
    # (Date, Link, Message) from being misidentified as a repost.
    for skip_cols in _SKIP_EXACT_COLS:
        if frozen == skip_cols:
            return None

    # Subset-match for content files: tolerates LinkedIn adding extra
    # columns without breaking detection.
    for required_cols, content_col, post_type in _KNOWN_SHAPES:
        if required_cols.issubset(field_set):
            return content_col, post_type

    return None


def _clean_content(text: str) -> str:
    """Strip whitespace and stray quote artifacts from LinkedIn content.

    LinkedIn wraps multiline ShareCommentary in double-quotes and uses
    doubled internal quotes (standard CSV). Python's csv module handles
    the escaping, but stray leading/trailing quotes can still appear at
    field boundaries in some export versions.
    """
    text = text.strip()
    if text.startswith('"') and not text.endswith('"'):
        text = text[1:]
    if text.endswith('"') and not text.startswith('"'):
        text = text[:-1]
    return text.strip()


def _first_present(row: dict[str, Any], *keys: str) -> Any:
    for key in keys:
        if row.get(key):
            return row[key]
    return None


def parse_linkedin_csv(csv_text: str, filename: str = "") -> list[NormalizedPost]:
    """Parse a single LinkedIn export CSV file.

    Returns an empty list (never raises) if the file is unrecognized,
    is a known-but-no-text file (reposts, reactions), or has no usable
    content rows. Safe to call on every CSV in an export without
    knowing which ones contain content.
    """
    reader = csv.DictReader(io.StringIO(csv_text))
    fieldnames = reader.fieldnames or []

    shape = _sniff_shape(fieldnames)
    if shape is None:
        return []

    content_col, post_type = shape
    posts: list[NormalizedPost] = []

    for index, row in enumerate(reader):
        raw_content = row.get(content_col) or ""
        content = _clean_content(raw_content)

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
    """Parse a full LinkedIn export at once.

    `files` maps filename -> raw CSV text. Unrecognized and
    no-content files are silently skipped.
    """
    posts: list[NormalizedPost] = []
    for filename, content in files.items():
        if not filename.lower().endswith(".csv"):
            continue
        posts.extend(parse_linkedin_csv(content, filename=filename))
    return posts
