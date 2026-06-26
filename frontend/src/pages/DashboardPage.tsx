import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Download } from "lucide-react";
import { DEMO_USER_ID } from "../api/config";
import { DataStatusBanner } from "../components/DataStatusBanner";
import { OrganismViewport } from "../components/OrganismViewport";
import { useLatestAnalysis } from "../hooks/useLatestAnalysis";
import {
  formatImpactStrength,
  formatSentiment,
  resolveOrganismData,
} from "../lib/organismData";

export function DashboardPage() {
  const location = useLocation();
  const { status, analysis, error, reload } = useLatestAnalysis(DEMO_USER_ID);
  const { data: organismData, source: organismSource } = resolveOrganismData(
    analysis?.organism_data,
  );

  const postCount = analysis?.post_count ?? null;
  const sentimentValue = analysis?.sentiment_summary?.compound ?? null;
  const showBanner = status === "loading" || status === "empty" || status === "error";

  useEffect(() => {
    const state = location.state as { refreshAnalysis?: boolean } | null;
    if (state?.refreshAnalysis) {
      void reload();
    }
  }, [location.state, reload]);

  return (
    <>
      {showBanner ? (
        <div className="page-banner-wrap">
          <DataStatusBanner status={status} error={error} onRetry={reload} />
        </div>
      ) : null}

      <section className="content-grid" aria-label="Coralytics overview">
        <article className={`metric-panel${status === "loading" ? " metric-panel--loading" : ""}`}>
          <p>Impact strength</p>
          <strong>{formatImpactStrength(postCount)}</strong>
          <span>Based on posts in your latest analysis</span>
        </article>

        <article className={`metric-panel${status === "loading" ? " metric-panel--loading" : ""}`}>
          <p>Sentiment balance</p>
          <strong>{formatSentiment(sentimentValue)}</strong>
          <span>Average tone across uploads</span>
        </article>

        <section className="organism-panel" aria-label="3D coral visualiser">
          <div className="panel-heading">
            <div>
              <p className="section-kicker">Personalized 3D coral</p>
              <h1>My Coral</h1>
            </div>
            <button className="secondary-action" type="button" disabled>
              <Download size={17} />
              <span>Export</span>
            </button>
          </div>
          <OrganismViewport
            data={organismData}
            dataSource={organismSource}
            isLoading={status === "loading"}
          />
        </section>

        {analysis ? (
          <article className="summary-panel">
            <p className="section-kicker">Latest analysis</p>
            <h2>Analysis snapshot</h2>
            <dl className="summary-grid">
              <div>
                <dt>Posts</dt>
                <dd>{analysis.post_count}</dd>
              </div>
              <div>
                <dt>Topics</dt>
                <dd>{analysis.topics.length}</dd>
              </div>
              <div>
                <dt>Uploads used</dt>
                <dd>{analysis.upload_ids?.length ?? 0}</dd>
              </div>
              <div>
                <dt>Coral data</dt>
                <dd>{organismSource === "analysis" ? "From analysis" : "Sample preview"}</dd>
              </div>
            </dl>
          </article>
        ) : null}
      </section>
    </>
  );
}
