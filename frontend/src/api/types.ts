import type { OrganismData } from "../three/organismTypes";

export type SentimentSummary = {
  compound?: number;
  positive?: number;
  negative?: number;
  neutral?: number;
};

export type AnalysisTopic = {
  name: string;
  weight?: number;
  postVolume?: number;
  sentiment?: number;
};

export type Analysis = {
  analysis_id: string;
  user_id: string;
  post_count: number;
  topics: AnalysisTopic[];
  sentiment_summary: SentimentSummary | null;
  organism_data: OrganismData;
  created_at?: string;
  updated_at?: string;
  upload_ids?: string[];
};

export type AnalysesResponse = {
  analyses: Analysis[];
};

export type IngestFileReport = {
  path: string;
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
};

export type UploadResponse = Upload;

export type UploadsResponse = {
  uploads: Upload[];
};

export type AnalyzeRequest = {
  user_id: string;
  upload_ids: string[];
  persist?: boolean;
};

export type HealthResponse = {
  status: string;
  use_emulators?: boolean;
  firebase_project?: string;
};
