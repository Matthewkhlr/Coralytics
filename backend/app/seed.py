"""
Seed Firestore with bundled sample exports (all platforms in sample_data/).

Run with:
    cd backend
    source .venv/bin/activate
    python -m app.seed

Requires Firebase emulators or production credentials (see repo root .env).
"""

from __future__ import annotations

import argparse
import os
import sys

from dotenv import load_dotenv

from app.config import get_settings
from app.firebase import init_firebase
from app.services.seed_service import seed_sample_data


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Seed Firestore with Coralytics sample data")
    parser.add_argument(
        "--user-id",
        default="demo-user",
        help="Firestore user id to write under (default: demo-user)",
    )
    parser.add_argument(
        "--cloud",
        action="store_true",
        help="Write to cloud Firestore (ignores FIRESTORE_EMULATOR_HOST)",
    )
    parser.add_argument(
        "--no-analysis",
        action="store_true",
        help="Skip creating a stub analysis document",
    )
    args = parser.parse_args(argv)

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    load_dotenv(dotenv_path=os.path.join(repo_root, ".env"))

    if args.cloud:
        os.environ.pop("FIRESTORE_EMULATOR_HOST", None)
        get_settings.cache_clear()

    settings = get_settings()
    if args.cloud:
        if settings.use_emulators:
            print("Error: FIRESTORE_EMULATOR_HOST is still set. Unset it in .env or use --cloud.", file=sys.stderr)
            return 1
        if not settings.google_application_credentials:
            print(
                "Error: cloud seed requires GOOGLE_APPLICATION_CREDENTIALS in .env\n"
                "  1. Firebase Console → Project settings → Service accounts → Generate new private key\n"
                "  2. Save as service-account.json in the repo root (gitignored)\n"
                "  3. Add to .env: GOOGLE_APPLICATION_CREDENTIALS=./service-account.json",
                file=sys.stderr,
            )
            return 1
        if not os.path.isfile(settings.google_application_credentials):
            print(
                f"Error: service account file not found: {settings.google_application_credentials}",
                file=sys.stderr,
            )
            return 1

    init_firebase()
    result = seed_sample_data(args.user_id, run_analysis=not args.no_analysis)

    print(f"Seeded user: {result['user_id']}")
    print(f"  upload_id:  {result['upload_id']}")
    print(f"  posts:      {result['post_count']} ({result['platform']})")
    if "analysis_id" in result:
        print(f"  analysis_id: {result['analysis_id']}")
    if args.cloud:
        project = settings.firebase_project_id
        print(f"\nCloud Firestore ({project}):")
        print(f"  https://console.firebase.google.com/project/{project}/firestore")
    else:
        print("\nLocal emulator: http://localhost:4000")

    return 0


if __name__ == "__main__":
    sys.exit(main())
