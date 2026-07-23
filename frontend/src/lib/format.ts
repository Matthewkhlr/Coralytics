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
