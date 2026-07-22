import type { Upload } from "@/api/types";

import { clearUploadFlowDraftCache } from "./uploadFlowDraftCache";

const STORAGE_PREFIX = "coralytics.session.uploadFlow.";

export type DraftMeta = {
  id: string;
  fileName: string;
  contentHash: string;
  error?: string;
};

export type UploadFlowSession = {
  activeStep: number;
  uploadOpen: boolean;
  reviewUploads: Upload[] | null;
  runName: string;
  completedAnalysisId: string | null;
  draftMeta: DraftMeta[];
  draftSnapshotMeta: DraftMeta[];
  savedAt: number;
};

export type UploadFlowProgressInput = {
  activeStep: number;
  uploadOpen: boolean;
  draftCount: number;
  reviewUploadsCount: number;
  runName: string;
  completedAnalysisId: string | null;
  saving?: boolean;
};

function storageKey(userId: string) {
  return `${STORAGE_PREFIX}${userId}`;
}

export function isPageReload(): boolean {
  try {
    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;
    return nav?.type === "reload";
  } catch {
    return false;
  }
}

export function isUploadFlowInProgress(input: UploadFlowProgressInput): boolean {
  if (input.saving) return true;
  if (input.activeStep >= 4 && input.completedAnalysisId) return true;
  if (input.draftCount > 0) return true;
  if (input.reviewUploadsCount > 0) return true;
  if (!input.uploadOpen) return true;
  if (input.activeStep > 1) return true;
  if (input.runName.trim()) return true;
  return false;
}

/** Warn on full page refresh while the user still has unfinished upload work. */
export function shouldWarnUploadFlowUnload(input: UploadFlowProgressInput): boolean {
  if (input.saving) return true;
  if (input.activeStep >= 4 && input.completedAnalysisId) return false;
  return isUploadFlowInProgress(input);
}

export function readUploadFlowSession(userId: string): UploadFlowSession | null {
  try {
    const raw = sessionStorage.getItem(storageKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UploadFlowSession;
    if (!parsed || typeof parsed.activeStep !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeUploadFlowSession(userId: string, session: Omit<UploadFlowSession, "savedAt">) {
  try {
    const entry: UploadFlowSession = { ...session, savedAt: Date.now() };
    sessionStorage.setItem(storageKey(userId), JSON.stringify(entry));
  } catch {
    /* quota / private mode */
  }
}

export function clearUploadFlowSession(userId: string) {
  try {
    sessionStorage.removeItem(storageKey(userId));
  } catch {
    /* ignore */
  }
}

export function clearUploadFlowState(userId: string) {
  clearUploadFlowSession(userId);
  clearUploadFlowDraftCache(userId);
}

export function invalidateUploadFlowSession(userId?: string) {
  if (userId) {
    clearUploadFlowState(userId);
    return;
  }

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
  clearUploadFlowDraftCache();
}
