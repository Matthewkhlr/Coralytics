import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;

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

export async function isUsernameAvailable(username: string): Promise<boolean> {
  const snap = await getDoc(doc(db, "usernames", normalizeUsername(username)));
  return !snap.exists();
}

export async function claimUsername(username: string, uid: string, email: string) {
  const key = normalizeUsername(username);
  const ref = doc(db, "usernames", key);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    const data = snap.data() as { uid?: string };
    if (data.uid !== uid) {
      throw new Error("That username is already taken.");
    }
    return;
  }
  await setDoc(ref, { uid, email, username: key, createdAt: new Date().toISOString() });
}

export async function releaseUsername(username: string, uid: string) {
  const key = normalizeUsername(username);
  const ref = doc(db, "usernames", key);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  const data = snap.data() as { uid?: string };
  if (data.uid !== uid) {
    throw new Error("Cannot release a username you do not own.");
  }
  await deleteDoc(ref);
}

/** Claim a new username and release the previous one when it changes. */
export async function changeUsernameClaim(
  oldUsername: string | null | undefined,
  newUsername: string,
  uid: string,
  email: string,
) {
  const usernameError = validateUsername(newUsername);
  if (usernameError) throw new Error(usernameError);

  const newKey = normalizeUsername(newUsername);
  const oldKey = oldUsername ? normalizeUsername(oldUsername) : null;

  if (oldKey === newKey) {
    await claimUsername(newUsername, uid, email);
    return;
  }

  if (!(await isUsernameAvailable(newUsername))) {
    throw new Error("That username is already taken.");
  }

  await claimUsername(newUsername, uid, email);
  if (oldKey) {
    await releaseUsername(oldUsername!, uid);
  }
}

export async function resolveLoginEmail(identifier: string): Promise<string> {
  const trimmed = identifier.trim();
  if (looksLikeEmail(trimmed)) {
    return trimmed;
  }
  const snap = await getDoc(doc(db, "usernames", normalizeUsername(trimmed)));
  if (!snap.exists()) {
    throw new Error("No account found for that username.");
  }
  const email = (snap.data() as { email?: string }).email;
  if (!email) {
    throw new Error("That username is missing an email. Try logging in with Google.");
  }
  return email;
}
