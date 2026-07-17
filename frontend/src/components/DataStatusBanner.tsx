import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";

type DataStatusBannerProps = {
  status: "loading" | "empty" | "error";
  error?: string | null;
  onRetry?: () => void;
};

export function DataStatusBanner({ status, error, onRetry }: DataStatusBannerProps) {
  if (status === "loading") {
    return (
      <div
        className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-4 py-3 text-sm text-muted-foreground"
        role="status"
      >
        <LoaderCircle className="spin-icon" size={18} aria-hidden="true" />
        <span>Loading your latest analysis…</span>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div
        className="flex flex-wrap items-center gap-3 rounded-2xl border border-border/60 bg-card/60 px-4 py-3 text-sm text-muted-foreground"
        role="status"
      >
        <AlertCircle size={18} aria-hidden="true" />
        <span>No analysis found yet. Upload an export to get started.</span>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-full border border-border text-xs hover:bg-card transition"
          >
            <RefreshCw size={15} />
            <span>Retry</span>
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className="flex flex-wrap items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm"
      role="alert"
    >
      <AlertCircle size={18} aria-hidden="true" className="text-primary" />
      <span>{error ?? "Could not reach the Coralytics API."}</span>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-full border border-border text-xs hover:bg-card transition"
        >
          <RefreshCw size={15} />
          <span>Retry</span>
        </button>
      ) : null}
    </div>
  );
}
