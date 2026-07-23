"""
Validates sentiment_service.py against REAL output from the ingestion
pipeline (app.ingestion.normalize_upload), instead of hand-written dicts.

This exists to catch shape mismatches early: e.g. if NormalizedPost's
field names or types ever drift, this breaks loudly here -- not three
layers deeper inside analysis_service.py.

Run from the backend/ directory:
    cd backend
    python -m app.services.verify_sentiment_integration

Uses small inline sample inputs (not the bundled sample_data/ files) so
it runs standalone without depending on fixture files being present.
"""

from __future__ import annotations

from app.ingestion import normalize_upload
from app.services.sentiment_service import score_posts, summarize_sentiment

# --- Minimal inputs shaped like real exports, one per platform ------------

INSTAGRAM_POSTS_JSON = [
    {
        "title": "I LOVE queueing for 1 hour at the theme park #vacation",
        "creation_timestamp": 1700000000,
    },
    {
        "title": "Just had the best coffee of my life this morning",
        "creation_timestamp": 1700003600,
    },
]

LINKEDIN_CSV_FILES = {
    "Shares.csv": (
        "Date,ShareLink,ShareCommentary,SharedUrl,MediaUrl,Visibility\n"
        '2024-01-01,https://x,"Thrilled to announce I have joined a new team!",,,PUBLIC\n'
    ),
}

REDDIT_JSON = [
    {
        "title": "This update completely broke my workflow",
        "selftext": "Nothing works anymore, extremely frustrated.",
        "subreddit": "technology",
        "created_utc": 1700010000,
        "score": 42,
    }
]

GENERIC_POSTS = [
    {"platform": "sample", "content": "Feeling pretty neutral about today, nothing much happened."},
]


def main() -> None:
    # 1. Run the REAL ingestion pipeline, exactly like ingestion_service.py does.
    normalized_posts = normalize_upload(
        instagram_json=INSTAGRAM_POSTS_JSON,
        linkedin_csv_files=LINKEDIN_CSV_FILES,
        reddit_json=REDDIT_JSON,
        generic_posts=GENERIC_POSTS,
    )
    print(f"normalize_upload() produced {len(normalized_posts)} NormalizedPost objects\n")

    # 2. Convert to plain dicts -- this is the exact call ingestion_service.py
    #    makes before anything reaches Firestore or your sentiment code.
    post_dicts = [post.model_dump(mode="json") for post in normalized_posts]

    # 3. Sanity-check the contract sentiment_service.py relies on.
    required_fields = {"id", "content", "platform", "created_at"}
    for post in post_dicts:
        missing = required_fields - post.keys()
        assert not missing, f"Post {post.get('id')} is missing fields: {missing}"

    # 4. Run your actual sentiment scoring, unmodified.
    scored = score_posts(post_dicts)

    print(f"{'id':<20} {'label':<10} {'compound':>9}  content")
    print("-" * 80)
    for post, result in zip(post_dicts, scored):
        content_preview = post["content"][:45]
        print(f"{result['id']:<20} {result['label']:<10} {result['compound']:>9.4f}  {content_preview!r}")

    print("\nSummary:", summarize_sentiment(scored))

    print(
        "\nNote: the 'I LOVE queueing' post likely scores POSITIVE -- this is "
        "the sarcasm limitation flagged earlier. Confirms the caveat is real, "
        "not hypothetical."
    )


if __name__ == "__main__":
    main()
