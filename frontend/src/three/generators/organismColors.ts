import type { OrganismPost } from "../organismTypes";

// ========== Sentiment colors ==========
// Real field names (confirmed from a live sample post):
//   sentiment_label: "positive" | "negative" | "neutral" (already classified upstream)
//   sentiment_compound: number, -1 (very negative) to +1 (very positive)
// We trust sentiment_label when present, and only fall back to thresholding
// sentiment_compound if the label is missing. SENTIMENT_NEUTRAL_RANGE only
// matters for that fallback path.
export type Sentiment = "positive" | "neutral" | "negative";

export const SENTIMENT_COLORS: Record<Sentiment, string> = {
  positive: "#22a55f", // green
  neutral: "#c9a24b",  // tan / gold
  negative: "#e0393e", // red
};

export const SENTIMENT_LEGEND: { key: Sentiment; label: string; color: string }[] = [
  { key: "positive", label: "Positive sentiment", color: SENTIMENT_COLORS.positive },
  { key: "neutral", label: "Neutral", color: SENTIMENT_COLORS.neutral },
  { key: "negative", label: "Negative / risky", color: SENTIMENT_COLORS.negative },
];

// score must exceed this magnitude (in either direction) to count as
// positive/negative rather than neutral — only used when sentiment_label
// isn't available and we have to derive it from sentiment_compound
const SENTIMENT_NEUTRAL_RANGE = 0.15;

export function getSentiment(post: OrganismPost): Sentiment {
  const label = (post as any).sentiment_label;
  if (label === "positive" || label === "negative" || label === "neutral") {
    return label;
  }

  const compound = (post as any).sentiment_compound;
  if (typeof compound === "number" && !Number.isNaN(compound)) {
    if (compound >= SENTIMENT_NEUTRAL_RANGE) return "positive";
    if (compound <= -SENTIMENT_NEUTRAL_RANGE) return "negative";
    return "neutral";
  }

  return "neutral";
}

// ========== Category colors ==========
// Confirmed from a live sample post: there's no separate `category` field,
// just `topics: string[]` (e.g. ["general"]) — the same array coralV4 uses
// for branch grouping. So this always falls back to topics[0] in practice.
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
    (post as any).category ??
    (post as any).topics?.[0] ??
    "general"
  )
    .toString()
    .toLowerCase();

  return (raw in CATEGORY_COLORS ? raw : "general") as Category;
}