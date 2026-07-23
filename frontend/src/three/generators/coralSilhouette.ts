import * as THREE from "three";
import type { OrganismGenerator } from "../organismTypes";
import { coralSentimentColor, coralStemColors, coralTopicTint } from "./coralPalette";
import {
  addBranchCollar,
  buildSentimentGradientMaterials,
  collectBranchAnchors,
  disposeCoralGroup,
  growRecursiveBranch,
  makeBranchMaterial,
  type BranchAnchor,
} from "./coralBranchUtils";
import {
  groupPostsByTopic,
  placePolypsOnBranch,
} from "./coralPolyps";
import { branchRadiusBoostFromAvgEngagement } from "./coralEngagement";

/**
 * Illustrated fan coral: warm orange-red, bushy rounded branches, content dots only.
 */
export const coralSilhouette: OrganismGenerator = (scene, data) => {
  const coral = new THREE.Group();
  coral.userData.accountAgeDays = data.accountAgeDays ?? 0;
  scene.add(coral);

  if (!data.topics.length && !(data.posts?.length ?? 0)) {
    return {
      coral,
      cleanup: () => disposeCoralGroup(coral, scene),
    };
  }

  const polypMaterialCache = new Map<string, THREE.MeshStandardMaterial>();
  const branchMaterials: THREE.MeshStandardMaterial[] = [];
  const trunkMaterials: THREE.MeshStandardMaterial[] = [];
  const postsByTopic = groupPostsByTopic(data.posts ?? []);
  const stemColors = coralStemColors();

  const ageYears = THREE.MathUtils.clamp((data.accountAgeDays ?? 0) / 365, 1, 8);
  const baseScale = THREE.MathUtils.lerp(0.85, 1.25, (ageYears - 1) / 7);
  const baseRadius = THREE.MathUtils.lerp(0.16, 0.24, (ageYears - 1) / 7) * baseScale;

  const baseMat = makeBranchMaterial({
    color: stemColors.dark,
    roughness: 0.82,
    emissiveIntensity: 0.04,
  });
  const base = new THREE.Mesh(
    new THREE.SphereGeometry(baseRadius, 16, 14, 0, Math.PI * 2, 0, Math.PI * 0.55),
    baseMat,
  );
  base.position.y = baseRadius * 0.42;
  base.scale.set(1.1, 0.75, 1.05);
  base.userData.coralRole = "trunk";
  coral.add(base);
  trunkMaterials.push(baseMat);

  const stemMat = makeBranchMaterial({
    color: stemColors.base,
    roughness: 0.8,
    emissiveIntensity: 0.06,
  });
  const stemHeight = baseRadius * 1.6;
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(baseRadius * 0.55, baseRadius * 0.85, stemHeight, 14, 2),
    stemMat,
  );
  stem.position.y = baseRadius * 0.55 + stemHeight * 0.5;
  stem.userData.coralRole = "trunk";
  coral.add(stem);
  trunkMaterials.push(stemMat);

  const stemCap = new THREE.Mesh(
    new THREE.SphereGeometry(baseRadius * 0.62, 12, 10),
    makeBranchMaterial({ color: stemColors.light, emissiveIntensity: 0.08 }),
  );
  stemCap.position.y = baseRadius * 0.55 + stemHeight;
  stemCap.userData.coralRole = "trunk";
  coral.add(stemCap);
  trunkMaterials.push(stemCap.material as THREE.MeshStandardMaterial);

  const topics = data.topics;

  const displayTopics = topics.length
    ? topics
    : [{ name: "general", postVolume: 20, sentiment: 0 }];

  const maxVol = Math.max(...displayTopics.map((t) => t.postVolume), 1);
  const maxAvgEngagement = Math.max(
    ...displayTopics.map((t) => t.avgEngagement ?? 0),
    0,
  );
  const stemTop = baseRadius * 0.55 + stemHeight;

  displayTopics.forEach((topic, index) => {
    const pivot = new THREE.Object3D();
    pivot.userData.coralRole = "topic";
    pivot.userData.topicName = topic.name;
    pivot.userData.postVolume = topic.postVolume;
    pivot.userData.sentiment = topic.sentiment;
    pivot.userData.avgEngagement = topic.avgEngagement ?? null;
    pivot.userData.commentVolume = topic.commentVolume ?? 0;
    const baseRadiusForTopic = THREE.MathUtils.clamp(topic.postVolume / 200, 0.07, 0.13);
    pivot.userData.branchRadius = baseRadiusForTopic;

    const fanSpread = Math.PI * 0.95;
    const angle =
      displayTopics.length === 1
        ? 0
        : -fanSpread / 2 + (index / (displayTopics.length - 1)) * fanSpread;
    const volumeFactor = Math.max(0.5, topic.postVolume / maxVol);

    pivot.position.set(
      Math.cos(angle) * baseRadius * 0.15,
      stemTop - 0.02,
      Math.sin(angle) * baseRadius * 0.12,
    );
    pivot.rotation.y = angle + (Math.PI / 2) * 0.08;
    pivot.rotateZ(-(0.38 + volumeFactor * 0.28));
    pivot.rotateX((index - 1) * 0.08);

    const branchColor = coralTopicTint(index, coralSentimentColor(topic.sentiment));
    const postsThisTopic = postsByTopic.get(topic.name) ?? [];
    const depth = THREE.MathUtils.clamp(Math.round(2 + volumeFactor * 3), 4, 6);
    const length = THREE.MathUtils.clamp(0.65 + volumeFactor * 1.05, 0.7, 1.75);
    const radius =
      THREE.MathUtils.clamp(topic.postVolume / 200, 0.07, 0.13) *
      baseScale *
      branchRadiusBoostFromAvgEngagement(topic.avgEngagement, maxAvgEngagement);

    const gradientMaterials = buildSentimentGradientMaterials(
      postsThisTopic,
      depth,
      branchColor,
    );
    branchMaterials.push(...gradientMaterials);

    const collarMat = gradientMaterials[0] ?? makeBranchMaterial({ color: branchColor });
    addBranchCollar(pivot, radius * 1.1, collarMat);

    const spinePoints: BranchAnchor[] = [];
    pivot.userData.spinePoints = spinePoints;

    growRecursiveBranch(pivot, {
      length,
      radius,
      depth,
      material: collarMat,
      materials: gradientMaterials,
      maxDepth: depth,
      fanBias: 0.85,
      volumeFactor,
      seed: index * 9_871 + 42,
      spinePoints,
      spineParent: pivot,
    });

    const anchors = collectBranchAnchors(pivot);
    placePolypsOnBranch(
      pivot,
      anchors,
      spinePoints,
      postsThisTopic,
      polypMaterialCache,
      index * 9_871 + 42,
    );

    coral.add(pivot);
  });

  return {
    coral,
    cleanup: () =>
      disposeCoralGroup(coral, scene, [
        ...trunkMaterials,
        ...branchMaterials,
        ...polypMaterialCache.values(),
      ]),
  };
};
