import { Link } from "react-router-dom";
import { HowItWorksSteps } from "@/components/HowItWorksSteps";
import { OrganismViewport } from "@/components/OrganismViewport";
import { PageShell } from "@/components/PageShell";
import { useAuth } from "@/contexts/AuthContext";
import { LANDING_STEPS } from "@/lib/landingSteps";
import { SAMPLE_ORGANISM_DATA } from "@/lib/organismData";

export function LandingPage() {
  const { user } = useAuth();
  const signedIn = Boolean(user);

  return (
    <>
      <PageShell className="flex min-h-[calc(100dvh-4rem)] flex-col py-0">
        <section className="grid min-h-0 flex-1 grid-cols-1 items-center gap-6 py-8 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          <div className="min-w-0">
            <h1 className="landing-hero-enter text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {signedIn ? (
                <>
                  Watch Your Digital
                  <br />
                  <span className="text-primary">Footprint Bloom.</span>
                </>
              ) : (
                <>
                  Decipher Your
                  <br />
                  <span className="text-primary">Online Presence.</span>
                </>
              )}
            </h1>
            <p className="landing-hero-enter landing-hero-enter--1 mt-3 max-w-xl text-base text-muted-foreground sm:mt-4 sm:text-lg">
              {signedIn
                ? "Drop in your latest social exports to directly expand your interactive branches and track your footprint's evolution."
                : "Convert your raw social media exports into an interactive 3D coral reef that instantly maps out your digital identity."}
            </p>
            {signedIn ? (
              <div className="landing-hero-enter landing-hero-enter--2 mt-4 flex flex-wrap gap-3 sm:mt-5">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110"
                >
                  Explore →
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="landing-hero-enter landing-hero-enter--2 mt-4 inline-flex items-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:brightness-110 sm:mt-5"
              >
                Get Started →
              </Link>
            )}
          </div>
          <div className="landing-hero-enter landing-hero-enter--3 h-[min(36vh,360px)] min-h-[200px] overflow-hidden rounded-2xl border border-border/50 bg-card/40 p-2 lg:h-full lg:max-h-[min(52vh,520px)] lg:min-h-[280px]">
            <OrganismViewport data={SAMPLE_ORGANISM_DATA} dataSource="sample" appearance="dark" />
          </div>
        </section>

        <section className="shrink-0 pb-8 pt-2">
          <h2 className="landing-hero-enter landing-hero-enter--4 text-center text-xl font-bold tracking-tight md:text-2xl">
            How It Works
          </h2>
          <div className="landing-hero-enter landing-hero-enter--5 mt-3 rounded-3xl border border-border/60 bg-card/50 px-4 py-5 md:mt-4 md:px-8 md:py-6">
            <HowItWorksSteps steps={LANDING_STEPS} />
          </div>
        </section>
      </PageShell>

      <footer className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Coralytics · HEAP 2026
        </div>
      </footer>
    </>
  );
}
