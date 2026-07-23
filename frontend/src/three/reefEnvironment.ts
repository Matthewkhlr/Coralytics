import * as THREE from "three";
import {
  DEFAULT_REEF_THEME,
  resolveReefVisuals,
  type ReefThemeSettings,
} from "@/lib/reefTheme";

export type ReefEnvironmentHandle = {
  group: THREE.Group;
  update: (elapsedSeconds: number) => void;
  applyTheme: (theme: ReefThemeSettings, isDark: boolean) => void;
  dispose: () => void;
};

type FishState = {
  root: THREE.Group;
  tail: THREE.Group;
  base: THREE.Vector3;
  speed: number;
  phase: number;
  swimRadius: number;
  scale: number;
  lastX: number;
};

function disposeMesh(mesh: THREE.Mesh) {
  mesh.geometry.dispose();
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((material) => material.dispose());
  } else {
    mesh.material.dispose();
  }
}

function disposeObject(root: THREE.Object3D) {
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) disposeMesh(child);
  });
}

const ROCK_CHUNKS: Array<{
  radius: number;
  x: number;
  y: number;
  z: number;
  scale: number;
  rotX: number;
  rotY: number;
  rotZ: number;
}> = [
  { radius: 0.42, x: 0, y: 0.12, z: 0.05, scale: 1, rotX: 0.18, rotY: 1.24, rotZ: 0.11 },
  { radius: 0.28, x: 0.32, y: 0.06, z: -0.12, scale: 1, rotX: 0.31, rotY: 2.45, rotZ: 0.08 },
  { radius: 0.22, x: -0.28, y: 0.04, z: 0.1, scale: 1, rotX: 0.22, rotY: 0.67, rotZ: 0.19 },
];

function buildRock(color: string): { group: THREE.Group; material: THREE.MeshStandardMaterial } {
  const rock = new THREE.Group();
  rock.name = "reefRock";
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.95,
    metalness: 0,
  });

  for (const chunk of ROCK_CHUNKS) {
    const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(chunk.radius, 0), material);
    mesh.position.set(chunk.x, chunk.y, chunk.z);
    mesh.scale.setScalar(chunk.scale);
    mesh.rotation.set(chunk.rotX, chunk.rotY, chunk.rotZ);
    mesh.raycast = () => null;
    rock.add(mesh);
  }

  rock.raycast = () => null;
  return { group: rock, material };
}

function createFishMaterials(color: string) {
  const body = new THREE.MeshStandardMaterial({
    color,
    transparent: true,
    opacity: 0.68,
    roughness: 0.42,
    metalness: 0.04,
  });
  const belly = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color).lerp(new THREE.Color("#ffffff"), 0.38),
    transparent: true,
    opacity: 0.55,
    roughness: 0.5,
    metalness: 0,
  });
  const eye = new THREE.MeshBasicMaterial({ color: "#081420" });
  return { body, belly, eye };
}

function createFishModel(materials: ReturnType<typeof createFishMaterials>): THREE.Group {
  const fish = new THREE.Group();
  fish.name = "reefFishModel";

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 8), materials.body);
  body.scale.set(2.6, 0.9, 1.05);
  body.position.set(0.04, 0, 0);
  body.raycast = () => null;
  fish.add(body);

  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), materials.belly);
  belly.scale.set(2.0, 0.55, 0.9);
  belly.position.set(0.065, -0.03, 0);
  belly.raycast = () => null;
  fish.add(belly);

  const eyeGeometry = new THREE.SphereGeometry(0.014, 6, 6);
  const eyeFront = new THREE.Mesh(eyeGeometry, materials.eye);
  eyeFront.position.set(0.14, 0.026, 0.04);
  eyeFront.raycast = () => null;
  fish.add(eyeFront);
  const eyeBack = eyeFront.clone();
  eyeBack.position.z = -0.04;
  fish.add(eyeBack);

  const tail = new THREE.Group();
  tail.name = "fishTail";

  const tailFinGeometry = new THREE.ConeGeometry(0.044, 0.14, 4);
  const tailTop = new THREE.Mesh(tailFinGeometry, materials.body);
  tailTop.rotation.z = Math.PI / 2 + 0.42;
  tailTop.position.set(-0.058, 0.044, 0);
  tailTop.raycast = () => null;
  tail.add(tailTop);

  const tailBottom = tailTop.clone();
  tailBottom.rotation.z = Math.PI / 2 - 0.42;
  tailBottom.position.set(-0.058, -0.044, 0);
  tail.add(tailBottom);

  tail.position.set(-0.155, 0, 0);
  fish.add(tail);

  const dorsal = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.095, 3), materials.body);
  dorsal.rotation.x = 0.2;
  dorsal.position.set(-0.012, 0.075, 0);
  dorsal.raycast = () => null;
  fish.add(dorsal);

  const pecGeometry = new THREE.ConeGeometry(0.02, 0.065, 3);
  const pecLeft = new THREE.Mesh(pecGeometry, materials.belly);
  pecLeft.rotation.set(0.4, 0, -Math.PI / 2.2);
  pecLeft.position.set(0.058, -0.012, 0.062);
  pecLeft.raycast = () => null;
  fish.add(pecLeft);

  const pecRight = pecLeft.clone();
  pecRight.position.z = -0.062;
  pecRight.rotation.z = Math.PI / 2.2;
  fish.add(pecRight);

  fish.raycast = () => null;
  return fish;
}

function buildFish(count: number, color: string): { states: FishState[]; materials: THREE.Material[] } {
  const materials = createFishMaterials(color);
  const prototype = createFishModel(materials);
  const fish: FishState[] = [];

  for (let i = 0; i < count; i += 1) {
    const root = prototype.clone(true);
    const tail = root.getObjectByName("fishTail") as THREE.Group;
    const scale = 1.15 + (i % 4) * 0.22;
    root.scale.setScalar(scale);
    root.raycast = () => null;

    const base = new THREE.Vector3(
      (i - count / 2) * 0.82,
      0.28 + (i % 4) * 0.18,
      -2.1 - (i % 3) * 0.55,
    );
    root.position.copy(base);

    fish.push({
      root,
      tail,
      base,
      speed: 0.32 + i * 0.07,
      phase: i * 1.9,
      swimRadius: 0.42 + (i % 2) * 0.12,
      scale,
      lastX: base.x,
    });
  }

  prototype.traverse((child) => {
    if (child instanceof THREE.Mesh) child.geometry.dispose();
  });

  return {
    states: fish,
    materials: [materials.body, materials.belly, materials.eye],
  };
}

export function applyReefSceneAtmosphere(
  scene: THREE.Scene,
  theme: ReefThemeSettings,
  isDark: boolean,
): void {
  const visual = resolveReefVisuals(theme);
  if (isDark) {
    scene.background = new THREE.Color(visual.background);
    scene.fog = new THREE.FogExp2(visual.fogColor, visual.fogDensity);
    return;
  }
  scene.background = new THREE.Color("#a8d4ec");
  scene.fog = new THREE.FogExp2("#8eb8d4", 0.038);
}

export function createReefEnvironment(
  theme: ReefThemeSettings = DEFAULT_REEF_THEME,
  isDark = true,
): ReefEnvironmentHandle {
  const visual = resolveReefVisuals(theme);
  const group = new THREE.Group();
  group.name = "reefEnvironment";

  const disposables: Array<THREE.BufferGeometry | THREE.Material> = [];

  const sandGeometry = new THREE.CircleGeometry(4.5, 64);
  const sandMaterial = new THREE.MeshStandardMaterial({
    color: isDark ? visual.sandColor : "#6f9eb8",
    roughness: 0.98,
    metalness: 0,
  });
  disposables.push(sandGeometry, sandMaterial);
  const sand = new THREE.Mesh(sandGeometry, sandMaterial);
  sand.rotation.x = -Math.PI / 2;
  sand.position.y = -0.03;
  sand.raycast = () => null;
  group.add(sand);

  const sandGlowGeometry = new THREE.RingGeometry(0.4, 3.8, 48);
  const sandGlowMaterial = new THREE.MeshBasicMaterial({
    color: isDark ? visual.sandGlowColor : "#8ec4dc",
    transparent: true,
    opacity: isDark ? visual.sandGlowOpacity : 0.18,
    side: THREE.DoubleSide,
  });
  disposables.push(sandGlowGeometry, sandGlowMaterial);
  const sandGlow = new THREE.Mesh(sandGlowGeometry, sandGlowMaterial);
  sandGlow.rotation.x = -Math.PI / 2;
  sandGlow.position.y = -0.025;
  sandGlow.raycast = () => null;
  group.add(sandGlow);

  let rock: THREE.Group | null = null;
  let rockMaterial: THREE.MeshStandardMaterial | null = null;
  if (theme.showRock) {
    const built = buildRock(visual.rockColor);
    rock = built.group;
    rockMaterial = built.material;
    group.add(rock);
  }

  const fishGroup = new THREE.Group();
  fishGroup.name = "reefFish";
  const fishBundle = theme.showFish ? buildFish(8, visual.fishColor) : null;
  const fishStates = fishBundle?.states ?? [];
  for (const state of fishStates) {
    fishGroup.add(state.root);
  }
  if (fishStates.length) group.add(fishGroup);

  const update = (elapsedSeconds: number) => {
    for (const fish of fishStates) {
      const t = elapsedSeconds * fish.speed + fish.phase;
      const nextX = fish.base.x + Math.sin(t) * fish.swimRadius;
      const nextY = fish.base.y + Math.cos(t * 0.75) * 0.14;
      const dx = nextX - fish.lastX;

      fish.root.position.set(nextX, nextY, fish.base.z);
      fish.root.rotation.y = dx >= 0 ? -Math.PI / 2 : Math.PI / 2;
      fish.root.rotation.z = Math.sin(t * 6.5) * 0.06;
      fish.tail.rotation.y = Math.sin(t * 11) * 0.42;
      fish.lastX = nextX;
    }
  };

  const applyTheme = (nextTheme: ReefThemeSettings, nextIsDark: boolean) => {
    const nextVisual = resolveReefVisuals(nextTheme);
    sandMaterial.color.set(nextIsDark ? nextVisual.sandColor : "#6f9eb8");
    sandGlowMaterial.color.set(nextIsDark ? nextVisual.sandGlowColor : "#8ec4dc");
    sandGlowMaterial.opacity = nextIsDark ? nextVisual.sandGlowOpacity : 0.18;
    rockMaterial?.color.set(nextVisual.rockColor);
  };

  const dispose = () => {
    if (rock) {
      disposeObject(rock);
    }
    for (const state of fishStates) {
      disposeObject(state.root);
    }
    fishBundle?.materials.forEach((material) => material.dispose());
    for (const item of disposables) {
      item.dispose();
    }
  };

  return { group, update, applyTheme, dispose };
}
