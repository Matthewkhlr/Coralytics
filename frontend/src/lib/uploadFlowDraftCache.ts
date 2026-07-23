export type CachedDraftFile = {
  id: string;
  file: File;
  contentHash: string;
  error?: string;
};

type DraftCacheEntry = {
  draft: CachedDraftFile[];
  snapshot: CachedDraftFile[];
};

const draftCache = new Map<string, DraftCacheEntry>();

function cloneRow(row: CachedDraftFile): CachedDraftFile {
  return { ...row };
}

export function cacheUploadFlowDrafts(
  userId: string,
  draft: CachedDraftFile[],
  snapshot: CachedDraftFile[],
) {
  draftCache.set(userId, {
    draft: draft.map(cloneRow),
    snapshot: snapshot.map(cloneRow),
  });
}

export function peekUploadFlowDrafts(userId: string): DraftCacheEntry | null {
  const entry = draftCache.get(userId);
  if (!entry) return null;
  return {
    draft: entry.draft.map(cloneRow),
    snapshot: entry.snapshot.map(cloneRow),
  };
}

export function clearUploadFlowDraftCache(userId?: string) {
  if (userId) {
    draftCache.delete(userId);
    return;
  }
  draftCache.clear();
}
