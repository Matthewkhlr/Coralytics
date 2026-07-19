import type {
  OrganismData,
  OrganismPost,
  OrganismTopic,
} from "../three/organismTypes";
import type { AnalysisDiff, PostInsight } from "../api/types";

export const SAMPLE_ORGANISM_DATA: OrganismData = {
  accountAgeDays: 0,
  topics: [],
  posts: [],
};

function parseTopic(raw: unknown): OrganismTopic | null {
  if (!raw || typeof raw !== "object") return null;

  const topic = raw as Record<string, unknown>;
  const name = typeof topic.name === "string" ? topic.name.trim() : "";
  if (!name) return null;

  const postVolume =
    typeof topic.postVolume === "number"
      ? topic.postVolume
      : typeof topic.count === "number"
        ? topic.count
        : typeof topic.weight === "number"
          ? topic.weight
          : 0;

  const sentiment = typeof topic.sentiment === "number" ? topic.sentiment : 0;

  return { name, postVolume, sentiment };
}

function parsePost(raw: unknown): OrganismPost | null {
  if (!raw || typeof raw !== "object") return null;

  const post = raw as Record<string, unknown>;
  const id = typeof post.id === "string" ? post.id.trim() : "";
  if (!id) return null;

  const created_at =
    typeof post.created_at === "string" ? post.created_at : null;

  const sentiment_label =
    post.sentiment_label === "positive" ||
    post.sentiment_label === "neutral" ||
    post.sentiment_label === "negative"
      ? post.sentiment_label
      : undefined;

  const sentiment_compound =
    typeof post.sentiment_compound === "number"
      ? post.sentiment_compound
      : undefined;

  const topics = Array.isArray(post.topics)
    ? post.topics.filter((topic): topic is string => typeof topic === "string")
    : undefined;

  return { id, created_at, sentiment_label, sentiment_compound, topics };
}

export function parseOrganismData(raw: unknown): OrganismData | null {
  if (!raw || typeof raw !== "object") return null;

  const data = raw as Record<string, unknown>;
  const accountAgeDays =
    typeof data.accountAgeDays === "number" ? data.accountAgeDays : 0;

  const topics = Array.isArray(data.topics)
    ? data.topics
        .map(parseTopic)
        .filter((topic): topic is OrganismTopic => topic !== null)
    : [];

  const posts = Array.isArray(data.posts)
    ? data.posts
        .map(parsePost)
        .filter((post): post is OrganismPost => post !== null)
    : [];

  if (!topics.length && !posts.length && accountAgeDays <= 0) return null;

  return { accountAgeDays, topics, posts };
}

export type OrganismSource = "analysis" | "sample";

export function resolveOrganismData(
  raw: unknown,
): { data: OrganismData; source: OrganismSource } {
  const parsed = parseOrganismData(raw);
  if (parsed) {
    return { data: parsed, source: "analysis" };
  }
  return { data: SAMPLE_ORGANISM_DATA, source: "sample" };
}

function accountAgeDaysFromInsights(insights: PostInsight[]): number {
  const dates = insights
    .map((item) => (item.created_at ? new Date(item.created_at).getTime() : NaN))
    .filter((value) => !Number.isNaN(value));
  if (!dates.length) return 0;
  const earliest = Math.min(...dates);
  return Math.max(0, Math.floor((Date.now() - earliest) / (1000 * 60 * 60 * 24)));
}

/** Rebuild organism topics from post_insights filtered to one platform. */
export function organismDataForPlatform(
  base: OrganismData,
  insights: PostInsight[] | undefined,
  platform: string | null,
  topN = 3,
): OrganismData {
  if (!platform || !insights?.length) return base;

  const platformLower = platform.toLowerCase();
  const filtered = insights.filter(
    (item) => (item.platform || "").toLowerCase() === platformLower,
  );
  if (!filtered.length) {
    return { accountAgeDays: base.accountAgeDays, topics: [], posts: [] };
  }

  const volume = new Map<string, number>();
  const compounds = new Map<string, number[]>();

  for (const post of filtered) {
    const compound = typeof post.sentiment_compound === "number" ? post.sentiment_compound : 0;
    for (const topic of post.topics || []) {
      const name = String(topic).trim();
      if (!name) continue;
      volume.set(name, (volume.get(name) || 0) + 1);
      const list = compounds.get(name) || [];
      list.push(compound);
      compounds.set(name, list);
    }
  }

  const topics: OrganismTopic[] = [...volume.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([name, postVolume]) => {
      const scores = compounds.get(name) || [];
      const sentiment =
        scores.length > 0 ? scores.reduce((sum, n) => sum + n, 0) / scores.length : 0;
      return { name, postVolume, sentiment };
    });

  return {
    accountAgeDays: accountAgeDaysFromInsights(filtered) || base.accountAgeDays,
    topics,
    posts: filtered
      .filter((item): item is PostInsight & { id: string } => Boolean(item.id))
      .map((item) => ({
        id: item.id,
        created_at: item.created_at ?? null,
        sentiment_label:
          item.sentiment_label === "positive" ||
          item.sentiment_label === "neutral" ||
          item.sentiment_label === "negative"
            ? item.sentiment_label
            : undefined,
        sentiment_compound: item.sentiment_compound,
        topics: item.topics,
      })),
  };
}

export function formatAnalysisDiff(diff: AnalysisDiff | null | undefined): string | null {
  if (!diff) return null;
  if (diff.no_meaningful_change) {
    return "No meaningful change - this looks like data you already had.";
  }

  const parts: string[] = [];
  if (diff.posts_delta !== 0) {
    const sign = diff.posts_delta > 0 ? "+" : "";
    parts.push(`${sign}${diff.posts_delta} posts`);
  }
  if (diff.account_age_delta_days > 0) {
    parts.push(`history +${diff.account_age_delta_days} days`);
  }
  if (diff.topics_emerging.length) {
    parts.push(`new topics: ${diff.topics_emerging.join(", ")}`);
  }
  if (diff.topics_fading.length) {
    parts.push(`fading: ${diff.topics_fading.join(", ")}`);
  }
  if (!parts.length) return null;
  return parts.join(" · ");
}

export function formatDemoUserLabel(userId: string) {
  if (userId === "demo-user") return "Demo User";
  return userId
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatSentiment(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}`;
}

export function formatSentimentRatio(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `${Math.round(value * 100)}%`;
}

export function getSentimentRatio(
  summary: {
    positive?: number;
    neutral?: number;
    negative?: number;
    positive_pct?: number;
    neutral_pct?: number;
    negative_pct?: number;
  } | null | undefined,
  key: "positive" | "neutral" | "negative",
) {
  if (!summary) return null;
  const ratio = summary[key];
  if (typeof ratio === "number") return ratio;
  const pctKey = `${key}_pct` as const;
  const pct = summary[pctKey];
  if (typeof pct === "number") return pct / 100;
  return null;
}

export function formatImpactStrength(postCount: number | null | undefined) {
  if (!postCount || postCount <= 0) return "-";
  const score = Math.min(100, Math.round(postCount * 4.5));
  return `${score}%`;
}
