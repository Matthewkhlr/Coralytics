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
): { cube: THREE.Mesh; cleanup: () => void} {
  // 1. Geometry & material
  const geometry = new THREE.BoxGeometry(1,1,1);

  const material = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    roughness: 0.4,
    metalness: 0.1,
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.position.y = 0.5; //cube floats above grid
  scene.add(cube);

  //1.1 Edges
  const edgeGeometry = new THREE.BoxGeometry(1.01, 1.01, 1.01);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x111827 });
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(edgeGeometry),
    edgeMaterial
  );
  cube.add(edges);

  //2. to do: map data to scale

  //3. cleanup
  const cleanup = () => {
    scene.remove(cube);
    geometry.dispose();
    material.dispose();
    edgeGeometry.dispose();
    edgeMaterial.dispose();
  };

  return { cube, cleanup };


  };

  

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

