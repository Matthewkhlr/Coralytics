"""
Lightweight checks for topic assignment behavior.

Run from backend/:
    python -m app.services.verify_topic_integration
"""

from __future__ import annotations

from app.services.topic_service import assign_topics, list_assignable_topics


def main() -> None:
    assignable = list_assignable_topics()
    assert "technology" in assignable
    assert "career" in assignable
    assert "general" in assignable

    posts = [
        {
            "id": "1",
            "content": "Just shipped a new app feature after a week of coding.",
            "hashtags": ["tech", "launch"],
            "platform": "linkedin",
        },
        {
            "id": "2",
            "content": "Beautiful hike by the beach this weekend.",
            "hashtags": ["travel", "outdoors"],
            "platform": "instagram",
        },
        {
            "id": "3",
            "content": "zqxv plern miblo tarsk",
            "platform": "sample",
        },
    ]

    results = assign_topics(posts)
    assert len(results) == len(posts)
    assert all(result["topics"] for result in results)
    assert all(topic in assignable for result in results for topic in result["topics"])
    assert results[2]["topics"] == ["general"]

    for result in results:
        print(result)
    print("Assignable topics:", ", ".join(assignable))
    print("Topic integration checks passed.")


if __name__ == "__main__":
    main()
