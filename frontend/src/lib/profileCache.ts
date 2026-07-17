const DISPLAY_NAME_KEY = "coralytics:displayName";
const EMAIL_KEY = "coralytics:email";

export type CachedProfile = {
  displayName: string;
  email: string;
};

export function readCachedProfile(): CachedProfile | null {
  const displayName = localStorage.getItem(DISPLAY_NAME_KEY);
  const email = localStorage.getItem(EMAIL_KEY) ?? "";
  if (!displayName && !email) return null;
  return {
    displayName: displayName ?? email.split("@")[0] ?? "User",
    email,
  };
}

export function hasCachedProfile() {
  return readCachedProfile() !== null;
}

export function writeCachedProfile(displayName: string, email?: string | null) {
  localStorage.setItem(DISPLAY_NAME_KEY, displayName);
  if (email) {
    localStorage.setItem(EMAIL_KEY, email);
  }
}

export function clearCachedProfile() {
  localStorage.removeItem(DISPLAY_NAME_KEY);
  localStorage.removeItem(EMAIL_KEY);
}
