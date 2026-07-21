import * as THREE from "three";

export type BranchMaterialOptions = {
  color: string;
  roughness?: number;
  emissiveIntensity?: number;
};

export function makeBranchMaterial({
  color,
  roughness = 0.58,
  emissiveIntensity = 0.06,
}: BranchMaterialOptions): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.02,
    flatShading: false,
    emissive: new THREE.Color(color),
    emissiveIntensity,
  });
}

/** Chunky branch segment with a rounded cap at the tip (reads more coral-like than bare cylinders). */
export function addRoundedSegment(
  parent: THREE.Object3D,
  length: number,
  radius: number,
  material: THREE.Material,
  options: { cap?: boolean } = {},
): THREE.Object3D {
  const segment = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.82, radius, length, 10, 1),
    material,
  );
  segment.position.y = length / 2;
  parent.add(segment);

  if (options.cap !== false) {
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 0.92, 10, 8),
      material,
    );
    cap.position.y = length;
    parent.add(cap);
  }

  const tip = new THREE.Object3D();
  tip.position.y = length;
  parent.add(tip);
  return tip;
}

export type RecursiveBranchOptions = {
  length: number;
  radius: number;
  depth: number;
  material: THREE.Material;
  /** Bias splits upward/outward like a bushy fan. */
  fanBias?: number;
  seed?: number;
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1_664_525 + 1_013_904_223) % 4_294_967_296;
    return s / 4_294_967_296;
  };
}

export function growRecursiveBranch(
  parent: THREE.Object3D,
  options: RecursiveBranchOptions,
): void {
  const { length, radius, depth, material, fanBias = 0.55 } = options;
  const rand = seededRandom(options.seed ?? Math.floor(length * 1000 + radius * 100));

  if (depth <= 0 || length <= 0.08 || radius <= 0.012) {
    const nub = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.15, 8, 8),
      material,
    );
    nub.position.y = 0;
    parent.add(nub);
    return;
  }

  const tip = addRoundedSegment(parent, length, radius, material, { cap: depth <= 1 });

  if (depth === 1) return;

  const childCount = rand() < 0.25 ? 3 : 2;
  const childLength = length * (0.58 + rand() * 0.18);
  const childRadius = radius * 0.78;

  for (let i = 0; i < childCount; i++) {
    const pivot = new THREE.Object3D();
    const spread = (i / Math.max(childCount - 1, 1) - 0.5) * fanBias;
    pivot.rotation.y = spread * Math.PI + (rand() - 0.5) * 0.35;
    pivot.rotateZ(-(0.28 + rand() * 0.38));
    pivot.rotateX((rand() - 0.5) * 0.25);
    tip.add(pivot);

    growRecursiveBranch(pivot, {
      length: childLength,
      radius: childRadius,
      depth: depth - 1,
      material,
      fanBias,
      seed: Math.floor(rand() * 1_000_000),
    });
  }
}

export function disposeCoralGroup(coral: THREE.Group, scene: THREE.Scene): void {
  scene.remove(coral);
  coral.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => m.dispose());
    }
  });
}
