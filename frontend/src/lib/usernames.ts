import { API_BASE_URL } from "@/api/config";

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;
const REQUEST_TIMEOUT_MS = 10000;

export function normalizeUsername(raw: string) {
  return raw.trim().toLowerCase();
}

export function validateUsername(raw: string): string | null {
  const username = raw.trim();
  if (!USERNAME_RE.test(username)) {
    return "Username must be 3–20 characters (letters, numbers, underscore).";
  }
  return null;
}

export function looksLikeEmail(value: string) {
  return value.includes("@");
}

async function usernameFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(init?.headers as Record<string, string> | undefined),
      },
    });

    if (!response.ok) {
      let detail = response.statusText;
      try {
        const body = (await response.json()) as { detail?: string };
        if (typeof body.detail === "string") detail = body.detail;
      } catch {
        // ignore
      }
      throw new Error(detail || `Request failed (${response.status})`);
    }

    return response.json() as Promise<T>;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("Username request timed out. Check that the API is running.");
    }
    throw err;
  } finally {
    window.clearTimeout(timer);
  }
}

async function authHeaders(): Promise<Record<string, string>> {
  const { auth } = await import("./firebase");
  const token = auth.currentUser ? await auth.currentUser.getIdToken() : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const key = encodeURIComponent(normalizeUsername(username));
  const result = await usernameFetch<{ available: boolean }>(
    `/usernames/available?username=${key}`,
  );
  return Boolean(result.available);
}

export async function claimUsername(username: string, _uid: string, email: string) {
  const headers = await authHeaders();
  await usernameFetch("/usernames/claim", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({ username: normalizeUsername(username), email }),
  });
}

/** Claim a new username and release the previous one when it changes. */
export async function changeUsernameClaim(
  oldUsername: string | null | undefined,
  newUsername: string,
  _uid: string,
  email: string,
) {
  const usernameError = validateUsername(newUsername);
  if (usernameError) throw new Error(usernameError);

  const headers = await authHeaders();
  await usernameFetch("/usernames/change", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({
      username: normalizeUsername(newUsername),
      old_username: oldUsername ? normalizeUsername(oldUsername) : null,
      email,
    }),
  });
}

export async function getMyUsername(): Promise<string | null> {
  const headers = await authHeaders();
  const result = await usernameFetch<{ username: string | null }>("/usernames/me", {
    headers,
  });
  return result.username ?? null;
}

export async function resolveLoginEmail(identifier: string): Promise<string> {
  const trimmed = identifier.trim();
  if (looksLikeEmail(trimmed)) {
    return trimmed;
  }
  const result = await usernameFetch<{ email: string }>("/usernames/resolve-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: trimmed }),
  });
  if (!result.email) {
    throw new Error("That username is missing an email. Try logging in with Google.");
  }
  return result.email;
}
