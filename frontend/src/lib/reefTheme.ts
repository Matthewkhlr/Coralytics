import * as THREE from "three";

export type ReefThemeSettings = {
  showRock: boolean;
  showFish: boolean;
  waterColor: string;
  sandColor: string;
  fishColor: string;
  rockColor: string;
};

export type ReefThemeSettingsApi = {
  show_rock: boolean;
  show_fish: boolean;
  water_color?: string | null;
  sand_color?: string | null;
  fish_color?: string | null;
  rock_color?: string | null;
  updated_at?: string;
};

export const DEFAULT_REEF_COLORS = {
  water: "#041a2c",
  sand: "#0f2d42",
  sandGlow: "#1a4a68",
  fish: "#8ec8e0",
  rock: "#4a4540",
} as const;

const FOG_DENSITY = 0.055;
const SAND_GLOW_OPACITY = 0.12;

export const DEFAULT_REEF_THEME: ReefThemeSettings = {
  showRock: false,
  showFish: false,
  waterColor: DEFAULT_REEF_COLORS.water,
  sandColor: DEFAULT_REEF_COLORS.sand,
  fishColor: DEFAULT_REEF_COLORS.fish,
  rockColor: DEFAULT_REEF_COLORS.rock,
};

export type ReefColorSwatch = {
  id: string;
  label: string;
  color: string;
};

export const REEF_WATER_SWATCHES: ReefColorSwatch[] = [
  { id: "lagoon", label: "Lagoon", color: "#041a2c" },
  { id: "deep", label: "Midnight", color: "#020810" },
  { id: "teal", label: "Teal", color: "#062a32" },
  { id: "emerald", label: "Emerald", color: "#042818" },
  { id: "twilight", label: "Twilight", color: "#12102a" },
  { id: "dusk", label: "Warm dusk", color: "#1a1020" },
];

export const REEF_SAND_SWATCHES: ReefColorSwatch[] = [
  { id: "cool", label: "Cool", color: "#0f2d42" },
  { id: "slate", label: "Slate", color: "#1a3540" },
  { id: "warm", label: "Warm", color: "#3a3428" },
  { id: "pale", label: "Pale", color: "#4a5a62" },
  { id: "aqua", label: "Aqua", color: "#1a4a58" },
];

export const REEF_FISH_SWATCHES: ReefColorSwatch[] = [
  { id: "silver", label: "Silver", color: "#8ec8e0" },
  { id: "gold", label: "Gold", color: "#d4b878" },
  { id: "coral", label: "Coral", color: "#e8a090" },
  { id: "mint", label: "Mint", color: "#88d4c0" },
];

export const REEF_ROCK_SWATCHES: ReefColorSwatch[] = [
  { id: "granite", label: "Granite", color: "#4a4540" },
  { id: "warm", label: "Warm", color: "#5a4a3a" },
  { id: "slate", label: "Slate", color: "#3a4248" },
  { id: "moss", label: "Moss", color: "#3a4840" },
];

export type ResolvedReefVisual = {
  background: string;
  fogColor: string;
  fogDensity: number;
  sandColor: string;
  sandGlowColor: string;
  sandGlowOpacity: number;
  fishColor: string;
  rockColor: string;
};

const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;

export function normalizeHexColor(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  if (!HEX_COLOR.test(withHash)) return null;
  return withHash.toLowerCase();
}

function colorOrDefault(
  value: string | null | undefined,
  fallback: string,
): string {
  return normalizeHexColor(value) ?? fallback;
}

function lightenColor(hex: string, amount: number): string {
  const color = new THREE.Color(hex);
  color.lerp(new THREE.Color("#ffffff"), amount);
  return `#${color.getHexString()}`;
}

export function resolveReefVisuals(theme: ReefThemeSettings): ResolvedReefVisual {
  const water = colorOrDefault(theme.waterColor, DEFAULT_REEF_COLORS.water);
  const sand = colorOrDefault(theme.sandColor, DEFAULT_REEF_COLORS.sand);
  const fish = colorOrDefault(theme.fishColor, DEFAULT_REEF_COLORS.fish);
  const rock = colorOrDefault(theme.rockColor, DEFAULT_REEF_COLORS.rock);

  return {
    background: water,
    fogColor: water,
    fogDensity: FOG_DENSITY,
    sandColor: sand,
    sandGlowColor: lightenColor(sand, 0.18),
    sandGlowOpacity: SAND_GLOW_OPACITY,
    fishColor: fish,
    rockColor: rock,
  };
}

export function reefThemeFromApi(raw: ReefThemeSettingsApi | null | undefined): ReefThemeSettings {
  if (!raw) return { ...DEFAULT_REEF_THEME };
  return {
    showRock: Boolean(raw.show_rock),
    showFish: Boolean(raw.show_fish),
    waterColor: colorOrDefault(raw.water_color, DEFAULT_REEF_COLORS.water),
    sandColor: colorOrDefault(raw.sand_color, DEFAULT_REEF_COLORS.sand),
    fishColor: colorOrDefault(raw.fish_color, DEFAULT_REEF_COLORS.fish),
    rockColor: colorOrDefault(raw.rock_color, DEFAULT_REEF_COLORS.rock),
  };
}

export function reefThemeToApi(settings: ReefThemeSettings): ReefThemeSettingsApi {
  return {
    show_rock: settings.showRock,
    show_fish: settings.showFish,
    water_color: settings.waterColor,
    sand_color: settings.sandColor,
    fish_color: settings.fishColor,
    rock_color: settings.rockColor,
  };
}

export function reefThemeKey(settings: ReefThemeSettings): string {
  return [
    settings.showRock,
    settings.showFish,
    settings.waterColor,
    settings.sandColor,
    settings.fishColor,
    settings.rockColor,
  ].join(":");
}
