"""
End-to-end ingestion pipeline.

This is the entry point that satisfies the "Data Ingestion" brief:

    input  -> a folder OR a .zip, containing any mix of export files
              from Instagram / LinkedIn / Reddit / pasted sample data
    output -> 1 or 2 JSON files:
                - mode="combined": one file with all posts + comments
                - mode="separate": posts.json and comments.json
              plus an ingest_report.json describing what was found,
              skipped, and why.

------------------------------------------------------------------------
PROCESS
------------------------------------------------------------------------
1. If `input_path` is a .zip, safely extract it to a temporary directory
   (see SECURITY below). Otherwise treat it as a directory (or single
   file) directly.
2. Walk every file in the tree.
3. For each file, based on its extension:
     .json -> load it, then auto-detect its shape via detect.py
              (instagram posts/reels, instagram comments, reddit json,
              or generic "{platform, content, created_at}" sample data)
              and dispatch to the matching parser.
     .csv  -> read it, then auto-detect via detect.py (LinkedIn vs
              Reddit header shapes) and dispatch accordingly.
     anything else -> ignored (e.g. images, videos, profile info).
4. All resulting posts are merged, then run through
   `schema.finalize_posts`: content-length-clamped, deduplicated by id,
   and sorted by date.
5. Written out as JSON via `write_json_outputs`.

This is also exactly how LinkedIn's CSV exports become JSON: each row of
e.g. Shares.csv is parsed into a `NormalizedPost`, which is a pydantic
model -- `model_dump(mode="json")` turns it into a plain JSON-serializable
dict, and the whole list is what ends up in posts.json/comments.json.

------------------------------------------------------------------------
FALLBACK
------------------------------------------------------------------------
- Every file is processed inside its own try/except. A corrupt,
  unreadable, or unrecognized file is recorded in `IngestResult.warnings`
  and `IngestResult.files` (with kind="error"/"unknown") and skipped --
  it never aborts the rest of the batch.
- If a recognized parser still returns zero posts (e.g. an Instagram
  export with only photos and no captions), that's reported but is not
  an error.
- `ingest_report.json` in the output directory makes all of this visible
  so a teammate can see at a glance what was/wasn't picked up.

------------------------------------------------------------------------
SECURITY
------------------------------------------------------------------------
- Zip extraction validates every member's path before extracting (no
  absolute paths, no "..", i.e. no "zip slip"), and enforces:
    * MAX_FILES        -- max number of entries in the zip
    * MAX_FILE_SIZE    -- max size of any single entry
    * MAX_TOTAL_SIZE   -- max total uncompressed size
  to mitigate path-traversal and zip-bomb style inputs.
- Every individual file (zipped or not) is size-checked against
  MAX_FILE_SIZE before being read into memory.
- JSON/CSV files are read as text only (utf-8 / utf-8-sig with
  `errors="replace"` for CSV) -- nothing is ever executed or imported.
- `schema.finalize_posts` clamps any individual `content` field to
  MAX_CONTENT_LENGTH characters, so a single oversized field can't blow
  up memory or the JSON output.
- PRIVACY: a full Instagram/LinkedIn export contains far more than posts
  and comments -- private DMs (messages/), ads/tracking profiles,
  security logs, saved/liked content, etc. Per the brief ("only go
  through posts and comments"), any file whose path matches
  `_EXCLUDED_PATH_KEYWORDS` (messages, ads, saved, security logs, ...)
  is skipped *before* it's even opened, regardless of what its content
  looks like. This is deliberately a path-based denylist rather than
  relying on content-shape detection alone: a message JSON's per-message
  objects also contain a "content" field, so content-shape detection
  alone could misclassify a DM as a "generic" post in some export
  layouts. The denylist is the primary safeguard against that.
"""

from __future__ import annotations

import json
import zipfile
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from tempfile import TemporaryDirectory
from typing import Optional

from .detect import parse_csv_auto, parse_json_auto
from .schema import NormalizedPost, finalize_posts

# --- Security limits -------------------------------------------------------

# Maximum number of entries allowed inside an uploaded zip.
MAX_FILES = 5_000

# Maximum size (bytes) of any single file, zipped or not. 25 MB is far
# larger than any realistic posts/comments export file.
MAX_FILE_SIZE = 25 * 1024 * 1024

# Maximum total *uncompressed* size (bytes) a zip is allowed to expand to.
MAX_TOTAL_SIZE = 500 * 1024 * 1024

# File extensions we attempt to parse. Everything else (images, videos,
# html, profile info, etc.) is silently ignored.
_PARSEABLE_EXTENSIONS = {".json", ".csv"}

# --- Privacy exclusions -----------------------------------------------------
#
# Path components / filename fragments (matched case-insensitively) that
# indicate private or non-content data -- direct messages, ads/tracking
# profiles, security logs, saved/liked items, etc. -- and must be excluded
# regardless of what their content looks like. See module docstring
# ("PRIVACY") for why this is a path-based denylist rather than relying on
# content-shape detection alone.
_EXCLUDED_PATH_KEYWORDS = (
    "message",  # messages/, message_requests/, Messages.csv (DMs)
    "inbox",
    "broadcast",
    "ads_",
    "ad_preferences",
    "advertis",
    "personal_information",
    "security_and_login",
    "login_",
    "device_information",
    "logged_information",
    "your_topics",
    "recommended_topics",
    "subscriptions",
    "monetization",
    "saved_",
    "saved/",
    "story_interactions",
    "polls",
    "likes",
    "shopping",
    "threads",
    "follow",
)


def _is_excluded_path(rel_path: Path) -> bool:
    """Return True if `rel_path` looks like private/non-content data
    (messages, ads, security logs, ...) and should be skipped entirely,
    without ever being opened or content-sniffed.
    """
    haystack = "/".join(part.lower() for part in rel_path.parts)
    return any(keyword in haystack for keyword in _EXCLUDED_PATH_KEYWORDS)


# --- Result types ------------------------------------------------------------


@dataclass
class FileReport:
    """Summary of what happened when processing a single file."""

    path: str
    kind: str  # e.g. "instagram_posts", "linkedin", "unknown", "error", "ignored"
    post_count: int


@dataclass
class IngestResult:
    posts: list[NormalizedPost] = field(default_factory=list)
    files: list[FileReport] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)


# --- Zip handling (security) -------------------------------------------------


class IngestError(Exception):
    """Raised for unrecoverable problems with the input itself (e.g. an
    unsafe or oversized zip). Per-file parsing problems are NOT raised --
    they're recorded as warnings instead (see FALLBACK above).
    """


def _is_safe_member_path(name: str) -> bool:
    """Reject zip member paths that could escape `dest_dir` when extracted.

    Handles POSIX-style traversal ("../../etc/passwd"), absolute paths
    ("/etc/passwd"), and Windows-style traversal/absolute paths
    ("..\\..\\x", "C:\\x") -- the latter matters because `\\` is just a
    regular character in a zip member name but IS a path separator once
    extracted on Windows.
    """
    if not name or name in (".", "./"):
        return False

    normalized = name.replace("\\", "/")

    if normalized.startswith("/"):
        return False

    # Windows drive letter, e.g. "C:/Windows/..." or "C:\\Windows\\...".
    if len(normalized) >= 2 and normalized[1] == ":":
        return False

    if ".." in normalized.split("/"):
        return False

    return True


def safe_extract_zip(zip_path: Path, dest_dir: Path) -> None:
    """Extract `zip_path` into `dest_dir`, after validating that it's safe
    to do so.

    Raises `IngestError` if the zip is unsafe (path traversal) or exceeds
    the configured size/file-count limits. Never partially trusts zip
    metadata for the final check -- after extraction, every extracted
    path is re-verified to be inside `dest_dir`.
    """
    dest_dir = dest_dir.resolve()

    with zipfile.ZipFile(zip_path) as zf:
        infos = [info for info in zf.infolist() if not info.is_dir()]

        if len(infos) > MAX_FILES:
            raise IngestError(
                f"Zip contains too many files ({len(infos)} > {MAX_FILES})"
            )

        total_size = 0
        for info in infos:
            if not _is_safe_member_path(info.filename):
                raise IngestError(f"Unsafe path in zip: {info.filename!r}")

            if info.file_size > MAX_FILE_SIZE:
                raise IngestError(
                    f"File in zip too large: {info.filename!r} "
                    f"({info.file_size} bytes > {MAX_FILE_SIZE})"
                )

            total_size += info.file_size
            if total_size > MAX_TOTAL_SIZE:
                raise IngestError(
                    f"Zip exceeds maximum total extracted size "
                    f"({total_size} bytes > {MAX_TOTAL_SIZE})"
                )

        zf.extractall(dest_dir)

    # Defense in depth: confirm nothing escaped dest_dir after extraction.
    for info in infos:
        extracted = (dest_dir / info.filename).resolve()
        if dest_dir not in extracted.parents and extracted != dest_dir:
            raise IngestError(f"Zip-slip detected for {info.filename!r}")


# --- Per-file parsing (fallback) ---------------------------------------------


def _parse_file(path: Path) -> tuple[list[NormalizedPost], str, Optional[str]]:
    """Parse a single file. Never raises -- returns (posts, kind, warning).

    `kind` is one of: an auto-detected kind ("instagram_posts",
    "linkedin", ...), "unknown" (recognized extension, unrecognized
    shape), "empty", "ignored" (extension we don't touch), or "error"
    (couldn't even be read/parsed).
    """
    try:
        size = path.stat().st_size
    except OSError as exc:
        return [], "error", f"Could not stat {path}: {exc}"

    if size == 0:
        return [], "empty", None

    if size > MAX_FILE_SIZE:
        return [], "skipped", f"Skipped {path}: {size} bytes exceeds per-file limit ({MAX_FILE_SIZE})"

    suffix = path.suffix.lower()
    if suffix not in _PARSEABLE_EXTENSIONS:
        return [], "ignored", None

    try:
        if suffix == ".json":
            with open(path, "r", encoding="utf-8") as fh:
                data = json.load(fh)
            posts, kind = parse_json_auto(data, id_prefix=path.stem)
        else:  # .csv
            text = path.read_text(encoding="utf-8-sig", errors="replace")
            posts, kind = parse_csv_auto(text, filename=path.name)
    except json.JSONDecodeError as exc:
        return [], "error", f"Invalid JSON in {path}: {exc}"
    except (OSError, UnicodeDecodeError) as exc:
        return [], "error", f"Could not read {path}: {exc}"
    except Exception as exc:  # last-resort fallback -- never crash the batch
        return [], "error", f"Unexpected error parsing {path}: {exc}"

    warning = None
    if not posts:
        warning = f"No posts/comments recognized in {path} (detected kind: {kind})"

    return posts, kind, warning


# --- Top-level entry point -----------------------------------------------------


def ingest_path(input_path: str | Path) -> IngestResult:
    """Ingest `input_path` (a directory, or a .zip file) and return an
    `IngestResult` containing the merged, normalized posts plus a
    per-file report and any warnings.

    This function never raises for problems with individual files inside
    the input -- only for problems with the input itself (missing path,
    unsafe/oversized zip). Even then, it returns a usable `IngestResult`
    with the problem recorded in `warnings` rather than raising, except
    for unsafe zips which raise `IngestError` so the caller can reject the
    upload outright.
    """
    input_path = Path(input_path)
    result = IngestResult()

    if not input_path.exists():
        result.warnings.append(f"Input path does not exist: {input_path}")
        return result

    with TemporaryDirectory(prefix="coralytics-ingest-") as tmp:
        if input_path.is_file() and input_path.suffix.lower() == ".zip":
            extract_dir = Path(tmp) / "extracted"
            extract_dir.mkdir()
            try:
                safe_extract_zip(input_path, extract_dir)
            except IngestError as exc:
                result.warnings.append(str(exc))
                return result
            root = extract_dir
        elif input_path.is_dir():
            root = input_path
        else:
            # Single non-zip file -- process it on its own (still subject
            # to the privacy exclusion check).
            if _is_excluded_path(Path(input_path.name)):
                result.files.append(FileReport(input_path.name, "excluded", 0))
                return result

            posts, kind, warning = _parse_file(input_path)
            if warning:
                result.warnings.append(warning)
            result.files.append(FileReport(input_path.name, kind, len(posts)))
            result.posts = finalize_posts(posts)
            return result

        all_posts: list[NormalizedPost] = []
        for path in sorted(root.rglob("*")):
            if not path.is_file():
                continue

            if len(result.files) >= MAX_FILES:
                result.warnings.append(
                    f"Reached max file count ({MAX_FILES}); remaining files skipped"
                )
                break

            rel_path = path.relative_to(root)

            # Privacy: skip private/non-content data (DMs, ads, security
            # logs, ...) without ever opening the file. See module
            # docstring ("PRIVACY") and _EXCLUDED_PATH_KEYWORDS.
            if _is_excluded_path(rel_path):
                result.files.append(FileReport(str(rel_path), "excluded", 0))
                continue

            posts, kind, warning = _parse_file(path)
            if warning:
                result.warnings.append(warning)
            if posts:
                all_posts.extend(posts)

            result.files.append(FileReport(str(rel_path), kind, len(posts)))

    result.posts = finalize_posts(all_posts)
    return result


# --- Output writing -------------------------------------------------------------


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _posts_to_json(posts: list[NormalizedPost]) -> list[dict]:
    return [post.model_dump(mode="json") for post in posts]


def write_json_outputs(
    result: IngestResult, output_dir: str | Path, mode: str = "separate"
) -> dict[str, Path]:
    """Write `result` to `output_dir` as JSON.

    mode="combined": writes a single `normalized_posts.json` containing
        every post and comment together.
    mode="separate": writes `posts.json` (post_type in {post, share}) and
        `comments.json` (post_type in {comment, reply}) separately.

    In both modes, also writes `ingest_report.json` summarizing per-file
    results and any warnings -- this is the FALLBACK visibility layer.

    Returns a dict mapping output label -> Path written.
    """
    if mode not in ("combined", "separate"):
        raise ValueError(f"Unknown mode: {mode!r} (expected 'combined' or 'separate')")

    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    written: dict[str, Path] = {}

    if mode == "combined":
        path = output_dir / "normalized_posts.json"
        payload = {
            "generated_at": _now_iso(),
            "count": len(result.posts),
            "posts": _posts_to_json(result.posts),
        }
        path.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
        written["combined"] = path

    else:  # separate
        comment_types = {"comment", "reply"}
        posts_only = [p for p in result.posts if p.post_type not in comment_types]
        comments_only = [p for p in result.posts if p.post_type in comment_types]

        posts_path = output_dir / "posts.json"
        posts_path.write_text(
            json.dumps(
                {
                    "generated_at": _now_iso(),
                    "count": len(posts_only),
                    "posts": _posts_to_json(posts_only),
                },
                indent=2,
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )
        written["posts"] = posts_path

        comments_path = output_dir / "comments.json"
        comments_path.write_text(
            json.dumps(
                {
                    "generated_at": _now_iso(),
                    "count": len(comments_only),
                    "comments": _posts_to_json(comments_only),
                },
                indent=2,
                ensure_ascii=False,
            ),
            encoding="utf-8",
        )
        written["comments"] = comments_path

    report_path = output_dir / "ingest_report.json"
    report_path.write_text(
        json.dumps(
            {
                "generated_at": _now_iso(),
                "total_posts": len(result.posts),
                "files": [asdict(f) for f in result.files],
                "warnings": result.warnings,
            },
            indent=2,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )
    written["report"] = report_path

    return written


# --- CLI -------------------------------------------------------------------


def main(argv: Optional[list[str]] = None) -> None:
    import argparse

    parser = argparse.ArgumentParser(
        description=(
            "Ingest a social media data export (folder or .zip, any mix of "
            "Instagram/LinkedIn/Reddit/sample data) into normalized JSON."
        )
    )
    parser.add_argument("input_path", help="Path to an export folder or .zip file")
    parser.add_argument(
        "-o", "--output-dir", default="ingest_output", help="Directory to write JSON output to"
    )
    parser.add_argument(
        "-m",
        "--mode",
        choices=["combined", "separate"],
        default="separate",
        help="Write one combined JSON file, or separate posts.json/comments.json (default)",
    )
    args = parser.parse_args(argv)

    result = ingest_path(args.input_path)
    written = write_json_outputs(result, args.output_dir, mode=args.mode)

    print(
        f"Parsed {len(result.posts)} post(s)/comment(s) from "
        f"{len(result.files)} file(s) ({len(result.warnings)} warning(s))."
    )
    for label, path in written.items():
        print(f"  {label}: {path}")
    for warning in result.warnings:
        print(f"  WARNING: {warning}")


if __name__ == "__main__":
    main()
