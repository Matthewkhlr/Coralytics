import type {
  OrganismData,
  OrganismPost,
  OrganismTopic,
} from "../three/organismTypes";

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
    return "—";
  }
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}`;
}

export function formatImpactStrength(postCount: number | null | undefined) {
  if (!postCount || postCount <= 0) return "—";
  const score = Math.min(100, Math.round(postCount * 4.5));
  return `${score}%`;
}
