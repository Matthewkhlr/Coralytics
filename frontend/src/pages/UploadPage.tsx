import { useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, FilePlus2, LoaderCircle, Trash2 } from "lucide-react";
import { ApiError, analyzeUploads, updateUploadPlatform, uploadExport } from "@/api/client";
import type { Analysis, Upload } from "@/api/types";
import { useAuth } from "@/contexts/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useAnalysisHistory } from "@/hooks/useAnalysisHistory";
import { useUploads } from "@/hooks/useUploads";
import { PageHeader, PageShell, PageTitle, SectionTitle } from "@/components/PageShell";
import { formatPlatform, formatRunLabel, formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "reddit", label: "Reddit" },
] as const;

type SocialPlatform = (typeof PLATFORMS)[number]["key"];

type DraftFile = {
  id: string;
  file: File;
  contentHash: string;
  error?: string;
};

const ALLOWED_EXT = new Set(["json", "txt", "csv", "zip"]);

async function hashFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function isAllowedFile(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ALLOWED_EXT.has(ext);
}

function findUploadByHash(hash: string, uploads: Upload[]) {
  return uploads.find((upload) => upload.content_hash === hash);
}

function mergeUploads(existing: Upload[], incoming: Upload[]) {
  const seen = new Set(existing.map((upload) => upload.upload_id));
  const merged = [...existing];
  for (const upload of incoming) {
    if (seen.has(upload.upload_id)) continue;
    seen.add(upload.upload_id);
    merged.push(upload);
  }
  return merged;
}

function findDraftByFile(file: File, hash: string, rows: DraftFile[]) {
  return rows.find((row) => row.file.name === file.name || row.contentHash === hash);
}

type DuplicateNotice = {
  names: string[];
};

function buildDuplicateNotice(notice: DuplicateNotice | null) {
  if (!notice?.names.length) return null;
  const names = [...new Set(notice.names)];
  return `Duplicated: ${names.join(", ")}. Saved the latest one.`;
}

function cloneDraftForUpload(rows: DraftFile[]): DraftFile[] {
  return rows.map((row) => ({
    ...row,
    error: undefined,
  }));
}

function isAlreadySaved(hash: string, uploads: Upload[]) {
  return uploads.some((upload) => upload.content_hash === hash);
}

function platformsLabel(analysis: Analysis) {
  const platforms = analysis.platform_breakdown?.map((p) => formatPlatform(p.platform)) ?? [];
  if (!platforms.length) return "All uploads";
  return platforms.join(" + ");
}

function topicCount(analysis: Analysis) {
  return analysis.topics?.length ?? analysis.organism_data?.topics?.length ?? 0;
}

/** Matches backend `_default_run_name` — MM/DD/YYYY_HH:MM (local). */
function defaultRunName(when = new Date()) {
  const mm = String(when.getMonth() + 1).padStart(2, "0");
  const dd = String(when.getDate()).padStart(2, "0");
  const yyyy = when.getFullYear();
  const hh = String(when.getHours()).padStart(2, "0");
  const min = String(when.getMinutes()).padStart(2, "0");
  return `${mm}/${dd}/${yyyy}_${hh}:${min}`;
}

const UPLOAD_STEP_TONES = {
  upload: "coral",
  sources: "ocean",
  grow: "grow",
  view: "reef",
} as const;

const UPLOAD_FILE_HELP =
  "Supported sources: Instagram, LinkedIn, Reddit.\nSupported formats: .zip, .json, .csv, .txt.";

const PRIMARY_CTA_CLASS =
  "inline-flex w-auto items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-50";

const SECONDARY_CTA_CLASS =
  "inline-flex w-auto items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-semibold transition hover:bg-card/40 disabled:opacity-50";

const RUN_NAME_HELP = "Every run is saved.";

function StepHelp({ text, ariaLabel = "More information" }: { text: string; ariaLabel?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className="upload-step__help-wrap">
      <button
        type="button"
        className="upload-step__help"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((prev) => !prev)}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
      >
        ?
      </button>
      {open ? (
        <span id={id} role="tooltip" className="upload-step__help-popover whitespace-pre-line">
          {text}
        </span>
      ) : null}
    </span>
  );
}

function StepRail({
  n,
  active = false,
  done = false,
  locked = false,
  isLast = false,
  title,
  titleHelp,
  titleHelpAriaLabel = "More information",
  description,
  summary,
  tone = "coral",
  children,
}: {
  n: number;
  active?: boolean;
  done?: boolean;
  locked?: boolean;
  isLast?: boolean;
  title: string;
  titleHelp?: string;
  titleHelpAriaLabel?: string;
  description?: string;
  summary?: string;
  tone?: "coral" | "reef" | "ocean" | "grow";
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "upload-step",
        active && "upload-step--active",
        done && !active && "upload-step--done",
        locked && "upload-step--locked",
        isLast && "upload-step--last",
        `upload-step--${tone}`,
      )}
    >
      <div className="upload-step__shell">
        <div className="upload-step__front" aria-current={active ? "step" : undefined}>
          <span className="upload-step__glow" aria-hidden />
          <span
            className={cn(
              "upload-step__badge",
              done && !active && "upload-step__badge--done step-complete-pop",
              active && "upload-step__badge--active",
            )}
          >
            {done && !active ? <Check size={14} strokeWidth={3} aria-hidden /> : n}
          </span>
          <span className="upload-step__heading">
            {title}
            {titleHelp ? (
              <StepHelp text={titleHelp} ariaLabel={titleHelpAriaLabel} />
            ) : null}
          </span>
          {!active && summary ? (
            <span className="upload-step__summary">{summary}</span>
          ) : null}
        </div>

        <div className="upload-step__inside" aria-hidden={!active}>
          <div className="upload-step__inside-inner">
            {active ? (
              <>
                {description ? <p className="upload-step__description">{description}</p> : null}
                {children ? <div className="upload-step__content step-reveal">{children}</div> : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
      {!isLast ? <span className="upload-step__connector" aria-hidden /> : null}
    </section>
  );
}

function UploadPageHeader() {
  return (
    <PageHeader className="mb-6">
      <PageTitle className="text-white">
        Upload & Grow Your Coral
      </PageTitle>
    </PageHeader>
  );
}

function GuestUploadPage() {
  return (
    <PageShell>
      <UploadPageHeader />
      <section className="max-w-2xl border-l-2 border-primary/50 pl-6 py-1">
        <SectionTitle>Login to build a run</SectionTitle>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Signed-in users can upload Instagram, LinkedIn, and Reddit exports, grow their coral, and
          track how each run changes the reef.
        </p>
        <ol className="mt-5 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-3">
            <span className="font-semibold text-accent">1</span>
            Upload raw exports — we parse and save them to your library
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-accent">2</span>
            Confirm each file&apos;s source (Instagram, LinkedIn, or Reddit)
          </li>
          <li className="flex gap-3">
            <span className="font-semibold text-accent">3</span>
            Run analysis to grow your coral on the dashboard
          </li>
        </ol>
        <Link
          to="/login"
          className="mt-6 inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition"
        >
          Login to continue →
        </Link>
      </section>
    </PageShell>
  );
}

function isKnownPlatform(platform: string): platform is SocialPlatform {
  return PLATFORMS.some((p) => p.key === platform);
}

function resolveSupportedUploads(
  reviewUploads: Upload[] | null,
  unsupportedDraft: DraftFile[],
  knownUploads: Upload[],
  snapshot: DraftFile[],
): Upload[] {
  if (reviewUploads?.length) return reviewUploads;

  const failedHashes = new Set(unsupportedDraft.map((row) => row.contentHash));
  const fromSnapshot = snapshot
    .filter((row) => !failedHashes.has(row.contentHash))
    .map((row) => findUploadByHash(row.contentHash, knownUploads))
    .filter((upload): upload is Upload => Boolean(upload));

  return mergeUploads([], fromSnapshot);
}

function UploadDropzone({
  inputRef,
  saving,
  onAddFiles,
  className,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  saving: boolean;
  onAddFiles: (files: FileList | null) => void;
  className?: string;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={saving}
      onClick={() => !saving && inputRef.current?.click()}
      onKeyDown={(event) => {
        if (saving) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        if (!saving) onAddFiles(event.dataTransfer.files);
      }}
      className={cn("upload-dropzone", saving && "pointer-events-none opacity-50", className)}
    >
      <span className="upload-dropzone__glow" aria-hidden />
      <FilePlus2 className="relative text-primary" size={22} strokeWidth={1.75} />
      <span className="relative text-sm font-semibold text-foreground">
        Drop files here or click to add
      </span>
    </div>
  );
}

function SavedFilesList({ uploads }: { uploads: Upload[] }) {
  if (!uploads.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-foreground" role="status">
        {uploads.length} file{uploads.length === 1 ? "" : "s"} saved
      </p>
      <ul className="divide-y divide-border/40 overflow-hidden rounded-xl border border-border/50 bg-card/30">
        {uploads.map((upload) => (
          <li key={upload.upload_id} className="px-4 py-3">
            <p className="break-all text-sm font-medium">{upload.filename ?? upload.upload_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DraftFileRow({
  row,
  saving,
  onRemove,
}: {
  row: DraftFile;
  saving: boolean;
  onRemove: (id: string) => void;
}) {
  return (
    <li className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-0 flex-1">
        <p className="break-all text-sm font-medium">{row.file.name}</p>
        {row.error ? (
          <p className="mt-1 break-words text-xs text-primary">{row.error}</p>
        ) : null}
      </div>
      <button
        type="button"
        disabled={saving}
        aria-label={`Remove ${row.file.name}`}
        onClick={() => onRemove(row.id)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:bg-background/50 hover:text-primary disabled:opacity-50"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}

function UnsupportedFilesList({
  rows,
  saving,
  onRemove,
  className,
}: {
  rows: DraftFile[];
  saving: boolean;
  onRemove: (id: string) => void;
  className?: string;
}) {
  if (!rows.length) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-sm font-semibold text-foreground">Unsupported files</p>
      <ul className="divide-y divide-border/40 overflow-hidden rounded-xl border border-border/50 bg-card/30">
        {rows.map((row) => (
          <DraftFileRow key={row.id} row={row} saving={saving} onRemove={onRemove} />
        ))}
      </ul>
    </div>
  );
}

function SourceReviewRow({
  upload,
  disabled,
  saving,
  onPlatformChange,
}: {
  upload: Upload;
  disabled: boolean;
  saving: boolean;
  onPlatformChange: (uploadId: string, platform: SocialPlatform) => void;
}) {
  const currentPlatform = isKnownPlatform(upload.platform) ? upload.platform : "";

  return (
    <li className="flex flex-col gap-3 rounded-xl border border-border/50 bg-card/30 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-0 flex-1">
        <p className="break-all text-sm font-medium">{upload.filename}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {upload.post_count.toLocaleString()} posts
          {upload.comment_count > 0
            ? ` · ${upload.comment_count.toLocaleString()} comments`
            : ""}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <select
          id={`source-${upload.upload_id}`}
          aria-label={`Source for ${upload.filename}`}
          value={currentPlatform}
          disabled={disabled || saving}
          onChange={(e) =>
            onPlatformChange(upload.upload_id, e.target.value as SocialPlatform)
          }
          className="upload-source-select"
        >
            {!currentPlatform ? (
              <option value="" disabled>
                Select source…
              </option>
            ) : null}
            {PLATFORMS.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
        </select>
        {saving ? <LoaderCircle className="spin-icon shrink-0 text-muted-foreground" size={16} /> : null}
      </div>
    </li>
  );
}

export function UploadPage() {
  const { user } = useAuth();
  const { isGuest, withAuth, loading: authLoading } = useRequireAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const idPrefix = useId();

  const history = useAnalysisHistory(user?.uid);
  const uploadsState = useUploads(user?.uid);
  const [draft, setDraft] = useState<DraftFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [reviewUploads, setReviewUploads] = useState<Upload[] | null>(null);
  const [runName, setRunName] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [updatingPlatformId, setUpdatingPlatformId] = useState<string | null>(null);
  /** After Ingest, hide the dropzone until the user chooses Back. */
  const [uploadOpen, setUploadOpen] = useState(true);
  const [completedAnalysisId, setCompletedAnalysisId] = useState<string | null>(null);
  const uploadDraftSnapshotRef = useRef<DraftFile[]>([]);
  const duplicateNoticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [duplicateNotice, setDuplicateNotice] = useState<DuplicateNotice | null>(null);

  const clearDuplicateNotice = useCallback(() => {
    if (duplicateNoticeTimerRef.current) {
      clearTimeout(duplicateNoticeTimerRef.current);
      duplicateNoticeTimerRef.current = null;
    }
    setDuplicateNotice(null);
  }, []);

  const showDuplicateNotice = useCallback((names: string[]) => {
    if (!names.length) return;
    if (duplicateNoticeTimerRef.current) {
      clearTimeout(duplicateNoticeTimerRef.current);
    }
    setDuplicateNotice({ names });
    duplicateNoticeTimerRef.current = setTimeout(() => {
      setDuplicateNotice(null);
      duplicateNoticeTimerRef.current = null;
    }, 3200);
  }, []);

  useEffect(
    () => () => {
      if (duplicateNoticeTimerRef.current) {
        clearTimeout(duplicateNoticeTimerRef.current);
      }
    },
    [],
  );

  const addFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      const rejected: string[] = [];
      const accepted: File[] = [];
      Array.from(files).forEach((file) => {
        if (!isAllowedFile(file)) {
          rejected.push(file.name);
        } else {
          accepted.push(file);
        }
      });
      if (rejected.length) {
        setError(
          "Unsupported format",
        );
        return;
      }

      const nextRows: DraftFile[] = [];
      const skippedInList: string[] = [];

      for (let i = 0; i < accepted.length; i++) {
        const file = accepted[i];
        const contentHash = await hashFile(file);

        const existingDraft = findDraftByFile(file, contentHash, [
          ...draft,
          ...nextRows,
        ]);
        if (existingDraft) {
          skippedInList.push(file.name);
          continue;
        }

        nextRows.push({
          id: `${idPrefix}-${Date.now()}-${i}`,
          file,
          contentHash,
        });
      }

      if (nextRows.length) {
        setDraft((prev) => [...prev, ...nextRows]);
        clearDuplicateNotice();
      }

      if (skippedInList.length) {
        showDuplicateNotice(skippedInList);
      }

      if (!skippedInList.length || nextRows.length) {
        setError(null);
      }
    },
    [clearDuplicateNotice, draft, idPrefix, showDuplicateNotice],
  );

  const knownUploads = mergeUploads(reviewUploads ?? [], uploadsState.uploads);
  const unsupportedDraft = draft.filter((row) => Boolean(row.error));
  const supportedUploads = useMemo(
    () =>
      resolveSupportedUploads(
        reviewUploads,
        unsupportedDraft,
        knownUploads,
        uploadDraftSnapshotRef.current,
      ),
    [reviewUploads, unsupportedDraft, knownUploads],
  );

  if (authLoading) {
    return (
      <PageShell>
        <UploadPageHeader />
      </PageShell>
    );
  }

  if (isGuest) {
    return <GuestUploadPage />;
  }

  const changeUploadPlatform = async (uploadId: string, platform: SocialPlatform) => {
    if (!user) return;
    setUpdatingPlatformId(uploadId);
    setError(null);
    try {
      const updated = await updateUploadPlatform(user.uid, uploadId, platform);
      setReviewUploads((prev) =>
        prev?.map((upload) => (upload.upload_id === uploadId ? updated : upload)) ?? null,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update source.");
    } finally {
      setUpdatingPlatformId(null);
    }
  };

  const finishAnalyze = async (uploadIdsForAnalyze: string[]) => {
    if (!user) return;
    setProgress("Analysing…");
    const analysis = await analyzeUploads({
      user_id: user.uid,
      upload_ids: uploadIdsForAnalyze,
      persist: true,
      name: runName.trim() || undefined,
    });

    // Advance to step 4 before any await so step 3 never paints with a blank name.
    setCompletedAnalysisId(analysis.analysis_id);
    setProgress(null);
    setError(null);
    setActiveStep(4);
    setDraft([]);
    setReviewUploads(null);
    setRunName("");
    setUploadOpen(true);
    uploadDraftSnapshotRef.current = [];

    await history.reload();
    await uploadsState.reload();
  };

  const resetUploadFlow = () => {
    setDraft([]);
    setReviewUploads(null);
    setRunName("");
    setUploadOpen(true);
    setError(null);
    setProgress(null);
    setCompletedAnalysisId(null);
    uploadDraftSnapshotRef.current = [];
    clearDuplicateNotice();
    setActiveStep(1);
  };

  const viewCoral = () => {
    navigate("/dashboard", {
      state: completedAnalysisId
        ? { analysisId: completedAnalysisId, showDiff: true }
        : undefined,
    });
  };

  const goBackToUpload = () => {
    // Restore every file from the pre-ingest snapshot, without page-2 error messages.
    setDraft(cloneDraftForUpload(uploadDraftSnapshotRef.current));
    setError(null);
    setActiveStep(1);
    setUploadOpen(true);
  };

  const runIngestBatch = async () => {
    if (!user || draft.length === 0) return;

    uploadDraftSnapshotRef.current = cloneDraftForUpload(draft);
    const toIngest = draft.filter(
      (row) => !row.error && !isAlreadySaved(row.contentHash, knownUploads),
    );
    if (toIngest.length === 0) {
      const failed = draft.filter((row) => row.error);
      setDraft(failed);
      setUploadOpen(false);
      setError(null);
      return;
    }

    setUploadOpen(false);
    setSaving(true);
    setError(null);
    let succeeded: Upload[] = [...(reviewUploads ?? [])];
    const failed: DraftFile[] = [];

    try {
      for (let i = 0; i < toIngest.length; i++) {
        const row = toIngest[i];
        const existing = findUploadByHash(row.contentHash, knownUploads);
        if (existing) {
          succeeded = mergeUploads(succeeded, [existing]);
          continue;
        }

        setProgress(`Ingesting ${i + 1} of ${toIngest.length}: ${row.file.name}`);
        try {
          const result = await uploadExport(user.uid, row.file, {
            runAnalysis: false,
          });
          succeeded = mergeUploads(succeeded, [result]);
        } catch (err) {
          const message =
            err instanceof ApiError || err instanceof Error ? err.message : "Upload failed.";
          failed.push({ ...row, error: message });
          setError(message);
        }
      }

      setDraft(failed);
      if (succeeded.length) {
        setReviewUploads(succeeded);
        await uploadsState.reload();
      }
    } finally {
      setSaving(false);
      setProgress(null);
    }
  };

  const confirmGrow = async () => {
    if (!user || !reviewUploads?.length) return;
    setSaving(true);
    setError(null);
    try {
      const uploadIds = reviewUploads.map((upload) => upload.upload_id);
      await finishAnalyze(uploadIds);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze.");
    } finally {
      setSaving(false);
      setProgress(null);
    }
  };

  const removeDraftFile = (id: string) => {
    clearDuplicateNotice();
    setDraft((prev) => {
      const next = prev.filter((item) => item.id !== id);
      uploadDraftSnapshotRef.current = uploadDraftSnapshotRef.current.filter((item) => item.id !== id);
      if (!next.some((item) => item.error)) {
        setError(null);
      }
      return next;
    });
  };

  const formatError = error?.startsWith("Unsupported format") ? error : null;
  const flowError = error && !formatError ? error : null;
  const analyses = history.analyses;
  const runCount = analyses.length;
  const hasUnsupportedFiles = draft.some((row) => Boolean(row.error));
  const hasSupportedUploads = supportedUploads.length > 0;
  const hasIngested = hasSupportedUploads;
  const runFinished = activeStep >= 4 || Boolean(completedAnalysisId);
  const ingestComplete = (hasSupportedUploads && draft.length === 0) || runFinished;
  const sourcesStepDone = (ingestComplete && activeStep > 2) || runFinished;
  const runStepDone = activeStep > 3 || runFinished;
  const activeReviewUploads = reviewUploads ?? supportedUploads;
  const allSourcesConfirmed =
    activeReviewUploads.every((upload) => isKnownPlatform(upload.platform));
  const totalReviewPosts = activeReviewUploads.reduce((sum, upload) => sum + upload.post_count, 0);
  const duplicateNoticeText = buildDuplicateNotice(duplicateNotice);

  const continueToSourcesStep = () => {
    if (hasUnsupportedFiles || !hasSupportedUploads) return;
    if (!reviewUploads?.length && supportedUploads.length) {
      setReviewUploads(supportedUploads);
    }
    setActiveStep(2);
  };

  const handleIngest = () => {
    if (hasUnsupportedFiles || draft.length === 0) return;
    void runIngestBatch();
  };

  return (
    <PageShell>
      <UploadPageHeader />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-10 xl:gap-12">
        {/* Main flow — full column width, no half-width caps */}
        <div className="min-w-0">
          <input
            ref={inputRef}
            type="file"
            accept=".json,.txt,.csv,.zip"
            multiple
            hidden
            onChange={(e) => {
              void addFiles(e.target.files);
              e.target.value = "";
            }}
          />

          <div className="upload-flow-panel rounded-3xl border border-border/60 bg-card/40 p-5 sm:p-6">
          <div className="upload-flow">
          <StepRail
            n={1}
            active={activeStep === 1}
            done={ingestComplete}
            locked={false}
            tone={UPLOAD_STEP_TONES.upload}
            title="Upload Raw Exports"
            titleHelp={UPLOAD_FILE_HELP}
            titleHelpAriaLabel="Supported sources and formats"
            summary={
              !ingestComplete && draft.length > 0
                ? `${draft.length} file${draft.length === 1 ? "" : "s"} ready`
                : undefined
            }
          >
            {formatError ? (
              <p className="mb-4 text-sm text-primary break-words" role="alert">
                {formatError}
              </p>
            ) : null}

            {uploadOpen ? (
              <>
                <UploadDropzone
                  inputRef={inputRef}
                  saving={saving}
                  onAddFiles={(files) => void addFiles(files)}
                />

                {duplicateNoticeText ? (
                  <p className="upload-duplicate-notice mt-2" role="status" aria-live="polite">
                    {duplicateNoticeText}
                  </p>
                ) : null}

                {draft.length > 0 ? (
                  <div className="mt-3 space-y-4">
                    <ul className="divide-y divide-border/40 overflow-hidden rounded-xl border border-border/50 bg-card/30">
                      {draft.map((row) => (
                        <DraftFileRow
                          key={row.id}
                          row={row}
                          saving={saving}
                          onRemove={removeDraftFile}
                        />
                      ))}
                    </ul>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        disabled={saving || hasUnsupportedFiles}
                        onClick={() => withAuth(() => handleIngest())}
                        className={PRIMARY_CTA_CLASS}
                      >
                        Ingest
                      </button>
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                {duplicateNoticeText ? (
                  <p className="upload-duplicate-notice mb-4" role="status" aria-live="polite">
                    {duplicateNoticeText}
                  </p>
                ) : null}

                <SavedFilesList uploads={supportedUploads} />

                <UnsupportedFilesList
                  rows={unsupportedDraft}
                  saving={saving}
                  onRemove={removeDraftFile}
                  className={hasSupportedUploads ? "mt-6" : undefined}
                />

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={goBackToUpload}
                    className={SECONDARY_CTA_CLASS}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={saving || hasUnsupportedFiles || !hasSupportedUploads}
                    onClick={() => withAuth(() => continueToSourcesStep())}
                    className={PRIMARY_CTA_CLASS}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}
          </StepRail>

          <StepRail
            n={2}
            active={activeStep === 2}
            done={sourcesStepDone}
            locked={!ingestComplete}
            tone={UPLOAD_STEP_TONES.sources}
            title="Confirm Export Sources"
          >
            {activeReviewUploads.length > 0 ? (
              <ul className="space-y-2">
                {activeReviewUploads.map((upload) => (
                  <SourceReviewRow
                    key={upload.upload_id}
                    upload={upload}
                    disabled={saving}
                    saving={updatingPlatformId === upload.upload_id}
                    onPlatformChange={(uploadId, platform) =>
                      void changeUploadPlatform(uploadId, platform)
                    }
                  />
                ))}
              </ul>
            ) : null}
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                disabled={saving || !allSourcesConfirmed || Boolean(updatingPlatformId)}
                onClick={() => {
                  setRunName((prev) => prev.trim() || defaultRunName());
                  setActiveStep(3);
                }}
                className={PRIMARY_CTA_CLASS}
              >
                Continue
              </button>
            </div>
          </StepRail>

          <StepRail
            n={3}
            active={activeStep === 3}
            done={runStepDone}
            locked={!sourcesStepDone}
            tone={UPLOAD_STEP_TONES.grow}
            title="Run Exports"
            titleHelp={RUN_NAME_HELP}
            titleHelpAriaLabel="About runs"
          >
            <label className="mb-4 block max-w-md">
              <span className="text-[0.975rem] font-bold tracking-tight">Name</span>
              <input
                type="text"
                value={runName}
                onChange={(e) => setRunName(e.target.value)}
                disabled={saving || !hasIngested}
                maxLength={120}
                className="mt-1.5 w-full rounded-xl border border-border bg-card/30 px-4 py-2.5 text-sm outline-none transition focus:border-accent/50 disabled:opacity-50"
              />
            </label>

            {flowError ? (
              <p className="mb-4 text-sm text-primary break-words" role="alert">
                {flowError}
              </p>
            ) : null}
            {progress ? (
              <div
                className="mb-4 flex items-center gap-2 text-sm text-muted-foreground"
                role="status"
              >
                <LoaderCircle className="spin-icon shrink-0" size={16} />
                <span className="break-all">{progress}</span>
              </div>
            ) : null}

            <div className="flex justify-end">
              <button
                type="button"
                disabled={saving || !hasIngested || draft.length > 0 || totalReviewPosts === 0}
                onClick={() => withAuth(() => void confirmGrow())}
                className={PRIMARY_CTA_CLASS}
              >
                Upload
              </button>
            </div>
            {totalReviewPosts === 0 && hasIngested && draft.length === 0 ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Nothing to analyze yet — these exports have no text posts or comments. Go back and
                ingest Shares or Comments CSVs, then return here.
              </p>
            ) : null}
            {hasIngested && draft.length > 0 ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Finish ingesting remaining files before running analysis.
              </p>
            ) : null}
          </StepRail>

          <StepRail
            n={4}
            active={activeStep === 4}
            done={false}
            locked={!runStepDone}
            tone={UPLOAD_STEP_TONES.view}
            isLast
            title="View Your Coral"
            description="Run completed. Your coral is ready on the dashboard. Open it to explore the result, or start another run."
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={resetUploadFlow}
                className={SECONDARY_CTA_CLASS}
              >
                Run new
              </button>
              <button
                type="button"
                onClick={viewCoral}
                className={PRIMARY_CTA_CLASS}
              >
                View
              </button>
            </div>
          </StepRail>
          </div>
          </div>
        </div>

        <aside className="min-w-0 lg:pl-2">
          <div className="lg:sticky lg:top-24 rounded-2xl border border-border/40 bg-card/25 p-4">
            <p className="text-[0.975rem] font-bold tracking-tight">My Runs</p>

            {history.status === "loading" ? (
              <p className="mt-5 text-sm text-muted-foreground">Loading…</p>
            ) : history.status === "error" ? (
              <p className="mt-5 text-sm text-primary">{history.error}</p>
            ) : analyses.length === 0 ? (
              <p className="mt-5 text-sm text-muted-foreground">No runs yet.</p>
            ) : (
              <ul className="mt-5 space-y-0 divide-y divide-border/40">
                {analyses.map((analysis, index) => {
                  const runNumber = runCount - index;
                  const older = analyses[index + 1];
                  const postDelta = older ? analysis.post_count - older.post_count : null;
                  const topicDelta = older ? topicCount(analysis) - topicCount(older) : null;
                  const isLatest = index === 0;

                  return (
                    <li key={analysis.analysis_id} className="py-4 first:pt-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="min-w-0 break-words font-semibold">
                          {formatRunLabel(analysis, runNumber)}
                          {isLatest ? (
                            <span className="ml-2 text-[0.65rem] font-bold tracking-wider text-accent">
                              LATEST
                            </span>
                          ) : null}
                        </p>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {formatShortDate(analysis.created_at)} · {platformsLabel(analysis)} ·{" "}
                        {analysis.post_count.toLocaleString()} posts
                        {postDelta !== null && postDelta !== 0 ? (
                          <span className="text-accent">
                            {" "}
                            ({postDelta > 0 ? "+" : ""}
                            {postDelta}
                            {topicDelta !== null && topicDelta !== 0
                              ? ` · ${topicDelta > 0 ? "+" : ""}${topicDelta} topics`
                              : ""}
                            )
                          </span>
                        ) : null}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
