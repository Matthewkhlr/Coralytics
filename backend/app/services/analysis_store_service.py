"""
DB2: processed analysis storage.

Analysis results are stored under:
    users/{userId}/analyses/{analysisId}

Large `post_insights` (and `organism_data.posts`) payloads are split into
subcollection chunks so the main analysis document stays under Firestore's
1 MiB limit.

Writes use pending → ready lifecycle so partial failures are hidden.
"""

from __future__ import annotations

import json
import uuid
from typing import Any

from app.firebase import get_firestore_client
from app.models.persistence import (
    RECORD_STATUS_FAILED,
    RECORD_STATUS_PENDING,
    RECORD_STATUS_READY,
    SCHEMA_VERSION_V2,
    encode_timestamp,
    is_ready,
    serialize_record_for_api,
    with_v2_metadata,
)
from app.services import source_summary_service

# Leave headroom under Firestore's 1,048,576-byte document cap.
_FIRESTORE_SAFE_DOC_BYTES = 900_000
_INSIGHT_CHUNK_SIZE = 100
_MIN_INSIGHT_CHUNK_SIZE = 10
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


def _organism_posts_from_insights(insights: list[dict[str, Any]]) -> list[dict[str, Any]]:
    posts: list[dict[str, Any]] = []
    for item in insights:
        post_id = item.get("id")
        if not post_id:
            continue
        posts.append(
            {
                "id": post_id,
                "created_at": item.get("created_at"),
                "sentiment_label": item.get("sentiment_label"),
                "sentiment_compound": item.get("sentiment_compound"),
                "topics": item.get("topics") or [],
            }
        )
    return posts


def _slim_organism_data(organism: Any) -> dict[str, Any]:
    data = dict(organism) if isinstance(organism, dict) else {}
    return {
        "accountAgeDays": data.get("accountAgeDays", 0),
        "topics": data.get("topics") or [],
        "posts": [],
    }


def _truncate_oversized_fields(record: dict[str, Any]) -> None:
    """Drop bulky optional fields until the main doc fits under the size cap."""
    red_flags = record.get("red_flags")
    if isinstance(red_flags, dict) and isinstance(red_flags.get("flags"), list):
        flags = red_flags["flags"]
        while flags and _utf8_size(record) > _FIRESTORE_SAFE_DOC_BYTES:
            flags[:] = flags[: max(1, len(flags) // 2)]
            if len(flags) == 1 and _utf8_size(record) > _FIRESTORE_SAFE_DOC_BYTES:
                flags.clear()
                break

    timeline = record.get("sentiment_timeline")
    if isinstance(timeline, list) and _utf8_size(record) > _FIRESTORE_SAFE_DOC_BYTES:
        if len(timeline) > 90:
            record["sentiment_timeline"] = timeline[:: max(1, len(timeline) // 90)]
        if _utf8_size(record) > _FIRESTORE_SAFE_DOC_BYTES:
            record["sentiment_timeline"] = timeline[:90]


def _write_insight_chunks(user_id: str, analysis_id: str, insights: list[dict[str, Any]]) -> int:
    chunk_col = _insight_chunks_collection(user_id, analysis_id)
    written = 0
    batch = get_firestore_client().batch()
    ops = 0
    index = 0
    chunk_size = _INSIGHT_CHUNK_SIZE

    while index < len(insights):
        size = chunk_size
        while size >= _MIN_INSIGHT_CHUNK_SIZE:
            chunk = insights[index : index + size]
            payload = {"index": written, "items": chunk}
            if _utf8_size(payload) <= _FIRESTORE_SAFE_DOC_BYTES or size == _MIN_INSIGHT_CHUNK_SIZE:
                break
            size = max(_MIN_INSIGHT_CHUNK_SIZE, size // 2)

        chunk = insights[index : index + size]
        while (
            size == _MIN_INSIGHT_CHUNK_SIZE
            and _utf8_size({"index": written, "items": chunk}) > _FIRESTORE_SAFE_DOC_BYTES
        ):
            shrunk = False
            for item in chunk:
                content = str(item.get("content") or "")
                if len(content) > 40:
                    item["content"] = _excerpt(content, max_chars=max(20, len(content) // 2))
                    shrunk = True
            if not shrunk:
                break

        doc_id = f"{written:04d}"
        batch.set(chunk_col.document(doc_id), {"index": written, "items": chunk})
        written += 1
        ops += 1
        index += size
        if ops >= 400:
            batch.commit()
            batch = get_firestore_client().batch()
            ops = 0

    if ops:
        batch.commit()
    return written


def _delete_insight_chunks(user_id: str, analysis_id: str) -> int:
    col = _insight_chunks_collection(user_id, analysis_id)
    deleted = 0
    batch = get_firestore_client().batch()
    ops = 0
    for snap in col.stream():
        batch.delete(snap.reference)
        deleted += 1
        ops += 1
        if ops >= 400:
            batch.commit()
            batch = get_firestore_client().batch()
            ops = 0
    if ops:
        batch.commit()
    return deleted


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

    insights = analysis.get("post_insights") or []
    organism = analysis.get("organism_data")
    if isinstance(organism, dict) and insights:
        posts = organism.get("posts") or []
        if not posts:
            analysis["organism_data"] = {
                **organism,
                "posts": _organism_posts_from_insights(insights),
            }
    return analysis


def _hydrate_source_summary(user_id: str, analysis: dict[str, Any]) -> dict[str, Any]:
    hydrated = dict(analysis)
    hydrated["source_summary"] = source_summary_service.build_source_summary(
        user_id,
        [],
        analysis.get("upload_ids") or [],
        platform_breakdown=analysis.get("platform_breakdown"),
    )
    return hydrated


def _hydrate_analysis(user_id: str, analysis: dict[str, Any]) -> dict[str, Any]:
    return _hydrate_source_summary(user_id, _hydrate_post_insights(user_id, analysis))


def save_analysis(
    user_id: str,
    analysis: dict[str, Any],
    upload_ids: list[str] | None = None,
) -> dict[str, Any]:
    """Persist an analysis result in DB2 with pending→ready lifecycle."""
    analysis_id = uuid.uuid4().hex
    now = encode_timestamp()

    insights = compact_post_insights(list(analysis.get("post_insights") or []))
    payload = {key: value for key, value in analysis.items() if key != "post_insights"}
    organism = payload.get("organism_data")
    organism_posts = (
        list(organism.get("posts") or [])
        if isinstance(organism, dict)
        else _organism_posts_from_insights(insights)
    )

    record: dict[str, Any] = with_v2_metadata(
        {
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
        },
        status=RECORD_STATUS_PENDING,
        now=now,
    )

    doc_ref = _analyses_collection(user_id).document(analysis_id)

    try:
        if _utf8_size(record) <= _FIRESTORE_SAFE_DOC_BYTES:
            record["status"] = RECORD_STATUS_READY
            doc_ref.set(record)
            return serialize_record_for_api(record)

        record["post_insights"] = []
        record["post_insights_chunked"] = True
        record["organism_data"] = _slim_organism_data(organism)
        _truncate_oversized_fields(record)

        if _utf8_size(record) > _FIRESTORE_SAFE_DOC_BYTES:
            raise ValueError(
                "Analysis metadata exceeds Firestore maximum entity size even after chunking "
                "post insights. Try a smaller batch of posts/comments files."
            )

        # Write chunks first, then finalize the parent as ready.
        doc_ref.set(record)
        _write_insight_chunks(user_id, analysis_id, insights)
        record["status"] = RECORD_STATUS_READY
        record["updated_at"] = encode_timestamp()
        doc_ref.set({"status": RECORD_STATUS_READY, "updated_at": record["updated_at"]}, merge=True)

        record["post_insights"] = insights
        record["organism_data"] = {
            **record["organism_data"],
            "posts": organism_posts or _organism_posts_from_insights(insights),
        }
        return serialize_record_for_api(record)
    except Exception as exc:
        doc_ref.set(
            {
                "status": RECORD_STATUS_FAILED,
                "error": str(exc),
                "updated_at": encode_timestamp(),
                "schema_version": SCHEMA_VERSION_V2,
            },
            merge=True,
        )
        raise


def get_analysis(user_id: str, analysis_id: str) -> dict[str, Any]:
    doc_ref = _analyses_collection(user_id).document(analysis_id)
    snapshot = doc_ref.get()

    if not snapshot.exists:
        raise KeyError(f"Analysis not found: {analysis_id}")

    data = snapshot.to_dict()
    assert data is not None
    if not is_ready(data):
        raise KeyError(f"Analysis not found: {analysis_id}")
    return serialize_record_for_api(_hydrate_analysis(user_id, data))


def list_analyses(
    user_id: str,
    *,
    hydrate: bool = True,
    limit: int | None = None,
    start_after: str | None = None,
) -> list[dict[str, Any]]:
    query = _analyses_collection(user_id).order_by("created_at", direction="DESCENDING")
    if start_after:
        cursor = _analyses_collection(user_id).document(start_after).get()
        if cursor.exists:
            query = query.start_after(cursor)

    fetch_limit = None if limit is None else limit * 3
    if fetch_limit is not None:
        query = query.limit(fetch_limit)

    analyses: list[dict[str, Any]] = []
    for doc in query.stream():
        if not doc.exists:
            continue
        data = doc.to_dict() or {}
        if not is_ready(data):
            continue
        data = _hydrate_source_summary(user_id, data)
        if hydrate:
            data = _hydrate_post_insights(user_id, data)
        analyses.append(serialize_record_for_api(data))
        if limit is not None and len(analyses) >= limit:
            break
    return analyses


def get_latest_analysis(user_id: str) -> dict[str, Any] | None:
    analyses = list_analyses(user_id, hydrate=False, limit=1)
    if not analyses:
        return None
    latest = analyses[0]
    return serialize_record_for_api(_hydrate_analysis(user_id, latest))


def delete_analysis(user_id: str, analysis_id: str) -> dict[str, Any]:
    doc_ref = _analyses_collection(user_id).document(analysis_id)
    snapshot = doc_ref.get()
    if not snapshot.exists:
        return {"deleted": False, "analysis_id": analysis_id}

    _delete_insight_chunks(user_id, analysis_id)

    # Remove matching evolution snapshot if present.
    evo_ref = (
        get_firestore_client()
        .collection("users")
        .document(user_id)
        .collection("evolution_snapshots")
        .document(analysis_id)
    )
    evo_ref.delete()
    doc_ref.delete()
    return {"deleted": True, "analysis_id": analysis_id}
