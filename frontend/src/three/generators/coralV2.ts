import * as THREE from "three";
import type { OrganismGenerator } from "../organismTypes";

export const coralV2: OrganismGenerator = (scene, data) => {
  const coral = new THREE.Group();
  scene.add(coral);

  const heightScale = THREE.MathUtils.clamp(data.accountAgeDays / 1240, 0.7, 1.35);
  const trunkHeight = 5.2 * heightScale;
  const tipHeight = 1.4 * heightScale;
  const topicCount = Math.max(data.topics.length, 1);

  const trunkBaseGeometry = new THREE.CylinderGeometry(
    0.22,
    0.5,
    trunkHeight,
    7,
    8,
  );

  const trunkBaseMaterial = new THREE.MeshStandardMaterial({
    color: "#54d6c5",
    roughness: 0.42,
    metalness: 0.04,
    flatShading: true,
  });

  const trunkBase = new THREE.Mesh(trunkBaseGeometry, trunkBaseMaterial);
  trunkBase.position.y = trunkHeight / 2;
  coral.add(trunkBase);

  const trunkTipGeometry = new THREE.ConeGeometry(0.28, tipHeight, 7);
  const trunkTipMaterial = new THREE.MeshStandardMaterial({
    color: "#f7b267",
    roughness: 0.35,
    metalness: 0.0,
    flatShading: true,
  });

  const trunkTip = new THREE.Mesh(trunkTipGeometry, trunkTipMaterial);
  trunkTip.position.y = trunkHeight + tipHeight / 2;
  coral.add(trunkTip);

  data.topics.forEach((topic, index) => {
    const angle = (index / topicCount) * Math.PI * 2;
    const branchLength = THREE.MathUtils.clamp(topic.postVolume / 45, 0.6, 1.8);
    const branchRadius = THREE.MathUtils.clamp(topic.postVolume / 260, 0.08, 0.22);
    const branchGeometry = new THREE.CylinderGeometry(
      branchRadius * 0.45,
      branchRadius,
      branchLength,
      8,
    );
    const branchMaterial = new THREE.MeshStandardMaterial({
      color: topic.sentiment >= 0 ? "#7ddf64" : "#8aa7ff",
      roughness: 0.5,
      metalness: 0.0,
      flatShading: true,
    });

    const branch = new THREE.Mesh(branchGeometry, branchMaterial);
    branch.position.set(
      Math.cos(angle) * 0.55,
      trunkHeight * (0.35 + index * 0.18),
      Math.sin(angle) * 0.55,
    );
    branch.rotation.z = Math.PI / 2.9;
    branch.rotation.y = -angle;
    coral.add(branch);
  });

  const cleanup = () => {
    scene.remove(coral);

    coral.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      }
    });
  };

  return { coral, cleanup };
};
