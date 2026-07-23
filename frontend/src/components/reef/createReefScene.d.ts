export function createReefScene(
  host: HTMLElement,
  options?: {
    isDark?: boolean;
    /** Calmer, cheaper, non-interactive variant for page backdrops. */
    ambient?: boolean;
    /** Add decorative coral models to ambient backdrops. */
    scenic?: boolean;
    /** Pull the ambient camera back so page backdrops feel less cropped. */
    wide?: boolean;
    /** Render a static image: warm up briefly, then stop animating. */
    frozen?: boolean;
  },
): Promise<() => void>;
