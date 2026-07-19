import { listUploads } from "@/api/client";
import type { Upload } from "@/api/types";

type UploadsEntry = { uploads: Upload[]; fetchedAt: number };

const uploadsCache = new Map<string, UploadsEntry>();
const uploadsInflight = new Map<string, Promise<Upload[]>>();

const STORAGE_PREFIX = "coralytics.session.uploads.";
const FRESH_MS = 5 * 60 * 1000;

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}${userId}`;
}

function readStorage(userId: string): UploadsEntry | null {
  try {
    const raw = sessionStorage.getItem(storageKey(userId));
    if (!raw) return null;
    return JSON.parse(raw) as UploadsEntry;
  } catch {
    return null;
  }
}

function writeStorage(userId: string, entry: UploadsEntry) {
  try {
    sessionStorage.setItem(storageKey(userId), JSON.stringify(entry));
  } catch {
    /* ignore */
  }
}

function hydrate(userId: string): UploadsEntry | null {
  const memory = uploadsCache.get(userId);
  if (memory) return memory;
  const stored = readStorage(userId);
  if (!stored?.uploads) return null;
  uploadsCache.set(userId, stored);
  return stored;
}

function isFresh(fetchedAt: number) {
  return Date.now() - fetchedAt < FRESH_MS;
}

export function peekUploads(userId: string): Upload[] | null {
  return hydrate(userId)?.uploads ?? null;
}

export function cacheUploads(userId: string, uploads: Upload[]) {
  const entry: UploadsEntry = { uploads, fetchedAt: Date.now() };
  uploadsCache.set(userId, entry);
  writeStorage(userId, entry);
}

export function invalidateUploadsCache(userId?: string) {
  if (!userId) {
    uploadsCache.clear();
    uploadsInflight.clear();
    try {
      const keys: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key?.startsWith(STORAGE_PREFIX)) keys.push(key);
      }
      for (const key of keys) sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
    return;
  }

  uploadsCache.delete(userId);
  uploadsInflight.delete(userId);
  try {
    sessionStorage.removeItem(storageKey(userId));
  } catch {
    /* ignore */
  }
}

export async function fetchUploads(
  userId: string,
  options?: { force?: boolean },
): Promise<Upload[]> {
  if (!options?.force) {
    const cached = hydrate(userId);
    if (cached && isFresh(cached.fetchedAt)) return cached.uploads;
    if (cached) return cached.uploads;
  }

  const existing = uploadsInflight.get(userId);
  if (existing) return existing;

  const promise = listUploads(userId)
    .then(({ uploads }) => {
      cacheUploads(userId, uploads);
      return uploads;
    })
    .finally(() => {
      uploadsInflight.delete(userId);
    });

  uploadsInflight.set(userId, promise);
  return promise;
}
