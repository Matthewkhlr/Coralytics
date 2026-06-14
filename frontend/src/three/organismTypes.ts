// three/organismTypes.ts
import * as THREE from "three";

export type OrganismTopic = {
  name: string;
  postVolume: number;
  sentiment: number;
};

export type OrganismData = {
  accountAgeDays: number;
  topics: OrganismTopic[];
};

export type OrganismGenerator = (
  scene: THREE.Scene,
  data: OrganismData
) => { coral: THREE.Group; cleanup: () => void };