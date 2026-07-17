// three/organismTypes.ts
import * as THREE from "three";

export type OrganismTopic = {
  name: string;
  postVolume: number;
  sentiment: number;
};

export type OrganismPost = {
  id: string;
  created_at: string | null;
  sentiment_label?: "positive" | "neutral" | "negative";
  sentiment_compound?: number;
  topics?: string[];
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
