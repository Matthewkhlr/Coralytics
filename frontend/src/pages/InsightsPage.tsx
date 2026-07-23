import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RedFlag } from "@/api/types";
import { AnalysisSnapshotBar } from "@/components/AnalysisSnapshotBar";
import { DataStatusBanner } from "@/components/DataStatusBanner";
import { OlderSnapshotBanner } from "@/components/OlderSnapshotBanner";
import { PageLoadingOverlay } from "@/components/PageLoadingOverlay";
import { OceanPageFrame, ExhibitSectionLabel, PageHeader, PageTitle } from "@/components/PageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useSelectedAnalysis } from "@/hooks/useSelectedAnalysis";
import { formatPlatform, formatShortDate } from "@/lib/format";
import { CHIP_RADIUS, EXHIBIT_PANEL } from "@/lib/buttonStyles";
import { formatSentiment, formatSentimentRatio, getSentimentRatio, resolveOrganismData } from "@/lib/organismData";
import { cn } from "@/lib/utils";

const INSIGHTS_PANEL = cn(EXHIBIT_PANEL, "p-7");
const INSIGHTS_INSET = cn(CHIP_RADIUS, "border border-foreground/10 bg-background/20");
const FLAGS_PER_PAGE = 6;

/** Shared typography for Insights panels */
const INSIGHTS_SECTION_GAP = "mb-4";
const INSIGHTS_SUBSECTION = "text-sm font-semibold text-foreground/90";
const INSIGHTS_META = "text-xs text-muted-foreground";
const INSIGHTS_BODY = "text-sm leading-relaxed text-foreground/90";
const INSIGHTS_BODY_MUTED = "text-sm leading-relaxed text-muted-foreground";
const INSIGHTS_ROW_LABEL = "text-sm font-semibold text-foreground";
const INSIGHTS_ROW_VALUE = "text-sm font-semibold";
const INSIGHTS_STAT_VALUE = "text-2xl font-bold font-display";
const INSIGHTS_STAT_LABEL = "text-sm font-semibold text-foreground/90";
const INSIGHTS_STAT_SUB = "text-sm text-muted-foreground";

function capitalizeFirst(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function severityForFlag(type: string, compound?: number): "high" | "medium" | "low" {
  const t = type.toLowerCase();
  if (t.includes("hate") || t.includes("violence") || t.includes("threat")) return "high";
  if (compound !== undefined && compound < -0.4) return "high";
  if (t.includes("profan") || t.includes("politic") || (compound !== undefined && compound < -0.15))
    return "medium";
  return "low";
}

const severityDot = {
  high: "bg-primary",
  medium: "bg-sentiment-neutral",
  low: "bg-accent",
} as const;

function severityRank(type: string, compound?: number): number {
  const severity = severityForFlag(type, compound);
  return severity === "high" ? 3 : severity === "medium" ? 2 : 1;
}

function rankRedFlags(flags: RedFlag[]): RedFlag[] {
  return [...flags].sort(
    (a, b) => severityRank(b.type, b.compound) - severityRank(a.type, a.compound),
  );
}

function topicVolume(t: { postVolume?: number; count?: number }) {
  return t.postVolume ?? t.count ?? 0;
}

function sentimentLabel(compound: number): string {
  if (compound > 0.3) return "Positive";
  if (compound < -0.3) return "Negative";
  return "Neutral";
}

function riskLabel(score: number): string {
  if (score >= 60) return "High";
  if (score >= 30) return "Moderate";
  return "Low";
}

function formatAge(days: number): string {
  if (days < 30) return `${days} days`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
  const years = Math.floor(days / 365);
  const remMonths = Math.floor((days % 365) / 30);
  return `${years} year${years > 1 ? "s" : ""}${remMonths > 0 ? `, ${remMonths} month${remMonths > 1 ? "s" : ""}` : ""}`;
}

export function InsightsPage() {
  const { user } = useAuth();
  const {
    history,
    latestStatus,
    latestError,
    reloadLatest,
    analysis,
    analysisLoading,
    selectAnalysis,
    selectLatest,
    isLatest,
    postsDeltaFromLatest,
  } = useSelectedAnalysis(user?.uid);

  const { data: organismData } = resolveOrganismData(analysis?.organism_data);

  const showBanner = latestStatus === "error" && !analysis;

  const topics =
    analysis?.topics ??
    organismData.topics.map((t) => ({
      name: t.name,
      postVolume: t.postVolume,
      sentiment: t.sentiment,
    }));
  const platforms = analysis?.platform_breakdown ?? [];
  const overallSentiment = analysis?.sentiment_summary?.compound ?? null;
  const sentimentSummary = analysis?.sentiment_summary;
  const redFlags = analysis?.red_flags;
  const riskScore = redFlags?.risk_score ?? 0;
  const flags = redFlags?.flags ?? [];
  const [flagsPage, setFlagsPage] = useState(0);

  const rankedFlags = useMemo(() => rankRedFlags(flags), [flags]);
  const flagsTotalPages = Math.max(1, Math.ceil(rankedFlags.length / FLAGS_PER_PAGE));

  useEffect(() => {
    setFlagsPage((current) => Math.min(current, flagsTotalPages - 1));
  }, [flagsTotalPages]);

  useEffect(() => {
    setFlagsPage(0);
  }, [analysis?.analysis_id]);

  const pageFlags = useMemo(() => {
    const start = flagsPage * FLAGS_PER_PAGE;
    return rankedFlags.slice(start, start + FLAGS_PER_PAGE);
  }, [rankedFlags, flagsPage]);

  const sentimentWord = overallSentiment !== null ? sentimentLabel(overallSentiment) : null;
  const riskWord = redFlags ? riskLabel(riskScore) : null;

  const sortedTopics = [...topics].sort((a, b) => topicVolume(b) - topicVolume(a));
  const totalTopicVolume = topics.reduce((sum, topic) => sum + topicVolume(topic), 0);
  const topTopics = sortedTopics.slice(0, 6);

  const accountAgeDays = analysis?.organism_data?.accountAgeDays ?? organismData.accountAgeDays;
  const ageLabel = formatAge(accountAgeDays);
  const platformNames = platforms.map((p) => formatPlatform(p.platform));
  const dateRangeText =
    analysis?.date_range?.earliest && analysis?.date_range?.latest
      ? `${formatShortDate(analysis.date_range.earliest)} – ${formatShortDate(analysis.date_range.latest)}`
      : null;
  const dateRangeYears =
    analysis?.date_range?.earliest && analysis?.date_range?.latest
      ? `${new Date(analysis.date_range.earliest).getFullYear()} – ${new Date(analysis.date_range.latest).getFullYear()}`
      : null;

  const isEmpty =
    history.status === "empty" || (!analysis && latestStatus !== "loading" && !analysisLoading);
  const isPageLoading = latestStatus === "loading" || analysisLoading;

  return (
    <OceanPageFrame scenic wide animated>
      {showBanner ? (
        <div className="mb-6">
          <DataStatusBanner status="error" error={latestError} onRetry={() => void reloadLatest()} />
        </div>
      ) : null}

      <PageLoadingOverlay loading={isPageLoading} className="min-h-[60vh]">
      <PageHeader>
        <PageTitle>Your Profile Breakdown</PageTitle>
      </PageHeader>

      <AnalysisSnapshotBar
        className="mb-4"
        analyses={history.analyses}
        analysis={analysis}
        onSelect={selectAnalysis}
      />

      {!isLatest && analysis ? (
        <OlderSnapshotBanner
          className="mb-4"
          analysis={analysis}
          postsDeltaFromLatest={postsDeltaFromLatest}
          onViewLatest={selectLatest}
        />
      ) : null}

      {isEmpty ? (
        <section className={cn(EXHIBIT_PANEL, "p-8 text-center")}>
          <p className="text-muted-foreground">Insights unavailable. Go to Upload to build your first coral reef.</p>
          <Link to="/upload" className="mt-6 inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition">
            Upload
          </Link>
        </section>
      ) : (
        <div className="space-y-6">

          {analysis ? (
            <section className={INSIGHTS_PANEL}>
              <ExhibitSectionLabel className={INSIGHTS_SECTION_GAP}>Profile overview</ExhibitSectionLabel>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <HeroStat value={ageLabel} label="Footprint age" color="neutral" />
                <HeroStat
                  value={platforms.length > 0 ? String(platforms.length) : "—"}
                  label="Platforms"
                  sub={platformNames.length > 0 ? platformNames.join(", ") : null}
                  color="neutral"
                />
                <HeroStat
                  value={analysis.post_count.toLocaleString()}
                  label="Total posts"
                  sub="in this run"
                  color="neutral"
                />
                <HeroStat
                  value={dateRangeYears ?? "—"}
                  label="Date range"
                  sub={dateRangeText}
                  color="neutral"
                />
              </div>
            </section>
          ) : null}

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className={INSIGHTS_PANEL}>
                <ExhibitSectionLabel className={INSIGHTS_SECTION_GAP}>Persona Summary</ExhibitSectionLabel>
                <div className="grid grid-cols-3 gap-4">
                  <HeroStat value={overallSentiment !== null ? formatSentiment(overallSentiment) : "-"}
                    label="Overall Sentiment" sub={sentimentWord}
                    color={overallSentiment !== null && overallSentiment < -0.3 ? "danger" : "good"} />
                  <HeroStat value={redFlags ? String(riskScore) : "-"} label="Employment Risk"
                    sub={riskWord ? `${riskWord} risk` : null}
                    color={riskScore > 50 ? "danger" : riskScore > 30 ? "warn" : "good"} />
                  <HeroStat value={String(topics.length)} label="Topics Tracked" sub="across all platforms" color="good" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <div className={cn(INSIGHTS_PANEL, "h-full")}>
                <ExhibitSectionLabel className={INSIGHTS_SECTION_GAP}>Top Topics</ExhibitSectionLabel>
                {topTopics.length === 0 ? (
                  <p className={INSIGHTS_BODY_MUTED}>No topics yet.</p>
                ) : (
                  <div className="space-y-4">
                    {topTopics.map((t, i) => {
                      const volume = topicVolume(t);
                      const sharePct = totalTopicVolume > 0 ? (volume / totalTopicVolume) * 100 : 0;
                      const sentiment = t.sentiment ?? 0;
                      const barColor = sentiment > 0.3 ? "var(--sentiment-positive)" : sentiment < -0.1 ? "var(--sentiment-negative)" : "var(--sentiment-neutral)";
                      return (
                        <div key={t.name}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={cn(INSIGHTS_META, "w-4 shrink-0 font-semibold")}>{String(i + 1).padStart(2, "0")}</span>
                              <span className={cn(INSIGHTS_ROW_LABEL, "truncate")}>{capitalizeFirst(t.name)}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className={cn(INSIGHTS_ROW_VALUE, "text-foreground")}>{Math.round(sharePct)}%</span>
                              <span className={cn(
                                INSIGHTS_ROW_VALUE,
                                sentiment > 0.3 ? "text-sentiment-positive" : sentiment < -0.1 ? "text-sentiment-negative" : "text-sentiment-neutral",
                              )}>
                                {sentimentLabel(sentiment)}
                              </span>
                            </div>
                          </div>
                          <div className="h-2 rounded-full bg-background/60 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${sharePct}%`, background: barColor }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className={cn(INSIGHTS_PANEL, "flex h-full flex-col")}>
                <ExhibitSectionLabel className={INSIGHTS_SECTION_GAP}>Sentiment</ExhibitSectionLabel>
                <div className="grid grid-cols-3 gap-4">
                  <SentimentStat
                    value={sentimentSummary ? formatSentimentRatio(getSentimentRatio(sentimentSummary, "positive")) : "-"}
                    label="Positive"
                    valueClassName="text-sentiment-positive"
                  />
                  <SentimentStat
                    value={sentimentSummary ? formatSentimentRatio(getSentimentRatio(sentimentSummary, "neutral")) : "-"}
                    label="Neutral"
                    valueClassName="text-sentiment-neutral"
                  />
                  <SentimentStat
                    value={sentimentSummary ? formatSentimentRatio(getSentimentRatio(sentimentSummary, "negative")) : "-"}
                    label="Negative"
                    valueClassName="text-sentiment-negative"
                  />
                </div>

                <div className="mt-6 border-t border-foreground/10 pt-5">
                  <p className={cn(INSIGHTS_SUBSECTION, "mb-3")}>By platform</p>
                  {platforms.length === 0 ? (
                    <p className={INSIGHTS_BODY_MUTED}>No platform data yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {platforms.map((p) => {
                        const score = p.compound;
                        const color =
                          score > 0.05
                            ? "var(--sentiment-positive)"
                            : score < -0.05
                              ? "var(--sentiment-negative)"
                              : "var(--sentiment-neutral)";
                        const pct = ((score + 1) / 2) * 100;
                        return (
                          <div key={p.platform}>
                            <div className="flex items-center justify-between mb-1">
                              <span className={INSIGHTS_ROW_LABEL}>{formatPlatform(p.platform)}</span>
                              <span className={INSIGHTS_ROW_VALUE} style={{ color }}>
                                {formatSentiment(score)}
                              </span>
                            </div>
                            <div className="h-2 rounded-full bg-background/60 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{ width: `${Math.max(pct, 2)}%`, background: color }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={INSIGHTS_PANEL}>
            <ExhibitSectionLabel className={INSIGHTS_SECTION_GAP}>Red Flags</ExhibitSectionLabel>
            <div className="mb-2 flex items-center justify-between gap-4">
              <span className={INSIGHTS_META}>{flags.length} flagged</span>
              <div className={cn("flex items-center gap-3", INSIGHTS_META)}>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> High</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sentiment-neutral" /> Med</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Low</span>
              </div>
            </div>
            {flags.length === 0 ? (
              <p className={cn(INSIGHTS_BODY_MUTED, "mt-4")}>
                No red flags detected{analysis ? "" : " yet"}. Your online presence looks clean.
              </p>
            ) : (
              <>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {pageFlags.map((f, i) => {
                    const severity = severityForFlag(f.type, f.compound);
                    return (
                      <div key={`${f.type}-${flagsPage}-${i}`} className={cn(INSIGHTS_INSET, "p-4")}>
                        <div className="flex items-center gap-2.5">
                          <span className={`h-2 w-2 rounded-full ${severityDot[severity]}`} />
                          <span className={INSIGHTS_ROW_LABEL}>
                            {capitalizeFirst(f.type.replace(/_/g, " "))}
                          </span>
                          {f.topic ? (
                            <span className={cn(INSIGHTS_META, "ml-auto")}>in {f.topic}</span>
                          ) : null}
                        </div>
                        {f.excerpt ? (
                          <blockquote className={cn(INSIGHTS_BODY, "mt-2.5 border-l-2 border-primary/30 pl-3 italic text-foreground/75")}>
                            &ldquo;{f.excerpt}&rdquo;
                          </blockquote>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <div className={cn("mt-3 flex items-center justify-center gap-2", INSIGHTS_META)}>
                  <button
                    type="button"
                    disabled={flagsPage === 0 || flagsTotalPages <= 1}
                    onClick={() => setFlagsPage((p) => Math.max(0, p - 1))}
                    className="inline-flex size-7 items-center justify-center border border-foreground/20 bg-background/60 transition hover:border-foreground/35 disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Previous red flags page"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="min-w-[6.5rem] text-center">
                    Showing page {flagsPage + 1}/{flagsTotalPages}
                  </span>
                  <button
                    type="button"
                    disabled={flagsPage >= flagsTotalPages - 1 || flagsTotalPages <= 1}
                    onClick={() => setFlagsPage((p) => Math.min(flagsTotalPages - 1, p + 1))}
                    className="inline-flex size-7 items-center justify-center border border-foreground/20 bg-background/60 transition hover:border-foreground/35 disabled:pointer-events-none disabled:opacity-35"
                    aria-label="Next red flags page"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      )}
      </PageLoadingOverlay>
    </OceanPageFrame>
  );
}

function HeroStat({ value, label, sub, color }: {
  value: string;
  label: string;
  sub?: string | null;
  color: "good" | "warn" | "danger" | "neutral";
}) {
  const colorClasses = {
    good: "text-accent",
    warn: "text-sentiment-neutral",
    danger: "text-primary",
    neutral: "text-foreground",
  };
  return (
    <div className={cn(INSIGHTS_INSET, "p-3.5")}>
      <div className={cn(INSIGHTS_STAT_VALUE, colorClasses[color])}>{value}</div>
      <div className={cn(INSIGHTS_STAT_LABEL, "mt-1")}>{label}</div>
      {sub ? <div className={cn(INSIGHTS_STAT_SUB, "mt-0.5")}>{sub}</div> : null}
    </div>
  );
}

function SentimentStat({
  value,
  label,
  valueClassName,
}: {
  value: string;
  label: string;
  valueClassName: string;
}) {
  return (
    <div className={cn(INSIGHTS_INSET, "p-3.5")}>
      <div className={cn(INSIGHTS_STAT_VALUE, valueClassName)}>{value}</div>
      <div className={cn(INSIGHTS_STAT_LABEL, "mt-1")}>{label}</div>
    </div>
  );
}
