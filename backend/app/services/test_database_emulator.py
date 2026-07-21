"""Emulator-backed integration tests for database refinement.

Requires FIRESTORE_EMULATOR_HOST (and optionally the Auth emulator).
Skip cleanly when emulators are not running.
"""

from __future__ import annotations

import os
import unittest
from datetime import datetime, timedelta, timezone

from app.config import get_settings


def _emulators_available() -> bool:
    return bool(os.getenv("FIRESTORE_EMULATOR_HOST"))


@unittest.skipUnless(_emulators_available(), "Firestore emulator not configured")
class DatabaseEmulatorTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        get_settings.cache_clear()
        from app.firebase import init_firebase

        init_firebase()

    def setUp(self) -> None:
        self.user_id = f"test-user-{os.getpid()}"

    def test_username_claim_change_and_resolve(self) -> None:
        from app.services import username_service

        suffix = f"{os.getpid()}{int(datetime.now(timezone.utc).timestamp())}"
        first = f"reef_{suffix}"[:20]
        second = f"coral_{suffix}"[:20]

        username_service.claim(first, uid=self.user_id, email="reef@example.com")
        self.assertFalse(username_service.is_available(first))
        resolved = username_service.resolve_login_email(first)
        self.assertEqual(resolved["email"], "reef@example.com")

        username_service.change(
            uid=self.user_id,
            email="reef@example.com",
            new_username=second,
            old_username=first,
        )
        self.assertTrue(username_service.is_available(first))
        self.assertFalse(username_service.is_available(second))

        with self.assertRaises(username_service.UsernameError):
            username_service.claim(
                second, uid="other-user", email="other@example.com"
            )

    def test_upload_lifecycle_dedupe_posts_and_delete(self) -> None:
        from app.services import firestore_service, posts_service, raw_data_service

        raw_files = [
            {
                "path": "posts.json",
                "content_type": "application/json",
                "size_bytes": 20,
                "content": "[]",
            }
        ]
        posts = [
            {
                "id": "instagram:1",
                "platform": "instagram",
                "content": "hello reef",
                "created_at": "2024-01-01T00:00:00+00:00",
                "post_type": "post",
                "hashtags": [],
            }
        ]
        content = b"sample-export-bytes"
        upload = firestore_service.save_upload_with_posts(
            user_id=self.user_id,
            filename="export.zip",
            posts=posts,
            platform="instagram",
            ingest_report={"total_posts": 1},
            raw_files=raw_files,
            content_hash="abc123hash",
            original_bytes=content,
        )
        self.assertEqual(upload.get("status"), "ready")
        self.assertEqual(int(upload.get("schema_version") or 0), 2)
        self.assertTrue(upload.get("has_normalized_posts"))
        self.assertTrue(posts_service.has_normalized_posts(self.user_id, upload["upload_id"]))

        dup = firestore_service.save_upload_with_posts(
            user_id=self.user_id,
            filename="export.zip",
            posts=posts,
            platform="instagram",
            ingest_report={"total_posts": 1},
            raw_files=raw_files,
            content_hash="abc123hash",
            original_bytes=content,
        )
        self.assertTrue(dup.get("is_duplicate"))

        listed = firestore_service.list_uploads(self.user_id, limit=10)
        self.assertTrue(any(row["upload_id"] == upload["upload_id"] for row in listed))

        page, _ = firestore_service.list_upload_posts(
            self.user_id, upload["upload_id"], limit=10
        )
        self.assertEqual(len(page), 1)

        deleted = raw_data_service.delete_raw_upload(self.user_id, upload["upload_id"])
        self.assertTrue(deleted["deleted"])

    def test_share_expiry_and_revoke(self) -> None:
        from app.services import analysis_store_service, firestore_service, share_service

        saved = analysis_store_service.save_analysis(
            self.user_id,
            {
                "name": "run",
                "post_count": 1,
                "sentiment_summary": {"compound": 0.1},
                "topics": [],
                "organism_data": {"accountAgeDays": 1, "topics": [], "posts": []},
                "post_insights": [
                    {
                        "id": "p1",
                        "platform": "instagram",
                        "post_type": "post",
                        "content": "hello",
                    }
                ],
            },
            upload_ids=[],
        )
        share = share_service.create_share(
            self.user_id, saved["analysis_id"], expiry_days=1
        )
        public = share_service.get_public_share(share["token"])
        self.assertNotIn("user_id", public)

        # Force expiry
        firestore_service._shares_collection().document(share["token"]).set(
            {
                "expires_at": datetime.now(timezone.utc) - timedelta(days=1),
                "expire_at": datetime.now(timezone.utc) - timedelta(days=1),
            },
            merge=True,
        )
        with self.assertRaises(KeyError):
            share_service.get_public_share(share["token"])

        # Create another and revoke
        share2 = share_service.create_share(
            self.user_id, saved["analysis_id"], expiry_days=7
        )
        share_service.revoke_share(self.user_id, share2["token"])
        with self.assertRaises(KeyError):
            share_service.get_public_share(share2["token"])

        analysis_store_service.delete_analysis(self.user_id, saved["analysis_id"])

    def test_migration_dry_run_and_apply(self) -> None:
        from app.services import migration_service, raw_data_service

        # Create a legacy-like upload (v1 files only), then migrate.
        upload = raw_data_service.save_raw_upload(
            self.user_id,
            "legacy.json",
            [
                {
                    "path": "posts.json",
                    "content_type": "application/json",
                    "size_bytes": 2,
                    "content": "[]",
                }
            ],
            platform="instagram",
            ingest_report={"total_posts": 0},
            content_hash="legacyhash1",
            posts=None,
            keep_legacy_files=True,
            original_bytes=None,
        )
        # Downgrade markers to simulate v1
        raw_data_service.update_raw_upload_metadata(
            self.user_id,
            upload["upload_id"],
            schema_version=1,
            has_normalized_posts=False,
        )

        dry = migration_service.migrate_upload(
            self.user_id, upload["upload_id"], dry_run=True
        )
        self.assertEqual(dry["status"], "dry_run")

        applied = migration_service.migrate_upload(
            self.user_id, upload["upload_id"], dry_run=False
        )
        self.assertEqual(applied["status"], "migrated")
        meta = raw_data_service.get_raw_upload_metadata(self.user_id, upload["upload_id"])
        self.assertEqual(int(meta.get("schema_version") or 0), 2)
        self.assertTrue(meta.get("has_normalized_posts"))
        self.assertTrue((meta.get("object_storage") or {}).get("object_path"))

        raw_data_service.delete_raw_upload(self.user_id, upload["upload_id"])


if __name__ == "__main__":
    unittest.main()
