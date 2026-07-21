import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { Analysis } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { LANDING_SELECT } from "@/lib/buttonStyles";
import { formatRunLabel, formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type AnalysisSnapshotBarProps = {
  analyses: Analysis[];
  analysis: Analysis | null;
  onSelect: (analysisId: string) => void;
  uploadCount?: number;
  showAddDataLink?: boolean;
  tone?: "default" | "upload";
  className?: string;
};

export function AnalysisSnapshotBar({
  analyses,
  analysis,
  onSelect,
  uploadCount,
  showAddDataLink = false,
  tone = "default",
  className,
}: AnalysisSnapshotBarProps) {
  const runCount = analyses.length;
  const isUploadTone = tone === "upload";

  const dateRangeLabel = useMemo(() => {
    const earliest = analysis?.date_range?.earliest;
    const latest = analysis?.date_range?.latest;
    if (!earliest && !latest) return null;
    if (earliest && latest) {
      return `${formatShortDate(earliest)} – ${formatShortDate(latest)}`;
    }
    return formatShortDate(earliest || latest || undefined);
  }, [analysis?.date_range]);

  if (!analysis || runCount === 0) return null;

  const selectedIndex = analyses.findIndex((a) => a.analysis_id === analysis.analysis_id);
  const runNumber = selectedIndex >= 0 ? runCount - selectedIndex : runCount;
  const showPicker = runCount > 1;
  const isLatest = selectedIndex === 0;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2",
        isUploadTone ? "text-sm text-muted-foreground" : "text-sm text-muted-foreground",
        className,
      )}
    >
      {showPicker ? (
        <label className="inline-flex items-center gap-2">
          <span
            className={cn(
              isUploadTone
                ? "text-[0.975rem] font-bold tracking-tight text-foreground"
                : "text-xs font-semibold uppercase tracking-wider text-accent",
            )}
          >
            Snapshot
          </span>
          <select
            value={analysis.analysis_id}
            onChange={(e) => onSelect(e.target.value)}
            className={cn(
              isUploadTone
                ? LANDING_SELECT
                : "rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground min-w-[200px]",
            )}
          >
            {analyses.map((item, index) => {
              const itemRunNumber = runCount - index;
              const label = index === 0 ? "Latest" : formatRunLabel(item, itemRunNumber);
              return (
                <option key={item.analysis_id} value={item.analysis_id}>
                  {label} · {item.post_count.toLocaleString()} posts ·{" "}
                  {formatShortDate(item.created_at)}
                </option>
              );
            })}
          </select>
        </label>
      ) : (
        <span
          className={cn(
            isUploadTone
              ? "text-[0.975rem] font-bold tracking-tight text-foreground"
              : "text-xs font-semibold uppercase tracking-wider text-accent",
          )}
        >
          Latest snapshot
        </span>
      )}

      {isLatest && isUploadTone ? (
        <Badge
          variant="outline"
          className="border-accent/40 text-[0.65rem] font-bold tracking-wider text-accent"
        >
          LATEST
        </Badge>
      ) : null}

      <span className="text-xs leading-relaxed">
        {showPicker && selectedIndex > 0 ? `${formatRunLabel(analysis, runNumber)} · ` : null}
        {formatShortDate(analysis.created_at)} · {analysis.post_count.toLocaleString()} posts
        {uploadCount !== undefined
          ? ` · ${uploadCount} upload${uploadCount === 1 ? "" : "s"}`
          : null}
        {dateRangeLabel ? ` · ${dateRangeLabel}` : null}
      </span>

      {showPicker ? (
        <span className="text-xs text-muted-foreground">
          Snapshot {runNumber} of {runCount}
        </span>
      ) : null}

      {showAddDataLink ? (
        <Link
          to="/upload"
          className={cn(
            isUploadTone
              ? "text-[12px] font-medium uppercase tracking-[0.22em] text-foreground/80 hover:text-foreground"
              : "text-accent hover:underline",
          )}
        >
          Add data
        </Link>
      ) : null}
    </div>
  );
}
