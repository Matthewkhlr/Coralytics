import * as THREE from "three";

export type Sentiment = "positive" | "neutral" | "negative";

/** Fallbacks mirror `.dark` tokens in styles.css when CSS vars are unavailable. */
export const SENTIMENT_COLOR_FALLBACK: Record<Sentiment, string> = {
  positive: "#7ad4a8",
  neutral: "#e8d978",
  negative: "#f08070",
};

const CSS_VAR: Record<Sentiment, string> = {
  positive: "--sentiment-positive",
  neutral: "--sentiment-neutral",
  negative: "--sentiment-negative",
};

let cachedColors: Record<Sentiment, string> | null = null;

function rgbStringToHex(rgb: string): string | null {
  const match = rgb.match(
    /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+[\d.]+)?\s*\)/i,
  );
  if (!match) return null;

  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  if ([r, g, b].some((channel) => Number.isNaN(channel))) return null;

  return `#${new THREE.Color(r / 255, g / 255, b / 255).getHexString()}`;
}

/** Resolve a CSS custom property to hex via the browser (handles oklch, etc.). */
function readCssVarHex(varName: string): string | null {
  if (typeof document === "undefined") return null;

  const probe = document.createElement("span");
  probe.style.color = `var(${varName})`;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  document.body.removeChild(probe);

  return rgbStringToHex(computed);
}

export function getSentimentColors(): Record<Sentiment, string> {
  if (cachedColors) return cachedColors;

  cachedColors = {
    positive:
      readCssVarHex(CSS_VAR.positive) ?? SENTIMENT_COLOR_FALLBACK.positive,
    neutral: readCssVarHex(CSS_VAR.neutral) ?? SENTIMENT_COLOR_FALLBACK.neutral,
    negative:
      readCssVarHex(CSS_VAR.negative) ?? SENTIMENT_COLOR_FALLBACK.negative,
  };

  return cachedColors;
}

export function resetSentimentColorCache(): void {
  cachedColors = null;
}

export const SENTIMENT_NEUTRAL_RANGE = 0.15;

export function sentimentFromCompound(compound: number): Sentiment {
  if (compound >= SENTIMENT_NEUTRAL_RANGE) return "positive";
  if (compound <= -SENTIMENT_NEUTRAL_RANGE) return "negative";
  return "neutral";
}

export function sentimentColorForCompound(compound: number): string {
  const colors = getSentimentColors();
  return colors[sentimentFromCompound(compound)];
}

export function shadeSentimentColor(
  color: string,
  mode: "darker" | "lighter" | "polyp",
): string {
  const base = new THREE.Color(color);
  if (mode === "darker") {
    base.lerp(new THREE.Color("#000000"), 0.28);
  } else if (mode === "lighter") {
    base.lerp(new THREE.Color("#ffffff"), 0.22);
  } else {
    base.lerp(new THREE.Color("#000000"), 0.18);
  }
  return `#${base.getHexString()}`;
}
