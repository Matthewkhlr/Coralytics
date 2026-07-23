from __future__ import annotations

import unittest
from unittest.mock import patch

from app.services.source_summary_service import (
    build_source_summary,
    platforms_from_breakdown,
)


class SourceSummaryServiceTests(unittest.TestCase):
    @patch("app.services.source_summary_service.raw_data_service.get_raw_upload_metadata")
    def test_build_source_summary_scopes_to_analysis_upload_ids(self, get_metadata):
        get_metadata.side_effect = lambda _user_id, upload_id: {
            "ig": {
                "filename": "instagram.zip",
                "platform": "instagram",
                "post_count": 10,
            },
            "li": {
                "filename": "linkedin.zip",
                "platform": "linkedin",
                "post_count": 5,
            },
            "reddit": {
                "filename": "old_reddit.zip",
                "platform": "reddit",
                "post_count": 3,
            },
        }[upload_id]

        posts = [
            {"id": "1", "_upload_id": "ig"},
            {"id": "2", "_upload_id": "ig"},
        ]

        summary = build_source_summary("user-1", posts, ["ig", "li"])

        self.assertEqual(summary["upload_count"], 1)
        self.assertEqual(summary["platforms"], ["instagram"])
        self.assertEqual(summary["post_count"], 2)

    @patch("app.services.source_summary_service.raw_data_service.get_raw_upload_metadata")
    def test_build_source_summary_hydrates_from_upload_ids_without_posts(self, get_metadata):
        get_metadata.side_effect = lambda _user_id, upload_id: {
            "ig": {
                "filename": "instagram.zip",
                "platform": "instagram",
                "post_count": 4,
            },
            "li": {
                "filename": "linkedin.zip",
                "platform": "linkedin",
                "post_count": 3,
            },
        }[upload_id]

        summary = build_source_summary("user-1", [], ["ig", "li"])

        self.assertEqual(summary["upload_count"], 2)
        self.assertEqual(summary["platforms"], ["instagram", "linkedin"])
        self.assertEqual(summary["post_count"], 7)

    @patch("app.services.source_summary_service.raw_data_service.get_raw_upload_metadata")
    def test_build_source_summary_infers_platforms_for_mixed_upload(self, get_metadata):
        get_metadata.return_value = {
            "filename": "export.zip",
            "platform": "mixed",
            "post_count": 3,
        }

        posts = [
            {"id": "1", "upload_id": "mix", "platform": "instagram"},
            {"id": "2", "upload_id": "mix", "platform": "linkedin"},
        ]

        summary = build_source_summary("user-1", posts, ["mix"])

        self.assertEqual(summary["platforms"], ["instagram", "linkedin"])
        self.assertEqual(summary["upload_count"], 1)

    def test_platforms_from_breakdown_filters_supported_sources(self):
        platforms = platforms_from_breakdown(
            [
                {"platform": "instagram", "post_count": 10},
                {"platform": "sample", "post_count": 2},
                {"platform": "linkedin", "post_count": 4},
            ]
        )
        self.assertEqual(platforms, ["instagram", "linkedin"])


if __name__ == "__main__":
    unittest.main()
