import * as THREE from "three";
import type { OrganismGenerator } from "../organismTypes";
import { getTopicSentimentColor } from "./organismColors";
import {
  disposeCoralGroup,
  growRecursiveBranch,
  makeBranchMaterial,
} from "./coralBranchUtils";

const TRUNK_COLOR = "#b8877f";

/**
 * Pipeline mapping:
 * - Trunk (stem) = account history length (`accountAgeDays`)
 * - Each branch = one NLP topic (top by post volume)
 * - Branch thickness = `postVolume`
 * - Branch color = mean topic sentiment (green / gold / red)
 */
export const coralSilhouette: OrganismGenerator = (scene, data) => {
  const coral = new THREE.Group();
  coral.userData.accountAgeDays = data.accountAgeDays ?? 0;
  scene.add(coral);

  const ageYears = THREE.MathUtils.clamp((data.accountAgeDays ?? 0) / 365, 1, 8);
  const trunkHeight = THREE.MathUtils.lerp(0.9, 2.2, (ageYears - 1) / 7);
  const trunkRadius = THREE.MathUtils.lerp(0.14, 0.22, (ageYears - 1) / 7);

  const trunkMat = makeBranchMaterial({ color: TRUNK_COLOR, emissiveIntensity: 0.04 });
  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(trunkRadius * 0.75, trunkRadius, trunkHeight, 12, 2),
    trunkMat,
  );
  trunk.position.y = trunkHeight / 2;
  trunk.userData.coralRole = "trunk";
  coral.add(trunk);

  const trunkCap = new THREE.Mesh(
    new THREE.SphereGeometry(trunkRadius * 0.8, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.5),
    trunkMat,
  );
  trunkCap.position.y = trunkHeight;
  trunkCap.userData.coralRole = "trunk";
  coral.add(trunkCap);

  const topics = data.topics.length
    ? data.topics
    : [{ name: "general", postVolume: 20, sentiment: 0 }];

  const maxVol = Math.max(...topics.map((t) => t.postVolume), 1);

  topics.forEach((topic, index) => {
    const pivot = new THREE.Object3D();
    pivot.userData.coralRole = "topic";
    pivot.userData.topicName = topic.name;
    pivot.userData.postVolume = topic.postVolume;
    pivot.userData.sentiment = topic.sentiment;

    const fanSpread = Math.PI * 0.85;
    const angle = -fanSpread / 2 + (index / Math.max(topics.length - 1, 1)) * fanSpread;
    const volumeFactor = Math.max(0.45, topic.postVolume / maxVol);

    pivot.position.set(
      Math.cos(angle) * trunkRadius * 0.35,
      trunkHeight * (0.55 + index * 0.06),
      Math.sin(angle) * trunkRadius * 0.2,
    );
    pivot.rotation.y = angle + (Math.PI / 2) * 0.15;
    pivot.rotateZ(-(0.25 + volumeFactor * 0.35));

    const branchColor = getTopicSentimentColor(topic.sentiment);
    const material = makeBranchMaterial({ color: branchColor, emissiveIntensity: 0.1 });

    const depth = THREE.MathUtils.clamp(Math.round(2 + volumeFactor * 3), 3, 5);
    const length = THREE.MathUtils.clamp(0.7 + volumeFactor * 1.1, 0.75, 1.85);
    const radius = THREE.MathUtils.clamp(topic.postVolume / 220, 0.06, 0.14);

    growRecursiveBranch(pivot, {
      length,
      radius,
      depth,
      material,
      fanBias: 0.7,
      seed: index * 9_871 + 42,
    });

    coral.add(pivot);
  });

  return {
    coral,
    cleanup: () => disposeCoralGroup(coral, scene),
  };
};
