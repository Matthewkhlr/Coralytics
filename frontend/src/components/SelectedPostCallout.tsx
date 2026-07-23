import { forwardRef } from "react";
import {
  AlertTriangle,
  Calendar,
  MessageSquare,
  Tag,
  X,
} from "lucide-react";
import type { PostInsight, RedFlag } from "@/api/types";
import { ReefCalloutSourceRow } from "@/components/ReefSourceIcon";
import { formatPlatform, formatShortDate } from "@/lib/format";
import { cn } from "@/lib/utils";

type SelectedPostCalloutProps = {
  post: PostInsight;
  flags: RedFlag[];
  onClose: () => void;
  className?: string;
};

function sentimentDisplay(post: PostInsight): { label: string; className: string } {
  const label = (post.sentiment_label ?? "").toLowerCase();
  if (label === "positive") {
    return { label: "Positive", className: "text-sentiment-positive" };
  }
  if (label === "negative") {
    return { label: "Negative", className: "text-sentiment-negative" };
  }
  if (label === "neutral") {
    return { label: "Neutral", className: "text-sentiment-neutral" };
  }
  const compound = post.sentiment_compound;
  if (compound === undefined || Number.isNaN(compound)) {
    return { label: "Unknown", className: "text-muted-foreground" };
  }
  if (compound >= 0.15) return { label: "Positive", className: "text-sentiment-positive" };
  if (compound <= -0.15) return { label: "Negative", className: "text-sentiment-negative" };
  return { label: "Neutral", className: "text-sentiment-neutral" };
}

function riskDisplay(flags: RedFlag[], compound?: number): { label: string; className: string } {
  if (flags.length > 0) {
    const count = flags.length;
    return {
      label: `High (${count} flagged)`,
      className: "text-sentiment-negative",
    };
  }
  if (compound !== undefined && compound < -0.35) {
    return { label: "Moderate", className: "text-sentiment-neutral" };
  }
  return { label: "Low", className: "text-foreground/80" };
}

function capitalizeTopicLabel(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return value;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

function formatTopics(topics: string[] | undefined): string {
  const labels = (topics ?? []).filter(Boolean).map(capitalizeTopicLabel);
  return labels.length ? labels.join(", ") : "—";
}

export const SelectedPostCallout = forwardRef<HTMLDivElement, SelectedPostCalloutProps>(
  function SelectedPostCallout({ post, flags, onClose, className }, ref) {
    const sentiment = sentimentDisplay(post);
    const risk = riskDisplay(flags, post.sentiment_compound);
    const topics = formatTopics(post.topics);

    return (
      <div
        ref={ref}
        className={cn("reef-post-callout reef-post-callout--sidebar", className)}
        role="region"
        aria-label="Selected post details"
      >
        <div className="reef-post-callout__header reef-post-callout__header--close-only">
          <button
            type="button"
            className="reef-post-callout__close"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <ReefCalloutSourceRow
          label="Source:"
          value={formatPlatform(post.platform ?? "unknown").toUpperCase()}
          icon={{ kind: "platform", platform: post.platform }}
        />

        <dl className="reef-post-callout__fields">
          <CalloutField icon={Calendar} label="Date" value={formatShortDate(post.created_at)} />
          <CalloutField
            icon={MessageSquare}
            label="Sentiment"
            value={sentiment.label}
            valueClassName={sentiment.className}
          />
          <CalloutField icon={Tag} label="Topic" value={topics} />
          <CalloutField
            icon={AlertTriangle}
            label="Risk"
            value={risk.label}
            valueClassName={risk.className}
          />
        </dl>

        <div className="reef-post-callout__text-block">
          <p className="reef-post-callout__field-label">Content</p>
          <p className="reef-post-callout__text">{post.content || "—"}</p>
        </div>
      </div>
    );
  },
);

function CalloutField({
  icon: Icon,
  label,
  value,
  valueClassName,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="reef-post-callout__field">
      <dt className="reef-post-callout__field-label">
        <Icon className="size-3.5 shrink-0 opacity-70" strokeWidth={1.75} aria-hidden />
        {label}
      </dt>
      <dd className={cn("reef-post-callout__field-value", valueClassName)}>{value}</dd>
    </div>
  );
}
