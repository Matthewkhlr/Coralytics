import type { LandingStep } from "@/lib/landingSteps";

type HowItWorksStepsProps = {
  steps: LandingStep[];
};

export function HowItWorksSteps({ steps }: HowItWorksStepsProps) {
  return (
    <ol className="relative grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-4">
      <div
        className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-4 hidden h-px bg-border/80 md:block"
        aria-hidden="true"
      />
      {steps.map(({ step, title, Icon }) => (
        <li key={step} className="relative flex flex-col items-center gap-2 text-center">
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-card text-xs font-bold text-accent">
            {step}
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">{title}</span>
          <Icon className="h-5 w-5 text-primary/80" aria-hidden="true" strokeWidth={1.75} />
        </li>
      ))}
    </ol>
  );
}
