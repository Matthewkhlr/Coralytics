from __future__ import annotations

import io
import zipfile
from pathlib import Path
from typing import Any

from app.services import firestore_service, ingestion_service

SAMPLE_DATA_DIR = Path(__file__).resolve().parent.parent / "ingestion" / "sample_data"
SAMPLE_ZIP_NAME = "coralytics_sample_data.zip"


def build_sample_data_zip(sample_dir: Path | None = None) -> bytes:
    """Zip every file in sample_data/ for ingestion as a mixed platform export."""
    directory = sample_dir or SAMPLE_DATA_DIR
    if not directory.is_dir():
        raise FileNotFoundError(f"Sample data directory not found: {directory}")

    files = sorted(path for path in directory.iterdir() if path.is_file())
    if not files:
        raise ValueError(f"No sample data files found in {directory}")

    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w", zipfile.ZIP_DEFLATED) as archive:
        for path in files:
            archive.write(path, path.name)

    return buffer.getvalue()


def _stub_analysis(post_count: int) -> dict[str, Any]:
    return {
        "post_count": post_count,
        "topics": [],
        "sentiment_summary": None,
        "organism_data": {
            "accountAgeDays": 0,
            "topics": [],
        },
    }


def seed_sample_data(
    user_id: str,
    *,
    run_analysis: bool = True,
    sample_dir: Path | None = None,
) -> dict[str, Any]:
    """Ingest all bundled sample exports and optionally persist a stub analysis."""
    zip_bytes = build_sample_data_zip(sample_dir)
    posts, ingest_report = ingestion_service.ingest_upload(zip_bytes, SAMPLE_ZIP_NAME)
    platform = ingestion_service.derive_platform(posts)

    upload = firestore_service.save_upload_with_posts(
        user_id=user_id,
        filename=SAMPLE_ZIP_NAME,
        posts=posts,
        platform=platform,
        ingest_report=ingest_report,
    )

    result: dict[str, Any] = {
        "user_id": user_id,
        "upload_id": upload["upload_id"],
        "post_count": upload["post_count"],
        "comment_count": upload["comment_count"],
        "platform": upload["platform"],
        "filename": upload["filename"],
        "ingest_report": upload.get("ingest_report", {}),
    }

    if run_analysis:
        analysis = firestore_service.save_analysis(
            user_id=user_id,
            analysis=_stub_analysis(upload["post_count"]),
            upload_ids=[upload["upload_id"]],
        )
        result["analysis_id"] = analysis["analysis_id"]
        result["analysis"] = analysis

    return result
