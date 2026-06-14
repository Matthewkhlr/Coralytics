import * as THREE from "three";
import type { OrganismGenerator } from "../organismTypes";

export const coralV1: OrganismGenerator = (scene, data) => {
  const coral = new THREE.Group();
  scene.add(coral);

  const trunk = new THREE.Group();
  const heightScale = THREE.MathUtils.clamp(data.accountAgeDays / 1240, 0.6, 1.4);
  const trunkHeight = 6.0 * heightScale;
  const tipHeight = 2.0 * heightScale;

  const trunkBaseGeometry = new THREE.CylinderGeometry(
    0.3,
    0.4,
    trunkHeight,
    12,
    10,
  );

  const trunkBaseMaterial = new THREE.MeshStandardMaterial({
    color: "#ffadff",
    roughness: 0.5,
    metalness: 0.0,
    flatShading: true,
  });

  const trunkBase = new THREE.Mesh(trunkBaseGeometry, trunkBaseMaterial);
  trunkBase.position.y = trunkHeight / 2;
  trunk.add(trunkBase);

  const trunkTipGeometry = new THREE.CylinderGeometry(0, 0.3, tipHeight, 32);

  const trunkTipMaterial = new THREE.MeshStandardMaterial({
    color: "#ffadff",
    roughness: 0.3,
    metalness: 0.0,
  });

  const trunkTip = new THREE.Mesh(trunkTipGeometry, trunkTipMaterial);
  trunkTip.position.y = trunkHeight + tipHeight / 2;
  trunk.add(trunkTip);

  coral.add(trunk);
  coral.position.y = 0;

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
