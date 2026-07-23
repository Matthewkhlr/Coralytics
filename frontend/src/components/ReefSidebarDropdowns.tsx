import type { ReactNode } from "react";
import type { Analysis } from "@/api/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { RunSelect } from "@/components/RunSelect";
import { CHIP_RADIUS, REEF_DROPDOWN, REEF_FIELD_SURFACE } from "@/lib/buttonStyles";
import { formatPlatform } from "@/lib/format";
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
  const showRunPicker = analyses.length > 0 && selectedAnalysisId;

  return (
    <div className={cn("space-y-4", className)}>
      {showRunPicker ? (
        <ReefSidebarField label="Run">
          <RunSelect
            analyses={analyses}
            selectedAnalysisId={selectedAnalysisId}
            onSelect={onRunSelect}
          />
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
