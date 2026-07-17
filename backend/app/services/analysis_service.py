"""
Orchestrates the full analysis pipeline for one user:

    DB1 raw uploads -> parse -> sentiment_service + topic_service -> DB2 analyses

This is the glue layer -- it's the only module that calls both storage
layers AND the scoring modules.

Two things get written back per run:
  1. One new document in users/{userId}/analyses/{analysisId} (DB2) --
     the overall summary (sentiment percentages + top 3 topics + organism_data)
     the frontend reads for the 3D model.
  2. `post_insights` on that same DB2 analysis document -- per-post
     sentiment/topic fields used by branch drill-down views.

Usage (from the API layer):
    from app.services.analysis_service import run_user_analysis
    result = run_user_analysis(user_id)
"""

from __future__ import annotations

from collections import Counter, defaultdict
from datetime import datetime, timezone
from statistics import mean
from typing import Any

from app.services import (
    analysis_store_service,
    firestore_service,
    red_flag_service,
    sentiment_service,
    topic_service,
)


def _empty_result(user_id: str) -> dict[str, Any]:
    return {
        "user_id": user_id,
        "name": None,
        "post_count": 0,
        "sentiment_summary": None,
        "topics": [],
        "organism_data": {"accountAgeDays": 0, "topics": [], "posts": []},
        "sentiment_timeline": [],
        "persona_summary": None,
        "red_flags": None,
        "branding_recommendations": [],
        "platform_breakdown": [],
        "evolution": None,
        "date_range": {"earliest": None, "latest": None},
        "diff": None,
        "upload_ids": [],
    }


def _parse_created_at(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        normalized = value.replace("Z", "+00:00")
        parsed = datetime.fromisoformat(normalized)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed
    except ValueError:
        return None


def _compute_account_age_days(posts: list[dict[str, Any]]) -> int:
    dates = [_parse_created_at(post.get("created_at")) for post in posts]
    valid = [dt for dt in dates if dt is not None]
    if not valid:
        return 0
    earliest = min(valid)
    now = datetime.now(timezone.utc)
    return max(0, (now - earliest).days)


def _sentiment_summary_for_frontend(scored_posts: list[dict[str, Any]]) -> dict[str, Any]:
    """Map VADER scores to the shape the frontend expects."""
    if not scored_posts:
        return {
            "compound": 0.0,
            "positive": 0.0,
            "neutral": 0.0,
            "negative": 0.0,
        }

    total = len(scored_posts)
    counts = Counter(post["label"] for post in scored_posts)
    average_compound = mean(post["compound"] for post in scored_posts)

    return {
        "compound": round(average_compound, 4),
        "positive": round(counts.get("positive", 0) / total, 4),
        "neutral": round(counts.get("neutral", 0) / total, 4),
        "negative": round(counts.get("negative", 0) / total, 4),
    }


def _enrich_topics(
    scored: list[dict[str, Any]],
    topic_results: list[dict[str, Any]],
    *,
    top_n: int = 3,
) -> list[dict[str, Any]]:
    """Build topic payloads with postVolume and mean sentiment per topic."""
    scored_by_id = {row["id"]: row for row in scored}
    topic_compounds: dict[str, list[float]] = defaultdict(list)
    topic_counts: Counter[str] = Counter()

    for result in topic_results:
        post_id = result.get("id")
        compound = scored_by_id.get(post_id, {}).get("compound", 0.0)
        for topic_name in result.get("topics", []):
            topic_counts[topic_name] += 1
            topic_compounds[topic_name].append(compound)

    enriched: list[dict[str, Any]] = []
    for name, count in topic_counts.most_common(top_n):
        compounds = topic_compounds[name]
        enriched.append(
            {
                "name": name,
                "postVolume": count,
                "sentiment": round(mean(compounds), 4) if compounds else 0.0,
            }
        )
    return enriched


def _build_sentiment_timeline(scored: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Bucket scored posts by calendar month for the Insights timeline."""
    buckets: dict[str, list[float]] = defaultdict(list)

    for post in scored:
        created = _parse_created_at(post.get("created_at"))
        if created is None:
            continue
        period = created.strftime("%Y-%m")
        buckets[period].append(post["compound"])

    timeline: list[dict[str, Any]] = []
    for period in sorted(buckets):
        compounds = buckets[period]
        timeline.append(
            {
                "period": period,
                "compound": round(mean(compounds), 4),
                "post_count": len(compounds),
            }
        )
    return timeline


def _build_persona_summary(
    sentiment_summary: dict[str, Any],
    topics: list[dict[str, Any]],
) -> str:
    if not topics:
        return "Upload a social export to discover your online persona."

    topic_names = ", ".join(topic["name"] for topic in topics[:3])
    compound = sentiment_summary.get("compound", 0.0)

    if compound >= 0.05:
        tone = "positive"
    elif compound <= -0.05:
        tone = "negative"
    else:
        tone = "neutral"

    return (
        f"Your online persona centers on {topic_names}. "
        f"Overall tone is {tone} with an average sentiment score of {compound:+.2f}."
    )


def _build_platform_breakdown(
    posts: list[dict[str, Any]],
    scored: list[dict[str, Any]],
    topic_results: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    scored_by_id = {row["id"]: row for row in scored}
    topics_by_id = {row["id"]: row.get("topics", []) for row in topic_results}
    by_platform: dict[str, list[float]] = defaultdict(list)
    platform_topics: dict[str, Counter[str]] = defaultdict(Counter)

    for post in posts:
        platform = str(post.get("platform") or "unknown").lower()
        post_id = post.get("id")
        compound = scored_by_id.get(post_id, {}).get("compound", 0.0)
        by_platform[platform].append(compound)
        for topic in topics_by_id.get(post_id, []):
            platform_topics[platform][topic] += 1

    breakdown: list[dict[str, Any]] = []
    for platform, compounds in sorted(by_platform.items()):
        top_topics = [name for name, _ in platform_topics[platform].most_common(2)]
        breakdown.append(
            {
                "platform": platform,
                "post_count": len(compounds),
                "compound": round(mean(compounds), 4) if compounds else 0.0,
                "top_topics": top_topics,
            }
        )
    return breakdown


def _build_branding_recommendations(
    topics: list[dict[str, Any]],
    platform_breakdown: list[dict[str, Any]],
    sentiment_summary: dict[str, Any],
) -> list[str]:
    recommendations: list[str] = []
    all_topic_names = {t["name"] for t in topics}

    underrepresented = ["career", "technology", "education"]
    for candidate in underrepresented:
        if candidate not in all_topic_names:
            recommendations.append(f"Post more about {candidate} to strengthen your professional profile.")
            break

    for topic in topics:
        if topic.get("sentiment", 0) < -0.2:
            recommendations.append(
                f"Reduce negative tone when posting about {topic['name']} — it may affect how others perceive you."
            )

    if platform_breakdown:
        compounds = [row["compound"] for row in platform_breakdown]
        if len(compounds) >= 2:
            lowest = min(platform_breakdown, key=lambda row: row["compound"])
            highest = max(platform_breakdown, key=lambda row: row["compound"])
            if highest["compound"] - lowest["compound"] > 0.25:
                recommendations.append(
                    f"Balance your presence — {lowest['platform']} is notably more negative than {highest['platform']}."
                )

    compound = sentiment_summary.get("compound", 0.0)
    if compound < -0.1:
        recommendations.append("Overall tone skews negative — consider reframing posts in a more constructive light.")

    return recommendations[:5]


def _detect_turning_points(sentiment_timeline: list[dict[str, Any]]) -> list[dict[str, Any]]:
    turning_points: list[dict[str, Any]] = []
    for index in range(1, len(sentiment_timeline)):
        prev = sentiment_timeline[index - 1]
        curr = sentiment_timeline[index]
        delta = curr["compound"] - prev["compound"]
        if delta <= -0.3:
            turning_points.append(
                {
                    "period": curr["period"],
                    "description": f"Sentiment dropped sharply in {curr['period']} ({delta:+.2f}).",
                }
            )
        elif delta >= 0.3:
            turning_points.append(
                {
                    "period": curr["period"],
                    "description": f"Sentiment improved significantly in {curr['period']} ({delta:+.2f}).",
                }
            )
    return turning_points


def _build_topic_drift(
    current_topics: list[dict[str, Any]],
    prior_snapshots: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    if not prior_snapshots:
        return []

    prior = prior_snapshots[0]
    prior_names = {t.get("name") for t in prior.get("topics", [])}
    current_names = {t.get("name") for t in current_topics}
    drift: list[dict[str, Any]] = []

    for name in current_names - prior_names:
        drift.append({"topic": name, "trend": "emerging"})
    for name in prior_names - current_names:
        drift.append({"topic": name, "trend": "fading"})

    return drift[:6]


def _compute_date_range(posts: list[dict[str, Any]]) -> dict[str, str | None]:
    dates = [_parse_created_at(post.get("created_at")) for post in posts]
    valid = [dt for dt in dates if dt is not None]
    if not valid:
        return {"earliest": None, "latest": None}
    return {
        "earliest": min(valid).isoformat(),
        "latest": max(valid).isoformat(),
    }


def _topic_names(topics: list[dict[str, Any]]) -> set[str]:
    return {str(topic.get("name")) for topic in topics if topic.get("name")}


def _build_analysis_diff(
    *,
    post_count: int,
    topics: list[dict[str, Any]],
    account_age_days: int,
    prior: dict[str, Any] | None,
) -> dict[str, Any]:
    if not prior:
        return {
            "posts_added": post_count,
            "posts_delta": post_count,
            "topics_emerging": [t["name"] for t in topics],
            "topics_fading": [],
            "account_age_delta_days": account_age_days,
            "no_meaningful_change": False,
        }

    prior_count = int(prior.get("post_count") or 0)
    prior_topics = _topic_names(prior.get("topics") or [])
    current_topics = _topic_names(topics)
    prior_age = int((prior.get("organism_data") or {}).get("accountAgeDays") or 0)
    posts_delta = post_count - prior_count
    age_delta = account_age_days - prior_age
    emerging = sorted(current_topics - prior_topics)
    fading = sorted(prior_topics - current_topics)
    no_change = posts_delta == 0 and age_delta == 0 and not emerging and not fading

    return {
        "posts_added": max(0, posts_delta),
        "posts_delta": posts_delta,
        "topics_emerging": emerging,
        "topics_fading": fading,
        "account_age_delta_days": age_delta,
        "no_meaningful_change": no_change,
    }


def _build_evolution(
    sentiment_timeline: list[dict[str, Any]],
    topics: list[dict[str, Any]],
    prior_snapshots: list[dict[str, Any]],
) -> dict[str, Any]:
    return {
        "turning_points": _detect_turning_points(sentiment_timeline),
        "topic_drift": _build_topic_drift(topics, prior_snapshots),
    }


def _default_run_name(created_at: str | None = None) -> str:
    """Default run name: MM/DD/YYYY_HH:MM (local-equivalent from timestamp)."""
    when = datetime.now(timezone.utc)
    if created_at:
        parsed = _parse_created_at(created_at)
        if parsed is not None:
            when = parsed
    return when.strftime("%m/%d/%Y_%H:%M")


def run_user_analysis(
    user_id: str,
    *,
    persist: bool = True,
    upload_ids: list[str] | None = None,
    name: str | None = None,
) -> dict[str, Any]:
    """Run sentiment + topic analysis over a user's raw DB1 exports
    and optionally persist the results to DB2.

    When upload_ids is provided and non-empty, only those uploads are analyzed.
    When omitted or empty, all uploads are pooled (canonical combined reef).

    Set persist=False to preview results without writing to Firestore
    (useful for local testing against the emulator).
    """
    scoped_ids = [uid for uid in (upload_ids or []) if uid]
    posts = firestore_service.list_user_posts(
        user_id,
        upload_ids=scoped_ids or None,
    )
    if not posts:
        return _empty_result(user_id)

    scored = sentiment_service.score_posts(posts)
    topic_results = topic_service.assign_topics(posts)

    sentiment_summary = _sentiment_summary_for_frontend(scored)
    topics = _enrich_topics(scored, topic_results, top_n=3)
    account_age_days = _compute_account_age_days(posts)
    date_range = _compute_date_range(posts)
    sentiment_timeline = _build_sentiment_timeline(scored)
    persona_summary = _build_persona_summary(sentiment_summary, topics)
    platform_breakdown = _build_platform_breakdown(posts, scored, topic_results)
    branding_recommendations = _build_branding_recommendations(
        topics, platform_breakdown, sentiment_summary
    )
    red_flags = red_flag_service.detect_red_flags(posts, scored, topic_results)
    prior_snapshots = firestore_service.list_evolution_snapshots(user_id, limit=1)
    evolution = _build_evolution(sentiment_timeline, topics, prior_snapshots)

    prior_analysis = None
    prior_list = firestore_service.list_analyses(user_id)
    if prior_list:
        prior_analysis = prior_list[0]

    diff = _build_analysis_diff(
        post_count=len(posts),
        topics=topics,
        account_age_days=account_age_days,
        prior=prior_analysis,
    )

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

    organism_data = {
        "accountAgeDays": account_age_days,
        "topics": topics,
        "posts": organism_posts,
    }

    resolved_upload_ids = scoped_ids or sorted(
        {str(post["_upload_id"]) for post in posts if post.get("_upload_id")}
    )

    trimmed_name = (name or "").strip()
    run_name = trimmed_name or _default_run_name()

    result: dict[str, Any] = {
        "name": run_name,
        "post_count": len(posts),
        "sentiment_summary": sentiment_summary,
        "topics": topics,
        "organism_data": organism_data,
        "sentiment_timeline": sentiment_timeline,
        "persona_summary": persona_summary,
        "red_flags": red_flags,
        "branding_recommendations": branding_recommendations,
        "platform_breakdown": platform_breakdown,
        "evolution": evolution,
        "date_range": date_range,
        "diff": diff,
    }

    if not persist:
        return {"user_id": user_id, "upload_ids": resolved_upload_ids, **result}

    post_insights = []
    for post in posts:
        post_id = post.get("id")
        sentiment = scored_by_id.get(post_id, {})
        content = str(post.get("content") or "").strip()
        if len(content) > 200:
            content = content[:199].rstrip() + "…"
        post_insights.append(
            {
                "id": post_id,
                "_upload_id": post["_upload_id"],
                "platform": post.get("platform"),
                "content": content,
                "created_at": post.get("created_at"),
                "sentiment_label": sentiment.get("label"),
                "sentiment_compound": sentiment.get("compound"),
                "topics": topics_by_id.get(post_id, []),
            }
        )

    result["post_insights"] = post_insights
    saved = analysis_store_service.save_analysis(
        user_id=user_id,
        analysis=result,
        upload_ids=resolved_upload_ids,
    )

    firestore_service.save_evolution_snapshot(
        user_id,
        saved["analysis_id"],
        {
            "analysis_id": saved["analysis_id"],
            "created_at": saved["created_at"],
            "topics": topics,
            "compound": sentiment_summary.get("compound", 0.0),
            "post_count": len(posts),
        },
    )

    return saved


if __name__ == "__main__":
    import os
    import sys

    from dotenv import load_dotenv

    from app.firebase import init_firebase

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
    load_dotenv(dotenv_path=os.path.join(repo_root, ".env"))

    init_firebase()
    target_user = sys.argv[1] if len(sys.argv) > 1 else "demo-user"
    output = run_user_analysis(target_user)
    print(output)
