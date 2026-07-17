"""
Orchestrates the full analysis pipeline for one user:

    Firestore (all uploads) -> sentiment_service + topic_service -> aggregate -> Firestore

This is the glue layer -- it's the only module that calls both Firestore
AND the scoring modules. sentiment_service.py and topic_service.py stay
pure (no Firestore imports), so swapping VADER for a transformer model,
or changing the topic taxonomy, never touches this file or firestore_service.py.

Two things get written back per run:
  1. One new document in users/{userId}/analyses/{analysisId} -- the
     overall summary (sentiment percentages + top 3 topics) the frontend
     reads for the 3D model. Since this recomputes over the user's ENTIRE
     history every time, the most recent analysis document is always the
     complete picture -- the frontend just needs list_analyses(user_id)[0].
  2. sentiment/topic fields merged onto each individual post document --
     for per-post granularity (e.g. leaf color per post in the 3D view),
     not just the aggregate.

Usage (from the API layer, once wired into /analyze):
    from app.services.analysis_service import run_user_analysis
    result = run_user_analysis(user_id)
"""

from __future__ import annotations

from collections import Counter
from datetime import datetime, timezone
from typing import Any

from app.services import firestore_service, sentiment_service, topic_service


def _empty_result(user_id: str) -> dict[str, Any]:
    return {
        "user_id": user_id,
        "post_count": 0,
        "sentiment_summary": None,
        "topics": [],
        "organism_data": {"accountAgeDays": 0, "topics": [], "posts": []},
    }


def _sentiment_breakdown(scored_posts: list[dict[str, Any]]) -> dict[str, Any]:
    """Overall positive/neutral/negative percentages across all posts."""
    total = len(scored_posts)
    if total == 0:
        return {"positive_pct": 0.0, "neutral_pct": 0.0, "negative_pct": 0.0, "total_posts": 0}

    counts = Counter(post["label"] for post in scored_posts)
    return {
        "positive_pct": round(counts.get("positive", 0) / total * 100, 1),
        "neutral_pct": round(counts.get("neutral", 0) / total * 100, 1),
        "negative_pct": round(counts.get("negative", 0) / total * 100, 1),
        "total_posts": total,
    }


def _parse_created_at(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value.strip():
        return None

    normalized = value.strip().replace("Z", "+00:00")
    try:
        parsed = datetime.fromisoformat(normalized)
    except ValueError:
        return None

    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def _account_age_days(posts: list[dict[str, Any]]) -> int:
    created_dates = [
        parsed
        for parsed in (_parse_created_at(post.get("created_at")) for post in posts)
        if parsed is not None
    ]
    if not created_dates:
        return 0

    oldest = min(created_dates)
    return max(0, (datetime.now(timezone.utc) - oldest).days)


def run_user_analysis(user_id: str, *, persist: bool = True) -> dict[str, Any]:
    """Run sentiment + topic analysis over a user's ENTIRE post history
    (every upload, every platform), and optionally persist the results.

    Set persist=False to preview results without writing to Firestore
    (useful for local testing against the emulator).
    """
    posts = firestore_service.list_all_user_posts(user_id)
    if not posts:
        return _empty_result(user_id)

    scored = sentiment_service.score_posts(posts)
    topic_results = topic_service.assign_topics(posts)

    sentiment_summary = _sentiment_breakdown(scored)
    top_topics = topic_service.aggregate_topics(topic_results, top_n=3)
    top_topics_payload = [
        {"name": name, "count": count, "postVolume": count}
        for name, count in top_topics
    ]

    scored_by_id = {row["id"]: row for row in scored}
    topics_by_id = {row["id"]: row["topics"] for row in topic_results}
    organism_posts = []
    for post in posts:
        post_id = post.get("id")
        sentiment = scored_by_id.get(post_id, {})
        organism_posts.append(
            {
                "id": post_id,
                "created_at": post.get("created_at"),
                "sentiment_label": sentiment.get("label"),
                "sentiment_compound": sentiment.get("compound"),
                "topics": topics_by_id.get(post_id, []),
            }
        )

    result: dict[str, Any] = {
        "post_count": len(posts),
        "sentiment_summary": sentiment_summary,
        "topics": top_topics_payload,
        "organism_data": {
            "accountAgeDays": _account_age_days(posts),
            "topics": top_topics_payload,
            "posts": organism_posts,
        },
    }

    if not persist:
        return {"user_id": user_id, **result}

    upload_ids = sorted({post["_upload_id"] for post in posts})
    saved = firestore_service.save_analysis(user_id=user_id, analysis=result, upload_ids=upload_ids)

    # Merge per-post sentiment/topics back onto individual post docs,
    # matched by id (both scored and topic_results are keyed by post id,
    # produced in the same order as `posts` but joined here by id to be
    # safe regardless of ordering).
    per_post_updates = []
    for post in posts:
        post_id = post.get("id")
        sentiment = scored_by_id.get(post_id, {})
        per_post_updates.append(
            {
                "id": post_id,
                "_upload_id": post["_upload_id"],
                "sentiment_label": sentiment.get("label"),
                "sentiment_compound": sentiment.get("compound"),
                "topics": topics_by_id.get(post_id, []),
            }
        )
    firestore_service.save_post_analysis_results(user_id, per_post_updates)

    return saved


if __name__ == "__main__":
    # Manual run against the emulator (make sure it's running, see README):
    #   cd backend && python -m app.services.analysis_service demo-user
    import os
    import sys

    from dotenv import load_dotenv

    from app.firebase import init_firebase

    # Without this, FIRESTORE_EMULATOR_HOST in .env never gets read into
    # the environment, and get_settings().use_emulators comes back False
    # -- causing firebase.py to try (and fail) production credentials
    # instead of connecting to the local emulator. seed.py does the same
    # thing for the same reason.
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    load_dotenv(dotenv_path=os.path.join(repo_root, ".env"))

    init_firebase()
    target_user = sys.argv[1] if len(sys.argv) > 1 else "demo-user"
    output = run_user_analysis(target_user)
    print(output)
