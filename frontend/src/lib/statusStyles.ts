import { cn } from "@/lib/utils";

/** Green → yellow → red semantic scale, tuned for light and dark backgrounds. */
export type StatusLevel = "good" | "caution" | "bad";

const STATUS_BADGE: Record<StatusLevel, string> = {
  good:
    "border-sentiment-positive/60 bg-sentiment-positive/20 text-sentiment-positive dark:border-sentiment-positive/70 dark:bg-sentiment-positive/28",
  caution:
    "border-sentiment-neutral/65 bg-sentiment-neutral/24 text-sentiment-neutral dark:border-sentiment-neutral/75 dark:bg-sentiment-neutral/30",
  bad:
    "border-sentiment-negative/60 bg-sentiment-negative/20 text-sentiment-negative dark:border-sentiment-negative/70 dark:bg-sentiment-negative/28",
};

const STATUS_PANEL: Record<StatusLevel, string> = {
  good:
    "border-sentiment-positive/50 bg-sentiment-positive/14 dark:border-sentiment-positive/60 dark:bg-sentiment-positive/20",
  caution:
    "border-sentiment-neutral/55 bg-sentiment-neutral/18 dark:border-sentiment-neutral/65 dark:bg-sentiment-neutral/24",
  bad:
    "border-sentiment-negative/50 bg-sentiment-negative/14 dark:border-sentiment-negative/60 dark:bg-sentiment-negative/20",
};

const STATUS_ICON: Record<StatusLevel, string> = {
  good: "text-sentiment-positive",
  caution: "text-sentiment-neutral",
  bad: "text-sentiment-negative",
};

export function statusBadgeClass(level: StatusLevel, className?: string) {
  return cn(STATUS_BADGE[level], className);
}

export function statusPanelClass(level: StatusLevel, className?: string) {
  return cn(STATUS_PANEL[level], className);
}

export function statusIconClass(level: StatusLevel, className?: string) {
  return cn(STATUS_ICON[level], className);
}

export function sentimentStatusLevel(label: string): StatusLevel {
  const normalized = label.toLowerCase();
  if (normalized.includes("slightly negative") || normalized === "neutral") return "caution";
  if (normalized.includes("negative")) return "bad";
  return "good";
}

export function riskStatusLevel(label: string): StatusLevel {
  if (label === "High") return "bad";
  if (label === "Moderate") return "caution";
  return "good";
}
