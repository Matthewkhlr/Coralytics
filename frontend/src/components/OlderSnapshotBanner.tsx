import type { Analysis } from "@/api/types";
import { Button } from "@/components/ui/button";
import { LANDING_BUTTON_SM } from "@/lib/buttonStyles";
import { formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type OlderSnapshotBannerProps = {
  analysis: Analysis;
  postsDeltaFromLatest: number;
  onViewLatest: () => void;
  tone?: "default" | "upload";
  className?: string;
};

export function OlderSnapshotBanner({
  analysis,
  postsDeltaFromLatest,
  onViewLatest,
  tone = "default",
  className,
}: OlderSnapshotBannerProps) {
  const isUploadTone = tone === "upload";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 text-sm",
        isUploadTone
          ? "border border-foreground/20 bg-background/45 px-4 py-3 backdrop-blur-md"
          : "rounded-xl border border-border/60 bg-card/60 px-4 py-3",
        className,
      )}
    >
      <p className="text-muted-foreground leading-relaxed">
        Viewing an older snapshot from {formatShortDate(analysis.created_at)}.
        {postsDeltaFromLatest > 0 ? (
          <>
            {" "}
            Latest snapshot has{" "}
            <span className="font-semibold text-accent">
              +{postsDeltaFromLatest.toLocaleString()}
            </span>{" "}
            more posts.
          </>
        ) : null}
      </p>
      {isUploadTone ? (
        <Button type="button" variant="outline" className={LANDING_BUTTON_SM} onClick={onViewLatest}>
          View latest
        </Button>
      ) : (
        <button
          type="button"
          onClick={onViewLatest}
          className="text-xs font-semibold text-accent hover:underline shrink-0"
        >
          View latest
        </button>
      )}
    </div>
  );
}
