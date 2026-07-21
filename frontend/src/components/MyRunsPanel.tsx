import { useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Info,
  Share2,
  Smile,
  X,
} from "lucide-react";
import type { Analysis } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AnalysisHistoryState } from "@/hooks/useAnalysisHistory";
import { LANDING_BUTTON, LANDING_BUTTON_SM } from "@/lib/buttonStyles";
import { formatRunLabel, formatShortDate } from "@/lib/format";
import { formatAnalysisDiff } from "@/lib/organismData";
import { resolveRunScope } from "@/lib/runScope";
import {
  riskStatusLevel,
  sentimentStatusLevel,
  statusBadgeClass,
  statusIconClass,
  statusPanelClass,
  type StatusLevel,
} from "@/lib/statusStyles";
import { cn } from "@/lib/utils";

const ROW_HEIGHT_PX = 52;
const LATEST_COLOR = "text-coral";

function formatMonthYear(iso: string | null | undefined) {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { month: "short", year: "numeric" });
}

function dateRangeLabel(analysis: Analysis) {
  const earliest = formatMonthYear(analysis.date_range?.earliest);
  const latest = formatMonthYear(analysis.date_range?.latest);
  if (!earliest && !latest) return null;
  if (earliest && latest) return `${earliest} – ${latest}`;
  return earliest || latest;
}

function sentimentPhrase(compound: number | null | undefined) {
  if (compound === null || compound === undefined || Number.isNaN(compound)) return null;
  if (compound > 0.3) return "Positive";
  if (compound > 0.05) return "Slightly positive";
  if (compound >= -0.05) return "Neutral";
  if (compound >= -0.3) return "Slightly negative";
  return "Negative";
}

function riskLevel(score: number | null | undefined) {
  if (score === null || score === undefined) return null;
  if (score >= 60) return "High";
  if (score >= 30) return "Moderate";
  return "Low";
}

function formatUpdatedAt(iso: string | undefined) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function DialogSectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  );
}

function DialogPanel({
  children,
  status,
}: {
  children: ReactNode;
  status?: StatusLevel | "default" | "info";
}) {
  return (
    <div
      className={cn(
        "border rounded-lg px-4 py-3",
        status === "default" || !status
          ? "border-foreground/20 bg-background/40"
          : status === "info"
            ? "border-coral/40 bg-coral/10 dark:border-coral/50 dark:bg-coral/14"
            : statusPanelClass(status),
      )}
    >
      {children}
    </div>
  );
}

function DialogIconRow({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-2.5 first:pt-1 last:pb-1">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
      <div className="min-w-0 flex-1 text-sm leading-relaxed text-foreground/90">{children}</div>
    </div>
  );
}

function SentimentBadge({ label }: { label: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("ml-2 text-[10px] font-bold uppercase tracking-wider", statusBadgeClass(sentimentStatusLevel(label)))}
    >
      {label}
    </Badge>
  );
}

function RiskBadge({ label }: { label: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("ml-2 text-[10px] font-bold uppercase tracking-wider", statusBadgeClass(riskStatusLevel(label)))}
    >
      {label}
    </Badge>
  );
}

function RunDetailDialog({
  analysis,
  runNumber,
  isLatest,
  open,
  onClose,
}: {
  analysis: Analysis;
  runNumber: number;
  isLatest: boolean;
  open: boolean;
  onClose: () => void;
}) {
  const scope = resolveRunScope(analysis);
  const dashboardHref = `/dashboard?run=${encodeURIComponent(analysis.analysis_id)}`;
  const insightsHref = `/insights?run=${encodeURIComponent(analysis.analysis_id)}`;
  const diffText = formatAnalysisDiff(analysis.diff);
  const noMeaningfulChange = analysis.diff?.no_meaningful_change === true;
  const sentiment = sentimentPhrase(analysis.sentiment_summary?.compound);
  const risk = riskLevel(analysis.red_flags?.risk_score);
  const period = dateRangeLabel(analysis);
  const comparisonText = noMeaningfulChange
    ? "No meaningful change. This looks like data you already had."
    : diffText ?? "No prior run to compare.";

  const postsLine =
    scope.uploadCount > 0
      ? `${scope.postCount.toLocaleString()} posts analyzed · ${scope.uploadCount} upload${scope.uploadCount === 1 ? "" : "s"}`
      : `${scope.postCount.toLocaleString()} posts analyzed`;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Close run details"
        onClick={onClose}
      />
      <div className="relative flex max-h-[min(90vh,640px)] w-full max-w-md flex-col overflow-hidden border border-foreground/20 bg-background/95 shadow-xl backdrop-blur-md">
        <div className="overflow-y-auto p-6 pb-2">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full p-1 text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          <div className="min-w-0 pr-8">
            <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
              Run Details
            </h2>
            <p className={cn("mt-1 text-sm font-medium leading-[1.65]", isLatest ? LATEST_COLOR : "text-foreground/90")}>
              {formatRunLabel(analysis, runNumber)}
              {isLatest ? (
                <span className={cn("ml-2 text-[10px] font-bold tracking-[0.18em] uppercase", LATEST_COLOR)}>
                  Latest
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Updated: {formatUpdatedAt(analysis.created_at)}
            </p>
          </div>

          <section className="mt-5">
            <DialogSectionLabel>Scope</DialogSectionLabel>
            <DialogPanel>
              <DialogIconRow icon={FileText}>{postsLine}</DialogIconRow>
              {period ? (
                <DialogIconRow icon={Calendar}>
                  <span className="text-muted-foreground">Period: </span>
                  {period}
                </DialogIconRow>
              ) : null}
              <DialogIconRow icon={Share2}>
                <span className="text-muted-foreground">Sources: </span>
                {scope.sourcesLabel}
              </DialogIconRow>
            </DialogPanel>
          </section>

          <section className="mt-5">
            <DialogSectionLabel>Since last run</DialogSectionLabel>
            <DialogPanel status={noMeaningfulChange ? "caution" : "info"}>
              <div className="flex items-start gap-2.5">
                <Info
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    noMeaningfulChange ? statusIconClass("caution") : "text-coral",
                  )}
                  strokeWidth={1.75}
                />
                <p className="text-sm leading-relaxed text-foreground/90">{comparisonText}</p>
              </div>
            </DialogPanel>
          </section>

          <section className="mt-5">
            <DialogSectionLabel>Snapshot overview</DialogSectionLabel>
            <DialogPanel>
              {sentiment ? (
                <DialogIconRow icon={Smile}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Sentiment:
                  </span>
                  <SentimentBadge label={sentiment} />
                </DialogIconRow>
              ) : null}
              {risk ? (
                <DialogIconRow icon={AlertTriangle}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Risk:
                  </span>
                  <RiskBadge label={risk} />
                </DialogIconRow>
              ) : null}
            </DialogPanel>
          </section>
        </div>

        <div className="grid grid-cols-2 gap-2 px-6 pb-6 pt-2">
          <Button
            type="button"
            variant="outline"
            className={cn(LANDING_BUTTON_SM, "w-full justify-center")}
            asChild
          >
            <Link to={insightsHref} onClick={onClose}>
              View insights
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className={cn(LANDING_BUTTON, "w-full justify-center")}
            asChild
          >
            <Link to={dashboardHref} onClick={onClose}>
              View reef
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="mb-3 shrink-0 text-center text-caps font-medium text-muted-foreground">
      {title}
    </p>
  );
}

function RunStep({
  analysis,
  runNumber,
  isLatest,
  onSelect,
}: {
  analysis: Analysis;
  runNumber: number;
  isLatest: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className="flex w-full items-center px-3 py-3 text-left transition-colors hover:bg-foreground/[0.04]"
      >
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block truncate text-sm font-medium leading-[1.65]",
              isLatest ? LATEST_COLOR : "text-foreground/95",
            )}
          >
            {formatRunLabel(analysis, runNumber)}
            {isLatest ? (
              <span className={cn("ml-2 text-[10px] font-bold tracking-[0.18em] uppercase", LATEST_COLOR)}>
                Latest
              </span>
            ) : null}
          </span>
          <span className="block text-xs leading-relaxed text-muted-foreground">
            {formatShortDate(analysis.created_at)}
          </span>
        </span>
      </button>
    </li>
  );
}

type MyRunsPanelProps = {
  history: AnalysisHistoryState;
  className?: string;
  /** Fixed height — locked at Step 4 (View Your Coral); does not resize on Steps 1–3. */
  panelHeight: number;
};

export function MyRunsPanel({ history, className, panelHeight }: MyRunsPanelProps) {
  const analyses = history.analyses;
  const runCount = analyses.length;
  const listRef = useRef<HTMLDivElement>(null);
  const [runsPerPage, setRunsPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<{
    analysis: Analysis;
    runNumber: number;
    isLatest: boolean;
  } | null>(null);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    const updateCapacity = () => {
      const height = node.clientHeight;
      const capacity = Math.max(1, Math.floor(height / ROW_HEIGHT_PX));
      setRunsPerPage(capacity);
    };

    updateCapacity();
    const observer = new ResizeObserver(updateCapacity);
    observer.observe(node);
    return () => observer.disconnect();
  }, [history.status, analyses.length]);

  const totalPages = Math.max(1, Math.ceil(runCount / runsPerPage));

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages - 1));
  }, [totalPages]);

  useEffect(() => {
    setPage(0);
  }, [runCount]);

  const pageAnalyses = useMemo(() => {
    const start = page * runsPerPage;
    return analyses.slice(start, start + runsPerPage);
  }, [analyses, page, runsPerPage]);

  return (
    <>
      <aside
        className={cn(
          "flex min-h-0 shrink-0 flex-col border border-foreground/20 bg-background/45 p-[22px] backdrop-blur-[10px]",
          className,
        )}
        style={{ height: panelHeight, maxHeight: panelHeight }}
      >
        <SectionHeader title="My Runs" />

        {history.status === "loading" ? (
          <p className="text-sm leading-[1.65] text-muted-foreground">Loading…</p>
        ) : history.status === "error" ? (
          <p className="text-sm text-primary">{history.error}</p>
        ) : analyses.length === 0 ? (
          <p className="text-sm leading-[1.65] text-muted-foreground">
            No runs yet. Complete the flow to grow your first coral.
          </p>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div ref={listRef} className="min-h-0 flex-1 overflow-hidden">
              <ol className="divide-y divide-foreground/15">
                {pageAnalyses.map((analysis, index) => {
                  const globalIndex = page * runsPerPage + index;
                  const runNumber = runCount - globalIndex;
                  return (
                    <RunStep
                      key={analysis.analysis_id}
                      analysis={analysis}
                      runNumber={runNumber}
                      isLatest={globalIndex === 0}
                      onSelect={() =>
                        setSelected({
                          analysis,
                          runNumber,
                          isLatest: globalIndex === 0,
                        })
                      }
                    />
                  );
                })}
              </ol>
            </div>

            <div className="mt-3 flex shrink-0 items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <button
                type="button"
                disabled={page === 0 || totalPages <= 1}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="inline-flex size-7 items-center justify-center border border-foreground/20 bg-background/60 transition hover:border-foreground/35 disabled:pointer-events-none disabled:opacity-35"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="min-w-[6.5rem] text-center">
                Showing page {page + 1}/{totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages - 1 || totalPages <= 1}
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                className="inline-flex size-7 items-center justify-center border border-foreground/20 bg-background/60 transition hover:border-foreground/35 disabled:pointer-events-none disabled:opacity-35"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </aside>

      {selected ? (
        <RunDetailDialog
          analysis={selected.analysis}
          runNumber={selected.runNumber}
          isLatest={selected.isLatest}
          open
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  );
}
