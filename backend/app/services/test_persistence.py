"""Unit tests for persistence helpers, privacy filters, and username validation.

These tests do not require Firebase emulators.
"""

from __future__ import annotations

import unittest
from datetime import datetime, timezone

from app.models.persistence import (
    RECORD_STATUS_FAILED,
    RECORD_STATUS_READY,
    is_ready,
    parse_timestamp,
    serialize_record_for_api,
    with_v2_metadata,
)
from app.services import privacy_service, username_service


class PersistenceHelpersTest(unittest.TestCase):
    def test_parse_iso_and_datetime(self) -> None:
        iso = "2024-01-02T03:04:05+00:00"
        parsed = parse_timestamp(iso)
        assert parsed is not None
        self.assertEqual(parsed.year, 2024)
        self.assertEqual(parse_timestamp(parsed), parsed)

    def test_is_ready_defaults_legacy(self) -> None:
        self.assertTrue(is_ready({"upload_id": "x"}))
        self.assertTrue(is_ready({"status": RECORD_STATUS_READY}))
        self.assertFalse(is_ready({"status": RECORD_STATUS_FAILED}))
        self.assertFalse(is_ready(None))

    def test_with_v2_metadata(self) -> None:
        record = with_v2_metadata({"upload_id": "abc"}, status="pending")
        self.assertEqual(record["schema_version"], 2)
        self.assertEqual(record["status"], "pending")
        self.assertIsInstance(record["created_at"], datetime)

    def test_serialize_timestamps(self) -> None:
        now = datetime(2024, 5, 1, tzinfo=timezone.utc)
        out = serialize_record_for_api({"created_at": now, "name": "run"})
        self.assertTrue(str(out["created_at"]).startswith("2024-05-01"))
        self.assertEqual(out["name"], "run")


class PrivacyFilterTest(unittest.TestCase):
    def test_apply_share_filters_strips_internal_and_excerpts(self) -> None:
        analysis = {
            "user_id": "u1",
            "analysis_id": "a1",
            "upload_ids": ["up1"],
            "red_flags": {"flags": [{"id": 1}]},
            "post_insights": [
                {
                    "id": "p1",
                    "platform": "instagram",
                    "post_type": "post",
                    "content": "secret text",
                    "_upload_id": "up1",
                },
                {
                    "id": "p2",
                    "platform": "reddit",
                    "post_type": "comment",
                    "content": "comment text",
                    "_upload_id": "up1",
                },
                {
                    "id": "p3",
                    "platform": "linkedin",
                    "post_type": "post",
                    "content": "ok",
                    "_upload_id": "up1",
                },
            ],
            "organism_data": {
                "posts": [
                    {"id": "p1", "platform": "instagram", "post_type": "post"},
                    {"id": "p2", "platform": "reddit", "post_type": "comment"},
                ]
            },
            "platform_breakdown": [
                {"platform": "instagram", "post_count": 1},
                {"platform": "reddit", "post_count": 1},
            ],
        }
        privacy = {
            "include_comments": False,
            "exclude_flagged_from_share": True,
            "include_post_excerpts_in_share": False,
            "excluded_platforms": ["reddit"],
        }
        filtered = privacy_service.apply_share_filters(analysis, privacy)
        self.assertNotIn("user_id", filtered)
        self.assertNotIn("upload_ids", filtered)
        self.assertEqual(filtered["red_flags"]["flags"], [])
        insights = filtered["post_insights"]
        self.assertEqual(len(insights), 2)
        ids = {item["id"] for item in insights}
        self.assertEqual(ids, {"p1", "p3"})
        for item in insights:
            self.assertNotIn("content", item)
        self.assertTrue(filtered["privacy_applied"])
        platforms = {row["platform"] for row in filtered["platform_breakdown"]}
        self.assertEqual(platforms, {"instagram"})

    def test_include_excerpts_when_enabled(self) -> None:
        analysis = {
            "post_insights": [
                {
                    "id": "p1",
                    "platform": "instagram",
                    "post_type": "post",
                    "content": "visible",
                }
            ]
        }
        privacy = {
            "include_comments": True,
            "exclude_flagged_from_share": False,
            "include_post_excerpts_in_share": True,
            "excluded_platforms": [],
        }
        filtered = privacy_service.apply_share_filters(analysis, privacy)
        self.assertEqual(filtered["post_insights"][0]["content"], "visible")


class UsernameValidationTest(unittest.TestCase):
    def test_validate_and_normalize(self) -> None:
        self.assertEqual(username_service.validate_username("Alice_1"), "alice_1")
        with self.assertRaises(username_service.UsernameError):
            username_service.validate_username("ab")
        with self.assertRaises(username_service.UsernameError):
            username_service.validate_username("bad name!")


if __name__ == "__main__":
    unittest.main()
