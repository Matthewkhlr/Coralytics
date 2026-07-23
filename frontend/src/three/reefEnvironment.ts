import * as THREE from "three";
import {
  DEFAULT_REEF_THEME,
  resolveReefVisuals,
  type ReefThemeSettings,
} from "@/lib/reefTheme";

export type ReefEnvironmentHandle = {
  group: THREE.Group;
  update: (elapsedSeconds: number) => void;
  dispose: () => void;
};

type FishState = {
  mesh: THREE.Mesh;
  base: THREE.Vector3;
  speed: number;
  phase: number;
};

function disposeMesh(mesh: THREE.Mesh) {
  mesh.geometry.dispose();
  if (Array.isArray(mesh.material)) {
    mesh.material.forEach((material) => material.dispose());
  } else {
    mesh.material.dispose();
  }
}

function buildRock(color: string): THREE.Group {
  const rock = new THREE.Group();
  rock.name = "reefRock";
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.95,
    metalness: 0,
  });

  const chunks: Array<{ geo: THREE.BufferGeometry; x: number; y: number; z: number; scale: number }> =
    [
      { geo: new THREE.DodecahedronGeometry(0.42, 0), x: 0, y: 0.12, z: 0.05, scale: 1 },
      { geo: new THREE.DodecahedronGeometry(0.28, 0), x: 0.32, y: 0.06, z: -0.12, scale: 1 },
      { geo: new THREE.DodecahedronGeometry(0.22, 0), x: -0.28, y: 0.04, z: 0.1, scale: 1 },
    ];

  for (const chunk of chunks) {
    const mesh = new THREE.Mesh(chunk.geo, material);
    mesh.position.set(chunk.x, chunk.y, chunk.z);
    mesh.scale.setScalar(chunk.scale);
    mesh.rotation.set(Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.3);
    mesh.raycast = () => null;
    rock.add(mesh);
  }

  rock.raycast = () => null;
  return rock;
}

function buildFish(count: number, color: string): { states: FishState[]; material: THREE.Material } {
  const fish: FishState[] = [];
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color,
    transparent: true,
    opacity: 0.45,
    roughness: 0.6,
    metalness: 0,
  });

  for (let i = 0; i < count; i += 1) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 5), bodyMaterial);
    mesh.scale.set(2.2, 0.7, 0.9);
    mesh.raycast = () => null;
    const base = new THREE.Vector3(
      (i - count / 2) * 0.9,
      0.35 + (i % 3) * 0.25,
      -2.4 - (i % 2) * 0.6,
    );
    mesh.position.copy(base);
    fish.push({
      mesh,
      base,
      speed: 0.35 + i * 0.08,
      phase: i * 1.7,
    });
  }

  return { states: fish, material: bodyMaterial };
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
  if (theme.showRock) {
    rock = buildRock(visual.rockColor);
    group.add(rock);
  }

  const fishGroup = new THREE.Group();
  fishGroup.name = "reefFish";
  const fishBundle = theme.showFish ? buildFish(4, visual.fishColor) : null;
  const fishStates = fishBundle?.states ?? [];
  for (const state of fishStates) {
    fishGroup.add(state.mesh);
  }
  if (fishStates.length) group.add(fishGroup);

  const update = (elapsedSeconds: number) => {
    for (const fish of fishStates) {
      fish.mesh.position.x = fish.base.x + Math.sin(elapsedSeconds * fish.speed + fish.phase) * 0.35;
      fish.mesh.position.y = fish.base.y + Math.cos(elapsedSeconds * fish.speed * 0.8 + fish.phase) * 0.12;
      fish.mesh.rotation.y = Math.sin(elapsedSeconds * 0.5 + fish.phase) * 0.4;
    }
  };

  const dispose = () => {
    if (rock) {
      rock.traverse((child) => {
        if (child instanceof THREE.Mesh) disposeMesh(child);
      });
    }
    for (const state of fishStates) {
      state.mesh.geometry.dispose();
    }
    fishBundle?.material.dispose();
    for (const item of disposables) {
      item.dispose();
    }
  };

  return { group, update, dispose };
}
