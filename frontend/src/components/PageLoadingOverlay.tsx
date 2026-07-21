import type { ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type PageLoadingOverlayProps = {
  loading: boolean;
  children: ReactNode;
  className?: string;
};

export function PageLoadingOverlay({ loading, children, className }: PageLoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "transition-[filter,opacity] duration-200",
          loading && "pointer-events-none select-none blur-sm opacity-50",
        )}
        aria-busy={loading}
      >
        {children}
      </div>

      {loading ? (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <LoaderCircle className="spin-icon text-accent" size={36} strokeWidth={1.75} />
        </div>
      ) : null}
    </div>
  );
}
