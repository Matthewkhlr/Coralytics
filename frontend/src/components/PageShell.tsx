import type { ReactNode } from "react";
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
    <main className={cn("mx-auto w-full max-w-7xl px-6 py-8", className)}>{children}</main>
  );
}

/** Consistent page header stack used on Upload / Dashboard / Insights. */
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
    <h1 className={cn("text-4xl font-bold tracking-tight", className)}>{children}</h1>
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
    <p className={cn("mt-3 text-base text-muted-foreground sm:text-lg", className)}>
      {children}
    </p>
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
    <h2 className={cn("text-xl font-semibold tracking-tight", className)}>{children}</h2>
  );
}
