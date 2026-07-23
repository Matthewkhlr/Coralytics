import type { Analysis } from "@/api/types";
import { Button } from "@/components/ui/button";
import { CHIP_RADIUS, REEF_FIELD_SURFACE } from "@/lib/buttonStyles";
import { formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type OlderSnapshotBannerProps = {
  analysis: Analysis;
  postsDeltaFromLatest: number;
  onViewLatest: () => void;
  className?: string;
};

const BANNER_SURFACE = cn(
  CHIP_RADIUS,
  "border border-foreground/20 shadow-none",
  REEF_FIELD_SURFACE,
);

const BANNER_ACTION = cn(
  CHIP_RADIUS,
  "h-auto shrink-0 border-foreground/25 bg-background/30 px-3 py-1.5 text-xs font-semibold text-foreground shadow-none hover:border-foreground/40 hover:bg-background/50",
);

export function OlderSnapshotBanner({
  analysis,
  postsDeltaFromLatest,
  onViewLatest,
  className,
}: OlderSnapshotBannerProps) {
  return (
    <div
      className={cn(
        BANNER_SURFACE,
        "flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm",
        className,
      )}
    >
      <p className="leading-relaxed text-foreground/80">
        Viewing an older snapshot from {formatShortDate(analysis.created_at)}.
        {postsDeltaFromLatest > 0 ? (
          <>
            {" "}
            Latest snapshot has{" "}
            <span className="font-semibold text-coral">
              +{postsDeltaFromLatest.toLocaleString()}
            </span>{" "}
            more posts.
          </>
        ) : null}
      </p>
      <Button type="button" variant="outline" className={BANNER_ACTION} onClick={onViewLatest}>
        View latest
      </Button>
    </div>
  );
}
