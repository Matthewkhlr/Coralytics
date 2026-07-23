"""
Top-level entry point for data ingestion.

This is the module the FastAPI `/analyze` endpoint (and anything else)
should import. It dispatches raw uploaded data to the right
platform-specific parser, merges everything into one list of
`NormalizedPost`, deduplicates, and sorts by date.

Usage sketch (from the API layer):

    from app.ingestion.normalize import normalize_upload

    posts = normalize_upload(
        instagram_json=[...],            # parsed JSON from posts_1.json etc.
        instagram_reels_json={...},      # parsed JSON from reels.json
        instagram_comments_json=[...],   # parsed JSON list from
                                          #   post_comments_1.json, reels_comments.json, etc.
        linkedin_csv_files={"Shares.csv": "..."},
        reddit_csv_files={"posts.csv": "..."},
        reddit_json=[...],                # sample/PRAW-style data
        generic_posts=[...],              # pasted {platform, content, ...}
    )
"""

from __future__ import annotations

from typing import Any, Optional

from .generic import parse_generic_posts
from .instagram import parse_instagram_comments_export, parse_instagram_export
from .linkedin import parse_linkedin_export
from .reddit import parse_reddit_export, parse_reddit_json
from .schema import NormalizedPost, finalize_posts


def normalize_upload(
    *,
    instagram_json: Optional[Any] = None,
    instagram_reels_json: Optional[Any] = None,
    instagram_comments_json: Optional[list[Any]] = None,
    linkedin_csv_files: Optional[dict[str, str]] = None,
    reddit_csv_files: Optional[dict[str, str]] = None,
    reddit_json: Optional[list[dict[str, Any]]] = None,
    generic_posts: Optional[list[dict[str, Any]]] = None,
) -> list[NormalizedPost]:
    """Combine any subset of the supported inputs into one normalized,
    deduplicated, date-sorted list of posts.

    All arguments are optional and independent -- pass whichever sources
    the user actually uploaded. Unsupported/empty inputs are ignored.
    """
    posts: list[NormalizedPost] = []

    if instagram_json is not None:
        posts.extend(parse_instagram_export(instagram_json, id_prefix="post"))

    if instagram_reels_json is not None:
        posts.extend(parse_instagram_export(instagram_reels_json, id_prefix="reel"))

    if instagram_comments_json:
        for file_index, comments_file in enumerate(instagram_comments_json):
            posts.extend(
                parse_instagram_comments_export(
                    comments_file, id_prefix=f"comment-{file_index}"
                )
            )

    if linkedin_csv_files:
        posts.extend(parse_linkedin_export(linkedin_csv_files))

    if reddit_csv_files:
        posts.extend(parse_reddit_export(reddit_csv_files))

    if reddit_json:
        posts.extend(parse_reddit_json(reddit_json))

    if generic_posts:
        posts.extend(parse_generic_posts(generic_posts))

    return finalize_posts(posts)
