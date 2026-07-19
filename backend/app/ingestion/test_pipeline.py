"""
Lightweight checks for the security/fallback/privacy properties of the
ingestion pipeline. Not a full test suite (no pytest dependency assumed)
-- just plain asserts, runnable as a script:

    python -m app.ingestion.test_pipeline

Covers:
  - SECURITY: zip-slip rejection, oversized-file rejection, content
    length clamping.
  - FALLBACK: a corrupt file, an unrecognized file, and an empty file
    don't abort processing of the rest of a batch.
  - PRIVACY: files under excluded paths (messages/, likes/, ads_*, ...)
    are never opened/parsed, even if their content would otherwise look
    like a valid post.
  - PROCESS: a folder with mixed Instagram/LinkedIn/Reddit/generic files
    is correctly auto-detected and merged, and posts vs comments are
    correctly split in "separate" mode.
"""

from __future__ import annotations

import json
import tempfile
import zipfile
from pathlib import Path

from .ingest import MAX_FILE_SIZE, ingest_path, write_json_outputs
from .schema import (
    MAX_CONTENT_LENGTH,
    NormalizedPost,
    Platform,
    PostType,
    finalize_posts,
)


def _write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def test_zip_slip_rejected() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        zip_path = Path(tmp) / "evil.zip"
        with zipfile.ZipFile(zip_path, "w") as zf:
            zf.writestr("../../escaped.txt", "pwned")

        result = ingest_path(zip_path)

        assert result.posts == [], "Unsafe zip should yield zero posts"
        assert any("Unsafe path" in w for w in result.warnings), (
            "Expected an 'Unsafe path' warning, got: " + repr(result.warnings)
        )
        # Confirm nothing escaped onto the real filesystem.
        assert not (Path(tmp).parent / "escaped.txt").exists()
    print("PASS: zip_slip_rejected")


def test_oversized_file_skipped() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp) / "export"
        big = root / "huge.json"
        _write(big, "[" + ("1," * (MAX_FILE_SIZE // 2)) + "1]")
        assert big.stat().st_size > MAX_FILE_SIZE

        result = ingest_path(root)

        assert any(f.kind == "skipped" for f in result.files)
        assert any("exceeds per-file limit" in w for w in result.warnings)
    print("PASS: oversized_file_skipped")


def test_content_length_clamped() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp) / "export"
        data = [{"platform": "sample", "content": "A" * 50_000, "created_at": "2024-01-01"}]
        _write(root / "big_post.json", json.dumps(data))

        result = ingest_path(root)

        assert len(result.posts) == 1
        assert len(result.posts[0].content) <= MAX_CONTENT_LENGTH
    print("PASS: content_length_clamped")


def test_overlapping_exports_deduplicate_by_content_identity() -> None:
    """Filename/row-derived ids must not duplicate the same exported post."""
    shared = {
        "platform": Platform.instagram,
        "content": "The same post from two exports",
        "created_at": "2024-01-01T12:00:00Z",
        "post_type": PostType.post,
    }
    posts = finalize_posts(
        [
            NormalizedPost(id="instagram:posts_1-0", **shared),
            NormalizedPost(id="instagram:renamed_export-42", **shared),
        ]
    )

    assert len(posts) == 1, f"Expected one unique post, got {len(posts)}"
    print("PASS: overlapping_exports_deduplicate_by_content_identity")


def test_corrupt_and_unknown_files_dont_abort_batch() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp) / "export"
        _write(root / "broken.json", "{not valid json")
        _write(root / "unrecognized.json", json.dumps([{"foo": "bar"}]))
        _write(root / "empty.json", "")
        _write(
            root / "good_linkedin.csv",
            "Date,ShareLink,ShareCommentary,SharedUrl,MediaUrl,Visibility\n"
            '2024-01-01,https://x,"A real post here",,,PUBLIC\n',
        )

        result = ingest_path(root)

        assert len(result.posts) == 1, f"Expected 1 valid post, got {len(result.posts)}"
        kinds = {f.path: f.kind for f in result.files}
        assert kinds["broken.json"] == "error"
        assert kinds["unrecognized.json"] == "unknown"
        assert kinds["empty.json"] == "empty"
        assert kinds["good_linkedin.csv"] == "linkedin"
    print("PASS: corrupt_and_unknown_files_dont_abort_batch")


def test_private_paths_excluded() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp) / "export"

        # A DM that, content-wise, looks just like a valid generic post --
        # this must still be excluded purely because of its path.
        _write(
            root / "messages" / "inbox" / "someone_123" / "message_1.json",
            json.dumps(
                {
                    "messages": [
                        {"sender_name": "Someone", "content": "private dm text", "timestamp_ms": 123}
                    ]
                }
            ),
        )
        _write(root / "likes" / "liked_posts.json", json.dumps([{"content": "liked something"}]))
        _write(
            root / "media" / "posts_1.json",
            json.dumps([{"title": "A real public post #hi", "creation_timestamp": 1700000000}]),
        )

        result = ingest_path(root)

        assert len(result.posts) == 1
        assert result.posts[0].content == "A real public post #hi"

        excluded_paths = {f.path for f in result.files if f.kind == "excluded"}
        assert any("messages" in p for p in excluded_paths)
        assert any("likes" in p for p in excluded_paths)
    print("PASS: private_paths_excluded")


def test_separate_mode_splits_posts_and_comments() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp) / "export"
        out = Path(tmp) / "out"
        _write(
            root / "posts_1.json",
            json.dumps([{"title": "a post", "creation_timestamp": 1700000000}]),
        )
        _write(
            root / "post_comments_1.json",
            json.dumps(
                {
                    "comments_media_comments": [
                        {
                            "string_map_data": {
                                "Comment": {"value": "a comment"},
                                "Time": {"timestamp": 1700000001},
                            }
                        }
                    ]
                }
            ),
        )

        result = ingest_path(root)
        written = write_json_outputs(result, out, mode="separate")

        posts_data = json.loads(written["posts"].read_text(encoding="utf-8"))
        comments_data = json.loads(written["comments"].read_text(encoding="utf-8"))

        assert posts_data["count"] == 1
        assert comments_data["count"] == 1
        assert posts_data["posts"][0]["content"] == "a post"
        assert comments_data["comments"][0]["content"] == "a comment"
    print("PASS: separate_mode_splits_posts_and_comments")


def test_instagram_label_values_posts() -> None:
    from app.ingestion.instagram import parse_instagram_export

    data = [
        {
            "timestamp": 1715940166,
            "media": [],
            "label_values": [
                {
                    "label": "Caption",
                    "value": "ORD LOH!!! Finally shipped.",
                },
                {
                    "label": "Update time",
                    "timestamp_value": 1723056145,
                },
            ],
        }
    ]
    posts = parse_instagram_export(data, id_prefix="posts")
    assert len(posts) == 1
    assert "ORD LOH" in posts[0].content
    print("PASS: instagram_label_values_posts")


def test_zip_skips_oversized_member() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        zip_path = Path(tmp) / "mixed.zip"
        root = Path(tmp) / "export"
        _write(
            root / "media" / "posts_1.json",
            json.dumps([{"title": "still ingested", "creation_timestamp": 1700000000}]),
        )
        big = root / "media" / "huge_posts.json"
        _write(big, "[" + ("1," * (MAX_FILE_SIZE // 2)) + "1]")

        with zipfile.ZipFile(zip_path, "w") as zf:
            for path in root.rglob("*"):
                if path.is_file():
                    zf.write(path, path.relative_to(root).as_posix())

        result = ingest_path(zip_path)
        assert len(result.posts) == 1
        assert result.posts[0].content == "still ingested"
        assert any("Skipped oversized" in w for w in result.warnings)
    print("PASS: zip_skips_oversized_member")


def main() -> None:
    test_zip_slip_rejected()
    test_oversized_file_skipped()
    test_content_length_clamped()
    test_overlapping_exports_deduplicate_by_content_identity()
    test_corrupt_and_unknown_files_dont_abort_batch()
    test_private_paths_excluded()
    test_separate_mode_splits_posts_and_comments()
    test_instagram_label_values_posts()
    test_zip_skips_oversized_member()
    print("\nAll checks passed.")


if __name__ == "__main__":
    main()
