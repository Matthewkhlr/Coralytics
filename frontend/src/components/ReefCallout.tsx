import { forwardRef, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function capitalizeLabel(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return value;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function sentimentFromCompound(compound: number): { label: string; className: string } {
  if (compound >= 0.15) return { label: "Positive", className: "text-sentiment-positive" };
  if (compound <= -0.15) return { label: "Negative", className: "text-sentiment-negative" };
  return { label: "Neutral", className: "text-sentiment-neutral" };
}

export function formatAccountAge(days: number): string {
  if (days <= 0) return "Upload posts to estimate";
  if (days < 365) return `${days} day${days === 1 ? "" : "s"}`;
  const years = days / 365;
  return `${years.toFixed(1)} years (${days.toLocaleString()} days)`;
}

type ReefCalloutShellProps = {
  ariaLabel: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
};

export const ReefCalloutShell = forwardRef<HTMLDivElement, ReefCalloutShellProps>(
  function ReefCalloutShell({ ariaLabel, onClose, className, children }, ref) {
    return (
      <div
        ref={ref}
        className={cn("reef-post-callout reef-post-callout--sidebar", className)}
        role="region"
        aria-label={ariaLabel}
      >
        <div className="reef-post-callout__header reef-post-callout__header--close-only">
          <button
            type="button"
            className="reef-post-callout__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>
        {children}
      </div>
    );
  },
);

export function ReefCalloutContent({ children }: { children: ReactNode }) {
  return (
    <div className="reef-post-callout__text-block">
      <p className="reef-post-callout__field-label">Content</p>
      <div className="reef-post-callout__text">{children}</div>
    </div>
  );
}

export function CalloutField({
  icon: Icon,
  label,
  value,
  valueClassName,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="reef-post-callout__field">
      <dt className="reef-post-callout__field-label">
        <Icon className="size-3.5 shrink-0 opacity-70" strokeWidth={1.75} aria-hidden />
        {label}
      </dt>
      <dd className={cn("reef-post-callout__field-value", valueClassName)}>{value}</dd>
    </div>
  );
}
