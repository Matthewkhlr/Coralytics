"""
Parser for Reddit data.

Two input shapes are supported:

1. Reddit's official GDPR data export CSVs:
     - posts.csv    columns: id, permalink, date, subreddit, title, url, body, ...
     - comments.csv columns: id, permalink, date, subreddit, link, parent, body, ...

2. "Sample"/API-style JSON, e.g. exported via PRAW or a pushshift-style
   dump -- a list of dicts with keys like "title", "selftext"/"body",
   "subreddit", "created_utc", "score", "permalink". This is the easiest
   format to hand-write small demo/sample datasets in, so it's also our
   fallback "sample data" format for testing the rest of the pipeline.
"""

from __future__ import annotations

import csv
import io
import re
from typing import Any

from .schema import NormalizedPost, Platform, PostType, make_id, safe_build_post, to_iso

HASHTAG_RE = re.compile(r"#(\w+)")


def parse_reddit_csv(csv_text: str, filename: str = "") -> list[NormalizedPost]:
    """Parse posts.csv or comments.csv from a Reddit data export.

    Detects which file it is by looking for a "title" column
    (posts have one, comments don't).
    """
    reader = csv.DictReader(io.StringIO(csv_text))
    fieldnames = set(reader.fieldnames or [])

    if not fieldnames:
        return []

    is_post = "title" in fieldnames
    is_comment = "body" in fieldnames and not is_post

    if not (is_post or is_comment):
        return []

    posts: list[NormalizedPost] = []

    for row in reader:
        if is_post:
            title = (row.get("title") or "").strip()
            body = (row.get("body") or "").strip()
            content = f"{title}\n\n{body}".strip() if body else title
            post_type = PostType.post
        else:
            content = (row.get("body") or "").strip()
            post_type = PostType.comment

        if not content:
            continue

        raw_id = row.get("id") or f"{filename}-{len(posts)}"

        post = safe_build_post(
            id=make_id(Platform.reddit, raw_id),
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
    """Parse posts.csv / comments.csv (and skip anything else) from a
    Reddit data export. `files` maps filename -> raw CSV text.
    """
    posts: list[NormalizedPost] = []
    for filename, content in files.items():
        if not filename.lower().endswith(".csv"):
            continue
        posts.extend(parse_reddit_csv(content, filename=filename))
    return posts


def parse_reddit_json(data: list[dict[str, Any]]) -> list[NormalizedPost]:
    """Parse a list of Reddit-style JSON objects (PRAW/pushshift-ish, or
    hand-written sample data). Recognized keys per item:

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
