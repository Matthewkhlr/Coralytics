import * as THREE from "three";
import type { OrganismPost } from "../organismTypes";
import {
  coralSentimentColor,
  lightenCoral,
} from "./coralPalette";

export type BranchMaterialOptions = {
  color: string;
  roughness?: number;
  emissiveIntensity?: number;
};

export type BranchAnchor = {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  radius: number;
};

export function makeBranchMaterial({
  color,
  roughness = 0.78,
  emissiveIntensity = 0.06,
  metalness = 0,
}: BranchMaterialOptions & { metalness?: number }): THREE.MeshStandardMaterial {
  const base = new THREE.Color(color);
  return new THREE.MeshStandardMaterial({
    color: base,
    roughness,
    metalness,
    flatShading: false,
    emissive: base.clone(),
    emissiveIntensity: emissiveIntensity * 0.45,
  });
}

/** Materials per depth level — older posts near stem, newer toward tips. */
export function buildSentimentGradientMaterials(
  posts: OrganismPost[],
  depth: number,
  fallbackColor: string,
): THREE.MeshStandardMaterial[] {
  const sorted = [...posts].sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return ta - tb;
  });

  const materials: THREE.MeshStandardMaterial[] = [];
  for (let level = 0; level < depth; level += 1) {
    const start = Math.floor((level / depth) * sorted.length);
    const end = Math.floor(((level + 1) / depth) * sorted.length);
    const bucket = sorted.slice(start, Math.max(start + 1, end));

    let color = fallbackColor;
    if (bucket.length) {
      const avg =
        bucket.reduce((sum, p) => sum + (p.sentiment_compound ?? 0), 0) / bucket.length;
      color = coralSentimentColor(avg);
    }

    const t = level / Math.max(depth - 1, 1);
    const levelColor = lightenCoral(color, t * 0.14);

    materials.push(
      makeBranchMaterial({
        color: levelColor,
        emissiveIntensity: 0.05 + t * 0.06,
        roughness: 0.8 - t * 0.06,
      }),
    );
  }

  return materials.length
    ? materials
    : [
        makeBranchMaterial({ color: coralSentimentColor(-0.2) }),
        makeBranchMaterial({ color: fallbackColor }),
        makeBranchMaterial({ color: coralSentimentColor(0.2) }),
      ];
}

export function addBranchCollar(
  pivot: THREE.Object3D,
  radius: number,
  material: THREE.Material,
): void {
  const collar = new THREE.Mesh(
    new THREE.SphereGeometry(radius * 1.35, 12, 10),
    material,
  );
  collar.position.y = 0;
  pivot.add(collar);
}

/** Rounded branch segment with a bulbous tip like the reference illustration. */
export function addRoundedSegment(
  parent: THREE.Object3D,
  length: number,
  radius: number,
  material: THREE.Material,
  options: { cap?: boolean; wobble?: number } = {},
): THREE.Object3D {
  const wobble = options.wobble ?? 0;
  const topRadius = radius * (0.78 + wobble * 0.04);
  const segment = new THREE.Mesh(
    new THREE.CylinderGeometry(topRadius, radius * 1.02, length, 12, 2),
    material,
  );
  segment.position.y = length / 2;
  segment.scale.set(1 + wobble * 0.06, 1, 1 - wobble * 0.04);
  parent.add(segment);

  if (options.cap !== false) {
    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.12, 10, 10),
      material,
    );
    cap.position.y = length;
    cap.scale.set(1.05, 0.92, 1.05);
    parent.add(cap);
  }

  const tip = new THREE.Object3D();
  tip.position.y = length;
  tip.userData.isBranchTip = true;
  tip.userData.tipRadius = radius;
  parent.add(tip);
  return tip;
}

export type RecursiveBranchOptions = {
  length: number;
  radius: number;
  depth: number;
  material: THREE.Material;
  materials?: THREE.Material[];
  fanBias?: number;
  seed?: number;
  volumeFactor?: number;
  maxDepth?: number;
  spinePoints?: BranchAnchor[];
  spineParent?: THREE.Object3D;
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1_664_525 + 1_013_904_223) % 4_294_967_296;
    return s / 4_294_967_296;
  };
}

function resolveMaterial(
  options: RecursiveBranchOptions,
  depth: number,
): THREE.Material {
  const maxDepth = options.maxDepth ?? options.depth;
  if (options.materials?.length) {
    const level = Math.min(maxDepth - depth, options.materials.length - 1);
    return options.materials[Math.max(0, level)];
  }
  return options.material;
}

export function collectBranchAnchors(branchRoot: THREE.Object3D): BranchAnchor[] {
  const anchors: BranchAnchor[] = [];
  branchRoot.traverse((obj) => {
    if (!obj.userData?.isBranchTip) return;
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    obj.getWorldPosition(position);
    obj.getWorldQuaternion(quaternion);
    branchRoot.worldToLocal(position);
    const rootQuat = branchRoot.getWorldQuaternion(new THREE.Quaternion()).invert();
    quaternion.premultiply(rootQuat);
    anchors.push({
      position,
      quaternion,
      radius: Number(obj.userData.tipRadius) || 0.08,
    });
  });
  return anchors;
}

function registerSpinePoint(
  spinePoints: BranchAnchor[] | undefined,
  branchRoot: THREE.Object3D | undefined,
  node: THREE.Object3D,
  localY: number,
  radius: number,
): void {
  if (!spinePoints || !branchRoot) return;
  const worldPos = new THREE.Vector3(0, localY, 0);
  node.localToWorld(worldPos);
  branchRoot.worldToLocal(worldPos);
  const worldQuat = new THREE.Quaternion();
  node.getWorldQuaternion(worldQuat);
  const rootQuat = branchRoot.getWorldQuaternion(new THREE.Quaternion()).invert();
  worldQuat.premultiply(rootQuat);
  spinePoints.push({ position: worldPos, quaternion: worldQuat, radius });
}

export function collectBranchSpinePoints(branchRoot: THREE.Object3D): BranchAnchor[] {
  const stored = branchRoot.userData.spinePoints as BranchAnchor[] | undefined;
  if (stored?.length) return stored;
  return collectBranchAnchors(branchRoot);
}

function deterministicChildCount(volumeFactor: number, depth: number): number {
  if (depth <= 1) return 0;
  if (depth === 2) return 2;
  if (volumeFactor >= 0.8) return 3;
  return 2;
}

export function growRecursiveBranch(
  parent: THREE.Object3D,
  options: RecursiveBranchOptions,
): void {
  const {
    length,
    radius,
    depth,
    fanBias = 0.72,
    volumeFactor = 0.6,
  } = options;
  const rand = seededRandom(options.seed ?? Math.floor(length * 1000 + radius * 100));
  const material = resolveMaterial(options, depth);
  const wobble = rand() * 0.5;

  if (depth <= 0 || length <= 0.06 || radius <= 0.01) {
    const nub = new THREE.Mesh(
      new THREE.SphereGeometry(radius * 1.25, 10, 10),
      material,
    );
    nub.position.y = 0;
    nub.scale.set(1.08, 0.9, 1.08);
    parent.add(nub);
    return;
  }

  const tip = addRoundedSegment(parent, length, radius, material, {
    cap: true,
    wobble,
  });

  registerSpinePoint(options.spinePoints, options.spineParent, parent, length * 0.35, radius);
  registerSpinePoint(options.spinePoints, options.spineParent, parent, length * 0.7, radius * 0.88);
  registerSpinePoint(options.spinePoints, options.spineParent, tip, 0, radius * 0.72);

  if (depth === 1) return;

  const childCount = deterministicChildCount(volumeFactor, depth);
  const childLength = length * (0.55 + volumeFactor * 0.1);
  const childRadius = radius * 0.72;

  for (let i = 0; i < childCount; i += 1) {
    const pivot = new THREE.Object3D();
    const spread = childCount === 1 ? 0 : (i / (childCount - 1) - 0.5) * fanBias;
    pivot.rotation.y = spread * Math.PI * 1.1 + (rand() - 0.5) * 0.45;
    pivot.rotateZ(-(0.35 + rand() * 0.42));
    pivot.rotateX((rand() - 0.5) * 0.35);
    tip.add(pivot);

    growRecursiveBranch(pivot, {
      ...options,
      length: childLength,
      radius: childRadius,
      depth: depth - 1,
      seed: Math.floor(rand() * 1_000_000),
    });
  }
}

export function disposeCoralGroup(
  coral: THREE.Group,
  scene: THREE.Scene,
  extraMaterials?: Iterable<THREE.Material>,
): void {
  scene.remove(coral);
  const disposed = new Set<THREE.Material>();

  coral.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh) {
      const mesh = obj as THREE.Mesh;
      mesh.geometry.dispose();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        if (!disposed.has(m)) {
          m.dispose();
          disposed.add(m);
        }
      });
    }
  });

  if (extraMaterials) {
    for (const m of extraMaterials) {
      if (!disposed.has(m)) m.dispose();
    }
  }
}
