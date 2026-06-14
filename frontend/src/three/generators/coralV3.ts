import * as THREE from "three";
import type { OrganismGenerator } from "../organismTypes";

export const coralV3: OrganismGenerator = (scene, data) => {
  const coral = new THREE.Group();
  scene.add(coral);

const polypBaseHeight = 0.25;
const tentacleHeight = 0.3;
const polypBodyColor = "#ffd5f2";  // light pastel pink
const tentacleColor = "#f97316";

const tentacleNum = 8;
const ringRadius = 0.16;
const tilt = 0.5; // tilt of the tentacle


const polypBaseGeometry = new THREE.CylinderGeometry(
    0.3,
    0.3,
    polypBaseHeight,
    40,
    10,
);

const polypBaseMaterial = new THREE.MeshStandardMaterial({
  color: polypBodyColor,
  roughness: 0.7,
  metalness: 0.0,
  flatShading: true,
});

const polypBase = new THREE.Mesh(polypBaseGeometry, polypBaseMaterial);
polypBase.position.y = polypBaseHeight / 2;
coral.add(polypBase);

//const polypMouthGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.01);

const tentacleGeometry = new THREE.CylinderGeometry(0.05, 0.05, tentacleHeight);
const tentacleMat = new THREE.MeshStandardMaterial({
  color: tentacleColor,
  roughness: 0.7,
  metalness: 0.0,
  flatShading: true,

})

for (let i=0; i< tentacleNum; i++){
  const angle = (i / tentacleNum) * Math.PI * 2;
  const tentacle = new THREE.Mesh(tentacleGeometry, tentacleMat);

  tentacle.position.set(
    Math.cos(angle) * ringRadius,
    polypBaseHeight + tentacleHeight / 2, // sitting on top of body/disk
    Math.sin(angle) * ringRadius
    );

    coral.add(tentacle);

  tentacle.rotation.z = Math.sin(angle) * tilt;
  tentacle.rotation.x = -Math.cos(angle) * tilt;
}

  // cleanup for this organism
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




}
