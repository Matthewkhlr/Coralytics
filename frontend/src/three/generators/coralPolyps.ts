import * as THREE from "three";
import type { OrganismPost } from "../organismTypes";
import { getPostSentimentColor } from "./organismColors";
import {
  polypEmissiveFromEngagement,
  polypScaleFromEngagement,
} from "./coralEngagement";
import type { BranchAnchor } from "./coralBranchUtils";

/** Fewer markers per branch keeps the reef readable. */
const POLYP_SCALE = 1.1;
const POLYP_HIT_SCALE = 2.2;
export const MAX_POLYPS_PER_BRANCH = 18;

const STEM_COLOR = "#1a2838";

export function groupPostsByTopic(posts: OrganismPost[]): Map<string, OrganismPost[]> {
  const map = new Map<string, OrganismPost[]>();
  for (const post of posts) {
    for (const topic of post.topics ?? []) {
      const name = topic.trim();
      if (!name) continue;
      const bucket = map.get(name);
      if (bucket) bucket.push(post);
      else map.set(name, [post]);
    }
  }
  return map;
}

export function pickDisplayPosts(posts: OrganismPost[], max: number): OrganismPost[] {
  const sorted = [...posts].sort((a, b) => {
    const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
    const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
    return ta - tb;
  });
  if (sorted.length <= max) return sorted;
  const picked: OrganismPost[] = [];
  for (let i = 0; i < max; i += 1) {
    const index = Math.floor((i + 0.5) * (sorted.length / max));
    picked.push(sorted[Math.min(index, sorted.length - 1)]);
  }
  return picked;
}

function getSpotMaterial(
  cache: Map<string, THREE.MeshStandardMaterial>,
  color: string,
  emissiveIntensity: number,
): THREE.MeshStandardMaterial {
  const key = `${color}:${emissiveIntensity.toFixed(3)}`;
  let mat = cache.get(key);
  if (!mat) {
    mat = new THREE.MeshStandardMaterial({
      color,
      emissive: new THREE.Color(color),
      emissiveIntensity,
      roughness: 0.72,
      metalness: 0,
    });
    cache.set(key, mat);
  }
  return mat;
}

let stemMaterial: THREE.MeshStandardMaterial | null = null;

function getStemMaterial(): THREE.MeshStandardMaterial {
  if (!stemMaterial) {
    stemMaterial = new THREE.MeshStandardMaterial({
      color: STEM_COLOR,
      roughness: 0.9,
      metalness: 0,
    });
  }
  return stemMaterial;
}

/**
 * Post marker: a short stem with a sentiment-colored bead on top.
 * Clean at rest; a hover ring appears only when the user points at it.
 */
export function buildPolypMarker(
  branchRadius: number,
  spotColor: string,
  materialCache: Map<string, THREE.MeshStandardMaterial>,
  options?: { engagementNorm?: number | null },
): THREE.Group {
  const scaleMul = polypScaleFromEngagement(options?.engagementNorm);
  const beadRadius = branchRadius * 0.68 * POLYP_SCALE * scaleMul;
  const stemHeight = beadRadius * 1.35;
  const emissiveIntensity = polypEmissiveFromEngagement(options?.engagementNorm);
  const beadY = stemHeight + beadRadius * 0.92;

  const group = new THREE.Group();

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(beadRadius * 0.2, beadRadius * 0.26, stemHeight, 6),
    getStemMaterial(),
  );
  stem.position.y = stemHeight * 0.5;
  stem.userData.coralPart = "stem";

  const spot = new THREE.Mesh(
    new THREE.SphereGeometry(beadRadius, 10, 10),
    getSpotMaterial(materialCache, spotColor, emissiveIntensity),
  );
  spot.position.y = beadY;
  spot.userData.coralPart = "spot";

  const hoverRing = new THREE.Mesh(
    new THREE.TorusGeometry(beadRadius * 1.28, beadRadius * 0.11, 8, 24),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    }),
  );
  hoverRing.rotation.x = Math.PI / 2;
  hoverRing.position.y = beadY;
  hoverRing.userData.coralPart = "hoverRing";

  const hitZone = new THREE.Mesh(
    new THREE.SphereGeometry(beadRadius * POLYP_HIT_SCALE, 8, 8),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  hitZone.position.y = beadY;
  hitZone.userData.coralPart = "hit";

  group.add(stem, spot, hoverRing, hitZone);
  return group;
}

export function placePolypsOnBranch(
  branchRoot: THREE.Object3D,
  anchors: BranchAnchor[],
  spinePoints: BranchAnchor[],
  posts: OrganismPost[],
  materialCache: Map<string, THREE.MeshStandardMaterial>,
  seed: number,
): void {
  const placementPoints = spinePoints.length ? spinePoints : anchors;
  if (!placementPoints.length || !posts.length) return;

  const displayPosts = pickDisplayPosts(posts, MAX_POLYPS_PER_BRANCH);

  displayPosts.forEach((post, postIndex) => {
    const pointIndex = Math.min(
      Math.floor((postIndex / displayPosts.length) * placementPoints.length),
      placementPoints.length - 1,
    );
    const point = placementPoints[pointIndex];
    if (!point) return;

    const polyp = buildPolypMarker(point.radius, getPostSentimentColor(post), materialCache, {
      engagementNorm: post.engagementNorm ?? null,
    });
    polyp.userData.coralRole = "polyp";
    polyp.userData.topicName = branchRoot.userData.topicName;
    polyp.userData.postId = post.id;
    polyp.userData.sentiment = post.sentiment_compound ?? 0;
    polyp.userData.createdAt = post.created_at;
    polyp.userData.engagement = post.engagement ?? null;
    polyp.userData.postType = post.post_type ?? "post";

    const azimuth = (postIndex / displayPosts.length) * Math.PI * 2 + (seed % 100) * 0.01;
    const outwardTilt = 0.42 + ((seed + postIndex) % 7) * 0.025;

    const offset = new THREE.Object3D();
    offset.position.copy(point.position);
    offset.quaternion.copy(point.quaternion);
    offset.rotateY(azimuth);
    offset.rotateZ(-outwardTilt);
    branchRoot.add(offset);
    offset.translateY(point.radius * 0.95);
    offset.add(polyp);
  });
}
