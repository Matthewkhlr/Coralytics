import { useEffect, useRef } from "react";
import { createReefScene } from "./reef/createReefScene";

type LandingReefProps = {
  appearance?: "light" | "dark";
  /** Calmer, cheaper, non-interactive variant for page backdrops. */
  ambient?: boolean;
  /** Render a static image: warm up briefly, then stop animating. */
  frozen?: boolean;
};

/**
 * Decorative underwater reef for the landing hero: simulated anemone grass,
 * procedural caustics, plankton, coral models and a clownfish swimming a
 * looped path. Rendered with the three.js WebGPU renderer (falls back to
 * WebGL2 where WebGPU is unavailable); if initialization fails the hero
 * simply keeps its gradient background.
 */
export function LandingReef({
  appearance = "dark",
  ambient = false,
  frozen = false,
}: LandingReefProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    createReefScene(host, { isDark: appearance === "dark", ambient, frozen })
      .then((dispose) => {
        if (cancelled) dispose();
        else cleanup = dispose;
      })
      .catch((err) => {
        console.warn("Reef scene failed to initialize:", err);
      });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [appearance, ambient, frozen]);

  return <div ref={hostRef} className="h-full w-full touch-none" aria-hidden />;
}
