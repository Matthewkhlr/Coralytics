import os

import firebase_admin
from firebase_admin import credentials, firestore, storage
from google.auth.credentials import AnonymousCredentials

from app.config import get_settings

_firebase_initialized = False


class _EmulatorCredentials(credentials.Base):
    """Credential shim so the Admin SDK works against local emulators without ADC."""

    def get_credential(self):
        return AnonymousCredentials()


def init_firebase() -> None:
    """Initialize the Firebase Admin SDK once per process."""
    global _firebase_initialized

    if _firebase_initialized or firebase_admin._apps:
        _firebase_initialized = True
        return

    settings = get_settings()
    settings.validate_project_alignment()

    if settings.use_emulators:
        if not os.getenv("FIRESTORE_EMULATOR_HOST"):
            os.environ["FIRESTORE_EMULATOR_HOST"] = "127.0.0.1:8080"
        if settings.storage_emulator_host and not os.getenv("FIREBASE_STORAGE_EMULATOR_HOST"):
            os.environ["FIREBASE_STORAGE_EMULATOR_HOST"] = settings.storage_emulator_host

        firebase_admin.initialize_app(
            _EmulatorCredentials(),
            {
                "projectId": settings.firebase_project_id,
                "storageBucket": settings.storage_bucket,
            },
        )
    elif settings.google_application_credentials:
        cred = credentials.Certificate(settings.google_application_credentials)
        firebase_admin.initialize_app(
            cred,
            {
                "projectId": settings.firebase_project_id,
                "storageBucket": settings.storage_bucket,
            },
        )
    else:
        firebase_admin.initialize_app(
            options={
                "projectId": settings.firebase_project_id,
                "storageBucket": settings.storage_bucket,
            }
        )

    _firebase_initialized = True


def get_firestore_client():
    init_firebase()
    return firestore.client()


def get_storage_bucket(bucket_name: str | None = None):
    """Return a Firebase/Google Cloud Storage bucket handle."""
    init_firebase()
    settings = get_settings()
    name = bucket_name or settings.storage_bucket
    return storage.bucket(name)
