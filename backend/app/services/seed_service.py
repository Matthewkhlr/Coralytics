from __future__ import annotations

import io
import zipfile
from pathlib import Path
from typing import Any

from app.services import analysis_service, firestore_service, ingestion_service

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


def seed_sample_data(
    user_id: str,
    *,
    run_analysis: bool = True,
    sample_dir: Path | None = None,
) -> dict[str, Any]:
    """Ingest all bundled sample exports and optionally persist a real analysis."""
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
        analysis = analysis_service.run_user_analysis(user_id, persist=True)
        result["analysis_id"] = analysis["analysis_id"]
        result["analysis"] = analysis

    return result
