import os
from functools import lru_cache
from pathlib import Path


def _repo_root() -> Path:
    return Path(__file__).resolve().parent.parent.parent


def _resolve_credentials_path(path: str | None) -> str | None:
    if not path:
        return None
    candidate = Path(path)
    if not candidate.is_absolute():
        candidate = _repo_root() / candidate
    return str(candidate.resolve())


class Settings:
    """Runtime configuration loaded from environment variables."""

    firebase_project_id: str
    google_application_credentials: str | None
    cors_origins: list[str]
    max_upload_size_bytes: int

    def __init__(self) -> None:
        self.firebase_project_id = os.getenv("FIREBASE_PROJECT_ID", "coralytics-dev")
        raw_credentials = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        self.google_application_credentials = _resolve_credentials_path(raw_credentials)
        if self.google_application_credentials:
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = self.google_application_credentials
        origins = os.getenv("CORS_ORIGINS", "http://localhost:5173")
        self.cors_origins = [origin.strip() for origin in origins.split(",") if origin.strip()]
        self.max_upload_size_bytes = int(os.getenv("MAX_UPLOAD_SIZE_BYTES", str(100 * 1024 * 1024)))

    @property
    def use_emulators(self) -> bool:
        return bool(os.getenv("FIRESTORE_EMULATOR_HOST"))

    @property
    def allow_seed_endpoint(self) -> bool:
        """Allow POST /seed/sample-data (emulator by default, or SEED_ENDPOINT_ENABLED=1)."""
        if self.use_emulators:
            return True
        return os.getenv("SEED_ENDPOINT_ENABLED", "").strip().lower() in {"1", "true", "yes"}

    @property
    def auth_required(self) -> bool:
        return os.getenv("AUTH_DISABLED", "").strip().lower() not in {"1", "true", "yes"}


@lru_cache
def get_settings() -> Settings:
    return Settings()
