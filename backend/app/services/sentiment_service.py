"""
Sentiment scoring for normalized posts.

Input contract (per your teammate's note): each post is a dict shaped like
NormalizedPost, e.g.:

    {
        "id": "instagram:post-0",
        "platform": "instagram",
        "content": "A real public post #hi",
        "created_at": "2023-11-14T22:13:20Z",
        "post_type": "post",
        "engagement": None,
        "source_context": None,
        "url": None,
        "hashtags": ["hi"],
    }

This module only reads `content` (and echoes `id`/`created_at` back for
later timeline aggregation). It does not know or care how the post was
ingested.

Install:
    pip install vaderSentiment
"""

from __future__ import annotations

from statistics import mean
from typing import Any, Literal

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

SentimentLabel = Literal["positive", "neutral", "negative"]

# VADER's own recommended thresholds on the compound score (-1..1).
_POSITIVE_THRESHOLD = 0.05
_NEGATIVE_THRESHOLD = -0.05

_analyzer = SentimentIntensityAnalyzer()


def _label_for_compound(compound: float) -> SentimentLabel:
    if compound >= _POSITIVE_THRESHOLD:
        return "positive"
    if compound <= _NEGATIVE_THRESHOLD:
        return "negative"
    return "neutral"


def score_post(content: str) -> dict[str, Any]:
    """Score a single piece of text. Returns VADER's raw scores plus a label.

    Empty/whitespace-only content scores as neutral rather than raising,
    since some posts (e.g. image-only shares) may have blank content.
    """
    text = (content or "").strip()
    if not text:
        return {
            "compound": 0.0,
            "positive": 0.0,
            "neutral": 1.0,
            "negative": 0.0,
            "label": "neutral",
        }

    scores = _analyzer.polarity_scores(text)
    return {
        "compound": scores["compound"],
        "positive": scores["pos"],
        "neutral": scores["neu"],
        "negative": scores["neg"],
        "label": _label_for_compound(scores["compound"]),
    }


def score_posts(posts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Score a batch of normalized posts.

    Returns one result per input post, each carrying the post's `id` and
    `created_at` forward so results can be re-joined to posts or sorted
    into a timeline later, without re-touching Firestore.
    """
    results = []
    for post in posts:
        sentiment = score_post(post.get("content", ""))
        results.append(
            {
                "id": post.get("id"),
                "created_at": post.get("created_at"),
                "platform": post.get("platform"),
                **sentiment,
            }
        )
    return results


def summarize_sentiment(scored_posts: list[dict[str, Any]]) -> dict[str, Any]:
    """Aggregate per-post scores into the sentiment_summary shape /analyze needs.

    This is intentionally simple for step 1 — average compound score and a
    label breakdown. Timeline bucketing (sentiment over time) is a
    follow-up step once this is wired in and returning real numbers.
    """
    if not scored_posts:
        return {
            "average_compound": 0.0,
            "label_counts": {"positive": 0, "neutral": 0, "negative": 0},
            "overall_label": "neutral",
        }

    average_compound = mean(post["compound"] for post in scored_posts)
    label_counts = {"positive": 0, "neutral": 0, "negative": 0}
    for post in scored_posts:
        label_counts[post["label"]] += 1

    return {
        "average_compound": round(average_compound, 4),
        "label_counts": label_counts,
        "overall_label": _label_for_compound(average_compound),
    }


if __name__ == "__main__":
    # Quick manual sanity check when running this module directly.
    # for the ingestion side. Run with: python sentiment_service.py
    sample_posts = [
        {"id": "instagram:post-0", "content": "Had an amazing day at the beach! #blessed"},
        {"id": "linkedin:post-1", "content": "Disappointed with how this project turned out."},
        {"id": "reddit:comment-2", "content": "It's fine, nothing special either way."},
    ]
    scored = score_posts(sample_posts)
    for row in scored:
        print(row)
    print("\nSummary:", summarize_sentiment(scored))
