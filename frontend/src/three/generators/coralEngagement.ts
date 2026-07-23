import type { OrganismPostType } from "../organismTypes";

export function polypScaleFromEngagement(engagementNorm?: number | null): number {
  if (engagementNorm == null || !Number.isFinite(engagementNorm)) return 1;
  return clamp(0.9 + engagementNorm * 0.22, 0.9, 1.12);
}

export function polypEmissiveFromEngagement(engagementNorm?: number | null): number {
  if (engagementNorm == null || !Number.isFinite(engagementNorm)) return 0.06;
  return clamp(0.06 + engagementNorm * 0.06, 0.06, 0.12);
}

export function branchRadiusBoostFromAvgEngagement(
  avgEngagement?: number | null,
  maxAvg?: number | null,
): number {
  if (
    avgEngagement == null ||
    maxAvg == null ||
    !Number.isFinite(avgEngagement) ||
    !Number.isFinite(maxAvg) ||
    maxAvg <= 0
  ) {
    return 1;
  }
  const ratio = avgEngagement / maxAvg;
  return clamp(1 + ratio * 0.12, 1, 1.12);
}

export function polypShapeScaleFromPostType(postType?: OrganismPostType): {
  x: number;
  y: number;
  z: number;
} {
  switch (postType) {
    case "comment":
    case "reply":
      return { x: 0.9, y: 0.55, z: 0.9 };
    case "share":
      return { x: 1.05, y: 0.85, z: 1.05 };
    default:
      return { x: 1, y: 1, z: 1 };
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
