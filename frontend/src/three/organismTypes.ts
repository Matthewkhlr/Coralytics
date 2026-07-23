// three/organismTypes.ts
import * as THREE from "three";

export type OrganismTopic = {
  name: string;
  postVolume: number;
  sentiment: number;
  avgEngagement?: number | null;
  commentVolume?: number;
};

export type OrganismPostType = "post" | "comment" | "reply" | "share" | "unknown";

export type OrganismPost = {
  id: string;
  created_at: string | null;
  sentiment_label?: "positive" | "neutral" | "negative";
  sentiment_compound?: number;
  topics?: string[];
  post_type?: OrganismPostType;
  engagement?: number | null;
  engagementNorm?: number | null;
};

export type OrganismData = {
  accountAgeDays: number;
  topics: OrganismTopic[];
  posts: OrganismPost[];
};

export type OrganismGenerator = (
  scene: THREE.Scene,
  data: OrganismData
) => { coral: THREE.Group; cleanup: () => void };
