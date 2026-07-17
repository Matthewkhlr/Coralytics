import { Link } from "react-router-dom";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { DataStatusBanner } from "@/components/DataStatusBanner";
import { PageDescription, PageHeader, PageShell, PageTitle, SectionTitle } from "@/components/PageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useLatestAnalysis } from "@/hooks/useLatestAnalysis";
import { formatPlatform } from "@/lib/format";
import { formatAnalysisDiff, formatSentiment, resolveOrganismData } from "@/lib/organismData";

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

const severityStyles = {
  high: "bg-primary/20 text-primary border-primary/50",
  medium: "bg-sentiment-neutral/20 text-sentiment-neutral border-sentiment-neutral/40",
  low: "bg-accent/20 text-accent border-accent/40",
} as const;

function topicVolume(t: { postVolume?: number; count?: number }) {
  return t.postVolume ?? t.count ?? 0;
}

function GuestInsightsPage() {
  return (
    <PageShell>
      <PageHeader>
        <PageTitle className="text-white">What your reef is telling you.</PageTitle>
        <PageDescription>
          After you save a run, Insights surfaces persona summary, topics, sentiment, red flags, and
          branding next steps.
        </PageDescription>
      </PageHeader>
      <section className="rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 to-transparent p-8">
        <SectionTitle>Login to unlock insights</SectionTitle>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>· Plain-English persona read</li>
          <li>· Topic & platform breakdowns</li>
          <li>· Sentiment timeline and red-flag detection</li>
          <li>· Personal branding recommendations</li>
        </ul>
        <Link
          to="/login"
          className="mt-6 inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition"
        >
          Login to continue →
        </Link>
      </section>
    </PageShell>
  );
}

export function InsightsPage() {
  const { user } = useAuth();
  const { isGuest, withAuth } = useRequireAuth();
  const { status, analysis, error, reload } = useLatestAnalysis(user?.uid);
  const { data: organismData } = resolveOrganismData(analysis?.organism_data);

  if (isGuest) {
    return <GuestInsightsPage />;
  }

  const showBanner = status === "loading" || status === "error";
  const topics =
    analysis?.topics ??
    organismData.topics.map((t) => ({
      name: t.name,
      postVolume: t.postVolume,
      sentiment: t.sentiment,
    }));
  const platforms = analysis?.platform_breakdown ?? [];
  const timeline = (analysis?.sentiment_timeline ?? []).map((p) => ({
    month: formatPeriod(p.period),
    sentiment: p.compound,
  }));
  const platformChart = platforms.map((p) => ({
    platform: formatPlatform(p.platform),
    posts: p.post_count,
  }));
  const overallSentiment = analysis?.sentiment_summary?.compound ?? null;
  const redFlags = analysis?.red_flags;
  const riskScore = redFlags?.risk_score ?? 0;
  const flags = redFlags?.flags ?? [];
  const branding = analysis?.branding_recommendations ?? [];
  const evolution = analysis?.evolution;
  const turningPoints = evolution?.turning_points ?? [];
  const topicDrift = evolution?.topic_drift ?? [];
  const diffText = formatAnalysisDiff(analysis?.diff);
  const hasEvolution =
    turningPoints.length > 0 || topicDrift.length > 0 || Boolean(diffText);
  return (
    <PageShell>
      {showBanner ? (
        <div className="mb-6">
          <DataStatusBanner
            status={status === "loading" ? "loading" : "error"}
            error={error}
            onRetry={() => withAuth(() => void reload())}
          />
        </div>
      ) : null}

      <PageHeader>
        <PageTitle className="text-white">What your reef is telling you.</PageTitle>
      </PageHeader>

      {status === "empty" ? (
        <section className="rounded-2xl border border-border/60 bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Insights unavailable. Go to Upload to build your first coral reef.
          </p>
          <Link
            to="/upload"
            className="mt-6 inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition"
          >
            Upload →
          </Link>
        </section>
      ) : (
      <section className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-5 rounded-2xl border border-border/60 bg-card p-6 flex flex-col">
          <SectionTitle>Summary</SectionTitle>
          <p className="mt-4 text-lg leading-relaxed">
            {analysis?.persona_summary ??
              "Upload a social export to generate a plain-English read of your online persona."}
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <Stat
              label="Sentiment"
              value={overallSentiment !== null ? formatSentiment(overallSentiment) : "—"}
              tint="accent"
            />
            <Stat
              label="Risk score"
              value={redFlags ? String(riskScore) : "—"}
              tint={riskScore > 50 ? "primary" : "accent"}
            />
            <Stat label="Topics" value={String(topics.length)} tint="accent" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 lg:col-span-3 rounded-2xl border border-border/60 bg-card p-6">
          <SectionTitle>Employability risk</SectionTitle>
          <div className="mt-4 flex items-center justify-center">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  strokeWidth="10"
                  stroke="var(--muted)"
                  fill="none"
                  opacity="0.4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  strokeWidth="10"
                  stroke={
                    riskScore > 60
                      ? "var(--primary)"
                      : riskScore > 30
                        ? "var(--sentiment-neutral)"
                        : "var(--accent)"
                  }
                  fill="none"
                  strokeDasharray={`${(riskScore / 100) * 264} 264`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl font-bold">{redFlags ? riskScore : "—"}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">/ 100</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 rounded-2xl border border-border/60 bg-card p-6">
          <SectionTitle>Top topics</SectionTitle>
          <div className="mt-4 space-y-3">
            {topics.length === 0 ? (
              <p className="text-sm text-muted-foreground">No topics yet.</p>
            ) : (
              topics
                .slice()
                .sort((a, b) => topicVolume(b) - topicVolume(a))
                .slice(0, 6)
                .map((t) => {
                  const volume = topicVolume(t);
                  const max = Math.max(...topics.map(topicVolume), 1);
                  const pct = (volume / max) * 100;
                  const sentiment = t.sentiment ?? 0;
                  const color =
                    sentiment > 0.3
                      ? "var(--sentiment-positive)"
                      : sentiment < -0.1
                        ? "var(--sentiment-negative)"
                        : "var(--sentiment-neutral)";
                  return (
                    <div key={t.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{t.name}</span>
                        <span className="text-muted-foreground">
                          {volume} · {formatSentiment(sentiment)}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 rounded-full bg-background/60 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: color }}
                        />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-5 rounded-2xl border border-border/60 bg-card p-6">
          <SectionTitle>Platform breakdown</SectionTitle>
          {platformChart.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground text-center">
              Platform stats appear after analysis.
            </p>
          ) : (
            <>
              <div className="h-48 mt-2">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={platformChart}
                      dataKey="posts"
                      nameKey="platform"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {platformChart.map((_, i) => (
                        <Cell key={i} fill={chartColors[i % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        borderRadius: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 justify-center text-xs">
                {platformChart.map((b, i) => (
                  <span key={b.platform} className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: chartColors[i % chartColors.length] }}
                    />
                    {b.platform} · {b.posts}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-7 rounded-2xl border border-border/60 bg-card p-6">
          <SectionTitle>Sentiment over time</SectionTitle>
          {timeline.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">Timeline appears after analysis.</p>
          ) : (
            <div className="h-48 mt-3">
              <ResponsiveContainer>
                <AreaChart data={timeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5cbdb9" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#5cbdb9" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#8ea2b0", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sentiment"
                    stroke="#5cbdb9"
                    strokeWidth={2.5}
                    fill="url(#sg)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="col-span-12 rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex items-center justify-between">
            <SectionTitle>Red flag detection</SectionTitle>
            <span className="text-xs text-muted-foreground">{flags.length} flagged</span>
          </div>
          {flags.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">
              No red flags detected{analysis ? "" : " yet"}.
            </p>
          ) : (
            <div className="mt-4 grid md:grid-cols-2 gap-3">
              {flags.map((f, i) => {
                const severity = severityForFlag(f.type, f.compound);
                return (
                  <div
                    key={`${f.type}-${i}`}
                    className="rounded-xl border border-border/50 bg-background/40 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border uppercase font-bold tracking-wider ${severityStyles[severity]}`}
                      >
                        {severity}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {f.type.replace(/_/g, " ")}
                        {f.topic ? ` · ${f.topic}` : ""}
                      </span>
                    </div>
                    {f.excerpt ? (
                      <blockquote className="mt-3 text-sm border-l-2 border-primary/50 pl-3 italic">
                        &ldquo;{f.excerpt}&rdquo;
                      </blockquote>
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="col-span-12 rounded-2xl border border-border/60 bg-card p-6">
          <SectionTitle>Persona evolution</SectionTitle>
          <p className="text-xs text-muted-foreground mt-1">
            How this run compares to the previous snapshot
          </p>

          {!hasEvolution ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Save another run to see how your reef evolves.
            </p>
          ) : (
            <div className="mt-6 space-y-8">
              {diffText ? (
                <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm">
                  <div className="text-xs font-bold tracking-[0.2em] text-accent">VS PREVIOUS RUN</div>
                  <p className="mt-2">{diffText}</p>
                  {analysis?.diff ? (
                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>
                        Posts delta: {analysis.diff.posts_delta > 0 ? "+" : ""}
                        {analysis.diff.posts_delta}
                      </span>
                      <span>
                        Account age delta:{" "}
                        {analysis.diff.account_age_delta_days > 0 ? "+" : ""}
                        {analysis.diff.account_age_delta_days} days
                      </span>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {topicDrift.length > 0 ? (
                <div>
                  <div className="text-xs font-bold tracking-[0.2em] text-accent">TOPIC DRIFT</div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {topicDrift.map((item) => (
                      <li
                        key={`${item.topic}-${item.trend}`}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${
                          item.trend === "emerging"
                            ? "border-accent/50 bg-accent/15 text-foreground"
                            : "border-border bg-background/50 text-muted-foreground"
                        }`}
                      >
                        {item.topic} · {item.trend}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {turningPoints.length > 0 ? (
                <div>
                  <div className="text-xs font-bold tracking-[0.2em] text-accent">
                    SENTIMENT TURNING POINTS
                  </div>
                  <div className="mt-8 relative">
                    <div className="absolute left-0 right-0 top-4 h-0.5 bg-border" />
                    <div
                      className="grid"
                      style={{
                        gridTemplateColumns: `repeat(${turningPoints.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {turningPoints.map((tp, i) => (
                        <div key={`${tp.period}-${i}`} className="relative pt-10">
                          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background" />
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground">{tp.period}</div>
                            <p className="text-sm text-muted-foreground mt-1 px-3">
                              {tp.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="col-span-12 rounded-2xl border border-border/60 bg-gradient-to-br from-accent/10 to-transparent p-6">
          <div className="text-accent text-xs font-bold tracking-[0.2em]">PERSONAL BRANDING</div>
          <SectionTitle className="mt-2">Actionable next steps</SectionTitle>
          {branding.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Branding recommendations appear after analysis.
            </p>
          ) : (
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {branding.map((r, i) => (
                <div key={r} className="rounded-xl bg-card p-4 border border-border/60">
                  <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 text-accent flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <p className="mt-3 text-sm">{r}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      )}
    </PageShell>
  );
}

function Stat({
  label,
  value,
  tint,
}: {
  label: string;
  value: string;
  tint: "primary" | "accent";
}) {
  return (
    <div className="rounded-xl bg-background/40 border border-border/60 p-3">
      <div className={`text-2xl font-bold ${tint === "primary" ? "text-primary" : "text-accent"}`}>
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
