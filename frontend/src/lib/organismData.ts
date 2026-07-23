import type {
  OrganismData,
  OrganismPost,
  OrganismPostType,
  OrganismTopic,
} from "../three/organismTypes";
import type { AnalysisDiff, PostInsight } from "../api/types";

export const SAMPLE_ORGANISM_DATA: OrganismData = {
  accountAgeDays: 0,
  topics: [],
  posts: [],
};

export const EMPTY_ORGANISM_DATA: OrganismData = SAMPLE_ORGANISM_DATA;

export function isOrganismEmpty(data: OrganismData): boolean {
  return data.topics.length === 0 && (data.posts?.length ?? 0) === 0;
}

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

  const avgEngagement =
    typeof topic.avgEngagement === "number" ? topic.avgEngagement : null;

  const commentVolume =
    typeof topic.commentVolume === "number" ? topic.commentVolume : undefined;

  return { name, postVolume, sentiment, avgEngagement, commentVolume };
}

function parsePostType(raw: unknown): OrganismPostType | undefined {
  if (
    raw === "post" ||
    raw === "comment" ||
    raw === "reply" ||
    raw === "share" ||
    raw === "unknown"
  ) {
    return raw;
  }
  return undefined;
}

function parseSentimentLabel(
  raw: unknown,
): "positive" | "neutral" | "negative" | undefined {
  if (raw === "positive" || raw === "neutral" || raw === "negative") {
    return raw;
  }
  return undefined;
}

function buildEngagementNormMap(posts: OrganismPost[]): Map<string, number | null> {
  const engagements = posts
    .map((post) => post.engagement)
    .filter((value): value is number => typeof value === "number" && value >= 0);
  if (!engagements.length) return new Map();

  const max = Math.max(...engagements);
  const logMax = Math.log1p(max);
  const map = new Map<string, number | null>();
  for (const post of posts) {
    if (
      typeof post.engagement !== "number" ||
      post.engagement < 0 ||
      logMax <= 0
    ) {
      map.set(post.id, null);
      continue;
    }
    map.set(post.id, Math.round((Math.log1p(post.engagement) / logMax) * 10000) / 10000);
  }
  return map;
}

function parsePost(raw: unknown): OrganismPost | null {
  if (!raw || typeof raw !== "object") return null;

  const post = raw as Record<string, unknown>;
  const id = typeof post.id === "string" ? post.id.trim() : "";
  if (!id) return null;

  const created_at =
    typeof post.created_at === "string" ? post.created_at : null;

  const sentiment_label = parseSentimentLabel(post.sentiment_label);

  const sentiment_compound =
    typeof post.sentiment_compound === "number"
      ? post.sentiment_compound
      : undefined;

  const topics = Array.isArray(post.topics)
    ? post.topics.filter((topic): topic is string => typeof topic === "string")
    : undefined;

  const post_type = parsePostType(post.post_type);

  const engagement =
    typeof post.engagement === "number"
      ? post.engagement
      : post.engagement === null
        ? null
        : undefined;

  const engagementNorm =
    typeof post.engagementNorm === "number"
      ? post.engagementNorm
      : post.engagementNorm === null
        ? null
        : undefined;

  return {
    id,
    created_at,
    sentiment_label,
    sentiment_compound,
    topics,
    post_type,
    engagement,
    engagementNorm,
  };
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

export type OrganismSource = "analysis" | "sample" | "empty";

export function resolveOrganismData(
  raw: unknown,
): { data: OrganismData; source: OrganismSource } {
  const parsed = parseOrganismData(raw);
  if (parsed) {
    return { data: parsed, source: "analysis" };
  }
  return { data: EMPTY_ORGANISM_DATA, source: "empty" };
}

function accountAgeDaysFromInsights(insights: PostInsight[]): number {
  const dates = insights
    .map((item) => (item.created_at ? new Date(item.created_at).getTime() : NaN))
    .filter((value) => !Number.isNaN(value));
  if (!dates.length) return 0;
  const earliest = Math.min(...dates);
  return Math.max(
    0,
    Math.floor((Date.now() - earliest) / (1000 * 60 * 60 * 24)),
  );
}

/** Pasted / manual demo posts (generic JSON), not a social export upload. */
export function isPastedSamplePlatform(platform?: string | null): boolean {
  return (platform ?? "").toLowerCase() === "sample";
}

function insightsToOrganismPosts(filtered: PostInsight[]): OrganismPost[] {
  const base: OrganismPost[] = filtered
    .filter((item): item is PostInsight & { id: string } => Boolean(item.id))
    .map((item) => ({
      id: item.id,
      created_at: item.created_at ?? null,
      sentiment_label: parseSentimentLabel(item.sentiment_label),
      sentiment_compound: item.sentiment_compound,
      topics: item.topics,
      post_type: parsePostType(item.post_type),
      engagement:
        typeof item.engagement === "number"
          ? item.engagement
          : item.engagement === null
            ? null
            : undefined,
    }));

  const normMap = buildEngagementNormMap(base);
  return base.map((post) => ({
    ...post,
    engagementNorm: normMap.get(post.id) ?? null,
  }));
}

const COMMENT_POST_TYPES = new Set(["comment", "reply"]);

function buildOrganismFromInsights(
  base: OrganismData,
  filtered: PostInsight[],
  topN: number,
): OrganismData {
  const volume = new Map<string, number>();
  const compounds = new Map<string, number[]>();
  const engagements = new Map<string, number[]>();
  const commentVolume = new Map<string, number>();

  for (const post of filtered) {
    const compound =
      typeof post.sentiment_compound === "number" ? post.sentiment_compound : 0;
    const postType = (post.post_type || "").toLowerCase();
    const engagement =
      typeof post.engagement === "number" ? post.engagement : null;

    for (const topic of post.topics || []) {
      const name = String(topic).trim();
      if (!name) continue;
      volume.set(name, (volume.get(name) || 0) + 1);
      const list = compounds.get(name) || [];
      list.push(compound);
      compounds.set(name, list);
      if (engagement !== null) {
        const engList = engagements.get(name) || [];
        engList.push(engagement);
        engagements.set(name, engList);
      }
      if (COMMENT_POST_TYPES.has(postType)) {
        commentVolume.set(name, (commentVolume.get(name) || 0) + 1);
      }
    }
  }

  const topics: OrganismTopic[] = [...volume.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([name, postVolume]) => {
      const scores = compounds.get(name) || [];
      const sentiment =
        scores.length > 0
          ? scores.reduce((sum, n) => sum + n, 0) / scores.length
          : 0;
      const topicEngagements = engagements.get(name) || [];
      const avgEngagement =
        topicEngagements.length > 0
          ? Math.round(
              (topicEngagements.reduce((sum, n) => sum + n, 0) /
                topicEngagements.length) *
                100,
            ) / 100
          : null;
      return {
        name,
        postVolume,
        sentiment,
        avgEngagement,
        commentVolume: commentVolume.get(name) || 0,
      };
    });

  return {
    accountAgeDays: accountAgeDaysFromInsights(filtered) || base.accountAgeDays,
    topics,
    posts: insightsToOrganismPosts(filtered),
  };
}

/** Rebuild organism from post_insights — real uploads only (excludes pasted sample). */
export function organismDataForPlatform(
  base: OrganismData,
  insights: PostInsight[] | undefined,
  platform: string | null,
  topN = 3,
): OrganismData {
  if (!insights?.length) return base;

  let filtered = insights.filter((item) => !isPastedSamplePlatform(item.platform));

  if (platform) {
    const platformLower = platform.toLowerCase();
    filtered = filtered.filter(
      (item) => (item.platform || "").toLowerCase() === platformLower,
    );
  }

  if (!filtered.length) {
    return { accountAgeDays: base.accountAgeDays, topics: [], posts: [] };
  }

  return buildOrganismFromInsights(base, filtered, topN);
}

export function formatAnalysisDiff(
  diff: AnalysisDiff | null | undefined,
): string | null {
  if (!diff) return null;
  if (diff.no_meaningful_change) {
    return "No meaningful change. This looks like data you already had.";
  }

  const parts: string[] = [];
  if (diff.posts_delta !== 0) {
    const sign = diff.posts_delta > 0 ? "+" : "";
    parts.push(`${sign}${diff.posts_delta} posts`);
  }
  if (diff.account_age_delta_days > 0) {
    parts.push(`history +${diff.account_age_delta_days} days`);
  }
  if (!parts.length) return null;
  return parts.join(" · ");
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
  summary:
    | {
        positive?: number;
        neutral?: number;
        negative?: number;
        positive_pct?: number;
        neutral_pct?: number;
        negative_pct?: number;
      }
    | null
    | undefined,
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