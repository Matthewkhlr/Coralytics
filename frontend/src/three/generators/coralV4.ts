import * as THREE from "three";
import type { OrganismGenerator, OrganismPost } from "../organismTypes";
import { getSentiment, getCategory, SENTIMENT_COLORS, CATEGORY_COLORS } from "./organismColors";

// Reef-inspired palette (aligned with LandingReef / coralV2–V3 tones).
const CORAL_TRUNK_BASE = "#d4927f";
const CORAL_TRUNK_MID = "#e8a89a";
const CORAL_TRUNK_TIP = "#ffd4c8";
const CORAL_BRANCH_PALETTE = [
  "#ff7f6e",
  "#ff9f68",
  "#f472b6",
  "#fb7185",
  "#fda4af",
  "#fdba74",
  "#e879f9",
  "#c4b5fd",
];
const CORAL_POLYP_BASE = "#ffe8e0";
const MAX_POLYPS_PER_BRANCH = 36;

function blendHex(base: string, accent: string, amount: number): string {
  return `#${new THREE.Color(base).lerp(new THREE.Color(accent), amount).getHexString()}`;
}

function pickDisplayPosts(posts: OrganismPost[], max: number): OrganismPost[] {
  if (posts.length <= max) return posts;
  const picked: OrganismPost[] = [];
  for (let i = 0; i < max; i += 1) {
    const index = Math.floor((i + 0.5) * (posts.length / max));
    picked.push(posts[Math.min(index, posts.length - 1)]);
  }
  return picked;
}

// Helper: recursively build a skinny, forking twig off a tip.
// Fixed bug: children used to attach to `segment` (already offset by length/2)
// with an additional `length` offset, landing them at 1.5x the segment length
// instead of at its tip. Now we build an explicit tip anchor on `parent` at
// y = length, and forks attach there — so each level connects cleanly to the
// end of the previous one instead of drifting further away with depth.
function makeBranch(
  parent: THREE.Object3D,
  length: number,
  radius: number,
  depth: number,
  material: THREE.Material,
) {
  if (depth < 0 || length <= 0 || radius <= 0) return;

  const geometry = new THREE.CylinderGeometry(radius * 0.7, radius, length, 6, 1);
  const segment = new THREE.Mesh(geometry, material);

  // base of this segment at parent's origin, tip at +y
  segment.position.y = length / 2;
  parent.add(segment);

  if (depth === 0) return;

  // occasionally fork into 3 instead of always 2, for less mechanical branching
  const numChildren = Math.random() < 0.3 ? 3 : 2;
  const childLength = length * (0.5 + Math.random() * 0.2);
  const childRadius = radius * 0.7;

  // shared anchor at the true tip of this segment, in parent's local space
  const tipAnchor = new THREE.Object3D();
  tipAnchor.position.y = length;
  parent.add(tipAnchor);

  for (let i = 0; i < numChildren; i++) {
    const childPivot = new THREE.Object3D();

    const azimuth = Math.random() * Math.PI * 2;
    const tilt = 0.4 + Math.random() * 0.55; // ~23-54 degrees, more variance than before

    childPivot.rotation.set(0, azimuth, 0);
    childPivot.rotateZ(-tilt);

    tipAnchor.add(childPivot);

    makeBranch(childPivot, childLength, childRadius, depth - 1, material);
  }
}

// Build a gently curving "stem" out of several short chained segments instead
// of one rigid straight cylinder. Each segment inherits a slowly-drifting
// azimuth plus a small random wobble, so the stem ambles like a real coral
// branch rather than zigzagging or standing perfectly straight.
//
// Mesh segment count is kept low here purely for visual smoothness/perf. To
// place polyps we need arbitrarily many attachment points (one per post,
// which can be in the hundreds) without paying for that many mesh segments
// or reusing the same spot for multiple posts — so alongside building the
// mesh we track cumulative position/orientation by hand and expose
// `sampleAt(t)`, a continuous function that can be queried at any t in
// [0,1] to get the exact position, orientation, and radius on the curve at
// that point, independent of how coarse the visible mesh is.
function makeSnakeStem(
  parent: THREE.Object3D,
  totalLength: number,
  radiusStart: number,
  radiusEnd: number,
  material: THREE.Material,
  options: { segments?: number; wobble?: number } = {},
): {
  tip: THREE.Object3D;
  sampleAt: (t: number) => {
    position: THREE.Vector3;
    quaternion: THREE.Quaternion;
    radius: number;
  };
} {
  const segments = Math.max(1, options.segments ?? 4);
  const wobble = options.wobble ?? 0.3; // radians of extra random tilt per segment
  const segLength = totalLength / segments;

  let current: THREE.Object3D = parent;

  // manual cumulative transform, tracked in parent's local space alongside
  // the real Object3D hierarchy, purely so sampleAt can be queried at any
  // resolution without touching the mesh
  const cumPos = new THREE.Vector3(0, 0, 0);
  const cumQuat = new THREE.Quaternion();

  const segRecords: {
    startPos: THREE.Vector3;
    quat: THREE.Quaternion;
    length: number;
    radiusStart: number;
    radiusEnd: number;
  }[] = [];

  // Drift starts at 0 — meaning "keep going the direction the branch is
  // already pointed" (branchRoot already leans outward from the trunk
  // before makeSnakeStem is even called). It's then clamped to a bounded
  // range rather than left as an unconstrained random walk: previously it
  // could drift a full 0-2π on the very first segment and keep wandering
  // indefinitely after, which — given enough segments on a long branch —
  // let it spiral all the way back around the trunk's own axis and grow
  // straight back into it. Clamping keeps the organic side-to-side wobble
  // but guarantees it can never turn more than ~65° off the outward path.
  let driftAzimuth = 0;
  const MAX_DRIFT_FROM_OUTWARD = 1.15; // radians

  for (let i = 0; i < segments; i++) {
    const tStart = i / segments;
    const tEnd = (i + 1) / segments;
    const segRadiusBottom = THREE.MathUtils.lerp(radiusStart, radiusEnd, tStart);
    const segRadiusTop = THREE.MathUtils.lerp(radiusStart, radiusEnd, tEnd);

    const pivot = new THREE.Object3D();

    // small incremental bend: mostly keep going the same way, with a slight
    // upward-biased wobble so the stem still generally reaches outward/up
    driftAzimuth = THREE.MathUtils.clamp(
      driftAzimuth + (Math.random() - 0.5) * 0.5,
      -MAX_DRIFT_FROM_OUTWARD,
      MAX_DRIFT_FROM_OUTWARD,
    );
    const tilt = (Math.random() - 0.35) * wobble;

    pivot.rotation.set(0, driftAzimuth, 0);
    pivot.rotateZ(tilt);

    current.add(pivot);

    cumQuat.multiply(pivot.quaternion);
    segRecords.push({
      startPos: cumPos.clone(),
      quat: cumQuat.clone(),
      length: segLength,
      radiusStart: segRadiusBottom,
      radiusEnd: segRadiusTop,
    });

    const geometry = new THREE.CylinderGeometry(
      segRadiusTop,
      segRadiusBottom,
      segLength,
      6,
      1,
    );
    const segment = new THREE.Mesh(geometry, material);
    segment.position.y = segLength / 2;
    pivot.add(segment);

    const tipAnchor = new THREE.Object3D();
    tipAnchor.position.y = segLength;
    pivot.add(tipAnchor);

    const dir = new THREE.Vector3(0, 1, 0).applyQuaternion(cumQuat);
    cumPos.addScaledVector(dir, segLength);

    current = tipAnchor;
  }

  const sampleAt = (t: number) => {
    const targetLength = THREE.MathUtils.clamp(t, 0, 1) * totalLength;
    let acc = 0;

    for (let i = 0; i < segRecords.length; i++) {
      const rec = segRecords[i];
      const isLast = i === segRecords.length - 1;

      if (targetLength <= acc + rec.length || isLast) {
        const localT =
          rec.length > 0
            ? THREE.MathUtils.clamp((targetLength - acc) / rec.length, 0, 1)
            : 0;
        const dir = new THREE.Vector3(0, 1, 0).applyQuaternion(rec.quat);
        const position = rec.startPos
          .clone()
          .addScaledVector(dir, localT * rec.length);
        const radius = THREE.MathUtils.lerp(rec.radiusStart, rec.radiusEnd, localT);
        return { position, quaternion: rec.quat.clone(), radius };
      }

      acc += rec.length;
    }

    // totalLength === 0 edge case
    return {
      position: new THREE.Vector3(),
      quaternion: new THREE.Quaternion(),
      radius: radiusStart,
    };
  };

  return { tip: current, sampleAt };
}

// Builds one small polyp (base + ring of static tentacles), sized relative
// to the branch radius it's growing from so it reads as a small bump on the
// branch rather than a fixed-size bead threaded through it.
//
// The base is colored by sentiment, the tentacles by category — swap which
// gets `baseColor` vs `tentacleColor` at the call site if you want it the
// other way around. Materials are pulled from a shared cache keyed by hex
// color rather than created fresh per polyp, since with hundreds of posts
// that'd otherwise mean hundreds of near-duplicate materials.
const POLYP_SCALE = 0.72;

function getCachedMaterial(
  cache: Map<string, THREE.MeshStandardMaterial>,
  color: string,
  options: { emissive?: string; emissiveIntensity?: number } = {},
): THREE.MeshStandardMaterial {
  const key = `${color}:${options.emissive ?? ""}:${options.emissiveIntensity ?? 0}`;
  let mat = cache.get(key);
  if (!mat) {
    mat = new THREE.MeshStandardMaterial({
      color,
      emissive: options.emissive ? new THREE.Color(options.emissive) : new THREE.Color(0x000000),
      emissiveIntensity: options.emissiveIntensity ?? 0,
      roughness: 0.62,
      metalness: 0.02,
      flatShading: false,
    });
    cache.set(key, mat);
  }
  return mat;
}

function buildPolyp(
  branchRadius: number,
  baseColor: string,
  tentacleColor: string,
  materialCache: Map<string, THREE.MeshStandardMaterial>,
): THREE.Group {
  const polyp = new THREE.Group();

  const polypBaseRadius = branchRadius * 1.55 * POLYP_SCALE;
  const polypBaseHeight = branchRadius * 1.1 * POLYP_SCALE;
  const polypBaseGeometry = new THREE.CylinderGeometry(
    polypBaseRadius * 0.92,
    polypBaseRadius,
    polypBaseHeight,
    16,
    1,
  );
  const polypBaseMaterial = getCachedMaterial(materialCache, baseColor, {
    emissive: baseColor,
    emissiveIntensity: 0.08,
  });

  const polypBase = new THREE.Mesh(polypBaseGeometry, polypBaseMaterial);
  polypBase.position.y = polypBaseHeight / 2;
  polyp.add(polypBase);

  const cupGeometry = new THREE.SphereGeometry(
    polypBaseRadius * 0.72,
    14,
    10,
    0,
    Math.PI * 2,
    0,
    Math.PI * 0.42,
  );
  const cup = new THREE.Mesh(cupGeometry, polypBaseMaterial);
  cup.position.y = polypBaseHeight * 0.92;
  polyp.add(cup);

  const tentacleHeight = branchRadius * 2.4 * POLYP_SCALE;
  const tentacleRadius = branchRadius * 0.28 * POLYP_SCALE;
  const tentacleGeom = new THREE.CylinderGeometry(
    tentacleRadius * 0.55,
    tentacleRadius,
    tentacleHeight,
    8,
    1,
  );
  const tentacleMat = getCachedMaterial(materialCache, tentacleColor, {
    emissive: tentacleColor,
    emissiveIntensity: 0.06,
  });

  const tentacleNum = 8;
  const ringRadius = branchRadius * 1.45 * POLYP_SCALE;
  const baseTilt = 0.62;

  for (let i = 0; i < tentacleNum; i++) {
    const angle = (i / tentacleNum) * Math.PI * 2;
    const tentacle = new THREE.Mesh(tentacleGeom, tentacleMat);

    tentacle.position.set(
      Math.cos(angle) * ringRadius,
      polypBaseHeight + tentacleHeight * 0.42,
      Math.sin(angle) * ringRadius,
    );
    tentacle.rotation.z = Math.sin(angle) * baseTilt;
    tentacle.rotation.x = -Math.cos(angle) * baseTilt;

    polyp.add(tentacle);
  }

  return polyp;
}

function buildBranchMaterial(color: string): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.58,
    metalness: 0.03,
    flatShading: false,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.06,
  });
}

export const coralV4: OrganismGenerator = (scene, data) => {
  const coral = new THREE.Group();
  scene.add(coral);

  const polypMaterialCache = new Map<string, THREE.MeshStandardMaterial>();
  const branchMaterials: THREE.MeshStandardMaterial[] = [];

  const posts = data.posts ?? [];

  // ========== Group posts by topic ==========
  // Each post can belong to multiple topics; it appears on every
  // topic branch it belongs to.
  const postsByTopic = new Map<string, OrganismPost[]>();
  for (const post of posts) {
    if (post.topics && post.topics.length > 0) {
      for (const topic of post.topics) {
        let arr = postsByTopic.get(topic);
        if (!arr) {
          arr = [];
          postsByTopic.set(topic, arr);
        }
        arr.push(post);
      }
    }
  }

  // Only render topics that have posts and exist in data.topics
  const topicEntries = data.topics
    .filter((t) => (postsByTopic.get(t.name)?.length ?? 0) > 0)
    .map((t) => ({ name: t.name, postVolume: t.postVolume }));

  const accountAgeDays = data.accountAgeDays ?? 0;

  const ageYears = accountAgeDays / 365;
  const trunkHeight = THREE.MathUtils.clamp(ageYears, 1, 8);

  // ========== 1. Trunk (staghorn-style base + soft tip) ==========
  const trunkRadiusTop = 0.14;
  const trunkRadiusBottom = 0.28;
  const trunkBaseGeometry = new THREE.CylinderGeometry(
    trunkRadiusTop * 1.05,
    trunkRadiusBottom,
    trunkHeight * 0.86,
    18,
    3,
  );
  const trunkMidGeometry = new THREE.CylinderGeometry(
    trunkRadiusTop,
    trunkRadiusTop * 1.12,
    trunkHeight * 0.14,
    16,
    1,
  );
  const trunkTipGeometry = new THREE.ConeGeometry(trunkRadiusTop * 0.95, trunkHeight * 0.18, 14);

  const trunkBaseMaterial = new THREE.MeshStandardMaterial({
    color: CORAL_TRUNK_BASE,
    roughness: 0.68,
    metalness: 0.02,
    flatShading: false,
  });
  const trunkMidMaterial = new THREE.MeshStandardMaterial({
    color: CORAL_TRUNK_MID,
    roughness: 0.62,
    metalness: 0.02,
    flatShading: false,
  });
  const trunkTipMaterial = new THREE.MeshStandardMaterial({
    color: CORAL_TRUNK_TIP,
    roughness: 0.55,
    metalness: 0.01,
    flatShading: false,
    emissive: new THREE.Color(CORAL_TRUNK_TIP),
    emissiveIntensity: 0.05,
  });

  const trunkBase = new THREE.Mesh(trunkBaseGeometry, trunkBaseMaterial);
  trunkBase.position.y = (trunkHeight * 0.86) / 2;
  coral.add(trunkBase);

  const trunkMid = new THREE.Mesh(trunkMidGeometry, trunkMidMaterial);
  trunkMid.position.y = trunkHeight * 0.86 + (trunkHeight * 0.14) / 2;
  coral.add(trunkMid);

  const trunkTip = new THREE.Mesh(trunkTipGeometry, trunkTipMaterial);
  trunkTip.position.y = trunkHeight + (trunkHeight * 0.18) / 2;
  coral.add(trunkTip);

  // ========== 2. Snaking branches: one per topic ==========
  const baseBranchLength = 1.0;
  const baseBranchRadius = 0.05;
  const baseBranchDepth = 2; // fork depth for the decorative twigs at each branch tip
  const MIN_POLYP_SPACING = 0.14; // world units reserved per polyp along a branch, keeps them from overlapping

  const maxVolume = Math.max(...topicEntries.map((t) => t.postVolume), 1);
  const topicCount = topicEntries.length;

  topicEntries.forEach((entry, index) => {
    const postsThisTopic = postsByTopic.get(entry.name) ?? [];
    const branchColor = CORAL_BRANCH_PALETTE[index % CORAL_BRANCH_PALETTE.length];
    const branchMaterial = buildBranchMaterial(branchColor);
    branchMaterials.push(branchMaterial);

    const t = (index + 1) / (topicCount + 1);
    const heightOnTrunk = t * trunkHeight;

    // place branch root somewhere up the trunk
    // distribute branches evenly around the trunk, with a slight spiral
    // so more-populous topics sit slightly higher
    const branchRoot = new THREE.Object3D();

    // Store the topic name so the 3D viewport click handler can find it
    // when the user clicks on any mesh in this branch.
    (branchRoot as any).userData.topicName = entry.name;

    // distribute branches around the trunk, with a little randomness so it
    // doesn't read as mechanically even, plus an outward tilt so branches
    // actually splay away from the trunk instead of standing parallel to it
    const baseAngle = index * (Math.PI * 2 / Math.max(topicCount, 1));
    const branchAzimuth = baseAngle + (Math.random() - 0.5) * 0.4;
    branchRoot.rotation.y = branchAzimuth;
    branchRoot.rotateZ(-(0.35 + Math.random() * 0.3));

    // Start the branch's origin at the trunk's actual surface (in the same
    // horizontal direction it's about to grow toward), not on the trunk's
    // central axis. branchRoot previously sat at (0, heightOnTrunk, 0) —
    // right on the centerline, which is inside the trunk's solid volume
    // since the trunk has real radius there — so anything sampled near the
    // start of the curve (including the first few polyps) was still close
    // enough to the axis to clip through the trunk mesh.
    const trunkRadiusHere = THREE.MathUtils.lerp(
      trunkRadiusBottom,
      trunkRadiusTop,
      THREE.MathUtils.clamp(heightOnTrunk / trunkHeight, 0, 1),
    );
    branchRoot.position.set(
      Math.cos(branchAzimuth) * trunkRadiusHere,
      heightOnTrunk,
      Math.sin(branchAzimuth) * trunkRadiusHere,
    );

    // Bug: this used to be `trunk.add(branchRoot)`. `trunk`'s own local
    // origin is its geometric center (CylinderGeometry is centered by
    // default), not its base — trunk.position.y just says where that
    // center sits inside `coral`. A child added to `trunk` therefore lands
    // at trunkHeight/2 + heightOnTrunk in global terms, not heightOnTrunk
    // as intended, so branches ended up anywhere from mid-trunk to well
    // above the trunk's actual tip (floating, disconnected) depending on
    // t. Parenting to `coral` instead makes heightOnTrunk measure straight
    // up from the true base (global y = 0), which is what it was meant to.
    coral.add(branchRoot);

    // scale branch length by topic post volume, but also make sure
    // there's physically enough room for every polyp: each one occupies
    // roughly MIN_POLYP_SPACING of branch length
    const postCount = postsThisTopic.length;
    const volumeFactor = Math.max(0.5, entry.postVolume / maxVolume);
    const idealLength = Math.max(
      baseBranchLength * volumeFactor,
      postCount * MIN_POLYP_SPACING,
    );

    // soft cap: below this, branches grow linearly with post count so spacing
    // is always respected. Beyond it, growth tapers off (sqrt) instead of
    // hard-clamping.
    const SOFT_CAP_LENGTH = 4;
    const branchLength =
      idealLength <= SOFT_CAP_LENGTH
        ? idealLength
        : SOFT_CAP_LENGTH + Math.sqrt(idealLength - SOFT_CAP_LENGTH);

    // mesh segment count: kept modest for performance/visual smoothness only.
    const stemSegments = THREE.MathUtils.clamp(
      Math.round(branchLength / 0.3),
      3,
      10,
    );
    const { tip, sampleAt } = makeSnakeStem(
      branchRoot,
      branchLength,
      baseBranchRadius,
      baseBranchRadius * 0.55,
      branchMaterial,
      { segments: stemSegments, wobble: 0.35 },
    );

    // decorative forking twigs sprouting from the stem's tip
    makeBranch(
      tip,
      branchLength * 0.5,
      baseBranchRadius * 0.55,
      baseBranchDepth,
      branchMaterial,
    );

    // ========== 3. Polyps along this branch (sampled for clarity) ==========
    const displayPosts = pickDisplayPosts(postsThisTopic, MAX_POLYPS_PER_BRANCH);
    displayPosts.forEach((post, postIndex) => {
      const postT = (postIndex + 1) / (displayPosts.length + 1);
      const sample = sampleAt(postT);

      const sentiment = getSentiment(post);
      const category = getCategory(post);
      const baseColor = blendHex(CORAL_POLYP_BASE, SENTIMENT_COLORS[sentiment], 0.38);
      const tentacleColor = blendHex(branchColor, CATEGORY_COLORS[category], 0.45);

      const polyp = buildPolyp(sample.radius, baseColor, tentacleColor, polypMaterialCache);

      const azimuth = (postIndex / displayPosts.length) * Math.PI * 2 + Math.random() * 0.35;
      const outwardTilt = 0.55 + Math.random() * 0.35;

      const offset = new THREE.Object3D();
      offset.position.copy(sample.position);
      offset.quaternion.copy(sample.quaternion);
      offset.rotateY(azimuth);
      offset.rotateZ(-outwardTilt);
      branchRoot.add(offset);

      offset.translateY(sample.radius * 1.05);
      offset.add(polyp);
    });

    // Small nodules between polyps for a more organic branch surface.
    const noduleCount = Math.min(10, Math.max(3, Math.round(branchLength * 2)));
    for (let n = 0; n < noduleCount; n += 1) {
      const noduleT = (n + 0.5) / noduleCount;
      const sample = sampleAt(noduleT);
      const noduleRadius = sample.radius * (0.55 + Math.random() * 0.35);
      const nodule = new THREE.Mesh(
        new THREE.SphereGeometry(noduleRadius, 8, 8),
        branchMaterial,
      );
      const azimuth = Math.random() * Math.PI * 2;
      const offset = new THREE.Object3D();
      offset.position.copy(sample.position);
      offset.quaternion.copy(sample.quaternion);
      offset.rotateY(azimuth);
      offset.rotateZ(-(0.35 + Math.random() * 0.25));
      branchRoot.add(offset);
      offset.translateY(sample.radius * 0.92);
      offset.add(nodule);
    }
  });

  // ========== 4. Cleanup ==========
  const cleanup = () => {
    scene.remove(coral);
    const materials = new Set<THREE.Material>([
      trunkBaseMaterial,
      trunkMidMaterial,
      trunkTipMaterial,
      ...branchMaterials,
      ...polypMaterialCache.values(),
    ]);

    coral.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry.dispose();
      }
    });

    materials.forEach((material) => material.dispose());
  };

  return { coral, cleanup };
};