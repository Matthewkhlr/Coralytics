import * as THREE from "three";
import type { OrganismGenerator, OrganismPost } from "../organismTypes";

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
  material: THREE.Material
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
  options: { segments?: number; wobble?: number } = {}
): {
  tip: THREE.Object3D;
  sampleAt: (t: number) => { position: THREE.Vector3; quaternion: THREE.Quaternion; radius: number };
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

  // persistent drift direction so the stem curves smoothly in a general
  // direction rather than jittering back and forth every segment
  let driftAzimuth = Math.random() * Math.PI * 2;

  for (let i = 0; i < segments; i++) {
    const tStart = i / segments;
    const tEnd = (i + 1) / segments;
    const segRadiusBottom = THREE.MathUtils.lerp(radiusStart, radiusEnd, tStart);
    const segRadiusTop = THREE.MathUtils.lerp(radiusStart, radiusEnd, tEnd);

    const pivot = new THREE.Object3D();

    // small incremental bend: mostly keep going the same way, with a slight
    // upward-biased wobble so the stem still generally reaches outward/up
    driftAzimuth += (Math.random() - 0.5) * 0.5;
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

    const geometry = new THREE.CylinderGeometry(segRadiusTop, segRadiusBottom, segLength, 6, 1);
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
        const localT = rec.length > 0
          ? THREE.MathUtils.clamp((targetLength - acc) / rec.length, 0, 1)
          : 0;
        const dir = new THREE.Vector3(0, 1, 0).applyQuaternion(rec.quat);
        const position = rec.startPos.clone().addScaledVector(dir, localT * rec.length);
        const radius = THREE.MathUtils.lerp(rec.radiusStart, rec.radiusEnd, localT);
        return { position, quaternion: rec.quat.clone(), radius };
      }

      acc += rec.length;
    }

    // totalLength === 0 edge case
    return { position: new THREE.Vector3(), quaternion: new THREE.Quaternion(), radius: radiusStart };
  };

  return { tip: current, sampleAt };
}

// Builds one small polyp (base + ring of static tentacles), sized relative
// to the branch radius it's growing from so it reads as a small bump on the
// branch rather than a fixed-size bead threaded through it.
const POLYP_SCALE = 0.55; // turn down for more minimal/subtle polyps, up for chunkier ones

function buildPolyp(branchRadius: number): THREE.Group {
  const polyp = new THREE.Group();

  const polypBaseRadius = branchRadius * 1.3 * POLYP_SCALE;
  const polypBaseHeight = branchRadius * 2.2 * POLYP_SCALE;
  const polypBaseGeometry = new THREE.CylinderGeometry(polypBaseRadius, polypBaseRadius, polypBaseHeight, 12, 1);
  const polypBaseMaterial = new THREE.MeshStandardMaterial({
    color: "#ffd5f2",
    roughness: 0.7,
    metalness: 0.0,
    flatShading: true,
  });

  const polypBase = new THREE.Mesh(polypBaseGeometry, polypBaseMaterial);
  polypBase.position.y = polypBaseHeight / 2;
  polyp.add(polypBase);

  const tentacleHeight = branchRadius * 3 * POLYP_SCALE;
  const tentacleRadius = branchRadius * 0.4 * POLYP_SCALE;
  const tentacleGeom = new THREE.CylinderGeometry(tentacleRadius, tentacleRadius, tentacleHeight, 6, 1);
  const tentacleMat = new THREE.MeshStandardMaterial({
    color: "#f97316",
    roughness: 0.7,
    metalness: 0.0,
    flatShading: true,
  });

  const tentacleNum = 6;
  const ringRadius = branchRadius * 1.8 * POLYP_SCALE;
  const baseTilt = 0.5;

  for (let i = 0; i < tentacleNum; i++) {
    const angle = (i / tentacleNum) * Math.PI * 2;
    const tentacle = new THREE.Mesh(tentacleGeom, tentacleMat);

    tentacle.position.set(
      Math.cos(angle) * ringRadius,
      polypBaseHeight + tentacleHeight / 2,
      Math.sin(angle) * ringRadius,
    );

    tentacle.rotation.z = Math.sin(angle) * baseTilt;
    tentacle.rotation.x = -Math.cos(angle) * baseTilt;

    polyp.add(tentacle);
  }

  return polyp;
}

export const coralV4: OrganismGenerator = (scene, data) => {
  const coral = new THREE.Group();
  scene.add(coral);

  const posts = data.posts ?? [];
  const accountAgeDays = data.accountAgeDays ?? 0;

  // trunk height based on account age (1–8 units)
  const ageYears = accountAgeDays / 365;
  const trunkHeight = THREE.MathUtils.clamp(ageYears, 1, 8);

  // group posts by year
  const postsByYear = new Map<number, OrganismPost[]>();

  for (const post of posts) {
    const createdAt = post.created_at ? new Date(post.created_at) : null;
    const year =
      createdAt && !Number.isNaN(createdAt.getTime())
        ? createdAt.getFullYear()
        : 0;

    const yearPosts = postsByYear.get(year) ?? [];
    yearPosts.push(post);
    postsByYear.set(year, yearPosts);
  }

  const years = [...postsByYear.keys()]
    .filter(year => year !== 0)
    .sort((a, b) => a - b);

  // ========== 1. Trunk ==========
  const trunkGeometry = new THREE.CylinderGeometry(
    0.15,          // radiusTop
    0.25,          // radiusBottom
    trunkHeight,
    16,
    1,
  );

  const trunkMaterial = new THREE.MeshStandardMaterial({
    color: "#ffadff",
    roughness: 0.6,
    metalness: 0.0,
    flatShading: true,
  });

  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.y = trunkHeight / 2; // base at y = 0
  coral.add(trunk);

  // ========== 2. Snaking branches: one per year ==========
  const branchMaterial = new THREE.MeshStandardMaterial({
    color: "#ff3ba8",
    roughness: 0.7,
    metalness: 0.0,
    flatShading: true,
  });

  const baseBranchLength = 1.0;
  const baseBranchRadius = 0.05;
  const baseBranchDepth = 2; // fork depth for the decorative twigs at each branch tip
  const MIN_POLYP_SPACING = 0.14; // world units reserved per polyp along a branch, keeps them from overlapping

  years.forEach((year, index) => {
    const postsThisYear = postsByYear.get(year) ?? [];

    // place branch root somewhere up the trunk
    const t = (index + 1) / (years.length + 1); // 0..1
    const heightOnTrunk = t * trunkHeight;

    const branchRoot = new THREE.Object3D();
    branchRoot.position.y = heightOnTrunk;

    // distribute branches around the trunk, with a little randomness so it
    // doesn't read as mechanically even, plus an outward tilt so branches
    // actually splay away from the trunk instead of standing parallel to it
    const baseAngle = index * (Math.PI * 2 / Math.max(years.length, 1));
    branchRoot.rotation.y = baseAngle + (Math.random() - 0.5) * 0.4;
    branchRoot.rotateZ(-(0.35 + Math.random() * 0.3));

    trunk.add(branchRoot);

    // optionally scale branch length by number of posts, but also make sure
    // there's physically enough room for every polyp: each one occupies
    // roughly MIN_POLYP_SPACING of branch length, so a prolific year gets a
    // longer branch instead of packing polyps on top of each other
    const postCount = postsThisYear.length;
    const volumeFactor = THREE.MathUtils.clamp(postCount / 20, 0.5, 1.5);
    const idealLength = Math.max(baseBranchLength * volumeFactor, postCount * MIN_POLYP_SPACING);
    // soft cap: below this, branches grow linearly with post count so spacing
    // is always respected. Beyond it, growth tapers off (sqrt) instead of
    // hard-clamping, so an extremely prolific year still gets a longer
    // branch rather than being squeezed back down to a fixed size — that's
    // what caused polyps to blanket a branch like fur when it was clamped
    // against the (possibly short) trunk height instead.
    const SOFT_CAP_LENGTH = 4;
    const branchLength = idealLength <= SOFT_CAP_LENGTH
      ? idealLength
      : SOFT_CAP_LENGTH + Math.sqrt(idealLength - SOFT_CAP_LENGTH);

    // mesh segment count: kept modest for performance/visual smoothness only.
    // This is now fully decoupled from post count — polyp placement below
    // uses a continuous sample of the curve, not these segments, so a year
    // with hundreds of posts still gets unique, evenly spaced positions
    // instead of stacking onto a limited set of mesh joints.
    const stemSegments = THREE.MathUtils.clamp(Math.round(branchLength / 0.3), 3, 10);
    const { tip, sampleAt } = makeSnakeStem(
      branchRoot,
      branchLength,
      baseBranchRadius,
      baseBranchRadius * 0.55,
      branchMaterial,
      { segments: stemSegments, wobble: 0.35 },
    );

    // decorative forking twigs sprouting from the stem's tip
    makeBranch(tip, branchLength * 0.5, baseBranchRadius * 0.55, baseBranchDepth, branchMaterial);

    // ========== 3. Polyps along this branch: one per post ==========
    // Sample the exact position/orientation on the curved stem for this
    // post's t value — a continuous function, so every post gets its own
    // unique spot no matter how many posts there are. Each polyp is rotated
    // to point outward from the branch's own axis (a random azimuth around
    // it, then tilted ~65-100° away from the branch's direction) and pushed
    // out to the branch's local surface radius, so they read as growths
    // sprouting from the side rather than beads threaded along the length.
    postsThisYear.forEach((post, postIndex) => {
      const postT = (postIndex + 1) / (postsThisYear.length + 1); // 0..1
      const sample = sampleAt(postT);

      const polyp = buildPolyp(sample.radius);

      const azimuth = Math.random() * Math.PI * 2;
      const outwardTilt = 1.15 + Math.random() * 0.55; // ~66-97 degrees off the branch axis

      const offset = new THREE.Object3D();
      offset.position.copy(sample.position);
      offset.quaternion.copy(sample.quaternion);
      offset.rotateY(azimuth);
      offset.rotateZ(-outwardTilt);
      branchRoot.add(offset);

      // push the polyp's origin out to the branch surface along its own
      // (now outward-pointing) local axis
      offset.translateY(sample.radius);

      offset.add(polyp);
    });
  });

  // ========== 4. Cleanup ==========
  const cleanup = () => {
    scene.remove(coral);
    coral.traverse(obj => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
  };

  return { coral, cleanup };
};