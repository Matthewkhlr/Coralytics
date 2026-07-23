import { Button } from "@/components/ui/button";
import {
  ExhibitSectionLabel,
  OceanPageFrame,
  PageDescription,
  PageHeader,
  PageTitle,
} from "@/components/PageShell";
import {
  CHIP_RADIUS,
  EXHIBIT_INSET,
  EXHIBIT_PANEL,
  LANDING_BUTTON,
  LANDING_BUTTON_SM,
  LANDING_SELECT,
  MY_RUNS_PANEL,
  REEF_DROPDOWN,
  REEF_INSTRUCTION_BOX,
  UPLOAD_CHIP,
} from "@/lib/buttonStyles";
import {
  REEF_ROCK_SWATCHES,
  REEF_SAND_SWATCHES,
  REEF_WATER_SWATCHES,
} from "@/lib/reefTheme";
import { cn } from "@/lib/utils";

const INSIGHTS_PANEL = cn(EXHIBIT_PANEL, "p-7");
const INSIGHTS_INSET = cn(EXHIBIT_INSET, "border border-foreground/10");

const SURFACE_SAMPLES = [
  { name: "EXHIBIT_PANEL", className: EXHIBIT_PANEL },
  { name: "EXHIBIT_INSET", className: EXHIBIT_INSET },
  { name: "MY_RUNS_PANEL", className: MY_RUNS_PANEL },
  { name: "REEF_INSTRUCTION_BOX", className: REEF_INSTRUCTION_BOX },
  { name: "UPLOAD_CHIP", className: UPLOAD_CHIP },
  { name: "INSIGHTS_PANEL", className: INSIGHTS_PANEL },
  { name: "INSIGHTS_INSET", className: INSIGHTS_INSET },
] as const;

const SEMANTIC_COLORS = [
  { name: "background", className: "bg-background text-foreground" },
  { name: "foreground", className: "bg-foreground text-background" },
  { name: "card", className: "bg-card text-card-foreground" },
  { name: "primary", className: "bg-primary text-primary-foreground" },
  { name: "secondary", className: "bg-secondary text-secondary-foreground" },
  { name: "muted", className: "bg-muted text-muted-foreground" },
  { name: "accent", className: "bg-accent text-accent-foreground" },
  { name: "destructive", className: "bg-destructive text-destructive-foreground" },
  { name: "coral", className: "bg-coral text-primary-foreground" },
  { name: "reef", className: "bg-reef text-accent-foreground" },
] as const;

const SENTIMENT_COLORS = [
  { name: "sentiment-positive", className: "text-sentiment-positive" },
  { name: "sentiment-neutral", className: "text-sentiment-neutral" },
  { name: "sentiment-negative", className: "text-sentiment-negative" },
] as const;

function StyleSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(INSIGHTS_PANEL, className)}>
      <ExhibitSectionLabel className="mb-5">{title}</ExhibitSectionLabel>
      {children}
    </section>
  );
}

function TokenCard({
  name,
  children,
  className,
}: {
  name: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(INSIGHTS_INSET, "flex min-w-0 flex-col gap-3 p-4", className)}>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{name}</p>
      {children}
    </div>
  );
}

export function StyleGuidePage() {
  return (
    <OceanPageFrame>
      <PageHeader>
        <PageTitle>Style Guide</PageTitle>
        <PageDescription>
          Living reference for Coralytics surfaces, typography, buttons, and colour tokens used across
          Upload, Dashboard, and Insights.
        </PageDescription>
      </PageHeader>

      <div className="space-y-6">
        <StyleSection title="Typography">
          <div className="grid gap-4 md:grid-cols-2">
            <TokenCard name="PageTitle">
              <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Explore Your Reef
              </p>
            </TokenCard>
            <TokenCard name="PageDescription">
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                Snapshot of your cumulative post history, rendered as a living coral reef.
              </p>
            </TokenCard>
            <TokenCard name="exhibit-section-label">
              <ExhibitSectionLabel className="mb-0">Section label</ExhibitSectionLabel>
            </TokenCard>
            <TokenCard name="exhibit-field-label">
              <span className="exhibit-field-label mb-0">Field label</span>
            </TokenCard>
            <TokenCard name="exhibit-field-label--inline">
              <span className="exhibit-field-label exhibit-field-label--inline">Inline field label</span>
            </TokenCard>
            <TokenCard name="Body / UI copy">
              <p className="text-sm leading-[1.65] text-foreground/95">
                Body copy uses Inter at 14px with relaxed line height for panels and forms.
              </p>
            </TokenCard>
            <TokenCard name="font-display stat">
              <p className="font-display text-2xl font-bold text-accent">0.84</p>
              <p className="text-[11px] text-muted-foreground">Insight metric value</p>
            </TokenCard>
            <TokenCard name="text-caps">
              <p className="text-caps text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Caps label
              </p>
            </TokenCard>
          </div>
        </StyleSection>

        <StyleSection title="Buttons">
          <div className="grid gap-4 md:grid-cols-2">
            <TokenCard name="LANDING_BUTTON">
              <Button type="button" variant="outline" className={LANDING_BUTTON}>
                Save changes
              </Button>
            </TokenCard>
            <TokenCard name="LANDING_BUTTON_SM">
              <Button type="button" variant="outline" className={LANDING_BUTTON_SM}>
                View latest
              </Button>
            </TokenCard>
            <TokenCard name="Button / default">
              <Button type="button">Default</Button>
            </TokenCard>
            <TokenCard name="Button / outline">
              <Button type="button" variant="outline">
                Outline
              </Button>
            </TokenCard>
            <TokenCard name="Button / secondary">
              <Button type="button" variant="secondary">
                Secondary
              </Button>
            </TokenCard>
            <TokenCard name="Button / ghost">
              <Button type="button" variant="ghost">
                Ghost
              </Button>
            </TokenCard>
          </div>
        </StyleSection>

        <StyleSection title="Surfaces">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {SURFACE_SAMPLES.map((sample) => (
              <TokenCard key={sample.name} name={sample.name}>
                <div className={cn(sample.className, "p-4 text-sm text-foreground/90")}>
                  Frosted exhibit surface preview
                </div>
              </TokenCard>
            ))}
          </div>
        </StyleSection>

        <StyleSection title="Form controls">
          <div className="grid gap-4 md:grid-cols-2">
            <TokenCard name="LANDING_SELECT">
              <select className={LANDING_SELECT} defaultValue="latest">
                <option value="latest">Latest</option>
                <option value="run-2">Run 2</option>
              </select>
            </TokenCard>
            <TokenCard name="REEF_DROPDOWN">
              <div className={cn(REEF_DROPDOWN, "flex items-center justify-between")}>
                <span>07/23/2026_23:08</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-coral">Latest</span>
              </div>
            </TokenCard>
            <TokenCard name="Checkbox">
              <label className="flex items-center justify-between gap-3 text-sm text-foreground">
                <span>Rock base</span>
                <input type="checkbox" className="size-4 accent-[var(--accent)]" defaultChecked />
              </label>
            </TokenCard>
            <TokenCard name={`CHIP_RADIUS (${CHIP_RADIUS})`}>
              <div className={cn(CHIP_RADIUS, "inline-flex border border-foreground/20 bg-background/80 px-3 py-1.5 text-sm")}>
                Rounded chip
              </div>
            </TokenCard>
          </div>
        </StyleSection>

        <StyleSection title="Semantic colours">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SEMANTIC_COLORS.map((color) => (
              <div
                key={color.name}
                className={cn(color.className, "flex min-h-20 flex-col justify-end rounded-none border border-foreground/15 p-3")}
              >
                <span className="font-mono text-[11px]">{color.name}</span>
              </div>
            ))}
          </div>
        </StyleSection>

        <StyleSection title="Sentiment colours">
          <div className="grid gap-4 md:grid-cols-3">
            {SENTIMENT_COLORS.map((color) => (
              <TokenCard key={color.name} name={color.name}>
                <p className={cn("text-2xl font-bold font-display", color.className)}>Sample</p>
                <ul className="reef-sentiment-legend !justify-start">
                  <li className="reef-sentiment-legend__item">
                    <span className={cn("reef-sentiment-legend__swatch", color.className.replace("text-", "bg-"))} />
                    Legend swatch
                  </li>
                </ul>
              </TokenCard>
            ))}
          </div>
        </StyleSection>

        <StyleSection title="Reef colour swatches">
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { title: "Water", swatches: REEF_WATER_SWATCHES },
              { title: "Sand", swatches: REEF_SAND_SWATCHES },
              { title: "Rock", swatches: REEF_ROCK_SWATCHES },
            ].map((group) => (
              <TokenCard key={group.title} name={group.title}>
                <div className="flex flex-wrap gap-2">
                  {group.swatches.map((swatch) => (
                    <span
                      key={swatch.id}
                      title={swatch.label}
                      className="size-8 rounded-full border-2 border-foreground/20"
                      style={{ backgroundColor: swatch.color }}
                    />
                  ))}
                </div>
              </TokenCard>
            ))}
          </div>
        </StyleSection>

        <StyleSection title="Insights patterns">
          <div className="grid gap-4 lg:grid-cols-4">
            <div className={cn(INSIGHTS_INSET, "flex h-full flex-col p-4")}>
              <dt className="exhibit-field-label mb-2">Footprint age</dt>
              <dd className="text-base font-semibold leading-snug">2 years, 4 months</dd>
            </div>
            <div className={cn(INSIGHTS_INSET, "flex h-full flex-col p-4")}>
              <dt className="exhibit-field-label mb-2">Total posts</dt>
              <dd className="font-display text-base font-semibold leading-snug">835</dd>
            </div>
            <div className={cn(INSIGHTS_INSET, "p-3.5")}>
              <div className="text-2xl font-bold font-display text-accent">0.42</div>
              <div className="mt-0.5 text-[11px] font-medium text-muted-foreground">Overall Sentiment</div>
            </div>
            <div className="reef-post-callout reef-post-callout--sidebar !mt-0">
              <div className="exhibit-field-label mb-2">Post callout</div>
              <p className="reef-post-callout__text">Selected bead details appear in this sidebar panel.</p>
            </div>
          </div>
        </StyleSection>

        <StyleSection title="Alerts & banners">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-coral/45 bg-coral/10 px-4 py-3">
              <p className="text-sm leading-relaxed text-foreground/90">
                Unsaved changes warning (coral tint)
              </p>
            </div>
            <div className="border border-foreground/20 bg-background/80 px-4 py-3 text-sm text-muted-foreground">
              Neutral status banner surface
            </div>
          </div>
        </StyleSection>
      </div>
    </OceanPageFrame>
  );
}
