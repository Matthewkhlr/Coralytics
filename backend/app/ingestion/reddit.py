"""
Parser for Reddit "Request my data" CSV exports.

Validated against a real Reddit export (June 2026). The export contains
many CSV files -- this parser focuses on the two that contain text
written by the user:

  posts.csv
      cols: id, permalink, date, ip, subreddit, gildings, title, url, body
      Posts (submissions) the user made. `title` is always present;
      `body` is the self-text (empty for link posts).
      Content = title + body combined where both exist.

  comments.csv
      cols: id, permalink, date, ip, subreddit, gildings,
            gildings_silver, gildings_supergold, link, parent, body, media
      Comments the user wrote. `body` is the comment text.
      No `title` column -- used to detect comment vs post files.

Files explicitly skipped (no text content to analyze):
  messages_archive.csv  -- private DMs (also caught by privacy exclusion
                           in ingest.py via "messages" keyword)
  chat_history.csv      -- chat DMs (also caught by privacy exclusion)
  post_votes.csv        -- upvotes/downvotes, no text
  comment_votes.csv     -- upvotes/downvotes, no text
  saved_posts.csv       -- just permalinks
  saved_comments.csv    -- just permalinks
  subscribed_subreddits.csv -- just subreddit names
  Everything else       -- metadata, skipped gracefully

Detection is purely by column headers so it works regardless of
whether the file is named posts.csv or posts_export.csv etc.
"""

from __future__ import annotations

import csv
import io
import re
from typing import Any

from .schema import NormalizedPost, Platform, PostType, make_id, safe_build_post, to_iso

HASHTAG_RE = re.compile(r"#(\w+)")

# Real Reddit export column signatures (from validated export June 2026)
# Posts:    have 'title' + 'body' + 'subreddit' + 'date'
# Comments: have 'body' + 'parent' + 'subreddit' + 'date', NO 'title'
_POST_REQUIRED = {"title", "body", "subreddit"}
_COMMENT_REQUIRED = {"body", "parent", "subreddit"}

# Files with only links/ids, no text content -- skip silently
_SKIP_SIGNATURES: list[set[str]] = [
    {"id", "permalink"},                          # saved_posts, post_headers
    {"id", "permalink", "date", "ip"},            # post_headers extended
    {"subreddit"},                                # subscribed_subreddits
    {"id", "link_id", "vote"},                    # post_votes / comment_votes
]


def _sniff_shape(fieldnames: list[str]) -> tuple[str, PostType] | None:
    """Return (content_column, PostType) for recognized content files,
    or None for skippable/unrecognized files.
    """
    field_set = set(fieldnames)

    # Posts: must have title + body + subreddit
    if _POST_REQUIRED.issubset(field_set):
        return "body", PostType.post  # body may be empty for link posts

    # Comments: have body + parent but NO title
    if _COMMENT_REQUIRED.issubset(field_set) and "title" not in field_set:
        return "body", PostType.comment

    return None


def parse_reddit_csv(csv_text: str, filename: str = "") -> list[NormalizedPost]:
    """Parse a single Reddit export CSV file.

    Returns an empty list (never raises) if:
      - the file doesn't match a recognized content shape, or
      - all rows have empty body/title content.

    Safe to call on every CSV in the export without knowing which
    file is which.
    """
    reader = csv.DictReader(io.StringIO(csv_text))
    fieldnames = reader.fieldnames or []

    shape = _sniff_shape(fieldnames)
    if shape is None:
        return []

    _, post_type = shape
    posts: list[NormalizedPost] = []

    for row in reader:
        if post_type == PostType.post:
            title = (row.get("title") or "").strip()
            body = (row.get("body") or "").strip()
            # Combine title + body; for link posts body is empty
            content = f"{title}\n\n{body}".strip() if body else title
        else:
            content = (row.get("body") or "").strip()

        if not content:
            continue

        raw_id = row.get("id") or f"{filename}-{len(posts)}"

        post = safe_build_post(
            id=make_id(Platform.reddit, str(raw_id)),
            platform=Platform.reddit,
            content=content,
            created_at=to_iso(row.get("date")),
            post_type=post_type,
            source_context=row.get("subreddit"),
            url=row.get("permalink"),
            hashtags=HASHTAG_RE.findall(content),
        )
        if post is not None:
            posts.append(post)

    return posts


def parse_reddit_export(files: dict[str, str]) -> list[NormalizedPost]:
    """Parse a full Reddit export at once.

    `files` maps filename -> raw CSV text. Unrecognized and
    no-content files are silently skipped.
    """
    posts: list[NormalizedPost] = []
    for filename, content in files.items():
        if not filename.lower().endswith(".csv"):
            continue
        posts.extend(parse_reddit_csv(content, filename=filename))
    return posts


def parse_reddit_json(data: list[dict[str, Any]]) -> list[NormalizedPost]:
    """Parse a list of Reddit-style JSON objects (PRAW/pushshift-style).

    Recognized keys per item:
        title, selftext/body, subreddit, created_utc, score,
        permalink/url, id
    """
    posts: list[NormalizedPost] = []

    for index, entry in enumerate(data):
        if not isinstance(entry, dict):
            continue

        title = (entry.get("title") or "").strip()
        body = (entry.get("selftext") or entry.get("body") or "").strip()

        if title and body:
            content = f"{title}\n\n{body}"
            post_type = PostType.post
        elif title:
            content = title
            post_type = PostType.post
        else:
            content = body
            post_type = PostType.comment

        if not content:
            continue

        raw_id = entry.get("id") or str(index)
        score = entry.get("score")

        post = safe_build_post(
            id=make_id(Platform.reddit, str(raw_id)),
            platform=Platform.reddit,
            content=content,
            created_at=to_iso(entry.get("created_utc")),
            post_type=post_type,
            engagement=int(score) if isinstance(score, (int, float)) else None,
            source_context=entry.get("subreddit"),
            url=entry.get("permalink") or entry.get("url"),
            hashtags=HASHTAG_RE.findall(content),
        )
        if post is not None:
            posts.append(post)

    return posts
