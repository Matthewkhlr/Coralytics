import type { OrganismData } from "../three/organismTypes";

export type SentimentSummary = {
  compound?: number;
  positive?: number;
  negative?: number;
  neutral?: number;
  positive_pct?: number;
  negative_pct?: number;
  neutral_pct?: number;
};

export type SentimentTimelinePoint = {
  period: string;
  compound: number;
  post_count: number;
};

export type AnalysisTopic = {
  name: string;
  weight?: number;
  postVolume?: number;
  count?: number;
  sentiment?: number;
};

export type RedFlag = {
  type: string;
  post_id?: string;
  excerpt?: string;
  topic?: string;
  count?: number;
  compound?: number;
};

export type RedFlags = {
  risk_score: number;
  flags: RedFlag[];
  flagged_post_count: number;
};

export type PlatformBreakdown = {
  platform: string;
  post_count: number;
  compound: number;
  top_topics: string[];
};

export type EvolutionTurningPoint = {
  period: string;
  description: string;
};

export type TopicDrift = {
  topic: string;
  trend: "emerging" | "fading" | string;
};

export type PersonaEvolution = {
  turning_points: EvolutionTurningPoint[];
  topic_drift: TopicDrift[];
};

export type AnalysisDiff = {
  posts_added: number;
  posts_delta: number;
  topics_emerging: string[];
  topics_fading: string[];
  account_age_delta_days: number;
  no_meaningful_change: boolean;
};

export type AnalysisDateRange = {
  earliest: string | null;
  latest: string | null;
};

export type PostInsight = {
  id?: string;
  _upload_id?: string;
  platform?: string;
  content?: string;
  created_at?: string;
  sentiment_label?: string;
  sentiment_compound?: number;
  topics?: string[];
};

export type Analysis = {
  analysis_id: string;
  user_id: string;
  name?: string | null;
  post_count: number;
  topics: AnalysisTopic[];
  sentiment_summary: SentimentSummary | null;
  organism_data: OrganismData;
  sentiment_timeline?: SentimentTimelinePoint[];
  persona_summary?: string | null;
  red_flags?: RedFlags | null;
  branding_recommendations?: string[];
  platform_breakdown?: PlatformBreakdown[];
  evolution?: PersonaEvolution | null;
  created_at?: string;
  updated_at?: string;
  upload_ids?: string[];
  date_range?: AnalysisDateRange | null;
  diff?: AnalysisDiff | null;
  post_insights?: PostInsight[];
};

export type AnalysesResponse = {
  analyses: Analysis[];
};

export type IngestFileReport = {
  path: string;
  kind?: string;
  platform?: string;
  post_count?: number;
  status?: string;
};

export type IngestReport = {
  total_posts?: number;
  files?: IngestFileReport[];
  warnings?: string[];
};

export type Upload = {
  upload_id: string;
  user_id: string;
  platform: string;
  filename: string;
  post_count: number;
  comment_count: number;
  created_at: string;
  parsed_at?: string;
  ingest_report?: IngestReport;
  analysis_id?: string;
  content_hash?: string;
  is_duplicate?: boolean;
  duplicate_of?: string | null;
  warnings?: string[];
};

export type UploadResponse = Upload;

export type UploadsResponse = {
  uploads: Upload[];
};

export type AnalyzeRequest = {
  user_id: string;
  persist?: boolean;
  name?: string;
};

export type PostSummary = {
  id?: string;
  platform?: string;
  content?: string;
  created_at?: string;
  sentiment_compound?: number;
  topics?: string[];
};

export type ShareRecord = {
  token: string;
  user_id: string;
  analysis_id: string;
  created_at: string;
  expires_at: string;
  payload: Analysis;
};

export type CreateShareRequest = {
  user_id: string;
  analysis_id: string;
  expiry_days?: number;
};
