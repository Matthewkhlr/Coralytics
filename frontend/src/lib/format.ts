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
