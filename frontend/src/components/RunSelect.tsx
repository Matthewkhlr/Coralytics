import type { Analysis } from "@/api/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CHIP_RADIUS, REEF_DROPDOWN, REEF_FIELD_SURFACE } from "@/lib/buttonStyles";
import { formatRunLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

export const RUN_SELECT_CONTENT = cn(
  CHIP_RADIUS,
  REEF_FIELD_SURFACE,
  "dark:!bg-background/45",
  "w-[var(--radix-select-trigger-width)] border border-foreground/20 p-1 shadow-none",
);

type RunSelectProps = {
  analyses: Analysis[];
  selectedAnalysisId: string;
  onSelect: (analysisId: string) => void;
  className?: string;
  triggerClassName?: string;
};

export function RunSelect({
  analyses,
  selectedAnalysisId,
  onSelect,
  className,
  triggerClassName,
}: RunSelectProps) {
  const runCount = analyses.length;
  const selectedRunIndex = analyses.findIndex((item) => item.analysis_id === selectedAnalysisId);
  const isLatestRun = selectedRunIndex === 0;
  const selectedRun = selectedRunIndex >= 0 ? analyses[selectedRunIndex] : null;
  const selectedRunNumber = selectedRunIndex >= 0 ? runCount - selectedRunIndex : runCount;
  const selectedRunLabel = selectedRun
    ? formatRunLabel(selectedRun, selectedRunNumber)
    : "Select run";

  return (
    <Select value={selectedAnalysisId} onValueChange={onSelect}>
      <SelectTrigger className={cn(REEF_DROPDOWN, "w-full items-center", triggerClassName, className)}>
        <span className="flex min-w-0 flex-1 items-center gap-2">
          <span className="min-w-0 flex-1 truncate text-left">{selectedRunLabel}</span>
          {isLatestRun ? (
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">
              Latest
            </span>
          ) : null}
        </span>
      </SelectTrigger>
      <SelectContent position="popper" align="start" sideOffset={4} className={RUN_SELECT_CONTENT}>
        {analyses.map((item, index) => {
          const itemRunNumber = runCount - index;
          const isLatest = index === 0;
          const label = formatRunLabel(item, itemRunNumber);
          return (
            <SelectItem key={item.analysis_id} value={item.analysis_id} textValue={label}>
              <span className="flex w-full min-w-0 items-center gap-2">
                <span className="min-w-0 flex-1 truncate">{label}</span>
                {isLatest ? (
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">
                    Latest
                  </span>
                ) : null}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
