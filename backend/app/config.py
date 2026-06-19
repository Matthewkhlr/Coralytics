import os
from functools import lru_cache


class Settings:
    """Runtime configuration loaded from environment variables."""

    firebase_project_id: str
    google_application_credentials: str | None
    cors_origins: list[str]
    max_upload_size_bytes: int

    def __init__(self) -> None:
        self.firebase_project_id = os.getenv("FIREBASE_PROJECT_ID", "coralytics-dev")
        self.google_application_credentials = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
        origins = os.getenv("CORS_ORIGINS", "http://localhost:5173")
        self.cors_origins = [origin.strip() for origin in origins.split(",") if origin.strip()]
        self.max_upload_size_bytes = int(os.getenv("MAX_UPLOAD_SIZE_BYTES", str(25 * 1024 * 1024)))

    @property
    def use_emulators(self) -> bool:
        return bool(os.getenv("FIRESTORE_EMULATOR_HOST"))


@lru_cache
def get_settings() -> Settings:
    return Settings()
