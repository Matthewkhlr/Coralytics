"""
DB2: processed analysis storage.

Analysis results are stored under:
    users/{userId}/analyses/{analysisId}

Large `post_insights` payloads are split into subcollection chunks so the
main analysis document stays under Firestore's 1 MiB limit.
"""

from __future__ import annotations

import json
import uuid
from datetime import datetime, timezone
from typing import Any

from app.firebase import get_firestore_client

# Leave headroom under Firestore's 1,048,576-byte document cap.
_FIRESTORE_SAFE_DOC_BYTES = 900_000
_INSIGHT_CHUNK_SIZE = 100
_CONTENT_EXCERPT_CHARS = 200


def _analyses_collection(user_id: str):
    return get_firestore_client().collection("users").document(user_id).collection("analyses")


def _insight_chunks_collection(user_id: str, analysis_id: str):
    return _analyses_collection(user_id).document(analysis_id).collection("post_insights_chunks")


def _utf8_size(payload: Any) -> int:
    return len(json.dumps(payload, default=str, ensure_ascii=False).encode("utf-8"))


def _excerpt(content: Any, max_chars: int = _CONTENT_EXCERPT_CHARS) -> str:
    text = str(content or "").strip()
    if len(text) <= max_chars:
        return text
    return text[: max_chars - 1].rstrip() + "…"


def compact_post_insights(insights: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Shrink per-post payloads before persisting to Firestore."""
    compacted: list[dict[str, Any]] = []
    for item in insights:
        row = dict(item)
        if "content" in row:
            row["content"] = _excerpt(row.get("content"))
        compacted.append(row)
    return compacted


def _write_insight_chunks(user_id: str, analysis_id: str, insights: list[dict[str, Any]]) -> int:
    chunk_col = _insight_chunks_collection(user_id, analysis_id)
    written = 0
    batch = get_firestore_client().batch()
    ops = 0

    for index in range(0, len(insights), _INSIGHT_CHUNK_SIZE):
        chunk = insights[index : index + _INSIGHT_CHUNK_SIZE]
        doc_id = f"{index // _INSIGHT_CHUNK_SIZE:04d}"
        batch.set(
            chunk_col.document(doc_id),
            {"index": index // _INSIGHT_CHUNK_SIZE, "items": chunk},
        )
        written += 1
        ops += 1
        if ops >= 400:
            batch.commit()
            batch = get_firestore_client().batch()
            ops = 0

    if ops:
        batch.commit()
    return written


def _load_insight_chunks(user_id: str, analysis_id: str) -> list[dict[str, Any]]:
    snapshots = (
        _insight_chunks_collection(user_id, analysis_id)
        .order_by("index")
        .stream()
    )
    items: list[dict[str, Any]] = []
    for snapshot in snapshots:
        if not snapshot.exists:
            continue
        data = snapshot.to_dict() or {}
        chunk_items = data.get("items") or []
        if isinstance(chunk_items, list):
            items.extend(item for item in chunk_items if isinstance(item, dict))
    return items


def _hydrate_post_insights(user_id: str, analysis: dict[str, Any]) -> dict[str, Any]:
    if analysis.get("post_insights_chunked"):
        analysis["post_insights"] = _load_insight_chunks(user_id, analysis["analysis_id"])
    return analysis


def save_analysis(
    user_id: str,
    analysis: dict[str, Any],
    upload_ids: list[str] | None = None,
) -> dict[str, Any]:
    """Persist an analysis result in DB2."""
    analysis_id = uuid.uuid4().hex
    now = datetime.now(timezone.utc).isoformat()

    insights = compact_post_insights(list(analysis.get("post_insights") or []))
    payload = {key: value for key, value in analysis.items() if key != "post_insights"}

    record: dict[str, Any] = {
        "analysis_id": analysis_id,
        "user_id": user_id,
        "created_at": now,
        "updated_at": now,
        "upload_ids": upload_ids or [],
        "storage_layer": "db2",
        **payload,
        "post_insights": insights,
        "post_insights_chunked": False,
        "post_insights_count": len(insights),
    }

    doc_ref = _analyses_collection(user_id).document(analysis_id)

    if _utf8_size(record) <= _FIRESTORE_SAFE_DOC_BYTES:
        doc_ref.set(record)
        return record

    # Document would exceed Firestore's 1 MiB limit — chunk insights.
    record["post_insights"] = []
    record["post_insights_chunked"] = True
    doc_ref.set(record)
    _write_insight_chunks(user_id, analysis_id, insights)

    # Return the full insights to the API caller.
    record["post_insights"] = insights
    return record


def get_analysis(user_id: str, analysis_id: str) -> dict[str, Any]:
    doc_ref = _analyses_collection(user_id).document(analysis_id)
    snapshot = doc_ref.get()

    if not snapshot.exists:
        raise KeyError(f"Analysis not found: {analysis_id}")

    data = snapshot.to_dict()
    assert data is not None
    return _hydrate_post_insights(user_id, data)


def list_analyses(user_id: str) -> list[dict[str, Any]]:
    snapshots = (
        _analyses_collection(user_id)
        .order_by("created_at", direction="DESCENDING")
        .stream()
    )
    analyses = [doc.to_dict() for doc in snapshots if doc.exists]
    return [_hydrate_post_insights(user_id, analysis) for analysis in analyses if analysis]


def get_latest_analysis(user_id: str) -> dict[str, Any] | None:
    analyses = list_analyses(user_id)
    return analyses[0] if analyses else None
