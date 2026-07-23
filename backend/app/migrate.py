"""CLI entrypoint for v1 → v2 database migration.

Examples:
  python -m app.migrate --dry-run
  python -m app.migrate --apply --batch-size 25
  python -m app.migrate --apply --user-id <uid> --max-uploads 5
"""

from __future__ import annotations

import argparse
import json
import os
import sys

from dotenv import load_dotenv

from app.firebase import init_firebase
from app.services.migration_service import run_migration


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Migrate Coralytics uploads to schema v2")
    parser.add_argument("--dry-run", action="store_true", help="Validate without writing")
    parser.add_argument("--apply", action="store_true", help="Perform migration writes")
    parser.add_argument("--batch-size", type=int, default=20)
    parser.add_argument("--run-id", default="default")
    parser.add_argument("--user-id", default=None)
    parser.add_argument("--max-uploads", type=int, default=None)
    args = parser.parse_args(argv)

    if not args.dry_run and not args.apply:
        parser.error("Specify --dry-run or --apply")

    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    load_dotenv(dotenv_path=os.path.join(repo_root, ".env"))
    init_firebase()

    result = run_migration(
        dry_run=not args.apply,
        batch_size=args.batch_size,
        run_id=args.run_id,
        user_id=args.user_id,
        max_uploads=args.max_uploads,
    )
    print(json.dumps(result, default=str, indent=2))
    return 0 if not result.get("errors") else 1


if __name__ == "__main__":
    sys.exit(main())
