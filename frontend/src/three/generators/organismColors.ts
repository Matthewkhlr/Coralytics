import type { OrganismPost } from "../organismTypes";
import {
  getSentimentColors,
  SENTIMENT_COLOR_FALLBACK,
  SENTIMENT_NEUTRAL_RANGE,
  sentimentFromCompound,
  type Sentiment,
} from "@/lib/sentimentColors";

export type { Sentiment };

export const SENTIMENT_COLORS: Record<Sentiment, string> = {
  ...SENTIMENT_COLOR_FALLBACK,
};

export const SENTIMENT_LEGEND: { key: Sentiment; label: string; color: string }[] = [
  { key: "positive", label: "Positive Sentiment", color: SENTIMENT_COLOR_FALLBACK.positive },
  { key: "neutral", label: "Neutral", color: SENTIMENT_COLOR_FALLBACK.neutral },
  { key: "negative", label: "Negative / Risky", color: SENTIMENT_COLOR_FALLBACK.negative },
];

export function getTopicSentiment(compound: number): Sentiment {
  return sentimentFromCompound(compound);
}

export function getTopicSentimentColor(compound: number): string {
  return getSentimentColors()[sentimentFromCompound(compound)];
}

export function getSentiment(post: OrganismPost): Sentiment {
  const label = post.sentiment_label;
  if (label === "positive" || label === "negative" || label === "neutral") {
    return label;
  }

  const compound = post.sentiment_compound;
  if (typeof compound === "number" && !Number.isNaN(compound)) {
    return sentimentFromCompound(compound);
  }

  return "neutral";
}

export function getPostSentimentColor(post: OrganismPost): string {
  return getSentimentColors()[getSentiment(post)];
}

// ========== Category colors ==========
export type Category =
  | "travel"
  | "technology"
  | "food"
  | "fitness"
  | "career"
  | "relationships"
  | "finance"
  | "entertainment"
  | "politics"
  | "education"
  | "sports"
  | "art"
  | "general";

export const CATEGORY_COLORS: Record<Category, string> = {
  travel: "#3b82f6",
  technology: "#8b5cf6",
  food: "#f59e0b",
  fitness: "#10b981",
  career: "#0ea5e9",
  relationships: "#ec4899",
  finance: "#84cc16",
  entertainment: "#f43f5e",
  politics: "#64748b",
  education: "#6366f1",
  sports: "#06b6d4",
  art: "#d946ef",
  general: "#a3a3a3",
};

export const CATEGORY_LEGEND: { key: Category; label: string; color: string }[] = (
  Object.keys(CATEGORY_COLORS) as Category[]
).map((key) => ({
  key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
  color: CATEGORY_COLORS[key],
}));

export function getCategory(post: OrganismPost): Category {
  const raw = (
    (post as { category?: string }).category ??
    post.topics?.[0] ??
    "general"
  )
    .toString()
    .toLowerCase();

  return (raw in CATEGORY_COLORS ? raw : "general") as Category;
}

export { SENTIMENT_NEUTRAL_RANGE };
