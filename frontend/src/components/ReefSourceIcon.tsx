import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  normalizePlatformSource,
  platformSourceLabel,
  REEF_PLATFORM_ICON_SRC,
  REEF_STEM_ICON_LABEL,
  REEF_UNKNOWN_PLATFORM_ICON,
  topicIconLabel,
  topicLucideIcon,
  type PlatformSourceKey,
} from "@/lib/reefIcons";

const GLYPH_CLASS = "reef-post-callout__source-icon-glyph";

type ReefSourceIconProps = {
  className?: string;
} & (
  | { kind: "platform"; platform?: string | null }
  | { kind: "topic"; topicName: string }
  | { kind: "stem" }
);

export type { ReefSourceIconProps };

function PlatformUnknownGlyph({ className }: { className?: string }) {
  const Icon = REEF_UNKNOWN_PLATFORM_ICON;
  return <Icon className={cn(GLYPH_CLASS, className)} strokeWidth={1.75} aria-hidden />;
}

function LucideGlyph({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return <Icon className={cn(GLYPH_CLASS, className)} strokeWidth={1.85} aria-hidden />;
}

function StemGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn(GLYPH_CLASS, className)} fill="none" aria-hidden>
      <path
        d="M12 4.25c0 0 2.1 2.35 2.1 5.45 0 1.85-.55 3.35-1.35 4.55"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <path
        d="M12 14.25c0 0-2.1 2.35-2.1 5.45"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="20.75" rx="3.4" ry="1.15" fill="currentColor" opacity="0.72" />
      <circle cx="12" cy="4.25" r="1.35" fill="currentColor" />
    </svg>
  );
}

function ImageGlyph({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt="" className="reef-post-callout__source-icon-img" title={alt} />;
}

export function ReefSourceIcon(props: ReefSourceIconProps) {
  const { className } = props;

  if (props.kind === "stem") {
    return (
      <span
        className={cn("reef-post-callout__source-icon reef-post-callout__source-icon--stem", className)}
        aria-hidden
        title={REEF_STEM_ICON_LABEL}
      >
        <StemGlyph />
      </span>
    );
  }

  if (props.kind === "topic") {
    const Icon = topicLucideIcon(props.topicName);
    return (
      <span
        className={cn("reef-post-callout__source-icon reef-post-callout__source-icon--topic", className)}
        aria-hidden
        title={topicIconLabel(props.topicName)}
      >
        <LucideGlyph icon={Icon} />
      </span>
    );
  }

  const key: PlatformSourceKey = normalizePlatformSource(props.platform);
  const iconSrc = REEF_PLATFORM_ICON_SRC[key];
  const label = platformSourceLabel(props.platform);

  return (
    <span
      className={cn(
        "reef-post-callout__source-icon",
        iconSrc
          ? "reef-post-callout__source-icon--image reef-post-callout__source-icon--contain"
          : `reef-post-callout__source-icon--${key}`,
        className,
      )}
      aria-hidden
      title={label}
    >
      {iconSrc ? <ImageGlyph src={iconSrc} alt={label} /> : <PlatformUnknownGlyph />}
    </span>
  );
}

type ReefCalloutSourceRowProps = {
  label: string;
  value: string;
  icon: ReefSourceIconProps;
};

export function ReefCalloutSourceRow({ label, value, icon }: ReefCalloutSourceRowProps) {
  return (
    <div className="reef-post-callout__source">
      <ReefSourceIcon {...icon} />
      <div className="reef-post-callout__source-text">
        <span className="reef-post-callout__source-label">{label}</span>
        <span className="reef-post-callout__source-name">{value}</span>
      </div>
    </div>
  );
}
