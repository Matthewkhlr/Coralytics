from __future__ import annotations

from dataclasses import asdict
from pathlib import Path
from tempfile import NamedTemporaryFile
from typing import Any

from app.ingestion import ingest_path
from app.ingestion.schema import NormalizedPost

ALLOWED_EXTENSIONS = {".zip", ".json", ".csv"}


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


def ingest_upload(content: bytes, filename: str) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    """Write an uploaded export to a temp file and run the ingestion pipeline."""
    safe_name = _safe_filename(filename)
    suffix = Path(safe_name).suffix.lower()

    if suffix not in ALLOWED_EXTENSIONS:
        raise ValueError("Upload must be a .zip, .json, or .csv export file")

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
