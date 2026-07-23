import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LANDING_BUTTON } from "@/lib/buttonStyles";
import {
  REEF_ROCK_SWATCHES,
  REEF_SAND_SWATCHES,
  REEF_WATER_SWATCHES,
  normalizeHexColor,
  type ReefColorSwatch,
  type ReefThemeSettings,
} from "@/lib/reefTheme";
import { cn } from "@/lib/utils";

type ReefCustomizeSheetProps = {
  open: boolean;
  draft: ReefThemeSettings;
  saving: boolean;
  /** When set, panel aligns over the reef sidebar column (desktop). */
  coverRect?: { left: number; width: number } | null;
  onOpenChange: (open: boolean) => void;
  onDraftChange: (next: ReefThemeSettings) => void;
  onReset: () => void;
};

type ColorFieldKey = "waterColor" | "sandColor" | "rockColor";

const PANEL_SURFACE = "border border-foreground/20 bg-background";

function ReefColorField({
  label,
  value,
  swatches,
  onChange,
}: {
  label?: string;
  value: string;
  swatches: ReefColorSwatch[];
  onChange: (color: string) => void;
}) {
  return (
    <div className={cn(label ? "space-y-2" : undefined)}>
      {label ? <span className="text-sm text-foreground">{label}</span> : null}
      <div className="flex flex-wrap gap-2">
        {swatches.map((swatch) => {
          const selected = value === swatch.color;
          return (
            <button
              key={swatch.id}
              type="button"
              title={swatch.label}
              aria-label={label ? `${swatch.label} ${label.toLowerCase()}` : swatch.label}
              className={cn(
                "size-8 rounded-full border-2 transition",
                selected ? "border-foreground" : "border-transparent hover:border-foreground/40",
              )}
              style={{ backgroundColor: swatch.color }}
              onClick={() => onChange(swatch.color)}
            />
          );
        })}
        <label
          className="relative flex size-8 items-center justify-center overflow-hidden rounded-full border border-foreground/25"
          title="Custom color"
        >
          <span
            className="absolute inset-0"
            style={{
              background: `conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)`,
            }}
            aria-hidden
          />
          <input
            type="color"
            value={value}
            className="relative size-full cursor-pointer opacity-0"
            onChange={(event) => {
              const next = normalizeHexColor(event.target.value);
              if (next) onChange(next);
            }}
          />
        </label>
      </div>
    </div>
  );
}

export function ReefCustomizeSheet({
  open,
  draft,
  saving,
  coverRect,
  onOpenChange,
  onDraftChange,
  onReset,
}: ReefCustomizeSheetProps) {
  const setColor = (key: ColorFieldKey, color: string) => {
    onDraftChange({ ...draft, [key]: color });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        showOverlay={false}
        className={cn(
          "z-[60] gap-0 border-l bg-background p-0 shadow-xl",
          coverRect ? "!right-0 !max-w-none !w-auto" : "w-full sm:max-w-md",
        )}
        style={
          coverRect
            ? {
                left: coverRect.left,
                right: 0,
                width: coverRect.width,
                maxWidth: "none",
              }
            : undefined
        }
      >
        <SheetHeader>
          <SheetTitle className="font-display text-xl font-semibold tracking-tight">
            Customise Your Reef (Autosaved)
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto bg-background px-4 py-4">
          <div className="space-y-4">
            <Label className="text-caps text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Colour
            </Label>
            <div className={cn(PANEL_SURFACE, "space-y-4 p-3")}>
              <ReefColorField
                label="Water"
                value={draft.waterColor}
                swatches={REEF_WATER_SWATCHES}
                onChange={(color) => setColor("waterColor", color)}
              />
              <ReefColorField
                label="Sand"
                value={draft.sandColor}
                swatches={REEF_SAND_SWATCHES}
                onChange={(color) => setColor("sandColor", color)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-caps text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Decoration
            </Label>
            <div className={cn(PANEL_SURFACE, "p-3")}>
              <div className="space-y-2">
                <label className="flex items-center justify-between gap-3 text-sm text-foreground">
                  <span>Rock base</span>
                  <input
                    type="checkbox"
                    className="size-4 accent-[var(--accent)]"
                    checked={draft.showRock}
                    onChange={(event) =>
                      onDraftChange({ ...draft, showRock: event.target.checked })
                    }
                  />
                </label>
                <ReefColorField
                  value={draft.rockColor}
                  swatches={REEF_ROCK_SWATCHES}
                  onChange={(color) => setColor("rockColor", color)}
                />
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="bg-background">
          <Button
            type="button"
            variant="outline"
            className={LANDING_BUTTON}
            onClick={onReset}
            disabled={saving}
          >
            Reset to default
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
