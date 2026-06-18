import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.config import get_settings
from app.firebase import init_firebase
from app.services import firestore_service, parser_service

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))


class Post(BaseModel):
    platform: str
    content: str
    created_at: str | None = None


class AnalysisRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
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


def _posts_from_uploads(user_id: str, upload_ids: list[str]) -> list[dict[str, object]]:
    posts: list[dict[str, object]] = []
    for upload_id in upload_ids:
        posts.extend(firestore_service.list_upload_posts(user_id, upload_id))
    return posts


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
    platform: str = Form(...),
    file: UploadFile = File(...),
) -> dict[str, object]:
    """Parse a platform export in memory and persist posts to Firestore."""
    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    if len(content) > settings.max_upload_size_bytes:
        limit_mb = settings.max_upload_size_bytes // (1024 * 1024)
        raise HTTPException(status_code=400, detail=f"File exceeds {limit_mb} MB limit")

    try:
        posts = parser_service.parse_export(
            platform=platform,
            content=content,
            filename=file.filename or "export",
        )
        metadata = firestore_service.save_upload_with_posts(
            user_id=user_id,
            platform=platform.lower().strip(),
            filename=(file.filename or "export").replace("/", "_").replace("\\", "_"),
            posts=posts,
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Upload failed: {exc}") from exc

    return metadata


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
def get_user_upload_posts(user_id: str, upload_id: str) -> dict[str, list[dict[str, object]]]:
    """List parsed posts for a single upload."""
    try:
        posts = firestore_service.list_upload_posts(user_id, upload_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to list posts: {exc}") from exc

    return {"posts": posts}


@app.post("/analyze")
def analyze_posts(payload: AnalysisRequest) -> dict[str, object]:
    """Run placeholder analysis and optionally persist results to Firestore."""
    posts = [post.model_dump() for post in payload.posts]
    if not posts and payload.upload_ids:
        posts = _posts_from_uploads(payload.user_id, payload.upload_ids)

    if not posts:
        raise HTTPException(status_code=400, detail="No posts provided for analysis")

    # TODO: Add VADER sentiment, TF-IDF clustering.
    result: dict[str, object] = {
        "post_count": len(posts),
        "topics": [],
        "sentiment_summary": None,
        "organism_data": {
            "accountAgeDays": 0,
            "topics": [],
        },
    }

    if not payload.persist:
        return result

    try:
        saved = firestore_service.save_analysis(
            user_id=payload.user_id,
            analysis=result,
            upload_ids=payload.upload_ids,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to save analysis: {exc}") from exc

    return saved


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
