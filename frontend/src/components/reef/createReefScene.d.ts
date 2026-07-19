export function createReefScene(
  host: HTMLElement,
  options?: {
    isDark?: boolean;
    /** Calmer, cheaper, non-interactive variant for page backdrops. */
    ambient?: boolean;
    /** Render a static image: warm up briefly, then stop animating. */
    frozen?: boolean;
  },
): Promise<() => void>;
