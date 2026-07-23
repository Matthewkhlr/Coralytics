from __future__ import annotations

import unittest

from app.ingestion.instagram import _extract_engagement


class InstagramEngagementTests(unittest.TestCase):
    def test_extract_engagement_top_level_likes(self) -> None:
        entry = {"likes": 42, "title": "hello"}
        self.assertEqual(_extract_engagement(entry), 42)

    def test_extract_engagement_nested_media(self) -> None:
        entry = {
            "media": [
                {"uri": "photo.jpg"},
                {"like_count": 128},
            ],
        }
        self.assertEqual(_extract_engagement(entry), 128)

    def test_extract_engagement_missing_returns_none(self) -> None:
        self.assertIsNone(_extract_engagement({"title": "no likes here"}))


if __name__ == "__main__":
    unittest.main()
