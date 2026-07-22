/** Matches the landing page "Get started" button (use with variant="outline"). */
export const LANDING_BUTTON =
  "h-auto rounded-none border-foreground/35 bg-accent/10 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.22em] backdrop-blur-md hover:bg-accent/20 hover:border-foreground/60";

/** Compact variant for filter chips and secondary actions. */
export const LANDING_BUTTON_SM =
  "h-auto rounded-none border-foreground/35 bg-accent/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] backdrop-blur-md hover:bg-accent/20 hover:border-foreground/60";

export const LANDING_SELECT =
  "rounded-none border border-foreground/20 bg-background/80 px-3 py-2 text-sm text-foreground min-w-[200px] focus:border-foreground/40 focus:outline-none focus:ring-0";

/** Shared corner radius for upload file chips and reef sidebar dropdowns. */
export const CHIP_RADIUS = "rounded-[10px]";

/** Field surface — matches My Runs panel interior. */
export const REEF_FIELD_SURFACE = "bg-background/45 dark:bg-background/45 backdrop-blur-[10px]";

/** My Runs aside panel — border + surface (padding applied in component). */
export const MY_RUNS_PANEL =
  `border border-foreground/20 ${REEF_FIELD_SURFACE}`;

/** Full-width select for dashboard reef sidebar. */
export const REEF_DROPDOWN =
  `w-full appearance-none ${CHIP_RADIUS} border border-foreground/20 ${REEF_FIELD_SURFACE} px-4 py-2.5 text-sm text-foreground shadow-none focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/30 dark:!bg-background/45 dark:hover:!bg-background/45`;

/** Static instruction panel — same radius, type, and surface as reef dropdowns. */
export const REEF_INSTRUCTION_BOX = `${CHIP_RADIUS} border border-foreground/20 ${REEF_FIELD_SURFACE} text-sm text-foreground shadow-none`;

/** Exhibit panel — matches My Runs panel surface. */
export const EXHIBIT_PANEL =
  "rounded-none border border-foreground/20 bg-background/45 shadow-none backdrop-blur-[10px]";

export const UPLOAD_CARD = EXHIBIT_PANEL;

/** File chips on upload steps 1–2 (dropzone file list + source sort). */
export const UPLOAD_CHIP = `${CHIP_RADIUS} border border-foreground/20 bg-background/80`;
