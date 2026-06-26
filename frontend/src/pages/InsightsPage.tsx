import { DEMO_USER_ID } from "../api/config";
import { DataStatusBanner } from "../components/DataStatusBanner";
import { useLatestAnalysis } from "../hooks/useLatestAnalysis";
import { formatSentiment } from "../lib/organismData";

export function InsightsPage() {
  const { status, analysis, error, reload } = useLatestAnalysis(DEMO_USER_ID);
  const showBanner = status === "loading" || status === "empty" || status === "error";
  const topics = analysis?.topics ?? [];
  const sentiment = analysis?.sentiment_summary;

  return (
    <section className="insights-page" aria-label="Insights">
      <header className="page-header">
        <p className="section-kicker">Insights</p>
        <h1>Topic & sentiment breakdown</h1>
        <p className="page-lead">
          Topics and sentiment scores will populate once NLP is integrated on the backend.
        </p>
      </header>

      {showBanner ? (
        <div className="page-banner-wrap">
          <DataStatusBanner status={status} error={error} onRetry={reload} />
        </div>
      ) : null}

      <div className="insights-grid">
        <article className="metric-panel">
          <p>Overall sentiment</p>
          <strong>{formatSentiment(sentiment?.compound)}</strong>
          <span>Compound score from VADER (when available)</span>
        </article>

        <article className="metric-panel">
          <p>Posts in analysis</p>
          <strong>{analysis?.post_count ?? "—"}</strong>
          <span>From your latest analysis run</span>
        </article>

        <article className="topics-panel">
          <p className="section-kicker">Topics</p>
          <h2>Detected themes</h2>
          {topics.length === 0 ? (
            <p className="panel-empty">
              No topics yet. Upload an export and run analysis — results will appear here
              when TF-IDF clustering is enabled.
            </p>
          ) : (
            <ul className="topics-list">
              {topics.map((topic) => (
                <li key={topic.name}>
                  <span>{topic.name}</span>
                  <span>{topic.postVolume ?? topic.weight ?? 0} posts</span>
                  <span>{formatSentiment(topic.sentiment)}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        {sentiment ? (
          <article className="sentiment-panel">
            <p className="section-kicker">Sentiment mix</p>
            <h2>Tone distribution</h2>
            <dl className="summary-grid">
              <div>
                <dt>Positive</dt>
                <dd>{formatSentiment(sentiment.positive)}</dd>
              </div>
              <div>
                <dt>Neutral</dt>
                <dd>{formatSentiment(sentiment.neutral)}</dd>
              </div>
              <div>
                <dt>Negative</dt>
                <dd>{formatSentiment(sentiment.negative)}</dd>
              </div>
            </dl>
          </article>
        ) : null}
      </div>
    </section>
  );
}
