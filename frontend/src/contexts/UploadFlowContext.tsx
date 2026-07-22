import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Outlet } from "react-router-dom";
import type { Upload } from "@/api/types";
import { useAuth } from "@/contexts/AuthContext";
import {
  clearUploadFlowState,
  isPageReload,
  isUploadFlowInProgress,
  readUploadFlowSession,
  shouldWarnUploadFlowUnload,
  writeUploadFlowSession,
  type DraftMeta,
} from "@/lib/uploadFlowSession";
import {
  cacheUploadFlowDrafts,
  peekUploadFlowDrafts,
} from "@/lib/uploadFlowDraftCache";

export type DraftFile = {
  id: string;
  file: File;
  contentHash: string;
  error?: string;
};

type UploadFlowContextValue = {
  draft: DraftFile[];
  setDraft: React.Dispatch<React.SetStateAction<DraftFile[]>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  saving: boolean;
  setSaving: React.Dispatch<React.SetStateAction<boolean>>;
  progress: string | null;
  setProgress: React.Dispatch<React.SetStateAction<string | null>>;
  reviewUploads: Upload[] | null;
  setReviewUploads: React.Dispatch<React.SetStateAction<Upload[] | null>>;
  runName: string;
  setRunName: React.Dispatch<React.SetStateAction<string>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  updatingPlatformId: string | null;
  setUpdatingPlatformId: React.Dispatch<React.SetStateAction<string | null>>;
  uploadOpen: boolean;
  setUploadOpen: React.Dispatch<React.SetStateAction<boolean>>;
  completedAnalysisId: string | null;
  setCompletedAnalysisId: React.Dispatch<React.SetStateAction<string | null>>;
  uploadDraftSnapshotRef: React.MutableRefObject<DraftFile[]>;
  resetUploadFlow: () => void;
};

const UploadFlowContext = createContext<UploadFlowContextValue | null>(null);

function serializeDraftRows(rows: DraftFile[]): DraftMeta[] {
  return rows.map(({ id, file, contentHash, error }) => ({
    id,
    fileName: file.name,
    contentHash,
    error,
  }));
}

export function UploadFlowProvider() {
  const { user } = useAuth();
  const [draft, setDraft] = useState<DraftFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [reviewUploads, setReviewUploads] = useState<Upload[] | null>(null);
  const [runName, setRunName] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [updatingPlatformId, setUpdatingPlatformId] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(true);
  const [completedAnalysisId, setCompletedAnalysisId] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const uploadDraftSnapshotRef = useRef<DraftFile[]>([]);
  const sessionHydratedRef = useRef(false);
  const userIdRef = useRef<string | null>(null);

  const resetUploadFlow = useCallback(() => {
    setDraft([]);
    setReviewUploads(null);
    setRunName("");
    setUploadOpen(true);
    setError(null);
    setProgress(null);
    setCompletedAnalysisId(null);
    uploadDraftSnapshotRef.current = [];
    setActiveStep(1);
    if (user?.uid) clearUploadFlowState(user.uid);
  }, [user?.uid]);

  useLayoutEffect(() => {
    const userId = user?.uid ?? null;
    if (!userId) {
      sessionHydratedRef.current = false;
      setSessionReady(false);
      userIdRef.current = null;
      return;
    }

    if (userIdRef.current !== userId) {
      sessionHydratedRef.current = false;
      userIdRef.current = userId;

      if (isPageReload()) {
        clearUploadFlowState(userId);
        setDraft([]);
        uploadDraftSnapshotRef.current = [];
        sessionHydratedRef.current = true;
        setSessionReady(true);
        return;
      }

      const session = readUploadFlowSession(userId);
      const cachedDrafts = peekUploadFlowDrafts(userId);

      if (session) {
        setActiveStep(session.activeStep);
        setUploadOpen(session.uploadOpen);
        setReviewUploads(session.reviewUploads);
        setRunName(session.runName);
        setCompletedAnalysisId(session.completedAnalysisId);
      }

      if (cachedDrafts) {
        setDraft(cachedDrafts.draft);
        uploadDraftSnapshotRef.current = cachedDrafts.snapshot;
      } else {
        uploadDraftSnapshotRef.current = [];
      }

      sessionHydratedRef.current = true;
      setSessionReady(true);
    }
  }, [user?.uid]);

  useEffect(() => {
    if (!user?.uid || !sessionReady || !sessionHydratedRef.current) return;

    const progressActive = isUploadFlowInProgress({
      activeStep,
      uploadOpen,
      draftCount: draft.length,
      reviewUploadsCount: reviewUploads?.length ?? 0,
      runName,
      completedAnalysisId,
      saving,
    });

    if (!progressActive) {
      const cached = peekUploadFlowDrafts(user.uid);
      const stored = readUploadFlowSession(user.uid);
      if (cached?.draft.length || stored?.draftMeta?.length) return;
      clearUploadFlowState(user.uid);
      return;
    }

    cacheUploadFlowDrafts(user.uid, draft, uploadDraftSnapshotRef.current);
    writeUploadFlowSession(user.uid, {
      activeStep,
      uploadOpen,
      reviewUploads,
      runName,
      completedAnalysisId,
      draftMeta: serializeDraftRows(draft),
      draftSnapshotMeta: serializeDraftRows(uploadDraftSnapshotRef.current),
    });
  }, [
    user?.uid,
    sessionReady,
    activeStep,
    uploadOpen,
    reviewUploads,
    runName,
    completedAnalysisId,
    draft,
    saving,
  ]);

  useEffect(() => {
    if (!user?.uid) return;

    const inProgress = shouldWarnUploadFlowUnload({
      activeStep,
      uploadOpen,
      draftCount: draft.length,
      reviewUploadsCount: reviewUploads?.length ?? 0,
      runName,
      completedAnalysisId,
      saving,
    });
    if (!inProgress) return;

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "Changes you made may not be saved.";
      return event.returnValue;
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [
    user?.uid,
    activeStep,
    uploadOpen,
    draft.length,
    reviewUploads,
    runName,
    completedAnalysisId,
    saving,
  ]);

  const value: UploadFlowContextValue = {
    draft,
    setDraft,
    error,
    setError,
    saving,
    setSaving,
    progress,
    setProgress,
    reviewUploads,
    setReviewUploads,
    runName,
    setRunName,
    activeStep,
    setActiveStep,
    updatingPlatformId,
    setUpdatingPlatformId,
    uploadOpen,
    setUploadOpen,
    completedAnalysisId,
    setCompletedAnalysisId,
    uploadDraftSnapshotRef,
    resetUploadFlow,
  };

  return <UploadFlowContext.Provider value={value}><Outlet /></UploadFlowContext.Provider>;
}

export function useUploadFlow() {
  const context = useContext(UploadFlowContext);
  if (!context) {
    throw new Error("useUploadFlow must be used within UploadFlowProvider");
  }
  return context;
}
