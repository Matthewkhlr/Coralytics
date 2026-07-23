import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Dumbbell,
  GraduationCap,
  Heart,
  HelpCircle,
  Landmark,
  Laptop,
  Music,
  Paintbrush,
  Plane,
  Tag,
  Trophy,
  User,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";

export type PlatformSourceKey = "instagram" | "linkedin" | "reddit" | "unknown";

export const REEF_PLATFORM_ICON_SRC: Partial<Record<PlatformSourceKey, string>> = {
  instagram: "/icons/instagram.png",
  linkedin: "/icons/linkedin.png",
  reddit: "/icons/reddit.png",
};

export const REEF_STEM_ICON_LABEL = "Account history";

const TOPIC_LUCIDE_ICONS: Record<string, LucideIcon> = {
  travel: Plane,
  technology: Laptop,
  food: UtensilsCrossed,
  fitness: Dumbbell,
  career: Briefcase,
  relationships: Heart,
  finance: Wallet,
  entertainment: Music,
  politics: Landmark,
  education: GraduationCap,
  sports: Trophy,
  art: Paintbrush,
  general: User,
};

export function normalizePlatformSource(platform?: string | null): PlatformSourceKey {
  const value = (platform ?? "").toLowerCase();
  if (value.includes("instagram")) return "instagram";
  if (value.includes("linkedin")) return "linkedin";
  if (value.includes("reddit")) return "reddit";
  return "unknown";
}

export function platformSourceLabel(platform?: string | null): string {
  const key = normalizePlatformSource(platform);
  if (key === "instagram") return "Instagram";
  if (key === "linkedin") return "LinkedIn";
  if (key === "reddit") return "Reddit";
  return "Unknown source";
}

function normalizeTopicKey(topicName: string): string {
  return topicName.trim().toLowerCase().replace(/\s+/g, "_");
}

export function topicLucideIcon(topicName: string): LucideIcon {
  return TOPIC_LUCIDE_ICONS[normalizeTopicKey(topicName)] ?? Tag;
}

export function topicIconLabel(topicName: string): string {
  const key = normalizeTopicKey(topicName);
  if (TOPIC_LUCIDE_ICONS[key]) {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }
  return "Unknown topic";
}

export const REEF_UNKNOWN_PLATFORM_ICON = HelpCircle;
