import type { ReactNode } from "react";
import { LandingReef } from "@/components/LandingReef";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

/** Shared page frame — matches Nav inner width/padding so edges stay aligned across tabs. */
export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("mx-auto w-full max-w-7xl px-6 py-8", className)}>
      {children}
    </main>
  );
}

export function PageHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <header className={cn("mb-8", className)}>{children}</header>;
}

export function PageTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function PageDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base",
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Full-bleed ocean backdrop extending behind the nav: the same static ambient
 * reef as the upload page (sand + caustics, no coral, no fish, no motion),
 * dimmed by a scrim so page content stays readable.
 */
export function OceanPageFrame({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return (
    <section className="relative -mt-[4.75rem] min-h-dvh overflow-hidden pt-[4.75rem]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[#78a4bb] dark:bg-[#00264d]"
      >
        <LandingReef appearance={theme} ambient frozen />
        <div className="absolute inset-0 bg-[#78a4bb]/45 dark:bg-[#00264d]/55" />
      </div>
      <PageShell className="relative z-10">{children}</PageShell>
    </section>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-display text-xl font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}
