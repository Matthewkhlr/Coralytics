import * as THREE from "three";
import { formatActivityType } from "@/lib/format";

export type TopicMeshState = {
  mesh: THREE.Mesh;
  baseColor: THREE.Color;
  baseEmissive: THREE.Color;
  baseEmissiveIntensity: number;
};

export type CoralHoverTarget =
  | {
      kind: "polyp";
      topicName: string;
      postId: string;
      sentiment: number;
      createdAt: string | null;
      engagement: number | null;
      postType: string;
    }
  | {
      kind: "topic";
      name: string;
      postVolume: number;
      sentiment: number;
      avgEngagement: number | null;
      commentVolume: number;
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
      if (current.userData?.coralRole === "polyp") {
        return {
          kind: "polyp",
          topicName: String(current.userData.topicName ?? ""),
          postId: String(current.userData.postId ?? ""),
          sentiment: Number(current.userData.sentiment) || 0,
          createdAt: (current.userData.createdAt as string | null) ?? null,
          engagement:
            typeof current.userData.engagement === "number"
              ? current.userData.engagement
              : null,
          postType: String(current.userData.postType ?? "post"),
        };
      }

      const topicName = current.userData?.topicName as string | undefined;
      if (topicName && current.userData?.coralRole === "topic") {
        return {
          kind: "topic",
          name: topicName,
          postVolume: Number(current.userData.postVolume) || 0,
          sentiment: Number(current.userData.sentiment) || 0,
          avgEngagement:
            typeof current.userData.avgEngagement === "number"
              ? current.userData.avgEngagement
              : null,
          commentVolume: Number(current.userData.commentVolume) || 0,
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
    if (obj.userData?.coralRole === "polyp") return;

    const mesh = obj as THREE.Mesh;
    const material = mesh.material;
    if (!material || Array.isArray(material)) return;

    const mat = material as THREE.MeshStandardMaterial;
    if (!mat.isMeshStandardMaterial) return;

    let current: THREE.Object3D | null = mesh;
    let topicName: string | undefined;
    while (current) {
      if (current.userData?.coralRole === "topic") {
        topicName = current.userData.topicName as string | undefined;
        break;
      }
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

export function buildPolypHighlightMeshes(coral: THREE.Group): TopicMeshState[] {
  const meshes: TopicMeshState[] = [];

  coral.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) return;
    if (obj.userData?.coralPart !== "spot") return;

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

function findPolypGroup(mesh: THREE.Object3D): THREE.Object3D | null {
  let current: THREE.Object3D | null = mesh;
  while (current) {
    if (current.userData?.coralRole === "polyp") return current;
    current = current.parent;
  }
  return null;
}

function setPolypHoverRing(group: THREE.Object3D | null, visible: boolean): void {
  if (!group) return;
  group.traverse((obj) => {
    if (obj.userData?.coralPart !== "hoverRing") return;
    const mat = (obj as THREE.Mesh).material as THREE.MeshBasicMaterial;
    mat.opacity = visible ? 0.85 : 0;
  });
}

function resetPolypHoverRings(polypMeshes: TopicMeshState[]): void {
  const seen = new Set<THREE.Object3D>();
  for (const { mesh } of polypMeshes) {
    const group = findPolypGroup(mesh);
    if (!group || seen.has(group)) continue;
    seen.add(group);
    setPolypHoverRing(group, false);
  }
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
  polypMeshes: TopicMeshState[],
  target: CoralHoverTarget | null,
): void {
  if (!target) {
    for (const meshes of topicMeshes.values()) applyMeshHighlight(meshes, "reset");
    applyMeshHighlight(trunkMeshes, "reset");
    applyMeshHighlight(polypMeshes, "reset");
    resetPolypHoverRings(polypMeshes);
    return;
  }

  if (target.kind === "polyp") {
    for (const meshes of topicMeshes.values()) applyMeshHighlight(meshes, "dim");
    applyMeshHighlight(trunkMeshes, "dim");
    applyMeshHighlight(polypMeshes, "reset");
    resetPolypHoverRings(polypMeshes);
    for (const { mesh } of polypMeshes) {
      const group = findPolypGroup(mesh);
      let isMatch = false;
      if (group?.userData.postId === target.postId) isMatch = true;

      if (isMatch) {
        setPolypHoverRing(group, true);
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const base = polypMeshes.find((s) => s.mesh === mesh);
        if (base) {
          mat.color.copy(base.baseColor).lerp(new THREE.Color("#ffffff"), 0.2);
          mat.emissiveIntensity = base.baseEmissiveIntensity + 0.18;
        }
      } else {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const base = polypMeshes.find((s) => s.mesh === mesh);
        if (base) {
          mat.color.copy(base.baseColor).multiplyScalar(0.82);
          mat.emissiveIntensity = base.baseEmissiveIntensity * 0.65;
        }
      }
    }
    return;
  }

  if (target.kind === "topic") {
    resetPolypHoverRings(polypMeshes);
    for (const [topic, meshes] of topicMeshes) {
      applyMeshHighlight(meshes, topic === target.name ? "active" : "dim");
    }
    applyMeshHighlight(trunkMeshes, "dim");
    for (const state of polypMeshes) {
      let topicName: string | undefined;
      let current: THREE.Object3D | null = state.mesh;
      while (current) {
        if (current.userData?.coralRole === "polyp") {
          topicName = current.userData.topicName as string | undefined;
          break;
        }
        current = current.parent;
      }
      applyMeshHighlight([state], topicName === target.name ? "active" : "dim");
    }
    return;
  }

  resetPolypHoverRings(polypMeshes);
  for (const meshes of topicMeshes.values()) applyMeshHighlight(meshes, "dim");
  applyMeshHighlight(polypMeshes, "dim");
  applyMeshHighlight(trunkMeshes, "active");
}

export function getTopicNameFromHoverTarget(target: CoralHoverTarget | null): string | null {
  if (!target) return null;
  if (target.kind === "topic") return target.name;
  if (target.kind === "polyp") return target.topicName || null;
  return null;
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

  if (target.kind === "polyp") {
    const sentSign = target.sentiment > 0 ? "+" : "";
    const date = target.createdAt
      ? new Date(target.createdAt).toLocaleDateString()
      : "unknown date";
    const engagementLabel =
      target.engagement != null
        ? ` · ${target.engagement.toLocaleString()} engagement`
        : "";
    return `${formatActivityType(target.postType)} · ${date} · sentiment ${sentSign}${target.sentiment.toFixed(2)}${engagementLabel}`;
  }

  const sentSign = target.sentiment > 0 ? "+" : "";
  const sentText = `${sentSign}${target.sentiment.toFixed(2)}`;
  const itemLabel = target.postVolume === 1 ? "item" : "items";
  const engagementLabel =
    target.avgEngagement != null
      ? ` · avg engagement ${target.avgEngagement.toLocaleString()}`
      : "";
  const commentLabel =
    target.commentVolume > 0
      ? ` · ${target.commentVolume} comment${target.commentVolume === 1 ? "" : "s"}`
      : "";
  return `${target.name} · ${target.postVolume} ${itemLabel} · avg sentiment ${sentText}${engagementLabel}${commentLabel}`;
}
