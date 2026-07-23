import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LANDING_BUTTON, LANDING_BUTTON_SM } from "@/lib/buttonStyles";
import {
  DEFAULT_REEF_COLORS,
  REEF_FISH_SWATCHES,
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
  onSave: () => Promise<void>;
  onCancel: () => void;
  onReset: () => void;
};

type ColorFieldKey = "waterColor" | "sandColor" | "fishColor" | "rockColor";

const COLOR_DEFAULTS: Record<ColorFieldKey, string> = {
  waterColor: DEFAULT_REEF_COLORS.water,
  sandColor: DEFAULT_REEF_COLORS.sand,
  fishColor: DEFAULT_REEF_COLORS.fish,
  rockColor: DEFAULT_REEF_COLORS.rock,
};

function ReefColorField({
  label,
  value,
  defaultColor,
  swatches,
  onChange,
  onReset,
}: {
  label: string;
  value: string;
  defaultColor: string;
  swatches: ReefColorSwatch[];
  onChange: (color: string) => void;
  onReset: () => void;
}) {
  const isDefault = value === defaultColor;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-foreground">{label}</span>
        {!isDefault ? (
          <button
            type="button"
            className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            onClick={onReset}
          >
            Reset
          </button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {swatches.map((swatch) => {
          const selected = value === swatch.color;
          return (
            <button
              key={swatch.id}
              type="button"
              title={swatch.label}
              aria-label={`${swatch.label} ${label.toLowerCase()}`}
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
  onSave,
  onCancel,
  onReset,
}: ReefCustomizeSheetProps) {
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (open) setSaveError(null);
  }, [open, draft]);

  const setColor = (key: ColorFieldKey, color: string) => {
    onDraftChange({ ...draft, [key]: color });
  };

  const resetColor = (key: ColorFieldKey) => {
    onDraftChange({ ...draft, [key]: COLOR_DEFAULTS[key] });
  };

  const handleSave = async () => {
    setSaveError(null);
    try {
      await onSave();
      onOpenChange(false);
    } catch {
      setSaveError("Could not save your reef look. Try again.");
    }
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        showOverlay={false}
        className={cn(
          "z-[60] border-l bg-background shadow-xl",
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
          <SheetTitle>Customize your reef</SheetTitle>
          <SheetDescription>
            Pick colors for the water, sand, and scenery around your coral. Branch and bead
            colors still reflect your data.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4">
          <div className="space-y-4">
            <Label className="text-caps text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Colors
            </Label>
            <div className="space-y-4 border border-foreground/20 bg-background/40 p-3">
              <ReefColorField
                label="Water"
                value={draft.waterColor}
                defaultColor={COLOR_DEFAULTS.waterColor}
                swatches={REEF_WATER_SWATCHES}
                onChange={(color) => setColor("waterColor", color)}
                onReset={() => resetColor("waterColor")}
              />
              <ReefColorField
                label="Sand"
                value={draft.sandColor}
                defaultColor={COLOR_DEFAULTS.sandColor}
                swatches={REEF_SAND_SWATCHES}
                onChange={(color) => setColor("sandColor", color)}
                onReset={() => resetColor("sandColor")}
              />
              <ReefColorField
                label="Fish"
                value={draft.fishColor}
                defaultColor={COLOR_DEFAULTS.fishColor}
                swatches={REEF_FISH_SWATCHES}
                onChange={(color) => setColor("fishColor", color)}
                onReset={() => resetColor("fishColor")}
              />
              <ReefColorField
                label="Rock"
                value={draft.rockColor}
                defaultColor={COLOR_DEFAULTS.rockColor}
                swatches={REEF_ROCK_SWATCHES}
                onChange={(color) => setColor("rockColor", color)}
                onReset={() => resetColor("rockColor")}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-caps text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Decor
            </Label>
            <label className="flex items-center justify-between gap-3 border border-foreground/20 bg-background/40 px-3 py-2.5 text-sm">
              <span>Show rock base</span>
              <input
                type="checkbox"
                className="size-4 accent-[var(--accent)]"
                checked={draft.showRock}
                onChange={(event) =>
                  onDraftChange({ ...draft, showRock: event.target.checked })
                }
              />
            </label>
            <label className="flex items-center justify-between gap-3 border border-foreground/20 bg-background/40 px-3 py-2.5 text-sm">
              <span>Background fish</span>
              <input
                type="checkbox"
                className="size-4 accent-[var(--accent)]"
                checked={draft.showFish}
                onChange={(event) =>
                  onDraftChange({ ...draft, showFish: event.target.checked })
                }
              />
            </label>
          </div>

          {saveError ? <p className="text-sm text-primary">{saveError}</p> : null}
        </div>

        <SheetFooter className="border-t border-foreground/15">
          <Button
            type="button"
            variant="outline"
            className={LANDING_BUTTON_SM}
            onClick={onReset}
            disabled={saving}
          >
            Reset to default
          </Button>
          <Button
            type="button"
            variant="outline"
            className={LANDING_BUTTON_SM}
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outline"
            className={LANDING_BUTTON}
            onClick={() => void handleSave()}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
