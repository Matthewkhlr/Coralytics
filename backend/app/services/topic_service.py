"""
Topic classification for normalized posts.

Approach: fixed taxonomy + cosine similarity (NOT KMeans clustering).

KMeans assigns each document to exactly one nearest cluster -- there's no
natural way to get "this post is somewhat about travel AND somewhat about
food" out of it. Since posts can genuinely span multiple topics, this
module instead:

  1. Defines a fixed set of topic categories, each represented by a short
     bag of representative keywords (TOPIC_TAXONOMY below).
  2. TF-IDF vectorizes posts and topic keyword-docs together (so they
     share a vocabulary).
  3. Computes cosine similarity between each post and every topic.
  4. Keeps up to MAX_TOPICS_PER_POST topics per post, only if they clear
     MIN_SIMILARITY -- so a post can get 0, 1, 2, or 3 topics depending
     on how many categories it actually resembles.

Input contract: same list[dict] shape as sentiment_service.py (each post
needs at least "id" and "content").

Install:
    pip install scikit-learn
"""

from __future__ import annotations

import re
from collections import Counter
from typing import Any

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

MAX_TOPICS_PER_POST = 3

# Below this cosine similarity, a topic isn't considered relevant enough
# to tag. Tune this if you find posts getting 0 topics too often (lower
# it) or getting weakly-related topics tagged (raise it).
MIN_SIMILARITY = 0.08

# If a non-empty post does not clear MIN_SIMILARITY, keep the best weak
# match above this floor. If it has no vocabulary overlap with the taxonomy
# at all, fall back to GENERAL_TOPIC so every analyzable post can still grow
# a coral polyp.
MIN_FALLBACK_SIMILARITY = 0.04
GENERAL_TOPIC = "general"

# Each value is a short bag of representative words/phrases for that
# category -- not exhaustive, just enough for TF-IDF to place the topic
# in a sensible region of the vector space. Add/adjust categories here
# as you see what topics actually show up in real demo data.
TOPIC_TAXONOMY: dict[str, str] = {
    "travel": "travel vacation trip flight airport hotel destination explore "
              "adventure tourism beach mountain journey abroad hike hiking outdoors",
    "technology": "technology software app coding programming ai computer "
                  "tech startup gadget update device engineering framework release performance",
    "food": "food recipe restaurant cooking meal dinner lunch coffee "
            "cuisine delicious taste kitchen chef",
    "fitness": "fitness workout gym exercise running training health diet "
               "muscle yoga marathon cardio strength wellness wellbeing burnout break",
    "career": "career job work office promotion interview resume hiring "
              "team colleague professional workplace manager launch shipped feature project",
    "relationships": "relationship family friend love partner marriage "
                      "dating wedding kids parenting husband wife community grateful",
    "finance": "finance money investing stock budget savings crypto "
               "market economy salary invest financial",
    "entertainment": "movie music concert show game entertainment film "
                      "series artist album streaming celebrity vote fan "
                      "idol kpop beauty contest faces award nomination "
                      "fandom singer group band stan comeback chart "
                      "most beautiful girls generation vote for",
    "politics": "politics government election policy president law "
                "rights protest senate campaign congress legislation "
                "ballot polling voter democracy parliament partisan",
    "education": "education school university student learning study "
                 "degree class course exam professor",
    "sports": "sports team match game player league championship score "
              "tournament coach athlete",
    "art": "art design creative painting photography drawing craft "
           "aesthetic gallery illustration book books writing reading",
}

ASSIGNABLE_TOPICS: tuple[str, ...] = (*TOPIC_TAXONOMY.keys(), GENERAL_TOPIC)


def list_assignable_topics() -> list[str]:
    """Return the canonical topic labels a post can receive."""
    return list(ASSIGNABLE_TOPICS)


def _topic_text(post: dict[str, Any]) -> str:
    """Build the text used for topic assignment from normalized post fields."""
    parts = [str(post.get("content") or "").strip()]

    hashtags = post.get("hashtags")
    if isinstance(hashtags, list):
        parts.extend(str(tag).replace("#", " ") for tag in hashtags)

    source_context = post.get("source_context")
    if source_context:
        parts.append(str(source_context))

    platform = post.get("platform")
    if platform:
        parts.append(str(platform))

    return " ".join(part for part in parts if part).strip()


_FAN_VOTE_RE = re.compile(
    r"\bvote(?:d|s)?\s+for\b",
    re.IGNORECASE,
)
_AWARD_OR_FAN_RE = re.compile(
    r"(?:#\w*(?:face|award|idol|stan|kpop)\w*|@\w+|most\s+beautiful|fan\s*vote)",
    re.IGNORECASE,
)


def _looks_like_fan_or_award_vote(text: str) -> bool:
    """Fan/award voting ('I vote for @idol') is entertainment, not politics."""
    if not text:
        return False
    if _FAN_VOTE_RE.search(text) and ("@" in text or "#" in text):
        return True
    return bool(_AWARD_OR_FAN_RE.search(text))


def _filter_scored_topics(
    scored_topics: list[tuple[str, float]],
    text: str,
) -> list[tuple[str, float]]:
    if not _looks_like_fan_or_award_vote(text):
        return scored_topics
    return [(name, score) for name, score in scored_topics if name != "politics"]


def assign_topics(posts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Assign up to MAX_TOPICS_PER_POST topics to each post.

    Returns one result per input post: {"id": ..., "topics": [...]}, in
    the same order as the input. `topics` is ordered most-relevant-first
    and may be an empty list if nothing cleared MIN_SIMILARITY.
    """
    contents = [_topic_text(post) for post in posts]

    if not any(contents):
        return [{"id": post.get("id"), "topics": []} for post in posts]

    topic_names = list(TOPIC_TAXONOMY.keys())
    topic_docs = list(TOPIC_TAXONOMY.values())

    # Fit one vectorizer over posts + taxonomy docs together so both sides
    # land in the same vector space and share IDF weighting.
    vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
    combined_matrix = vectorizer.fit_transform(contents + topic_docs)

    post_vectors = combined_matrix[: len(contents)]
    topic_vectors = combined_matrix[len(contents) :]

    # Shape: (n_posts, n_topics)
    similarity_matrix = cosine_similarity(post_vectors, topic_vectors)

    results: list[dict[str, Any]] = []
    for index, post in enumerate(posts):
        scored_topics = _filter_scored_topics(
            sorted(
                zip(topic_names, similarity_matrix[index]),
                key=lambda pair: pair[1],
                reverse=True,
            ),
            contents[index],
        )
        top_topics = [
            name
            for name, score in scored_topics[:MAX_TOPICS_PER_POST]
            if score >= MIN_SIMILARITY
        ]

        if not top_topics and contents[index]:
            best_name, best_score = scored_topics[0]
            top_topics = [best_name if best_score >= MIN_FALLBACK_SIMILARITY else GENERAL_TOPIC]

        results.append({"id": post.get("id"), "topics": top_topics})

    return results


def aggregate_topics(topic_results: list[dict[str, Any]], top_n: int = 3) -> list[tuple[str, int]]:
    """Roll up per-post topic lists into the overall top-N topics for a user.

    Flattens every post's topic list and counts frequency -- a post
    tagged with 2 topics contributes to both counts. Returns
    [(topic_name, count), ...] sorted by count descending.
    """
    counter: Counter[str] = Counter()
    for result in topic_results:
        counter.update(result.get("topics", []))
    return counter.most_common(top_n)


if __name__ == "__main__":
    # Quick manual sanity check, mirrors sentiment_service.py's __main__.
    sample_posts = [
        {"id": "1", "content": "Just booked flights for our summer vacation to Japan!"},
        {"id": "2", "content": "Finally shipped the new app update after weeks of coding"},
        {"id": "3", "content": "Hit a new personal best at the gym this morning, felt great"},
        {"id": "4", "content": "asdkj random text with no clear topic 12345"},
    ]
    results = assign_topics(sample_posts)
    for row in results:
        print(row)
    print("\nTop topics overall:", aggregate_topics(results))
