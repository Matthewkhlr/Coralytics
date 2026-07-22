import { Link } from "react-router-dom";
import { ArrowRight, CloudUpload, FileChartColumn, Search, Share2 } from "lucide-react";
import { LandingReef } from "@/components/LandingReef";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { hasCachedProfile } from "@/lib/profileCache";

const HOW_IT_WORKS_STEPS = [
  { title: "Upload Data", icon: CloudUpload },
  { title: "Deep Analysis", icon: Search },
  { title: "Review Persona", icon: FileChartColumn },
  { title: "Export Result", icon: Share2 },
];

export function LandingPage() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();
  // While Firebase auth is still resolving, trust the cached profile so a
  // signed-in user doesn't see the signed-out hero flash on refresh.
  const signedIn = Boolean(user) || (loading && hasCachedProfile());

  return (
    <section className="relative -mt-[4.75rem] min-h-dvh overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#78a4bb] dark:bg-[#00264d]">
        <LandingReef appearance={theme} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/85 via-background/25 to-transparent" />
      </div>

      {/* Hero — pinned bottom-left, exhibit style (clicks pass through to orbit) */}
      <div className="pointer-events-none relative z-10 flex min-h-dvh flex-col justify-end px-5 pb-28 md:px-10">
        <div className="max-w-md">
          <h1 className="font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            {signedIn ? (
              <>
                Watch Your Footprints <span className="text-primary">Bloom</span>
              </>
            ) : (
              <>
                Decipher Your <span className="text-primary">Online Presence</span>
              </>
            )}
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-[1.65] text-muted-foreground">
            {signedIn
              ? "Drop in your latest social exports to expand your reef and track how your footprints evolve."
              : "Turn raw social exports into an interactive coral reef that maps your digital identity."}
          </p>
          <div className="mt-8 pointer-events-auto">
            <Button
              asChild
              variant="outline"
              className="h-auto rounded-none border-foreground/35 bg-accent/10 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] backdrop-blur-md hover:bg-accent/20 hover:border-foreground/60"
            >
              <Link to={signedIn ? "/dashboard" : "/login"}>
                {signedIn ? "Explore" : "Get started"}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* How it works — exhibit-style card, bottom right (matches the
          "Now observing" species card from design.html). bottom-28 keeps its
          base flush with the hero CTA button (hero uses pb-28). */}
      <aside className="pointer-events-none absolute bottom-28 right-10 z-10 hidden w-[280px] border border-foreground/20 bg-background/45 p-[22px] backdrop-blur-[10px] lg:block">
        <p className="exhibit-section-label">
          <span className="h-px flex-1 bg-foreground/25" aria-hidden />
          How it works
          <span className="h-px flex-1 bg-foreground/25" aria-hidden />
        </p>
        <ol className="relative">
          {/* Vertical line connecting the step icons */}
          <span
            className="absolute bottom-6 top-6 left-4 w-px -translate-x-1/2 bg-foreground/25"
            aria-hidden
          />
          {HOW_IT_WORKS_STEPS.map(({ title, icon: Icon }) => (
            <li key={title} className="flex items-center gap-3 py-2">
              <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-background/80 backdrop-blur-sm">
                <Icon className="size-4 text-muted-foreground" />
              </span>
              <span className="text-sm leading-[1.65] text-foreground/95">{title}</span>
            </li>
          ))}
        </ol>
      </aside>

      {/* Bottom credits bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background/70 to-transparent px-5 py-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:px-10">
        <span>© Coralytics · HEAP 2026</span>
      </div>
    </section>
  );
}
