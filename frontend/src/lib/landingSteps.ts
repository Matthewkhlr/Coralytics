import { CloudUpload, FileText, Share2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type LandingStepTone = "coral" | "reef" | "ocean" | "grow";

export type LandingStep = {
  step: string;
  title: string;
  description: string;
  tone: LandingStepTone;
  Icon: LucideIcon;
};

export const LANDING_STEPS: LandingStep[] = [
  {
    step: "01",
    title: "Upload Data",
    description: "Drop in your raw social media exports — no cleanup needed.",
    tone: "coral",
    Icon: CloudUpload,
  },
  {
    step: "02",
    title: "Deep Analysis",
    description: "We decode tone, themes, and patterns across every post.",
    tone: "reef",
    Icon: Sparkles,
  },
  {
    step: "03",
    title: "Review Persona",
    description: "Explore your digital identity mapped onto a living coral reef.",
    tone: "ocean",
    Icon: FileText,
  },
  {
    step: "04",
    title: "Export Result",
    description: "Share your persona or download the full breakdown.",
    tone: "grow",
    Icon: Share2,
  },
];
