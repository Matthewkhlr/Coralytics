import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getShare } from "@/api/client";
import { OrganismViewport } from "@/components/OrganismViewport";
import { formatPlatform } from "@/lib/format";
import {
  formatSentiment,
  formatSentimentRatio,
  getSentimentRatio,
  resolveOrganismData,
} from "@/lib/organismData";

export function RecruiterViewPage() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [share, setShare] = useState<Awaited<ReturnType<typeof getShare>> | null>(null);

  useEffect(() => {
    if (!token) return;
    void getShare(token)
      .then(setShare)
      .catch((err) => setError(err instanceof Error ? err.message : "Share not found."))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <main className="min-h-screen bg-ocean-radial flex items-center justify-center px-6">
        <p className="text-muted-foreground">Loading shared coral…</p>
      </main>
    );
  }

  if (error || !share) {
    return (
      <main className="min-h-screen bg-ocean-radial flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-primary">{error ?? "Share not found."}</p>
          <Link to="/" className="mt-4 inline-block text-sm text-accent hover:underline">
            Back to Coralytics
          </Link>
        </div>
      </main>
    );
  }

  const analysis = share.payload;
  const { data: organismData } = resolveOrganismData(analysis.organism_data);
  const sentiment = analysis.sentiment_summary;

  return (
    <main className="min-h-screen bg-ocean-radial">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-8">
          <Link to="/" className="flex items-center gap-2.5 mb-6 w-fit">
            <span
              className="w-8 h-8 rounded-md border border-dashed border-border/60 bg-card/40"
              aria-label="Logo placeholder"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Coralytics
            </span>
          </Link>
          <div className="text-accent text-sm font-bold tracking-[0.2em]">SHARED PERSONA</div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">Candidate coral preview</h1>
          {analysis.persona_summary ? (
            <p className="mt-3 text-muted-foreground max-w-2xl">{analysis.persona_summary}</p>
          ) : null}
        </header>

        <div className="grid grid-cols-12 gap-4">
          <article className="col-span-12 lg:col-span-7 rounded-2xl border border-border/60 bg-card p-4 h-[520px]">
            <OrganismViewport data={organismData} dataSource="analysis" appearance="dark" />
          </article>

          <article className="col-span-12 lg:col-span-5 rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="font-semibold">At a glance</h2>
            <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-background/40 border border-border/60 p-3">
                <dd className="text-2xl font-bold text-accent">{analysis.post_count}</dd>
                <dt className="text-xs text-muted-foreground mt-0.5">Posts</dt>
              </div>
              <div className="rounded-xl bg-background/40 border border-border/60 p-3">
                <dd className="text-2xl font-bold text-accent">
                  {formatSentiment(sentiment?.compound)}
                </dd>
                <dt className="text-xs text-muted-foreground mt-0.5">Sentiment</dt>
              </div>
              <div className="rounded-xl bg-background/40 border border-border/60 p-3">
                <dd className="text-2xl font-bold text-primary">
                  {analysis.red_flags?.risk_score ?? "—"}
                </dd>
                <dt className="text-xs text-muted-foreground mt-0.5">Risk</dt>
              </div>
            </dl>

            {sentiment ? (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Tone mix
                </h3>
                <dl className="mt-2 grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <dt className="text-muted-foreground text-xs">Positive</dt>
                    <dd>{formatSentimentRatio(getSentimentRatio(sentiment, "positive"))}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Neutral</dt>
                    <dd>{formatSentimentRatio(getSentimentRatio(sentiment, "neutral"))}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">Negative</dt>
                    <dd>{formatSentimentRatio(getSentimentRatio(sentiment, "negative"))}</dd>
                  </div>
                </dl>
              </div>
            ) : null}

            {analysis.topics?.length ? (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Top topics
                </h3>
                <ul className="mt-2 space-y-2">
                  {analysis.topics.map((topic) => (
                    <li
                      key={topic.name}
                      className="flex items-center justify-between text-sm rounded-lg bg-background/40 px-3 py-2"
                    >
                      <span>{topic.name}</span>
                      <span className="text-muted-foreground">
                        {topic.postVolume ?? topic.count ?? 0} posts
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {analysis.platform_breakdown?.length ? (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  By platform
                </h3>
                <ul className="mt-2 space-y-2">
                  {analysis.platform_breakdown.map((row) => (
                    <li
                      key={row.platform}
                      className="flex items-center justify-between text-sm rounded-lg bg-background/40 px-3 py-2"
                    >
                      <span>{formatPlatform(row.platform)}</span>
                      <span className="text-muted-foreground">{row.post_count} posts</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        </div>
      </div>
    </main>
  );
}
