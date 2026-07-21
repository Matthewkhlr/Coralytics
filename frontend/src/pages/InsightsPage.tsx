import { Link } from "react-router-dom";
import { AnalysisSnapshotBar } from "@/components/AnalysisSnapshotBar";
import { DataStatusBanner } from "@/components/DataStatusBanner";
import { OlderSnapshotBanner } from "@/components/OlderSnapshotBanner";
import { PageLoadingOverlay } from "@/components/PageLoadingOverlay";
import { OceanPageFrame, PageDescription, PageHeader, PageTitle } from "@/components/PageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useSelectedAnalysis } from "@/hooks/useSelectedAnalysis";
import { formatPlatform, formatShortDate } from "@/lib/format";
import { formatAnalysisDiff, formatSentiment, formatSentimentRatio, getSentimentRatio, resolveOrganismData } from "@/lib/organismData";
import { cn } from "@/lib/utils";

const chartColors = ["#ff6b6b", "#5cbdb9", "#e8c07a", "#a78bfa"];

function formatPeriod(period: string) {
  const [year, month] = period.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  if (Number.isNaN(date.getTime())) return period;
  return date.toLocaleDateString(undefined, { month: "short", year: "numeric" });
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

function PlatformDonut({ data }: { data: { platform: string; pct: number; posts: number }[] }) {
  if (data.length === 0) return null;
  const r = 58;
  const circumference = 2 * Math.PI * r;

  return (
    <svg viewBox="0 0 150 150" className="h-full w-full" role="img" aria-label="Platform distribution">
      {data.map((row, i) => {
        const dash = (row.pct / 100) * circumference;
        const gap = circumference - dash;
        const offset = data.slice(0, i).reduce((sum, s) => sum + (s.pct / 100) * circumference, 0);
        return (
          <circle
            key={row.platform}
            cx="75" cy="75" r={r}
            fill="none"
            stroke={chartColors[i % chartColors.length]}
            strokeWidth="18"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            transform="rotate(-90 75 75)"
          />
        );
      })}
      <text x="75" y="68" textAnchor="middle" className="fill-foreground text-[22px] font-bold" fontFamily="var(--font-display)">
        {data.reduce((s, r) => s + r.posts, 0)}
      </text>
      <text x="75" y="90" textAnchor="middle" className="fill-muted-foreground text-[10px]" fontFamily="var(--font-sans)">
        total posts
      </text>
    </svg>
  );
}

function SentimentSparkline({ data }: { data: { month: string; sentiment: number }[] }) {
  if (data.length === 0) return null;

  const w = 280;
  const h = 80;
  const px = 10;
  const py = 8;
  const cw = w - px * 2;
  const ch = h - py * 2;
  const vals = data.map((d) => d.sentiment);
  const min = Math.min(-1, ...vals);
  const max = Math.max(1, ...vals);
  const range = max - min || 1;

  const pts = data.map((d, i) => ({
    x: px + (data.length === 1 ? cw / 2 : (i / (data.length - 1)) * cw),
    y: py + ((max - d.sentiment) / range) * ch,
    ...d,
  }));

  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${line}L${pts[pts.length - 1].x},${h - py}L${pts[0].x},${h - py}Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" role="img" aria-label="Sentiment trend">
      <path d={area} fill="var(--accent)" opacity="0.1" />
      <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.filter((_, i) => i === 0 || i === pts.length - 1).map((p) => (
        <circle key={p.month} cx={p.x} cy={p.y} r="3" fill="var(--accent)" stroke="var(--card)" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function ActivityBars({ data }: { data: { month: string; count: number }[] }) {
  if (data.length === 0) return null;
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const BAR_MAX_HEIGHT = 64; // px, matches h-16
  return (
    <div className="flex items-end gap-[3px] h-16">
      {data.map((d) => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-0.5 group relative h-full justify-end">
          <div
            className="w-full rounded-t-sm transition-all bg-accent/60 hover:bg-accent"
            style={{ height: `${(d.count / maxCount) * BAR_MAX_HEIGHT}px`, minHeight: d.count > 0 ? 4 : 0 }}
          />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {d.count}
          </div>
        </div>
      ))}
    </div>
  );
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
  const rawTimeline = analysis?.sentiment_timeline ?? [];
  const timeline = rawTimeline.map((p) => ({ month: formatPeriod(p.period), sentiment: p.compound }));
  const activityData = rawTimeline.map((p) => ({ month: formatPeriod(p.period), count: p.post_count }));
  const totalPosts = platforms.reduce((s, p) => s + p.post_count, 0);
  const platformChart = platforms.map((p) => ({
    platform: formatPlatform(p.platform),
    pct: totalPosts > 0 ? Math.round((p.post_count / totalPosts) * 100) : 0,
    posts: p.post_count,
  }));
  const overallSentiment = analysis?.sentiment_summary?.compound ?? null;
  const sentimentSummary = analysis?.sentiment_summary;
  const redFlags = analysis?.red_flags;
  const riskScore = redFlags?.risk_score ?? 0;
  const flags = redFlags?.flags ?? [];
  const branding = analysis?.branding_recommendations ?? [];
  const evolution = analysis?.evolution;
  const turningPoints = evolution?.turning_points ?? [];
  const topicDrift = evolution?.topic_drift ?? [];
  const diffText = formatAnalysisDiff(analysis?.diff);
  const hasEvolution = turningPoints.length > 0 || topicDrift.length > 0 || Boolean(diffText);
  const flaggedCount = redFlags?.flagged_post_count ?? 0;
  const flaggedPct = analysis?.post_count ? Math.round((flaggedCount / analysis.post_count) * 100) : 0;

  const sentimentWord = overallSentiment !== null ? sentimentLabel(overallSentiment) : null;
  const riskWord = redFlags ? riskLabel(riskScore) : null;

  const sortedTopics = [...topics].sort((a, b) => topicVolume(b) - topicVolume(a));
  const maxVolume = Math.max(...topics.map(topicVolume), 1);
  const topTopics = sortedTopics.slice(0, 6);

  const healthTopics = [...topics]
    .map((t) => ({ name: t.name, volume: topicVolume(t), sentiment: t.sentiment ?? 0 }))
    .sort((a, b) => {
      if (a.sentiment < -0.1 && b.sentiment >= -0.1) return -1;
      if (a.sentiment >= -0.1 && b.sentiment < -0.1) return 1;
      return b.volume - a.volume;
    });

  const accountAgeDays = analysis?.organism_data?.accountAgeDays ?? organismData.accountAgeDays;
  const ageLabel = formatAge(accountAgeDays);

  const isEmpty = !analysis && latestStatus !== "loading";
  const isPageLoading = latestStatus === "loading" || analysisLoading;

  return (
    <OceanPageFrame>
      {showBanner ? (
        <div className="mb-6">
          <DataStatusBanner status="error" error={latestError} onRetry={() => void reloadLatest()} />
        </div>
      ) : null}

      <PageLoadingOverlay loading={isPageLoading} className="min-h-[60vh]">
      <PageHeader>
        <PageTitle>What your reef is telling you.</PageTitle>
        <PageDescription>
          A plain-English breakdown of your online persona, topics people associate with you, how
          sentiment has shifted, and which posts may need attention.
        </PageDescription>
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
        <section className="rounded-2xl border border-border/60 bg-card p-8 text-center">
          <p className="text-muted-foreground">Insights unavailable. Go to Upload to build your first coral reef.</p>
          <Link to="/upload" className="mt-6 inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition">
            Upload
          </Link>
        </section>
      ) : (
        <div className="space-y-6">

          {analysis ? (
            <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/5 to-transparent p-5">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-semibold text-foreground/80">Footprint age:</span> {ageLabel}
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-semibold text-foreground/80">Platforms:</span>
                  {platforms.length} ({platforms.map((p) => formatPlatform(p.platform)).join(", ")})
                </span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-semibold text-foreground/80">Total posts:</span> {analysis.post_count.toLocaleString()}
                </span>
                {flaggedCount > 0 ? (
                  <span className="flex items-center gap-2 text-primary">
                    <span className="font-semibold">Flagged:</span> {flaggedPct}% of posts
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-sentiment-positive">
                    <span className="font-semibold">Flagged:</span> None detected
                  </span>
                )}
                {analysis?.date_range?.earliest && analysis?.date_range?.latest ? (
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-semibold text-foreground/80">Date range:</span>
                    {formatShortDate(analysis.date_range.earliest)} - {formatShortDate(analysis.date_range.latest)}
                  </span>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <div className="rounded-2xl border border-border/60 bg-card p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    <span className="font-semibold text-accent">Persona Summary</span>
                    <span className="h-px flex-1 bg-border/60" />
                  </div>
                  <p className="text-xl leading-relaxed font-display text-foreground/90">
                    {analysis?.persona_summary ?? "Upload a social export to generate a plain-English read of your online persona."}
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4">
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
            <div className="col-span-12 md:col-span-6 lg:col-span-5">
              <div className="rounded-2xl border border-border/60 bg-card p-7 flex flex-col h-full">
                <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  <span className="font-semibold text-accent">Platform Mix</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                {platformChart.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-sm text-muted-foreground">No platform data yet.</p>
                  </div>
                ) : (
                  <>
                    <div className="h-40"><PlatformDonut data={platformChart} /></div>
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 mt-2">
                      {platformChart.map((b, i) => (
                        <span key={b.platform} className="flex items-center gap-1.5 text-xs">
                          <span className="w-2 h-2 rounded-full" style={{ background: chartColors[i % chartColors.length] }} />
                          <span className="text-foreground/80">{b.platform}</span>
                          <span className="text-muted-foreground">{b.pct}%</span>
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7">
              <div className="rounded-2xl border border-border/60 bg-card p-7 h-full">
                <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-5">
                  <span className="font-semibold text-accent">Top Topics</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                {topTopics.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No topics yet.</p>
                ) : (
                  <div className="space-y-4">
                    {topTopics.map((t, i) => {
                      const volume = topicVolume(t);
                      const pct = (volume / maxVolume) * 100;
                      const sentiment = t.sentiment ?? 0;
                      const barColor = sentiment > 0.3 ? "var(--sentiment-positive)" : sentiment < -0.1 ? "var(--sentiment-negative)" : "var(--sentiment-neutral)";
                      return (
                        <div key={t.name}>
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-xs font-bold text-muted-foreground w-4 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                              <span className="text-sm font-medium text-foreground truncate">{t.name}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-xs text-muted-foreground">{volume} posts</span>
                              <span className={`text-xs font-semibold ${sentiment > 0.3 ? "text-sentiment-positive" : sentiment < -0.1 ? "text-sentiment-negative" : "text-sentiment-neutral"}`}>
                                {sentimentLabel(sentiment)}
                              </span>
                            </div>
                          </div>
                          <div className="h-2 rounded-full bg-background/60 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: barColor }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              <div className="rounded-2xl border border-border/60 bg-card p-7 flex flex-col h-full">
                <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  <span className="font-semibold text-accent">Sentiment</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-background/50 border border-border/40 p-2.5">
                    <div className="text-sm font-bold text-sentiment-positive">{sentimentSummary ? formatSentimentRatio(getSentimentRatio(sentimentSummary, "positive")) : "-"}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Positive</div>
                  </div>
                  <div className="rounded-lg bg-background/50 border border-border/40 p-2.5">
                    <div className="text-sm font-bold text-sentiment-neutral">{sentimentSummary ? formatSentimentRatio(getSentimentRatio(sentimentSummary, "neutral")) : "-"}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Neutral</div>
                  </div>
                  <div className="rounded-lg bg-background/50 border border-border/40 p-2.5">
                    <div className="text-sm font-bold text-sentiment-negative">{sentimentSummary ? formatSentimentRatio(getSentimentRatio(sentimentSummary, "negative")) : "-"}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Negative</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                    <span>Trend over time</span>
                    {timeline.length > 0 && <span>{timeline[0].month} - {timeline[timeline.length - 1].month}</span>}
                  </div>
                  {timeline.length === 0 ? (
                    <div className="flex items-center justify-center py-6"><p className="text-xs text-muted-foreground">Timeline appears after analysis.</p></div>
                  ) : (
                    <div className="h-16"><SentimentSparkline data={timeline} /></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6">
              <div className="rounded-2xl border border-border/60 bg-card p-7 h-full">
                <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-4">
                  <span className="font-semibold text-accent">Platform Sentiment</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                {platforms.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No platform data yet.</p>
                ) : (
                  <div className="space-y-3">
                    {platforms.map((p) => {
                      const score = p.compound;
                      const color = score > 0.05 ? "var(--sentiment-positive)" : score < -0.05 ? "var(--sentiment-negative)" : "var(--sentiment-neutral)";
                      const pct = ((score + 1) / 2) * 100;
                      return (
                        <div key={p.platform}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium text-foreground">{formatPlatform(p.platform)}</span>
                            <span className="text-xs font-semibold" style={{ color }}>{formatSentiment(score)}</span>
                          </div>
                          <div className="h-2 rounded-full bg-background/60 overflow-hidden">
                            <div className="h-full rounded-full transition-all" style={{ width: `${Math.max(pct, 2)}%`, background: color }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div className="rounded-2xl border border-border/60 bg-card p-7 h-full">
                <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  <span className="font-semibold text-accent">Monthly Activity</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                <p className="text-xs text-muted-foreground mb-4">Posting frequency over time</p>
                {activityData.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Timeline appears after analysis.</p>
                ) : (
                  <>
                    <ActivityBars data={activityData} />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
                      <span>{activityData[0].month}</span>
                      <span>{activityData[activityData.length - 1].month}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {healthTopics.length > 0 ? (
            <div className="rounded-2xl border border-border/60 bg-card p-7">
              <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-1">
                <span className="font-semibold text-accent">Topic Health</span>
                <span className="h-px flex-1 bg-border/60" />
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Topics ranked by risk &mdash; high volume with negative sentiment needs attention
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
                {healthTopics.map((t) => {
                  const barColor = t.sentiment > 0.05 ? "var(--sentiment-positive)" : t.sentiment < -0.05 ? "var(--sentiment-negative)" : "var(--sentiment-neutral)";
                  const label = t.sentiment > 0.05 ? "Positive" : t.sentiment < -0.05 ? "Needs review" : "Neutral";
                  const labelColor = t.sentiment > 0.05 ? "text-sentiment-positive" : t.sentiment < -0.05 ? "text-primary" : "text-sentiment-neutral";
                  return (
                    <div key={t.name}
                      className={cn("rounded-xl border p-4 transition-colors",
                        t.sentiment < -0.05 ? "border-primary/30 bg-primary/5" : "border-border/50 bg-background/30")}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-foreground">{t.name}</span>
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${labelColor}`}>{label}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{t.volume} posts</span>
                        <span>{formatSentiment(t.sentiment)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-background/60 overflow-hidden">
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${Math.max((t.volume / maxVolume) * 100, 3)}%`, background: barColor }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl border border-border/60 bg-card p-7">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider">
                <span className="font-semibold text-accent">Red Flags</span>
                <span className="h-px w-12 bg-border/60" />
                <span className="font-medium">{flags.length} flagged</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> High</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sentiment-neutral" /> Med</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Low</span>
              </div>
            </div>
            {flags.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                No red flags detected{analysis ? "" : " yet"}. Your online presence looks clean.
              </p>
            ) : (
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                {flags.map((f, i) => {
                  const severity = severityForFlag(f.type, f.compound);
                  return (
                    <div key={`${f.type}-${i}`} className="rounded-xl border border-border/50 bg-background/40 p-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${severityDot[severity]}`} />
                        <span className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">{f.type.replace(/_/g, " ")}</span>
                        {f.topic ? <span className="text-[10px] text-muted-foreground ml-auto">in {f.topic}</span> : null}
                      </div>
                      {f.excerpt ? (
                        <blockquote className="mt-2.5 text-sm border-l-2 border-primary/30 pl-3 italic text-foreground/75 leading-relaxed">
                          &ldquo;{f.excerpt}&rdquo;
                        </blockquote>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-7">
              <div className="rounded-2xl border border-border/60 bg-card p-7 h-full">
                <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  <span className="font-semibold text-accent">Persona Evolution</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">How this run compares to the previous snapshot</p>
                {!hasEvolution ? (
                  <p className="mt-6 text-sm text-muted-foreground">Save another run to see how your reef evolves.</p>
                ) : (
                  <div className="mt-5 space-y-6">
                    {diffText ? (
                      <div className="rounded-xl border border-accent/25 bg-accent/8 px-4 py-3.5">
                        <div className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">Changes</div>
                        <p className="mt-1.5 text-sm text-foreground/85">{diffText}</p>
                        {analysis?.diff ? (
                          <div className="mt-2.5 flex flex-wrap gap-4 text-xs text-muted-foreground">
                            <span>Posts delta: {analysis.diff.posts_delta > 0 ? "+" : ""}{analysis.diff.posts_delta}</span>
                            <span>Account age delta: {analysis.diff.account_age_delta_days > 0 ? "+" : ""}{analysis.diff.account_age_delta_days} days</span>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {topicDrift.length > 0 ? (
                      <div>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-3">Topic Drift</div>
                        <div className="flex flex-wrap gap-2">
                          {topicDrift.map((item) => (
                            <span key={`${item.topic}-${item.trend}`}
                              className={cn("rounded-full border px-3 py-1 text-xs font-semibold",
                                item.trend === "emerging" ? "border-accent/50 bg-accent/12 text-foreground" : "border-border/60 bg-background/50 text-muted-foreground")}>
                              {item.topic} &middot; {item.trend}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {turningPoints.length > 0 ? (
                      <div>
                        <div className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-4">Sentiment Turning Points</div>
                        <div className="relative">
                          <div className="absolute left-0 right-0 top-3 h-0.5 bg-border/60" />
                          <div className="grid items-start"
                            style={{ gridTemplateColumns: `repeat(${turningPoints.length},minmax(0,1fr))` }}>
                            {turningPoints.map((tp, i) => (
                              <div key={`${tp.period}-${i}`} className="relative pt-8 text-center">
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent border-[3px] border-card" />
                                <div className="text-[10px] text-muted-foreground">{tp.period}</div>
                                <p className="text-xs text-foreground/70 mt-1 px-2 leading-relaxed">{tp.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-accent/8 to-transparent p-7 flex flex-col h-full">
                <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  <span className="font-semibold text-accent">Personal Branding</span>
                  <span className="h-px flex-1 bg-border/60" />
                </div>
                <p className="text-xs text-muted-foreground">Concrete actions to improve how you appear online</p>
                {branding.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <p className="text-sm text-muted-foreground">Branding recommendations appear after analysis.</p>
                  </div>
                ) : (
                  <div className="mt-5 space-y-3">
                    {branding.map((r, i) => (
                      <div key={r} className="flex gap-3 items-start">
                        <span className="mt-0.5 w-6 h-6 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center font-bold text-[11px] shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-foreground/85 leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
  color: "good" | "warn" | "danger";
}) {
  const colorClasses = { good: "text-accent", warn: "text-sentiment-neutral", danger: "text-primary" };
  return (
    <div className="rounded-xl bg-background/40 border border-border/50 p-3.5">
      <div className={`text-2xl font-bold font-display ${colorClasses[color]}`}>{value}</div>
      <div className="text-[11px] text-muted-foreground mt-0.5 font-medium">{label}</div>
      {sub ? <div className="text-[10px] text-foreground/50 mt-0.5">{sub}</div> : null}
    </div>
  );
}
