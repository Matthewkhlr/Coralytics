"""Rule-based red flag detection for social posts."""

from __future__ import annotations

import re
from typing import Any

OFFENSIVE_KEYWORDS = frozenset(
    {
        "hate",
        "stupid",
        "idiot",
        "damn",
        "hell",
        "kill",
        "worst",
        "trash",
        "ugly",
        "loser",
    }
)

CONTROVERSIAL_TOPICS = frozenset({"politics"})

TOXICITY_THRESHOLD = -0.5


def _excerpt(content: str, max_len: int = 120) -> str:
    text = (content or "").strip()
    if len(text) <= max_len:
        return text
    return text[: max_len - 3] + "..."


def _has_offensive_language(content: str) -> bool:
    words = set(re.findall(r"[a-z']+", content.lower()))
    return bool(words & OFFENSIVE_KEYWORDS)


def detect_red_flags(
    posts: list[dict[str, Any]],
    scored: list[dict[str, Any]],
    topic_results: list[dict[str, Any]],
) -> dict[str, Any]:
    """Scan posts for employability risk signals."""
    scored_by_id = {row["id"]: row for row in scored}
    topics_by_id = {row["id"]: row.get("topics", []) for row in topic_results}

    flags: list[dict[str, Any]] = []
    flagged_ids: set[str] = set()

    for post in posts:
        post_id = post.get("id")
        content = post.get("content", "")
        compound = scored_by_id.get(post_id, {}).get("compound", 0.0)

        if _has_offensive_language(content):
            flagged_ids.add(post_id)
            flags.append(
                {
                    "type": "offensive_language",
                    "post_id": post_id,
                    "excerpt": _excerpt(content),
                }
            )

        if compound < TOXICITY_THRESHOLD:
            flagged_ids.add(post_id)
            flags.append(
                {
                    "type": "high_toxicity",
                    "post_id": post_id,
                    "compound": round(compound, 4),
                    "excerpt": _excerpt(content),
                }
            )

        for topic in topics_by_id.get(post_id, []):
            if topic in CONTROVERSIAL_TOPICS and compound < 0:
                flagged_ids.add(post_id)
                flags.append(
                    {
                        "type": "controversial_negative",
                        "post_id": post_id,
                        "topic": topic,
                        "excerpt": _excerpt(content),
                    }
                )

    topic_negative_counts: dict[str, int] = {}
    for result in topic_results:
        post_id = result.get("id")
        compound = scored_by_id.get(post_id, {}).get("compound", 0.0)
        if compound >= 0:
            continue
        for topic in result.get("topics", []):
            topic_negative_counts[topic] = topic_negative_counts.get(topic, 0) + 1

    for topic, count in topic_negative_counts.items():
        if count >= 2:
            flags.append(
                {
                    "type": "negative_spike",
                    "topic": topic,
                    "count": count,
                }
            )

    total = len(posts) or 1
    risk_raw = (len(flagged_ids) / total) * 60
    risk_raw += min(len(flags), 10) * 4
    risk_score = min(100, max(0, round(risk_raw)))

    return {
        "risk_score": risk_score,
        "flags": flags[:20],
        "flagged_post_count": len(flagged_ids),
    }
