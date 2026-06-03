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

export function generateOrganism(
  scene: THREE.Scene,
  data: OrganismData,
): (() => void) | void {
  void scene;
  void data;

  /*
   * Write your procedural coral/tree generation here.
   *
   * Suggested mapping from the proposal:
   * - data.accountAgeDays -> trunk height
   * - topic.postVolume -> branch thickness
   * - topic.sentiment -> leaf/node colour
   *
   * Add your THREE.Object3D instances to `scene`, then return a cleanup
   * function that removes/disposes them if you allocate geometries/materials.
   */
}
