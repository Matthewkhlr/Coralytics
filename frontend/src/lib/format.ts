export function formatShortDate(iso: string | undefined) {
  if (!iso) return "-";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateRange(
  dateRange?: { earliest?: string | null; latest?: string | null } | null,
): string {
  const earliest = formatShortDate(dateRange?.earliest ?? undefined);
  const latest = formatShortDate(dateRange?.latest ?? undefined);
  if (earliest === "-" && latest === "-") return "—";
  if (earliest !== "-" && latest !== "-" && earliest !== latest) {
    return `${earliest} – ${latest}`;
  }
  return earliest !== "-" ? earliest : latest;
}

export function formatPlatform(platform: string) {
  if (!platform || platform === "mixed") return "Mixed";
  if (platform === "sample") return "Pasted data";
  return platform.charAt(0).toUpperCase() + platform.slice(1);
}

/** Human label for a coral dot — posts, comments, shares, and other exported rows. */
export function formatActivityType(postType?: string | null): string {
  switch ((postType ?? "").toLowerCase()) {
    case "comment":
      return "Comment";
    case "reply":
      return "Reply";
    case "share":
      return "Share";
    case "post":
      return "Post";
    default:
      return "Activity";
  }
}

/** Legend line for coral dots under the reef viewport. */
export const CORAL_DOT_LEGEND =
  "Beads = Data (click to open)";

/** Display label for an analysis run - custom name or datetime fallback. */
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
