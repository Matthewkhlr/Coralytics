import { CircleDot, GitBranch, Layers, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CORAL_DOT_LEGEND } from "@/lib/format";
import { REEF_INSTRUCTION_BOX } from "@/lib/buttonStyles";
import { cn } from "@/lib/utils";

const MEANING_ROWS: { key: string; label: string; Icon: LucideIcon }[] = [
  { key: "stem", label: "Stem = account history", Icon: Sprout },
  { key: "branch", label: "Branch = topic", Icon: GitBranch },
  { key: "thickness", label: "Thickness = volume", Icon: Layers },
  { key: "beads", label: CORAL_DOT_LEGEND, Icon: CircleDot },
];

export function ReefInstructionPanel({ className }: { className?: string }) {
  return (
    <div className={cn(REEF_INSTRUCTION_BOX, "reef-instruction-panel", className)}>
      <p className="exhibit-field-label reef-instruction-panel__heading">Instructions</p>
      <p className="reef-instruction-panel__tips">
        Click a coloured bead to view a data. Drag the coral to rotate.
      </p>

      <ul className="reef-meaning-table__rows">
        {MEANING_ROWS.map((row) => (
          <li key={row.key} className="reef-meaning-table__row">
            <row.Icon className="size-4 shrink-0 text-foreground/70" strokeWidth={1.75} aria-hidden />
            <span>{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
