export function formatShortDate(iso: string | undefined) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatPlatform(platform: string) {
  if (!platform || platform === "mixed") return "Mixed";
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

/** Display label for an analysis run — custom name or datetime fallback. */
export function formatRunLabel(
  analysis: { name?: string | null; created_at?: string },
  fallbackRunNumber?: number,
) {
  const custom = analysis.name?.trim();
  if (custom) return custom;
  if (analysis.created_at) {
    const date = new Date(analysis.created_at);
    if (!Number.isNaN(date.getTime())) {
      return `Run · ${date.toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
  }
  if (fallbackRunNumber !== undefined) return `Run ${fallbackRunNumber}`;
  return "Untitled run";
}

/** Human label for an ingest file kind from the backend report. */
export function formatIngestKind(kind: string | undefined) {
  switch (kind) {
    case "instagram_posts":
      return "Instagram posts";
    case "instagram_comments":
      return "Instagram comments";
    case "linkedin":
      return "LinkedIn";
    case "linkedin_skip":
      return "LinkedIn (skipped)";
    case "reddit":
    case "reddit_json":
      return "Reddit";
    case "reddit_skip":
      return "Reddit (skipped)";
    case "generic":
      return "Generic posts";
    case "unknown":
      return "Unrecognized";
    case "excluded":
      return "Excluded (private)";
    case "empty":
      return "Empty";
    case "error":
      return "Parse error";
    case "ignored":
      return "Ignored";
    default:
      return kind ? kind.replace(/_/g, " ") : "Unknown";
  }
}
