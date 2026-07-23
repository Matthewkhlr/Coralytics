import os
from functools import lru_cache
from pathlib import Path

# Must match `.firebaserc` default project.
DEFAULT_FIREBASE_PROJECT_ID = "coralytics-c8767"


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
    storage_bucket: str
    expected_firebase_project_id: str
    allow_project_mismatch: bool

    def __init__(self) -> None:
        self.firebase_project_id = os.getenv(
            "FIREBASE_PROJECT_ID", DEFAULT_FIREBASE_PROJECT_ID
        )
        self.expected_firebase_project_id = os.getenv(
            "EXPECTED_FIREBASE_PROJECT_ID", DEFAULT_FIREBASE_PROJECT_ID
        )
        self.allow_project_mismatch = os.getenv(
            "ALLOW_FIREBASE_PROJECT_MISMATCH", ""
        ).strip().lower() in {"1", "true", "yes"}
        raw_credentials = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        self.google_application_credentials = _resolve_credentials_path(raw_credentials)
        if self.google_application_credentials:
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = self.google_application_credentials
        origins = os.getenv("CORS_ORIGINS", "http://localhost:5173")
        self.cors_origins = [origin.strip() for origin in origins.split(",") if origin.strip()]
        self.max_upload_size_bytes = int(os.getenv("MAX_UPLOAD_SIZE_BYTES", str(100 * 1024 * 1024)))
        self.storage_bucket = os.getenv(
            "FIREBASE_STORAGE_BUCKET",
            f"{self.firebase_project_id}.appspot.com",
        )

    @property
    def use_emulators(self) -> bool:
        return bool(os.getenv("FIRESTORE_EMULATOR_HOST"))

    @property
    def use_auth_emulator(self) -> bool:
        return bool(os.getenv("FIREBASE_AUTH_EMULATOR_HOST"))

    @property
    def storage_emulator_host(self) -> str | None:
        return os.getenv("FIREBASE_STORAGE_EMULATOR_HOST") or os.getenv("STORAGE_EMULATOR_HOST")

    @property
    def allow_seed_endpoint(self) -> bool:
        """Allow POST /seed/sample-data (emulator by default, or SEED_ENDPOINT_ENABLED=1)."""
        if self.use_emulators:
            return True
        return os.getenv("SEED_ENDPOINT_ENABLED", "").strip().lower() in {"1", "true", "yes"}

    @property
    def auth_required(self) -> bool:
        return os.getenv("AUTH_DISABLED", "").strip().lower() not in {"1", "true", "yes"}

    def validate_project_alignment(self) -> None:
        """Fail fast when the configured project does not match the expected project."""
        if self.allow_project_mismatch or self.use_emulators:
            return
        if self.firebase_project_id != self.expected_firebase_project_id:
            raise RuntimeError(
                f"FIREBASE_PROJECT_ID={self.firebase_project_id!r} does not match "
                f"EXPECTED_FIREBASE_PROJECT_ID={self.expected_firebase_project_id!r}. "
                "Set ALLOW_FIREBASE_PROJECT_MISMATCH=1 only if intentional."
            )


@lru_cache
def get_settings() -> Settings:
    return Settings()
