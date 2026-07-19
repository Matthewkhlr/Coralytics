import { getAnalysis, listAnalyses } from "@/api/client";
import type { Analysis } from "@/api/types";

type ListEntry = { analyses: Analysis[]; fetchedAt: number };
type AnalysisEntry = { analysis: Analysis; fetchedAt: number };

const listCache = new Map<string, ListEntry>();
const analysisCache = new Map<string, AnalysisEntry>();
const listInflight = new Map<string, Promise<Analysis[]>>();
const analysisInflight = new Map<string, Promise<Analysis>>();

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

function hydrateAnalysis(userId: string, analysisId: string): AnalysisEntry | null {
  const key = analysisKey(userId, analysisId);
  const memory = analysisCache.get(key);
  if (memory) return memory;
  const stored = readStorage<AnalysisEntry>(storageKey("item", key));
  if (!stored?.analysis) return null;
  analysisCache.set(key, stored);
  return stored;
}

function isFresh(fetchedAt: number) {
  return Date.now() - fetchedAt < FRESH_MS;
}

/** Summaries from list endpoints lack organism/persona payloads. */
function isFullAnalysis(analysis: Analysis) {
  return Boolean(
    analysis.organism_data ||
      analysis.persona_summary ||
      analysis.post_insights ||
      analysis.topics?.length,
  );
}

export function peekAnalysisList(userId: string): Analysis[] | null {
  return hydrateList(userId)?.analyses ?? null;
}

export function peekAnalysis(userId: string, analysisId: string): Analysis | null {
  const entry = hydrateAnalysis(userId, analysisId);
  if (!entry || !isFullAnalysis(entry.analysis)) return null;
  return entry.analysis;
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

export function invalidateAnalysisCache(userId?: string) {
  if (!userId) {
    listCache.clear();
    analysisCache.clear();
    listInflight.clear();
    analysisInflight.clear();
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
  for (const key of [...analysisInflight.keys()]) {
    if (key.startsWith(`${userId}:`)) analysisInflight.delete(key);
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

export async function fetchCachedAnalysis(
  userId: string,
  analysisId: string,
  options?: { force?: boolean },
): Promise<Analysis> {
  const key = analysisKey(userId, analysisId);

  if (!options?.force) {
    const cached = peekAnalysis(userId, analysisId);
    if (cached) {
      const entry = hydrateAnalysis(userId, analysisId);
      if (entry && isFresh(entry.fetchedAt)) return cached;
      return cached;
    }
  }

  const existing = analysisInflight.get(key);
  if (existing) return existing;

  const promise = getAnalysis(userId, analysisId)
    .then((analysis) => {
      const entry: AnalysisEntry = { analysis, fetchedAt: Date.now() };
      analysisCache.set(key, entry);
      writeStorage(storageKey("item", key), entry);
      return analysis;
    })
    .finally(() => {
      analysisInflight.delete(key);
    });

  analysisInflight.set(key, promise);
  return promise;
}
