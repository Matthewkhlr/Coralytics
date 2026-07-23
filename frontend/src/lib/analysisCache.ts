import { listAnalyses } from "@/api/client";
import type { Analysis } from "@/api/types";

type ListEntry = { analyses: Analysis[]; fetchedAt: number };
type AnalysisEntry = { analysis: Analysis; fetchedAt: number };

const listCache = new Map<string, ListEntry>();
const analysisCache = new Map<string, AnalysisEntry>();
const listInflight = new Map<string, Promise<Analysis[]>>();

const STORAGE_PREFIX = "coralytics.session.analysis.";
/** Serve memory/session cache without refetching for this long. */
const FRESH_MS = 5 * 60 * 1000;

function analysisKey(userId: string, analysisId: string) {
  return `${userId}:${analysisId}`;
}

function storageKey(kind: "list" | "item", id: string) {
  return `${STORAGE_PREFIX}${kind}.${id}`;
}

function readStorage<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode — memory cache still works */
  }
}

function removeStorageKeys(prefix: string) {
  try {
    const keys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith(prefix)) keys.push(key);
    }
    for (const key of keys) sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

function hydrateList(userId: string): ListEntry | null {
  const memory = listCache.get(userId);
  if (memory) return memory;
  const stored = readStorage<ListEntry>(storageKey("list", userId));
  if (!stored?.analyses) return null;
  listCache.set(userId, stored);
  return stored;
}

function isFresh(fetchedAt: number) {
  return Date.now() - fetchedAt < FRESH_MS;
}

export function peekAnalysisList(userId: string): Analysis[] | null {
  return hydrateList(userId)?.analyses ?? null;
}

export function cacheAnalysis(analysis: Analysis) {
  const userId = analysis.user_id;
  const analysisId = analysis.analysis_id;
  if (!userId || !analysisId) return;

  const entry: AnalysisEntry = { analysis, fetchedAt: Date.now() };
  const key = analysisKey(userId, analysisId);
  analysisCache.set(key, entry);
  writeStorage(storageKey("item", key), entry);

  const list = hydrateList(userId);
  if (list) {
    const without = list.analyses.filter((a) => a.analysis_id !== analysisId);
    const next: ListEntry = {
      analyses: [analysis, ...without],
      fetchedAt: Date.now(),
    };
    listCache.set(userId, next);
    writeStorage(storageKey("list", userId), next);
  }
}

export function removeAnalysisFromCache(userId: string, analysisId: string) {
  const key = analysisKey(userId, analysisId);
  analysisCache.delete(key);

  try {
    sessionStorage.removeItem(storageKey("item", key));
  } catch {
    /* ignore */
  }

  const list = hydrateList(userId);
  if (!list) return;

  const analyses = list.analyses.filter((item) => item.analysis_id !== analysisId);
  if (!analyses.length) {
    listCache.delete(userId);
    try {
      sessionStorage.removeItem(storageKey("list", userId));
    } catch {
      /* ignore */
    }
    return;
  }

  const next: ListEntry = { analyses, fetchedAt: Date.now() };
  listCache.set(userId, next);
  writeStorage(storageKey("list", userId), next);
}

export function invalidateAnalysisCache(userId?: string) {
  if (!userId) {
    listCache.clear();
    analysisCache.clear();
    listInflight.clear();
    removeStorageKeys(STORAGE_PREFIX);
    removeStorageKeys("coralytics.selectedRunId.");
    return;
  }

  listCache.delete(userId);
  listInflight.delete(userId);
  try {
    sessionStorage.removeItem(storageKey("list", userId));
    sessionStorage.removeItem(`coralytics.selectedRunId.${userId}`);
  } catch {
    /* ignore */
  }

  for (const key of [...analysisCache.keys()]) {
    if (key.startsWith(`${userId}:`)) analysisCache.delete(key);
  }
  removeStorageKeys(`${STORAGE_PREFIX}item.${userId}:`);
}

export async function fetchAnalysisList(
  userId: string,
  options?: { force?: boolean },
): Promise<Analysis[]> {
  if (!options?.force) {
    const cached = hydrateList(userId);
    if (cached && isFresh(cached.fetchedAt)) return cached.analyses;
    if (cached) return cached.analyses;
  }

  const existing = listInflight.get(userId);
  if (existing) return existing;

  const promise = listAnalyses(userId)
    .then(({ analyses }) => {
      const entry: ListEntry = { analyses, fetchedAt: Date.now() };
      listCache.set(userId, entry);
      writeStorage(storageKey("list", userId), entry);
      return analyses;
    })
    .finally(() => {
      listInflight.delete(userId);
    });

  listInflight.set(userId, promise);
  return promise;
}
