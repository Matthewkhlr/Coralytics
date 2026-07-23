import * as THREE from "three";
import {
  getSentimentColors,
  sentimentColorForCompound,
  shadeSentimentColor,
} from "@/lib/sentimentColors";

/** Stem / trunk uses neutral sentiment from the design tokens. */
export function coralStemColors() {
  const neutral = getSentimentColors().neutral;
  return {
    dark: shadeSentimentColor(neutral, "darker"),
    base: neutral,
    light: shadeSentimentColor(neutral, "lighter"),
  };
}

export function coralSentimentColor(compound: number): string {
  return sentimentColorForCompound(compound);
}

export function coralTopicTint(index: number, base: string): string {
  const hues = [0, 0.02, -0.015];
  const color = new THREE.Color(base);
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);
  hsl.h = (hsl.h + hues[index % hues.length] + 1) % 1;
  hsl.s = Math.min(1, hsl.s + 0.03);
  return `#${new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l).getHexString()}`;
}

export function darkenCoral(color: string, amount = 0.22): string {
  return shadeSentimentColor(color, amount > 0.28 ? "darker" : "polyp");
}

export function lightenCoral(color: string, amount = 0.18): string {
  const strength = Math.min(0.35, Math.max(0.08, amount * 1.4));
  const base = new THREE.Color(color);
  base.lerp(new THREE.Color("#ffffff"), strength);
  return `#${base.getHexString()}`;
}
