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

from collections import Counter
from typing import Any

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

MAX_TOPICS_PER_POST = 3

# Below this cosine similarity, a topic isn't considered relevant enough
# to tag. Tune this if you find posts getting 0 topics too often (lower
# it) or getting weakly-related topics tagged (raise it).
MIN_SIMILARITY = 0.08

# Each value is a short bag of representative words/phrases for that
# category -- not exhaustive, just enough for TF-IDF to place the topic
# in a sensible region of the vector space. Add/adjust categories here
# as you see what topics actually show up in real demo data.
TOPIC_TAXONOMY: dict[str, str] = {
    "travel": "travel vacation trip flight airport hotel destination explore "
              "adventure tourism beach mountain journey abroad",
    "technology": "technology software app coding programming ai computer "
                  "tech startup gadget update device engineering",
    "food": "food recipe restaurant cooking meal dinner lunch coffee "
            "cuisine delicious taste kitchen chef",
    "fitness": "fitness workout gym exercise running training health diet "
               "muscle yoga marathon cardio strength",
    "career": "career job work office promotion interview resume hiring "
              "team colleague professional workplace manager",
    "relationships": "relationship family friend love partner marriage "
                      "dating wedding kids parenting husband wife",
    "finance": "finance money investing stock budget savings crypto "
               "market economy salary invest financial",
    "entertainment": "movie music concert show game entertainment film "
                      "series artist album streaming celebrity",
    "politics": "politics government election policy vote president law "
                "rights protest senate campaign",
    "education": "education school university student learning study "
                 "degree class course exam professor",
    "sports": "sports team match game player league championship score "
              "tournament coach athlete",
    "art": "art design creative painting photography drawing craft "
           "aesthetic gallery illustration",
}


def assign_topics(posts: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Assign up to MAX_TOPICS_PER_POST topics to each post.

    Returns one result per input post: {"id": ..., "topics": [...]}, in
    the same order as the input. `topics` is ordered most-relevant-first
    and may be an empty list if nothing cleared MIN_SIMILARITY.
    """
    contents = [(post.get("content") or "").strip() for post in posts]

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
        scored_topics = sorted(
            zip(topic_names, similarity_matrix[index]),
            key=lambda pair: pair[1],
            reverse=True,
        )
        top_topics = [
            name
            for name, score in scored_topics[:MAX_TOPICS_PER_POST]
            if score >= MIN_SIMILARITY
        ]
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
