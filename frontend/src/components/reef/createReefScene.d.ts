export function createReefScene(
  host: HTMLElement,
  options?: {
    isDark?: boolean;
    /** Calmer, cheaper, non-interactive variant for page backdrops. */
    ambient?: boolean;
    /** Add decorative coral and whale silhouettes to ambient backdrops. */
    scenic?: boolean;
    /** Render a static image: warm up briefly, then stop animating. */
    frozen?: boolean;
  },
): Promise<() => void>;
