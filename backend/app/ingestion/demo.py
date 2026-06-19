"""
Quick manual test/demo for the ingestion module.

Run with:
    cd backend
    python -m app.ingestion.demo

This loads every sample data file, runs it through the relevant parser,
and prints the resulting NormalizedPost list -- useful for sanity-checking
parser changes without spinning up the full FastAPI app.
"""

from __future__ import annotations

import json
from pathlib import Path

from .normalize import normalize_upload

SAMPLE_DIR = Path(__file__).parent / "sample_data"


def _read(filename: str) -> str:
    return (SAMPLE_DIR / filename).read_text(encoding="utf-8")


def main() -> None:
    instagram_json = json.loads(_read("instagram_posts_1.json"))
    instagram_reels_json = json.loads(_read("instagram_reels.json"))
    instagram_comments_json = [json.loads(_read("instagram_post_comments_1.json"))]

    linkedin_csv_files = {
        "Shares.csv": _read("linkedin_shares.csv"),
        "Comments.csv": _read("linkedin_comments.csv"),
    }

    reddit_csv_files = {
        "posts.csv": _read("reddit_posts.csv"),
        "comments.csv": _read("reddit_comments.csv"),
    }

    generic_posts = json.loads(_read("generic_posts.json"))

    posts = normalize_upload(
        instagram_json=instagram_json,
        instagram_reels_json=instagram_reels_json,
        instagram_comments_json=instagram_comments_json,
        linkedin_csv_files=linkedin_csv_files,
        reddit_csv_files=reddit_csv_files,
        generic_posts=generic_posts,
    )

    print(f"Total normalized posts: {len(posts)}\n")
    for post in posts:
        print(f"[{post.platform:<9}] {post.created_at or '??':<25} {post.content[:70]!r}")
        if post.hashtags:
            print(f"            hashtags: {post.hashtags}")


if __name__ == "__main__":
    main()
