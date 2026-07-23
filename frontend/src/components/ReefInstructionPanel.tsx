import { cn } from "@/lib/utils";

const MEANING_ROWS: { key: string; label: string }[] = [
  { key: "stem", label: "Stem = Account History" },
  { key: "branch", label: "Branch = Topic" },
  { key: "thickness", label: "Thickness = Volume" },
  { key: "beads", label: "Beads = Data (click to open)" },
];

const SENTIMENT_LEGEND: Array<{
  key: string;
  label: string;
  sentiment: "positive" | "neutral" | "negative";
}> = [
  { key: "positive", label: "Positive Sentiment", sentiment: "positive" },
  { key: "neutral", label: "Neutral", sentiment: "neutral" },
  { key: "negative", label: "Negative / Risky", sentiment: "negative" },
];

function SentimentLegendItem({
  sentiment,
  label,
}: {
  sentiment: "positive" | "neutral" | "negative";
  label: string;
}) {
  const colorClass =
    sentiment === "positive"
      ? "text-sentiment-positive"
      : sentiment === "neutral"
        ? "text-sentiment-neutral"
        : "text-sentiment-negative";
  const swatchClass =
    sentiment === "positive"
      ? "bg-sentiment-positive"
      : sentiment === "neutral"
        ? "bg-sentiment-neutral"
        : "bg-sentiment-negative";

  return (
    <li className={cn("reef-sentiment-legend__item", colorClass)}>
      <span className={cn("reef-sentiment-legend__swatch", swatchClass)} aria-hidden />
      {label}
    </li>
  );
}

export function ReefInstructionPanel({ className }: { className?: string }) {
  return (
    <div className={cn("reef-legend-stack", className)} role="note" aria-label="Reef legend">
      <ul className="reef-meaning-table__rows">
        {MEANING_ROWS.map((row) => (
          <li key={row.key} className="reef-meaning-table__row">
            {row.label}
          </li>
        ))}
      </ul>

      <ul className="reef-sentiment-legend">
        {SENTIMENT_LEGEND.map((row) => (
          <SentimentLegendItem key={row.key} sentiment={row.sentiment} label={row.label} />
        ))}
      </ul>
    </div>
  );
}
