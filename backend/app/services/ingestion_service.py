from __future__ import annotations

import json
from dataclasses import asdict
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Any

from app.ingestion import collect_raw_files, ingest_path, ingest_raw_records
from app.ingestion.detect import _unwrap_list
from app.ingestion.generic import parse_generic_posts
from app.ingestion.schema import NormalizedPost, finalize_posts, make_id

ALLOWED_EXTENSIONS = {".zip", ".json", ".csv", ".txt"}
_RELABELABLE_PLATFORMS = {"sample", "unknown", "", None}
METADATA_ONLY_WARNING = "METADATA_ONLY_EXPORT"
UNSUPPORTED_METADATA_MESSAGE = "Personal metadata only"


def _safe_filename(filename: str) -> str:
    return filename.replace("/", "_").replace("\\", "_") or "export"


def _posts_to_dicts(posts: list[NormalizedPost]) -> list[dict[str, Any]]:
    return [post.model_dump(mode="json") for post in posts]


def _build_ingest_report(result) -> dict[str, Any]:
    return {
        "total_posts": len(result.posts),
        "files": [asdict(file_report) for file_report in result.files],
        "warnings": result.warnings,
    }


def derive_platform(posts: list[dict[str, Any]]) -> str:
    """Return a single platform label or 'mixed' when multiple sources are present."""
    if not posts:
        return "mixed"

    platforms = {post.get("platform") for post in posts if post.get("platform")}
    if len(platforms) == 1:
        return next(iter(platforms))
    return "mixed"


def infer_platform_from_skip_files(ingest_report: dict[str, Any]) -> str | None:
    """Infer platform when upload files were recognized but have no analyzable posts."""
    files = ingest_report.get("files") or []
    if not files:
        return None

    kinds = [str(item.get("kind") or "") for item in files if isinstance(item, dict)]
    if not kinds:
        return None

    if all(kind in {"linkedin", "linkedin_skip"} for kind in kinds) and any(
        kind == "linkedin_skip" for kind in kinds
    ):
        return "linkedin"
    if all(kind in {"reddit", "reddit_skip"} for kind in kinds) and any(
        kind == "reddit_skip" for kind in kinds
    ):
        return "reddit"
    return None


def relabel_posts_platform(posts: list[dict[str, Any]], platform: str) -> list[dict[str, Any]]:
    """Stamp a user-selected platform onto sample/unknown posts."""
    hint = (platform or "").lower().strip()
    if not hint or not posts:
        return posts

    relabeled: list[dict[str, Any]] = []
    for post in posts:
        current = post.get("platform")
        if current not in _RELABELABLE_PLATFORMS:
            relabeled.append(post)
            continue

        raw_id = str(post.get("id") or "").split(":", 1)[-1] or str(len(relabeled))
        updated = dict(post)
        updated["platform"] = hint
        updated["id"] = make_id(hint, raw_id)
        relabeled.append(updated)
    return relabeled


def force_posts_platform(posts: list[dict[str, Any]], platform: str) -> list[dict[str, Any]]:
    """Override platform on every post after the user confirms a source."""
    hint = (platform or "").lower().strip()
    if not hint or not posts:
        return posts

    relabeled: list[dict[str, Any]] = []
    for post in posts:
        raw_id = str(post.get("id") or "").split(":", 1)[-1] or str(len(relabeled))
        updated = dict(post)
        updated["platform"] = hint
        updated["id"] = make_id(hint, raw_id)
        relabeled.append(updated)
    return relabeled


def force_generic_with_platform(
    raw_files: list[dict[str, Any]],
    platform: str,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    """Last-resort parse: treat JSON lists as generic posts with a platform hint."""
    hint = (platform or "").lower().strip() or "sample"
    all_posts: list[NormalizedPost] = []
    files: list[dict[str, Any]] = []
    warnings: list[str] = []

    for item in raw_files:
        path = str(item.get("path") or "file")
        suffix = Path(path).suffix.lower()
        if suffix != ".json":
            files.append({"path": path, "kind": "unknown", "post_count": 0})
            continue

        try:
            data = json.loads(str(item.get("content") or ""))
        except json.JSONDecodeError as exc:
            warnings.append(f"Invalid JSON in {path}: {exc}")
            files.append({"path": path, "kind": "error", "post_count": 0})
            continue

        entries = [e for e in _unwrap_list(data) if isinstance(e, dict)]
        posts = parse_generic_posts(entries, default_platform=hint)
        all_posts.extend(posts)
        kind = "generic" if posts else "unknown"
        files.append({"path": path, "kind": kind, "post_count": len(posts)})
        if not posts:
            warnings.append(
                f"No posts/comments recognized in {path} even with platform hint ({hint})"
            )

    finalized = finalize_posts(all_posts)
    report = {
        "total_posts": len(finalized),
        "files": files,
        "warnings": warnings,
    }
    return _posts_to_dicts(finalized), report


def extract_raw_upload(content: bytes, filename: str) -> tuple[list[dict[str, Any]], list[str]]:
    """Extract raw export files from an upload for storage in DB1."""
    from app.ingestion.ingest import _is_excluded_path

    safe_name = _safe_filename(filename)
    suffix = Path(safe_name).suffix.lower()

    if suffix not in ALLOWED_EXTENSIONS:
        raise ValueError("Unsupported format")

    # Reject known personal-metadata exports by name before unpacking.
    if _is_excluded_path(Path(safe_name)):
        return [], [METADATA_ONLY_WARNING]

    with NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        tmp.write(content)
        tmp_path = Path(tmp.name)

    try:
        records, warnings = collect_raw_files(tmp_path)
    finally:
        tmp_path.unlink(missing_ok=True)

    raw_files = [
        {
            "path": record.path,
            "content": record.content,
            "content_type": record.content_type,
            "size_bytes": record.size_bytes,
        }
        for record in records
    ]
    return raw_files, warnings


def ingest_raw_files(
    raw_files: list[dict[str, Any]],
    *,
    require_posts: bool = True,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    """Parse normalized posts from raw export files read out of DB1."""
    from app.ingestion.ingest import RawFileRecord

    if not raw_files:
        if require_posts:
            raise ValueError("No raw export files were found for this upload")
        return [], {"total_posts": 0, "files": [], "warnings": ["No raw export files found"]}

    records = [
        RawFileRecord(
            path=str(item["path"]),
            content=str(item["content"]),
            content_type=str(item.get("content_type") or "text/plain"),
            size_bytes=int(item.get("size_bytes") or len(str(item["content"]))),
        )
        for item in raw_files
    ]
    result = ingest_raw_records(records)
    posts = _posts_to_dicts(result.posts)
    report = _build_ingest_report(result)

    if require_posts and not posts:
        warning_text = "; ".join(report["warnings"]) or "No posts or comments were recognized in the upload"
        raise ValueError(warning_text)

    return posts, report


def ingest_upload(content: bytes, filename: str) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    """Write an uploaded export to a temp file and run the ingestion pipeline."""
    safe_name = _safe_filename(filename)
    suffix = Path(safe_name).suffix.lower()

    if suffix not in ALLOWED_EXTENSIONS:
        raise ValueError("Unsupported format")

    with NamedTemporaryFile(suffix=suffix, delete=False) as tmp:
        tmp.write(content)
        tmp_path = Path(tmp.name)

    try:
        result = ingest_path(tmp_path)
    finally:
        tmp_path.unlink(missing_ok=True)

    posts = _posts_to_dicts(result.posts)
    report = _build_ingest_report(result)

    if not posts:
        warning_text = "; ".join(report["warnings"]) or "No posts or comments were recognized in the upload"
        raise ValueError(warning_text)

    return posts, report
