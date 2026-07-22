import type { ReactNode } from "react";
import type { Analysis } from "@/api/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { CHIP_RADIUS, REEF_DROPDOWN, REEF_FIELD_SURFACE } from "@/lib/buttonStyles";
import { formatPlatform, formatRunLabel } from "@/lib/format";
import { cn } from "@/lib/utils";

export type PlatformFilterOption = {
  key: string | null;
  label: string;
  postCount?: number;
};

type ReefSidebarDropdownsProps = {
  analyses: Analysis[];
  selectedAnalysisId: string | null;
  onRunSelect: (analysisId: string) => void;
  platformFilter: string | null;
  onPlatformChange: (platform: string | null) => void;
  platformOptions: PlatformFilterOption[];
  className?: string;
};

const REEF_SELECT_CONTENT = cn(
  CHIP_RADIUS,
  REEF_FIELD_SURFACE,
  "dark:!bg-background/45",
  "w-[var(--radix-select-trigger-width)] border border-foreground/20 p-1 shadow-none",
);

function formatRunOptionLabel(item: Analysis, runNumber: number): string {
  return formatRunLabel(item, runNumber);
}

export function ReefSidebarField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="reef-sidebar-field">
      <span className="exhibit-field-label">{label}</span>
      {children}
    </div>
  );
}

export function ReefSidebarDropdowns({
  analyses,
  selectedAnalysisId,
  onRunSelect,
  platformFilter,
  onPlatformChange,
  platformOptions,
  className,
}: ReefSidebarDropdownsProps) {
  const runCount = analyses.length;
  const showRunPicker = runCount > 0 && selectedAnalysisId;
  const selectedRunIndex = analyses.findIndex((item) => item.analysis_id === selectedAnalysisId);
  const isLatestRun = selectedRunIndex === 0;
  const selectedRun = selectedRunIndex >= 0 ? analyses[selectedRunIndex] : null;
  const selectedRunNumber =
    selectedRunIndex >= 0 ? runCount - selectedRunIndex : runCount;
  const selectedRunLabel = selectedRun
    ? formatRunOptionLabel(selectedRun, selectedRunNumber)
    : "Select run";

  return (
    <div className={cn("space-y-4", className)}>
      {showRunPicker ? (
        <ReefSidebarField label="Run">
          <Select value={selectedAnalysisId ?? undefined} onValueChange={onRunSelect}>
            <SelectTrigger className={cn(REEF_DROPDOWN, "w-full")}>
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-left">{selectedRunLabel}</span>
                {isLatestRun ? (
                  <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-coral">
                    Latest
                  </span>
                ) : null}
              </span>
            </SelectTrigger>
            <SelectContent position="popper" align="start" sideOffset={4} className={REEF_SELECT_CONTENT}>
              {analyses.map((item, index) => {
                const itemRunNumber = runCount - index;
                const isLatest = index === 0;
                const label = formatRunOptionLabel(item, itemRunNumber);
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
        </ReefSidebarField>
      ) : null}

      {platformOptions.length > 0 ? (
        <ReefSidebarField label="Source">
          <Select
            value={platformFilter ?? "all"}
            onValueChange={(value) => onPlatformChange(value === "all" ? null : value)}
          >
            <SelectTrigger className={cn(REEF_DROPDOWN, "w-full")}>
              <span className="truncate text-left">
                {platformFilter === null
                  ? "All"
                  : formatPlatform(platformFilter) ||
                    platformOptions.find((o) => o.key === platformFilter)?.label ||
                    "All"}
              </span>
            </SelectTrigger>
            <SelectContent position="popper" align="start" sideOffset={4} className={REEF_SELECT_CONTENT}>
              {platformOptions.map((option) => {
                const value = option.key ?? "all";
                const label =
                  option.key === null ? "All" : formatPlatform(option.key) || option.label;
                return (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </ReefSidebarField>
      ) : null}
    </div>
  );
}
