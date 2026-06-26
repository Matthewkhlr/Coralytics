import { AlertCircle, LoaderCircle, RefreshCw } from "lucide-react";

type DataStatusBannerProps = {
  status: "loading" | "empty" | "error";
  error?: string | null;
  onRetry?: () => void;
};

export function DataStatusBanner({ status, error, onRetry }: DataStatusBannerProps) {
  if (status === "loading") {
    return (
      <div className="data-banner data-banner--loading" role="status">
        <LoaderCircle className="spin-icon" size={18} aria-hidden="true" />
        <span>Loading your latest analysis…</span>
      </div>
    );
  }

  if (status === "empty") {
    return (
      <div className="data-banner data-banner--empty" role="status">
        <AlertCircle size={18} aria-hidden="true" />
        <span>No analysis found yet. Run `npm run seed` to load demo data.</span>
        {onRetry ? (
          <button className="banner-action" type="button" onClick={onRetry}>
            <RefreshCw size={15} />
            <span>Retry</span>
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="data-banner data-banner--error" role="alert">
      <AlertCircle size={18} aria-hidden="true" />
      <span>{error ?? "Could not reach the Coralytics API."}</span>
      {onRetry ? (
        <button className="banner-action" type="button" onClick={onRetry}>
          <RefreshCw size={15} />
          <span>Retry</span>
        </button>
      ) : null}
    </div>
  );
}
