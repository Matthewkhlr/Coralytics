"""
Generic/"sample data" parser.

This handles the simplest input shape: a list of objects already shaped
like the app's existing `Post` model (platform, content, created_at) --
e.g. from a "paste your posts as JSON" textbox in the frontend, demo
fixtures, or quick manual testing without a real export file.

It's intentionally permissive: any dict with at least a "content" (or
"text"/"body") field is accepted, missing fields are filled in with
sensible defaults, and the declared "platform" (if present) is used so
sample data can simulate any platform.
"""

from __future__ import annotations

import re
from typing import Any

from .schema import NormalizedPost, Platform, PostType, make_id, safe_build_post, to_iso

HASHTAG_RE = re.compile(r"#(\w+)")


def parse_generic_posts(
    data: list[dict[str, Any]],
    *,
    default_platform: str = "sample",
) -> list[NormalizedPost]:
    """Parse a list of simple {platform, content, created_at} dicts.

    Useful for:
      - the dashboard's "paste data" flow
      - hand-written sample/demo datasets
      - tests for the rest of the pipeline that don't care about
        real-export quirks

    `default_platform` is used when an entry omits `platform` (e.g. the
    user picked a platform after auto-detect failed).
    """
    posts: list[NormalizedPost] = []

    for index, entry in enumerate(data):
        if not isinstance(entry, dict):
            continue

        content = (
            entry.get("content") or entry.get("text") or entry.get("body") or ""
        ).strip()

        if not content:
            continue

        platform_raw = (entry.get("platform") or default_platform or "sample").lower()
        try:
            platform = Platform(platform_raw)
        except ValueError:
            try:
                platform = Platform(default_platform.lower())
            except ValueError:
                platform = Platform.sample

        raw_id = entry.get("id") or str(index)

        post = safe_build_post(
            id=make_id(platform, str(raw_id)),
            platform=platform,
            content=content,
            created_at=to_iso(entry.get("created_at")),
            post_type=PostType.post,
            hashtags=HASHTAG_RE.findall(content),
        )
        if post is not None:
            posts.append(post)

    return posts
