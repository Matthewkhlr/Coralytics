import * as THREE from "three";

export type TopicMeshState = {
  mesh: THREE.Mesh;
  baseColor: THREE.Color;
  baseEmissive: THREE.Color;
  baseEmissiveIntensity: number;
};

export type CoralHoverTarget =
  | {
      kind: "topic";
      name: string;
      postVolume: number;
      sentiment: number;
    }
  | {
      kind: "trunk";
      accountAgeDays: number;
    };

export function pickCoralHoverTarget(
  coral: THREE.Group,
  raycaster: THREE.Raycaster,
): CoralHoverTarget | null {
  const hits = raycaster.intersectObjects([coral], true);

  for (const hit of hits) {
    let current: THREE.Object3D | null = hit.object;
    while (current) {
      const topicName = current.userData?.topicName as string | undefined;
      if (topicName) {
        return {
          kind: "topic",
          name: topicName,
          postVolume: Number(current.userData.postVolume) || 0,
          sentiment: Number(current.userData.sentiment) || 0,
        };
      }

      if (current.userData?.coralRole === "trunk") {
        return {
          kind: "trunk",
          accountAgeDays: Number(coral.userData.accountAgeDays) || 0,
        };
      }

      current = current.parent;
    }
  }

  return null;
}

export function buildTopicHighlightMap(coral: THREE.Group): Map<string, TopicMeshState[]> {
  const map = new Map<string, TopicMeshState[]>();

  coral.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) return;

    const mesh = obj as THREE.Mesh;
    const material = mesh.material;
    if (!material || Array.isArray(material)) return;

    const mat = material as THREE.MeshStandardMaterial;
    if (!mat.isMeshStandardMaterial) return;

    let current: THREE.Object3D | null = mesh;
    let topicName: string | undefined;
    while (current) {
      topicName = current.userData?.topicName as string | undefined;
      if (topicName) break;
      current = current.parent;
    }
    if (!topicName) return;

    const state: TopicMeshState = {
      mesh,
      baseColor: mat.color.clone(),
      baseEmissive: mat.emissive.clone(),
      baseEmissiveIntensity: mat.emissiveIntensity,
    };

    const bucket = map.get(topicName);
    if (bucket) bucket.push(state);
    else map.set(topicName, [state]);
  });

  return map;
}

export function buildTrunkHighlightMeshes(coral: THREE.Group): TopicMeshState[] {
  const meshes: TopicMeshState[] = [];

  coral.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) return;
    if (obj.userData?.coralRole !== "trunk") return;

    const mesh = obj as THREE.Mesh;
    const material = mesh.material;
    if (!material || Array.isArray(material)) return;

    const mat = material as THREE.MeshStandardMaterial;
    if (!mat.isMeshStandardMaterial) return;

    meshes.push({
      mesh,
      baseColor: mat.color.clone(),
      baseEmissive: mat.emissive.clone(),
      baseEmissiveIntensity: mat.emissiveIntensity,
    });
  });

  return meshes;
}

function applyMeshHighlight(
  states: TopicMeshState[],
  mode: "active" | "dim" | "reset",
): void {
  const activeTint = new THREE.Color("#fff8f4");
  const activeEmissive = new THREE.Color("#ffe8dc");

  for (const { mesh, baseColor, baseEmissive, baseEmissiveIntensity } of states) {
    const mat = mesh.material as THREE.MeshStandardMaterial;

    if (mode === "active") {
      mat.color.copy(baseColor).lerp(activeTint, 0.3);
      mat.emissive.copy(baseEmissive).lerp(activeEmissive, 0.55);
      mat.emissiveIntensity = baseEmissiveIntensity + 0.38;
    } else if (mode === "dim") {
      mat.color.copy(baseColor).multiplyScalar(0.62);
      mat.emissive.copy(baseEmissive);
      mat.emissiveIntensity = baseEmissiveIntensity * 0.3;
    } else {
      mat.color.copy(baseColor);
      mat.emissive.copy(baseEmissive);
      mat.emissiveIntensity = baseEmissiveIntensity;
    }
  }
}

export function applyCoralHoverHighlight(
  topicMeshes: Map<string, TopicMeshState[]>,
  trunkMeshes: TopicMeshState[],
  target: CoralHoverTarget | null,
): void {
  if (!target) {
    for (const meshes of topicMeshes.values()) applyMeshHighlight(meshes, "reset");
    applyMeshHighlight(trunkMeshes, "reset");
    return;
  }

  if (target.kind === "topic") {
    for (const [topic, meshes] of topicMeshes) {
      applyMeshHighlight(meshes, topic === target.name ? "active" : "dim");
    }
    applyMeshHighlight(trunkMeshes, "dim");
    return;
  }

  for (const meshes of topicMeshes.values()) applyMeshHighlight(meshes, "dim");
  applyMeshHighlight(trunkMeshes, "active");
}

export function formatCoralHoverTooltip(target: CoralHoverTarget | null): string {
  if (!target) return "";

  if (target.kind === "trunk") {
    const days = target.accountAgeDays;
    if (days <= 0) return "Account history · upload posts to estimate age";
    if (days < 365) {
      return `Account history · ${days} day${days === 1 ? "" : "s"} of posts`;
    }
    const years = days / 365;
    return `Account history · ${years.toFixed(1)} years (${days.toLocaleString()} days)`;
  }

  const sentSign = target.sentiment > 0 ? "+" : "";
  const sentText = `${sentSign}${target.sentiment.toFixed(2)}`;
  const postLabel = target.postVolume === 1 ? "post" : "posts";
  return `${target.name} · ${target.postVolume} ${postLabel} · avg sentiment ${sentText}`;
}
