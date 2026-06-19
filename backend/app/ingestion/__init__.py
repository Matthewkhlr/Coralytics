from .ingest import IngestError, IngestResult, ingest_path, write_json_outputs
from .normalize import normalize_upload
from .schema import NormalizedPost, Platform, PostType

__all__ = [
    # Shared schema
    "NormalizedPost",
    "Platform",
    "PostType",
    # Explicit-source API (when the caller already knows what each upload is)
    "normalize_upload",
    # Folder/zip -> JSON pipeline (auto-detects file types)
    "ingest_path",
    "write_json_outputs",
    "IngestResult",
    "IngestError",
]
