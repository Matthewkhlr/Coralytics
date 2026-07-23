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
const ringRadius = 0.25;
const baseTilt = 0.5; // "open" angle at rest


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

// const tentacles: { mesh: THREE.Mesh; angle: number }[] = [];
// for (let i=0; i< tentacleNum; i++){
//   const angle = (i / tentacleNum) * Math.PI * 2;
//   const tentacle = new THREE.Mesh(tentacleGeometry, tentacleMat);

//   tentacle.position.set(
//     Math.cos(angle) * ringRadius,
//     polypBaseHeight + tentacleHeight / 2, // sitting on top of body/disk
//     Math.sin(angle) * ringRadius
//     );

//     //initial open pose
//     tentacle.rotation.z = Math.sin(angle) * baseTilt;
//     tentacle.rotation.x = -Math.cos(angle) * baseTilt;

//     coral.add(tentacle);
//     tentacles.push({ mesh: tentacle, angle});

// }

//   //store for animation loop
//   (coral as any).userData.tentacles = tentacles;
//   (coral as any).userData.baseTilt = baseTilt;
  const tentacleGeometries: THREE.BufferGeometry[] = [];
  const tentacleData: {
    geometry: THREE.BufferGeometry;
    original: Float32Array;
    angle: number;
  }[] = [];

  for (let i = 0; i<tentacleNum; i++) {
    const angle = (i/tentacleNum) * Math.PI * 2;

    //unique geometry per tentacle
    const geom = new THREE.CylinderGeometry(0.05, 0.05, tentacleHeight, 16, 32);
    geom.toNonIndexed();

    const pos = geom.attributes.position as THREE.BufferAttribute;
    const original = new Float32Array(pos.array.length);
    original.set(pos.array); //store original positions

    const tentacle = new THREE.Mesh(geom, tentacleMat)

    tentacle.position.set(
      Math.cos(angle) * ringRadius,
      polypBaseHeight + tentacleHeight / 2,
      Math.sin(angle) * ringRadius,
    );

    //start straight
    coral.add(tentacle);

    tentacleGeometries.push(geom);
    tentacleData.push({ geometry:geom, original, angle});


  }

  //store for animation loop
  (coral as any).userData.tentacleData = tentacleData;
  (coral as any).userData.tentacleHeight = tentacleHeight

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
