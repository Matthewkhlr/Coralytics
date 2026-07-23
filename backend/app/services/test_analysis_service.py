from __future__ import annotations

import math
import unittest

from app.services.analysis_service import (
    _build_engagement_norm_map,
    _enrich_topics,
)


class AnalysisEngagementTests(unittest.TestCase):
    def test_build_engagement_norm_map_log_scales(self) -> None:
        posts = [
            {"id": "a", "engagement": 0},
            {"id": "b", "engagement": 9},
            {"id": "c", "engagement": 99},
            {"id": "d"},
        ]

        norm = _build_engagement_norm_map(posts)

        self.assertIsNone(norm["d"])
        self.assertEqual(norm["a"], 0.0)
        self.assertAlmostEqual(norm["b"], math.log1p(9) / math.log1p(99), places=4)
        self.assertEqual(norm["c"], 1.0)

    def test_enrich_topics_avg_engagement_and_comment_volume(self) -> None:
        scored = [
            {"id": "p1", "compound": 0.5},
            {"id": "p2", "compound": -0.2},
            {"id": "p3", "compound": 0.1},
        ]
        topic_results = [
            {"id": "p1", "topics": ["tech"]},
            {"id": "p2", "topics": ["tech", "life"]},
            {"id": "p3", "topics": ["life"]},
        ]
        posts_by_id = {
            "p1": {"id": "p1", "engagement": 10, "post_type": "post"},
            "p2": {"id": "p2", "engagement": 30, "post_type": "comment"},
            "p3": {"id": "p3", "post_type": "reply"},
        }

        topics = _enrich_topics(scored, topic_results, posts_by_id, top_n=3)

        by_name = {topic["name"]: topic for topic in topics}
        self.assertEqual(by_name["tech"]["postVolume"], 2)
        self.assertEqual(by_name["tech"]["avgEngagement"], 20.0)
        self.assertEqual(by_name["tech"]["commentVolume"], 1)
        self.assertEqual(by_name["life"]["postVolume"], 2)
        self.assertEqual(by_name["life"]["avgEngagement"], 30.0)
        self.assertEqual(by_name["life"]["commentVolume"], 2)


if __name__ == "__main__":
    unittest.main()
