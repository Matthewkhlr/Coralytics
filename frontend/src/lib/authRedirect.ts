/** Sanitize a post-login redirect target to same-origin relative paths only. */
export function sanitizeRedirectPath(raw: string | null | undefined): string {
  if (!raw) return "/";
  const trimmed = raw.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return "/";
  if (trimmed.startsWith("/login")) return "/";
  return trimmed;
}
