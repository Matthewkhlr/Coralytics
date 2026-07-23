import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type DataStatusBannerProps = {
  status: "empty" | "error";
  error?: string | null;
  onRetry?: () => void;
};

export function DataStatusBanner({ status, error, onRetry }: DataStatusBannerProps) {
  if (status === "empty") {
    return (
      <Alert className="mb-6">
        <AlertCircle />
        <AlertTitle>No analysis yet</AlertTitle>
        <AlertDescription className="flex flex-wrap items-center gap-3">
          <span>Upload an export to grow your first coral.</span>
          {onRetry ? (
            <Button type="button" variant="outline" size="sm" onClick={onRetry}>
              <RefreshCw />
              Retry
            </Button>
          ) : null}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription className="flex flex-wrap items-center gap-3">
        <span>{error ?? "Could not reach the Coralytics API."}</span>
        {onRetry ? (
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw />
            Retry
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}
