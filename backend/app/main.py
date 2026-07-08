import os
from contextlib import asynccontextmanager
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.config import get_settings
from app.firebase import init_firebase
# CHANGED: added analysis_service to power the real /analyze endpoint below.
from app.services import analysis_service, firestore_service, ingestion_service, seed_service

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "..", ".env"))


class Post(BaseModel):
    platform: str
    content: str
    created_at: str | None = None


class AnalysisRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    # CHANGED: posts/upload_ids are kept for backwards compatibility with
    # any existing callers, but are no longer used -- /analyze now always
    # analyzes the user's ENTIRE post history (see analysis_service.py).
    # Left in place rather than removed so this isn't a breaking schema
    # change for anyone already calling this endpoint.
    posts: list[Post] = Field(default_factory=list)
    upload_ids: list[str] = Field(default_factory=list)
    persist: bool = True


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_firebase()
    yield


settings = get_settings()

app = FastAPI(title="Coralytics API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# CHANGED: _posts_from_uploads removed -- it's no longer called anywhere.
# analysis_service.run_user_analysis() now fetches a user's entire post
# history itself via firestore_service.list_all_user_posts(), which
# supersedes this helper's job of assembling posts from specific
# upload_ids.


ALLOWED_FIXTURES = frozenset({"instagram_posts_1.json", "linkedin_shares.csv"})


def _fixture_search_dirs() -> list[Path]:
    backend_dir = Path(__file__).resolve().parent
    repo_root = backend_dir.parent.parent
    return [
        backend_dir / "ingestion" / "sample_data",
        repo_root / "test" / "fixtures",
    ]


def _resolve_fixture_path(fixture_name: str) -> Path:
    safe_name = Path(fixture_name).name
    if safe_name not in ALLOWED_FIXTURES:
        raise HTTPException(status_code=400, detail=f"Unknown fixture: {fixture_name}")

    for directory in _fixture_search_dirs():
        candidate = directory / safe_name
        if candidate.is_file():
            return candidate

    raise HTTPException(status_code=404, detail=f"Fixture not found: {safe_name}")


def _ingest_and_save_upload(
    user_id: str,
    content: bytes,
    filename: str,
    platform: str | None = None,
) -> dict[str, object]:
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    if len(content) > settings.max_upload_size_bytes:
        limit_mb = settings.max_upload_size_bytes // (1024 * 1024)
        raise HTTPException(status_code=400, detail=f"File exceeds {limit_mb} MB limit")

    safe_filename = filename.replace("/", "_").replace("\\", "_")

    try:
        posts, ingest_report = ingestion_service.ingest_upload(content, safe_filename)
        resolved_platform = (platform or ingestion_service.derive_platform(posts)).lower().strip()
        return firestore_service.save_upload_with_posts(
            user_id=user_id,
            filename=safe_filename,
            posts=posts,
            platform=resolved_platform,
            ingest_report=ingest_report,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Upload failed: {exc}") from exc


@app.get("/health")
def health() -> dict[str, str | bool]:
    return {
        "status": "ok",
        "firebase_project": settings.firebase_project_id,
        "use_emulators": settings.use_emulators,
    }


@app.post("/uploads")
async def upload_export(
    user_id: str = Form(...),
    file: UploadFile = File(...),
    platform: str | None = Form(default=None),
) -> dict[str, object]:
    """Ingest a platform export (.zip, .json, or .csv) and persist normalized posts to Firestore."""
    content = await file.read()
    filename = file.filename or "export"
    return _ingest_and_save_upload(user_id, content, filename, platform)


@app.post("/seed/sample-data")
async def seed_sample_data(
    user_id: str = Form(default="demo-user"),
    run_analysis: bool = Form(default=True),
) -> dict[str, object]:
    """Ingest all bundled sample exports and optionally create a stub analysis."""
    if not settings.allow_seed_endpoint:
        raise HTTPException(
            status_code=403,
            detail="Seed endpoint disabled. Use emulators, set SEED_ENDPOINT_ENABLED=1, or run: python -m app.seed",
        )

    try:
        return seed_service.seed_sample_data(user_id, run_analysis=run_analysis)
    except (FileNotFoundError, ValueError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Seed failed: {exc}") from exc


@app.post("/uploads/fixture")
async def upload_fixture(
    user_id: str = Form(...),
    fixture_name: str = Form("instagram_posts_1.json"),
    platform: str | None = Form(default=None),
) -> dict[str, object]:
    """Ingest a bundled sample export from disk. Allowed only when using Firebase emulators."""
    if not settings.use_emulators:
        raise HTTPException(
            status_code=403,
            detail="Fixture uploads are only allowed when FIRESTORE_EMULATOR_HOST is set",
        )

    fixture_path = _resolve_fixture_path(fixture_name)
    return _ingest_and_save_upload(user_id, fixture_path.read_bytes(), fixture_path.name, platform)


@app.get("/uploads/{user_id}")
def list_user_uploads(user_id: str) -> dict[str, list[dict[str, object]]]:
    """List upload metadata for a user."""
    try:
        uploads = firestore_service.list_uploads(user_id)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to list uploads: {exc}") from exc

    return {"uploads": uploads}


@app.get("/uploads/{user_id}/{upload_id}")
def get_user_upload(user_id: str, upload_id: str) -> dict[str, object]:
    """Get metadata for a single upload."""
    try:
        return firestore_service.get_upload_metadata(user_id, upload_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@app.get("/uploads/{user_id}/{upload_id}/posts")
def get_user_upload_posts(
    user_id: str,
    upload_id: str,
    limit: int = Query(default=100, ge=1, le=500),
    cursor: str | None = Query(default=None),
) -> dict[str, object]:
    """List parsed posts for a single upload."""
    try:
        posts, next_cursor = firestore_service.list_upload_posts(
            user_id,
            upload_id,
            limit=limit,
            start_after=cursor,
        )
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to list posts: {exc}") from exc

    return {"posts": posts, "next_cursor": next_cursor}


@app.post("/analyze")
def analyze_posts(payload: AnalysisRequest) -> dict[str, object]:
    """Run sentiment + topic analysis over a user's ENTIRE post history
    (every upload, every platform) and optionally persist results.

    CHANGED: this used to run a placeholder stub over only the posts/
    upload_ids passed in the request body. It now delegates to
    analysis_service.run_user_analysis(), which pulls every post the
    user has ever uploaded (via firestore_service.list_all_user_posts),
    scores sentiment with VADER and topics via the taxonomy classifier,
    and persists both an aggregate analysis document and per-post
    sentiment/topic fields. payload.posts / payload.upload_ids are no
    longer read here -- see the AnalysisRequest comment above.
    """
    try:
        return analysis_service.run_user_analysis(payload.user_id, persist=payload.persist)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {exc}") from exc


@app.get("/analyses/{user_id}")
def list_user_analyses(user_id: str) -> dict[str, list[dict[str, object]]]:
    """List analysis results for a user."""
    try:
        analyses = firestore_service.list_analyses(user_id)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to list analyses: {exc}") from exc

    return {"analyses": analyses}


@app.get("/analyses/{user_id}/{analysis_id}")
def get_user_analysis(user_id: str, analysis_id: str) -> dict[str, object]:
    """Get a single analysis result."""
    try:
        return firestore_service.get_analysis(user_id, analysis_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc