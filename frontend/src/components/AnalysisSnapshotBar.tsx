import { Link } from "react-router-dom";
import type { Analysis } from "@/api/types";
import { RunSelect } from "@/components/RunSelect";
import { cn } from "@/lib/utils";

type AnalysisSnapshotBarProps = {
  analyses: Analysis[];
  analysis: Analysis | null;
  onSelect: (analysisId: string) => void;
  showAddDataLink?: boolean;
  hideSnapshotPicker?: boolean;
  className?: string;
};

export function AnalysisSnapshotBar({
  analyses,
  analysis,
  onSelect,
  showAddDataLink = false,
  hideSnapshotPicker = false,
  className,
}: AnalysisSnapshotBarProps) {
  if (!analysis || analyses.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      {!hideSnapshotPicker ? (
        <div className="inline-flex items-center gap-2">
          <span className="exhibit-field-label exhibit-field-label--inline shrink-0">Run</span>
          <RunSelect
            analyses={analyses}
            selectedAnalysisId={analysis.analysis_id}
            onSelect={onSelect}
            triggerClassName="min-h-10 items-center"
            className="min-w-[min(100%,18rem)]"
          />
        </div>
      ) : null}

      {showAddDataLink ? (
        <Link
          to="/upload"
          className="text-[12px] font-medium uppercase tracking-[0.22em] text-foreground/80 hover:text-foreground"
        >
          Add data
        </Link>
      ) : null}
    </div>
  );
}
