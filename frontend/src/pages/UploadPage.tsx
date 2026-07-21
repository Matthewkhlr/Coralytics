import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, FilePlus2, GripVertical, Info, LoaderCircle, Trash2 } from "lucide-react";
import { ApiError, analyzeUploads, updateUploadPlatform, uploadExport } from "@/api/client";
import type { Analysis, Upload } from "@/api/types";
import { useAuth } from "@/contexts/AuthContext";
import { useAnalysisHistory } from "@/hooks/useAnalysisHistory";
import { useUploads } from "@/hooks/useUploads";
import { OceanPageFrame, PageHeader, PageTitle, SectionTitle } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { cacheAnalysis, invalidateAnalysisCache } from "@/lib/analysisCache";
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

/** Matches the landing page "Get started" button (use with variant="outline"). */
const LANDING_BUTTON =
  "h-auto rounded-none border-foreground/35 bg-accent/10 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] backdrop-blur-md hover:bg-accent/20 hover:border-foreground/60";

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
        <Info size={15} strokeWidth={2} aria-hidden />
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
              done && !active && "upload-step__badge--done",
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
                {children ? <div className="upload-step__content">{children}</div> : null}
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
      <PageTitle>
        Upload Your Data
      </PageTitle>
    </PageHeader>
  );
}

// The upload flow sits on the shared OceanPageFrame — the same static
// ambient reef backdrop used by the dashboard and insights pages.
const UploadPageFrame = OceanPageFrame;

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
      <FilePlus2 className="relative text-foreground/95" size={22} strokeWidth={1.75} />
      <span className="upload-dropzone__label relative text-sm leading-[1.65] text-foreground/95">
        Drop files here or click to add
      </span>
    </div>
  );
}

function SavedFilesList({ uploads }: { uploads: Upload[] }) {
  if (!uploads.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm font-bold leading-[1.65] text-foreground/95" role="status">
        {uploads.length} file{uploads.length === 1 ? "" : "s"} saved
      </p>
      <ul className="flex flex-wrap gap-2">
        {uploads.map((upload) => (
          <li
            key={upload.upload_id}
            className="inline-flex w-64 max-w-full items-center rounded-[10px] border border-foreground/20 bg-background/80 px-3 py-1.5"
          >
            <p
              className="truncate text-sm leading-[1.65] text-foreground/95"
              title={upload.filename ?? upload.upload_id}
            >
              {upload.filename ?? upload.upload_id}
            </p>
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
    <li className="inline-flex w-64 max-w-full items-center gap-1.5 rounded-[10px] border border-foreground/20 bg-background/80 py-1 pl-3 pr-1">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm leading-[1.65] text-foreground/95" title={row.file.name}>
          {row.file.name}
        </p>
        {row.error ? (
          <p className="break-words text-xs text-primary">{row.error}</p>
        ) : null}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        disabled={saving}
        aria-label={`Remove ${row.file.name}`}
        onClick={() => onRemove(row.id)}
        className="shrink-0 rounded-full text-muted-foreground/90 hover:text-foreground"
      >
        <Trash2 size={14} />
      </Button>
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
      <p className="text-sm font-bold leading-[1.65] text-foreground/95">Unsupported files, please delete them</p>
      <ul className="flex flex-wrap gap-2">
        {rows.map((row) => (
          <DraftFileRow key={row.id} row={row} saving={saving} onRemove={onRemove} />
        ))}
      </ul>
    </div>
  );
}

function SourceChip({
  upload,
  disabled,
  updating,
}: {
  upload: Upload;
  disabled: boolean;
  updating: boolean;
}) {
  return (
    <li
      draggable={!disabled && !updating}
      onDragStart={(event) => {
        event.dataTransfer.setData("text/upload-id", upload.upload_id);
        event.dataTransfer.effectAllowed = "move";
      }}
      className={cn(
        "flex items-center gap-2 rounded-[10px] border border-foreground/20 bg-background/80 px-3 py-1.5",
        disabled || updating ? "opacity-60" : "cursor-grab active:cursor-grabbing",
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm leading-[1.65] text-foreground/95" title={upload.filename}>
          {upload.filename}
        </p>
      </div>
      {updating ? (
        <LoaderCircle className="spin-icon shrink-0 text-muted-foreground" size={14} />
      ) : (
        <GripVertical size={14} className="shrink-0 text-muted-foreground/70" aria-hidden />
      )}
    </li>
  );
}

/**
 * Three source boxes side by side. Files are pre-sorted by the detected
 * platform; the user drags a chip into another box if it landed wrong.
 */
function SourceSortBoard({
  uploads,
  disabled,
  updatingId,
  onPlatformChange,
}: {
  uploads: Upload[];
  disabled: boolean;
  updatingId: string | null;
  onPlatformChange: (uploadId: string, platform: SocialPlatform) => void;
}) {
  const [dragOverBox, setDragOverBox] = useState<SocialPlatform | null>(null);
  const unsorted = uploads.filter((upload) => !isKnownPlatform(upload.platform));

  const dropInto = (platform: SocialPlatform) => (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOverBox(null);
    if (disabled) return;
    const uploadId = event.dataTransfer.getData("text/upload-id");
    const upload = uploads.find((u) => u.upload_id === uploadId);
    if (!upload || upload.platform === platform) return;
    onPlatformChange(upload.upload_id, platform);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-[1.65] text-foreground/95">
        We sorted your files by source. Drag a chip into another box if it landed wrong.
      </p>

      {unsorted.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-bold leading-[1.65] text-foreground/95">
            Unsorted — drag these into a box
          </p>
          <ul className="flex flex-wrap gap-2">
            {unsorted.map((upload) => (
              <SourceChip
                key={upload.upload_id}
                upload={upload}
                disabled={disabled}
                updating={updatingId === upload.upload_id}
              />
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-3">
        {PLATFORMS.map((platform) => {
          const items = uploads.filter((upload) => upload.platform === platform.key);
          const isTarget = dragOverBox === platform.key;
          return (
            <div
              key={platform.key}
              onDragOver={(event) => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                setDragOverBox(platform.key);
              }}
              onDragLeave={() =>
                setDragOverBox((current) => (current === platform.key ? null : current))
              }
              onDrop={dropInto(platform.key)}
              className={cn(
                "min-h-[9rem] space-y-2 border p-3 transition-colors",
                isTarget
                  ? "border-foreground/60 bg-background/60"
                  : "border-foreground/20 bg-background/40",
              )}
            >
              <p className="text-center text-sm font-bold leading-[1.65] text-foreground/95">{platform.label}</p>
              <ul className="space-y-2">
                {items.map((upload) => (
                  <SourceChip
                    key={upload.upload_id}
                    upload={upload}
                    disabled={disabled}
                    updating={updatingId === upload.upload_id}
                  />
                ))}
              </ul>
              {items.length === 0 ? (
                <p className="text-xs text-muted-foreground">Drop files here</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function UploadPage() {
  const { user } = useAuth();
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

      for (let i = 0; i < accepted.length; i++) {
        const file = accepted[i];
        const contentHash = await hashFile(file);

        const existingDraft = findDraftByFile(file, contentHash, [
          ...draft,
          ...nextRows,
        ]);
        if (existingDraft) {
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
        setError(null);
      }
    },
    [draft, idPrefix],
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
      const message = err instanceof Error ? err.message : "Failed to update source.";
      setError(message);
    } finally {
      setUpdatingPlatformId(null);
    }
  };

  const finishAnalyze = async () => {
    if (!user) return;
    setProgress("Analysing…");
    const analysis = await analyzeUploads({
      user_id: user.uid,
      persist: true,
      name: runName.trim() || undefined,
    });

    invalidateAnalysisCache(user.uid);
    cacheAnalysis(analysis);

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
    setActiveStep(1);
  };

  const viewCoral = () => {
    if (completedAnalysisId) {
      navigate(`/dashboard?run=${encodeURIComponent(completedAnalysisId)}`, {
        state: { analysisId: completedAnalysisId, showDiff: true },
      });
      return;
    }
    navigate("/dashboard");
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
      await finishAnalyze();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to analyze.";
      setError(message);
    } finally {
      setSaving(false);
      setProgress(null);
    }
  };

  const removeDraftFile = (id: string) => {
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
    <UploadPageFrame>
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
              <Alert variant="destructive" className="mb-4">
                <AlertDescription role="alert">{formatError}</AlertDescription>
              </Alert>
            ) : null}

            {uploadOpen ? (
              <>
                <UploadDropzone
                  inputRef={inputRef}
                  saving={saving}
                  onAddFiles={(files) => void addFiles(files)}
                />

                {draft.length > 0 ? (
                  <div className="mt-3 space-y-4">
                    <ul className="flex flex-wrap gap-2">
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
                      <Button
                        type="button"
                        variant="outline"
                        className={LANDING_BUTTON}
                        disabled={saving || hasUnsupportedFiles}
                        onClick={() => void handleIngest()}
                      >
                        Ingest
                      </Button>
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <SavedFilesList uploads={supportedUploads} />

                <UnsupportedFilesList
                  rows={unsupportedDraft}
                  saving={saving}
                  onRemove={removeDraftFile}
                  className={hasSupportedUploads ? "mt-6" : undefined}
                />

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    className={LANDING_BUTTON}
                    disabled={saving}
                    onClick={goBackToUpload}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={LANDING_BUTTON}
                    disabled={saving || hasUnsupportedFiles || !hasSupportedUploads}
                    onClick={() => continueToSourcesStep()}
                  >
                    Continue
                  </Button>
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
              <SourceSortBoard
                uploads={activeReviewUploads}
                disabled={saving}
                updatingId={updatingPlatformId}
                onPlatformChange={(uploadId, platform) =>
                  void changeUploadPlatform(uploadId, platform)
                }
              />
            ) : null}
            <div className="mt-5 flex justify-end">
              <Button
                type="button"
                variant="outline"
                className={LANDING_BUTTON}
                disabled={saving || !allSourcesConfirmed || Boolean(updatingPlatformId)}
                onClick={() => {
                  setRunName((prev) => prev.trim() || defaultRunName());
                  setActiveStep(3);
                }}
              >
                Continue
              </Button>
            </div>
          </StepRail>

          <StepRail
            n={3}
            active={activeStep === 3}
            done={runStepDone}
            locked={!sourcesStepDone}
            tone={UPLOAD_STEP_TONES.grow}
            title="Run Exports"
          >
            <div className="mb-4 max-w-md space-y-1.5">
              <Label htmlFor="run-name" className="text-[0.975rem] font-bold tracking-tight">
                Name
              </Label>
              <Input
                id="run-name"
                type="text"
                value={runName}
                onChange={(e) => setRunName(e.target.value)}
                disabled={saving || !hasIngested}
                maxLength={120}
                className="rounded-[10px] border-foreground/20 bg-background/80 dark:bg-background/80 focus-visible:border-foreground/40 focus-visible:ring-0"
              />
            </div>

            {flowError ? (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription role="alert">{flowError}</AlertDescription>
              </Alert>
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
              <Button
                type="button"
                variant="outline"
                className={LANDING_BUTTON}
                disabled={saving || !hasIngested || draft.length > 0 || totalReviewPosts === 0}
                onClick={() => void confirmGrow()}
              >
                Upload
              </Button>
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
            description="Your coral is ready on the dashboard. Open it to explore the result, or start another run."
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" className={LANDING_BUTTON} onClick={resetUploadFlow}>
                Run new
              </Button>
              <Button type="button" variant="outline" className={LANDING_BUTTON} onClick={viewCoral}>
                View
              </Button>
            </div>
          </StepRail>
          </div>
        </div>

        <aside className="min-w-0 lg:pl-2">
          <Card className="rounded-2xl border-border/40 bg-card/25 py-4 lg:sticky lg:top-24">
            <CardHeader className="px-4">
              <CardTitle className="text-[0.975rem] font-bold tracking-tight">My Runs</CardTitle>
            </CardHeader>

            <CardContent className="px-4">
              {history.status === "loading" ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : history.status === "error" ? (
                <p className="text-sm text-primary">{history.error}</p>
              ) : analyses.length === 0 ? (
                <p className="text-sm text-muted-foreground">No runs yet.</p>
              ) : (
                <ScrollArea className="max-h-[28rem]">
                  <ul className="space-y-0 divide-y divide-border/40 pr-3">
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
                                <Badge
                                  variant="outline"
                                  className="ml-2 border-accent/40 text-[0.65rem] font-bold tracking-wider text-accent"
                                >
                                  LATEST
                                </Badge>
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
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </UploadPageFrame>
  );
}
