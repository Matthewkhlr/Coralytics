import os
from contextlib import asynccontextmanager
from hashlib import sha256
from pathlib import Path
from typing import Annotated, Any

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, File, Form, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.auth import require_matching_user, verify_firebase_token
from app.config import get_settings
from app.firebase import init_firebase
from app.models.persistence import UPLOAD_PLATFORM_CHOICES
from app.services import (
    analysis_service,
    firestore_service,
    ingestion_service,
    privacy_service,
    seed_service,
    share_service,
    username_service,
)

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", "..", ".env"))

SPARSE_POST_THRESHOLD = 10


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
    name: str | None = Field(default=None, max_length=120)


class PrivacySettingsRequest(BaseModel):
    include_comments: bool | None = None
    exclude_flagged_from_share: bool | None = None
    include_post_excerpts_in_share: bool | None = None
    share_expiry_days: int | None = Field(default=None, ge=1, le=365)
    excluded_platforms: list[str] | None = None


class UploadPlatformUpdate(BaseModel):
    platform: str = Field(..., min_length=1)


class CreateShareRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    analysis_id: str = Field(..., min_length=1)
    expiry_days: int | None = Field(default=None, ge=1, le=365)


class UsernameClaimRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: str = Field(..., min_length=3)


class UsernameChangeRequest(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: str | None = None
    old_username: str | None = None


class UsernameLookupRequest(BaseModel):
    identifier: str = Field(..., min_length=1)


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

AuthUser = Annotated[str, Depends(verify_firebase_token)]


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


def _parse_bool_form(value: bool | str | None, *, default: bool = True) -> bool:
    if value is None:
        return default
    if isinstance(value, bool):
        return value
    return str(value).strip().lower() in {"1", "true", "yes", "on"}


def _ingest_and_save_upload(
    user_id: str,
    content: bytes,
    filename: str,
    platform: str | None = None,
    *,
    run_analysis: bool = True,
) -> dict[str, object]:
    if not content:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    if len(content) > settings.max_upload_size_bytes:
        limit_mb = settings.max_upload_size_bytes // (1024 * 1024)
        raise HTTPException(status_code=400, detail=f"File exceeds {limit_mb} MB limit")

    safe_filename = filename.replace("/", "_").replace("\\", "_")
    content_hash = sha256(content).hexdigest()

    existing_upload = firestore_service.find_upload_by_content_hash(user_id, content_hash)
    if existing_upload:
        duplicate = dict(existing_upload)
        duplicate["content_hash"] = content_hash
        duplicate["is_duplicate"] = True
        duplicate["duplicate_of"] = existing_upload.get("upload_id")
        duplicate["warnings"] = []
        return duplicate

    try:
        warnings: list[str] = []
        raw_files, extract_warnings = ingestion_service.extract_raw_upload(content, safe_filename)
        if not raw_files:
            if ingestion_service.METADATA_ONLY_WARNING in extract_warnings:
                raise ValueError(ingestion_service.UNSUPPORTED_METADATA_MESSAGE)
            raise ValueError("Unsupported source")

        posts, ingest_report = ingestion_service.ingest_raw_files(
            raw_files,
            require_posts=False,
        )
        if extract_warnings:
            ingest_report.setdefault("warnings", []).extend(
                w for w in extract_warnings if w != ingestion_service.METADATA_ONLY_WARNING
            )

        platform_hint = (platform or "").lower().strip() or None
        if posts and platform_hint:
            posts = ingestion_service.relabel_posts_platform(posts, platform_hint)
        elif not posts and platform_hint:
            # Auto-detect failed — retry as generic JSON with the user's platform pick.
            posts, forced_report = ingestion_service.force_generic_with_platform(
                raw_files,
                platform_hint,
            )
            if posts:
                ingest_report = forced_report
                if extract_warnings:
                    ingest_report.setdefault("warnings", []).extend(
                        w
                        for w in extract_warnings
                        if w != ingestion_service.METADATA_ONLY_WARNING
                    )

        if not posts:
            skip_platform = ingestion_service.infer_platform_from_skip_files(ingest_report)
            if skip_platform:
                resolved_platform = skip_platform
                if skip_platform == "linkedin":
                    warnings.append(
                        "LinkedIn reposts and reactions have no text to analyze. "
                        "Include Shares or Comments CSVs to grow your coral."
                    )
                elif skip_platform == "reddit":
                    warnings.append(
                        "This Reddit export has no posts or comments to analyze."
                    )
            else:
                raise ValueError("Unsupported source")
        else:
            if len(posts) < SPARSE_POST_THRESHOLD:
                warnings.append(
                    f"Small export ({len(posts)} posts) — coral may look sparse."
                )

            resolved_platform = ingestion_service.derive_platform(posts)
            if resolved_platform in {"mixed", "sample"} and platform_hint:
                resolved_platform = platform_hint

        upload = firestore_service.save_upload_with_posts(
            user_id=user_id,
            filename=safe_filename,
            posts=posts,
            platform=resolved_platform,
            ingest_report=ingest_report,
            raw_files=raw_files,
            content_hash=content_hash,
            original_bytes=content,
        )

        upload["content_hash"] = content_hash
        upload["is_duplicate"] = False
        upload["duplicate_of"] = None
        upload["warnings"] = warnings

        if posts and run_analysis:
            try:
                analysis = analysis_service.run_user_analysis(user_id)
                upload["analysis_id"] = analysis.get("analysis_id")
            except Exception:
                pass

        return upload
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:
        message = str(exc)
        if "longer than 1048487 bytes" in message or "maximum entity size" in message.lower():
            raise HTTPException(
                status_code=400,
                detail=(
                    "One of the files inside this export is too large to store. "
                    "Try uploading a smaller Instagram export, or re-export with fewer categories "
                    "(posts, comments, media only)."
                ),
            ) from exc
        raise HTTPException(status_code=500, detail=f"Upload failed: {exc}") from exc


@app.get("/health")
def health() -> dict[str, str | bool]:
    return {
        "status": "ok",
        "firebase_project": settings.firebase_project_id,
        "use_emulators": settings.use_emulators,
        "auth_required": settings.auth_required,
    }


@app.post("/uploads")
async def upload_export(
    current_uid: AuthUser,
    user_id: str = Form(...),
    file: UploadFile = File(...),
    platform: str | None = Form(default=None),
    run_analysis: bool | str = Form(default=True),
) -> dict[str, object]:
    """Ingest a platform export (.zip, .json, or .csv), store raw files in DB1, and optionally run analysis."""
    if user_id != current_uid:
        raise HTTPException(status_code=403, detail="User id does not match authenticated user")
    content = await file.read()
    filename = file.filename or "export"
    return _ingest_and_save_upload(
        user_id,
        content,
        filename,
        platform,
        run_analysis=_parse_bool_form(run_analysis, default=True),
    )


@app.post("/seed/sample-data")
async def seed_sample_data(
    current_uid: AuthUser,
    user_id: str = Form(default="demo-user"),
    run_analysis: bool = Form(default=True),
) -> dict[str, object]:
    """Ingest all bundled sample exports and optionally run NLP analysis."""
    if user_id != current_uid:
        raise HTTPException(status_code=403, detail="User id does not match authenticated user")
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
    current_uid: AuthUser,
    user_id: str = Form(...),
    fixture_name: str = Form("instagram_posts_1.json"),
    platform: str | None = Form(default=None),
    run_analysis: bool | str = Form(default=True),
) -> dict[str, object]:
    """Ingest a bundled sample export from disk. Allowed only when using Firebase emulators."""
    if user_id != current_uid:
        raise HTTPException(status_code=403, detail="User id does not match authenticated user")
    if not settings.use_emulators:
        raise HTTPException(
            status_code=403,
            detail="Fixture uploads are only allowed when FIRESTORE_EMULATOR_HOST is set",
        )

    fixture_path = _resolve_fixture_path(fixture_name)
    return _ingest_and_save_upload(
        user_id,
        fixture_path.read_bytes(),
        fixture_path.name,
        platform,
        run_analysis=_parse_bool_form(run_analysis, default=True),
    )


@app.get("/uploads/{user_id}")
def list_user_uploads(
    user_id: str,
    _: Annotated[str, Depends(require_matching_user)],
    limit: int | None = Query(default=None, ge=1, le=500),
    cursor: str | None = Query(default=None),
) -> dict[str, list[dict[str, object]]]:
    """List upload metadata for a user."""
    try:
        uploads = firestore_service.list_uploads(
            user_id, limit=limit, start_after=cursor
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to list uploads: {exc}") from exc

    return {"uploads": uploads}


@app.get("/uploads/{user_id}/{upload_id}")
def get_user_upload(
    user_id: str,
    upload_id: str,
    _: Annotated[str, Depends(require_matching_user)],
) -> dict[str, object]:
    """Get metadata for a single upload."""
    try:
        return firestore_service.get_upload_metadata(user_id, upload_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@app.patch("/uploads/{user_id}/{upload_id}")
def patch_upload_platform(
    user_id: str,
    upload_id: str,
    payload: UploadPlatformUpdate,
    _: Annotated[str, Depends(require_matching_user)],
) -> dict[str, object]:
    """Update the confirmed platform/source for an upload."""
    platform = payload.platform.lower().strip()
    if platform not in UPLOAD_PLATFORM_CHOICES:
        raise HTTPException(
            status_code=400,
            detail="Platform must be instagram, linkedin, or reddit",
        )
    try:
        return firestore_service.update_upload_platform(user_id, upload_id, platform)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@app.delete("/uploads/{user_id}/{upload_id}")
def delete_user_upload(
    user_id: str,
    upload_id: str,
    _: Annotated[str, Depends(require_matching_user)],
) -> dict[str, object]:
    """Recursively delete an upload and associated storage."""
    try:
        return firestore_service.delete_upload(user_id, upload_id)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to delete upload: {exc}") from exc


@app.get("/uploads/{user_id}/{upload_id}/posts")
def get_user_upload_posts(
    user_id: str,
    upload_id: str,
    _: Annotated[str, Depends(require_matching_user)],
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


@app.get("/uploads/{user_id}/posts/by-topic")
def get_posts_by_topic(
    user_id: str,
    _: Annotated[str, Depends(require_matching_user)],
    topic: str = Query(..., min_length=1),
    limit: int = Query(default=20, ge=1, le=100),
    platform: str | None = Query(default=None),
) -> dict[str, list[dict[str, object]]]:
    """List posts tagged with a topic across all uploads."""
    posts = firestore_service.list_posts_by_topic(
        user_id,
        topic,
        limit=limit,
        platform=platform,
    )
    return {"posts": posts}


@app.post("/analyze")
def analyze_posts(
    payload: AnalysisRequest,
    current_uid: AuthUser,
) -> dict[str, object]:
    """Run sentiment + topic analysis over the user's post history and optionally persist."""
    if payload.user_id != current_uid:
        raise HTTPException(status_code=403, detail="User id does not match authenticated user")

    try:
        result = analysis_service.run_user_analysis(
            payload.user_id,
            persist=payload.persist,
            name=payload.name,
        )
    except Exception as exc:
        message = str(exc)
        if "longer than 1048487 bytes" in message or "maximum entity size" in message.lower():
            raise HTTPException(
                status_code=400,
                detail=(
                    "This export is too large to store as one analysis. "
                    "Try a smaller batch of posts/comments files."
                ),
            ) from exc
        raise HTTPException(status_code=500, detail=f"Analysis failed: {exc}") from exc

    if result.get("post_count", 0) == 0:
        raise HTTPException(status_code=400, detail="No posts found for analysis")

    return result


@app.get("/analyses/{user_id}")
def list_user_analyses(
    user_id: str,
    _: Annotated[str, Depends(require_matching_user)],
    limit: int | None = Query(default=None, ge=1, le=500),
    cursor: str | None = Query(default=None),
) -> dict[str, list[dict[str, object]]]:
    """List analysis results for a user."""
    try:
        # Return document summaries; clients load full post_insights via GET one analysis.
        analyses = firestore_service.list_analyses(
            user_id, hydrate=False, limit=limit, start_after=cursor
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to list analyses: {exc}") from exc

    return {"analyses": analyses}


@app.delete("/analyses/{user_id}/{analysis_id}")
def delete_user_analysis(
    user_id: str,
    analysis_id: str,
    _: Annotated[str, Depends(require_matching_user)],
) -> dict[str, object]:
    try:
        return firestore_service.delete_analysis(user_id, analysis_id)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to delete analysis: {exc}") from exc


@app.get("/analyses/{user_id}/{analysis_id}")
def get_user_analysis(
    user_id: str,
    analysis_id: str,
    _: Annotated[str, Depends(require_matching_user)],
) -> dict[str, object]:
    """Get a single analysis result."""
    try:
        return firestore_service.get_analysis(user_id, analysis_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@app.get("/users/{user_id}/privacy-settings")
def get_privacy_settings(
    user_id: str,
    _: Annotated[str, Depends(require_matching_user)],
) -> dict[str, Any]:
    return privacy_service.get_privacy_settings(user_id)


@app.put("/users/{user_id}/privacy-settings")
def update_privacy_settings(
    user_id: str,
    payload: PrivacySettingsRequest,
    _: Annotated[str, Depends(require_matching_user)],
) -> dict[str, Any]:
    current = privacy_service.get_privacy_settings(user_id)
    updates = payload.model_dump(exclude_none=True)
    merged = {**current, **updates}
    return privacy_service.save_privacy_settings(user_id, merged)


@app.post("/shares")
def create_share_link(
    payload: CreateShareRequest,
    current_uid: AuthUser,
) -> dict[str, Any]:
    if payload.user_id != current_uid:
        raise HTTPException(status_code=403, detail="User id does not match authenticated user")
    try:
        return share_service.create_share(
            payload.user_id,
            payload.analysis_id,
            expiry_days=payload.expiry_days,
        )
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Failed to create share: {exc}") from exc


@app.get("/shares/{token}")
def get_share_link(token: str) -> dict[str, Any]:
    """Public read-only share payload for recruiter view."""
    try:
        return share_service.get_public_share(token)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@app.post("/shares/{token}/revoke")
def revoke_share_link(
    token: str,
    current_uid: AuthUser,
) -> dict[str, Any]:
    try:
        return share_service.revoke_share(current_uid, token)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except PermissionError as exc:
        raise HTTPException(status_code=403, detail=str(exc)) from exc


@app.delete("/shares/{token}")
def delete_share_link(
    token: str,
    current_uid: AuthUser,
) -> dict[str, Any]:
    try:
        return share_service.delete_share(current_uid, token)
    except PermissionError as exc:
        raise HTTPException(status_code=403, detail=str(exc)) from exc


@app.get("/usernames/me")
def get_my_username(current_uid: AuthUser) -> dict[str, str | None]:
    """Return the authenticated user's claimed username, if any."""
    return {"username": username_service.get_owned_username(current_uid)}


@app.get("/usernames/available")
def check_username_available(username: str = Query(..., min_length=3, max_length=20)) -> dict[str, Any]:
    try:
        available = username_service.is_available(username)
    except username_service.UsernameError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return {"username": username_service.normalize_username(username), "available": available}


@app.post("/usernames/resolve-login")
def resolve_username_login(payload: UsernameLookupRequest) -> dict[str, str]:
    """Public endpoint used before Firebase Auth sign-in."""
    try:
        return username_service.resolve_login_email(payload.identifier)
    except username_service.UsernameError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@app.post("/usernames/claim")
def claim_username(
    payload: UsernameClaimRequest,
    current_uid: AuthUser,
) -> dict[str, Any]:
    try:
        return username_service.claim(
            payload.username, uid=current_uid, email=payload.email
        )
    except username_service.UsernameError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@app.post("/usernames/change")
def change_username(
    payload: UsernameChangeRequest,
    current_uid: AuthUser,
) -> dict[str, Any]:
    email = (payload.email or "").strip()
    if not email:
        raise HTTPException(status_code=400, detail="Email is required to change username")
    try:
        return username_service.change(
            uid=current_uid,
            email=email,
            new_username=payload.username,
            old_username=payload.old_username,
        )
    except username_service.UsernameError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc

