import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { createShare, getAnalysis, listPostsByTopic } from "@/api/client";
import type { Analysis, PostSummary } from "@/api/types";
import { DataStatusBanner } from "@/components/DataStatusBanner";
import {
  OrganismViewport,
  type OrganismViewportHandle,
} from "@/components/OrganismViewport";
import { PageHeader, PageShell, PageTitle, PageDescription, SectionTitle } from "@/components/PageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useLatestAnalysis } from "@/hooks/useLatestAnalysis";
import { useAnalysisHistory } from "@/hooks/useAnalysisHistory";
import { useUploads } from "@/hooks/useUploads";
import { formatPlatform, formatRunLabel, formatShortDate } from "@/lib/format";
import {
  formatAnalysisDiff,
  formatSentiment,
  organismDataForPlatform,
  resolveOrganismData,
  SAMPLE_ORGANISM_DATA,
} from "@/lib/organismData";
import { cn } from "@/lib/utils";

type DashboardNavState = {
  analysisId?: string;
  showDiff?: boolean;
};

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

function GuestDashboardPage() {
  return (
    <PageShell>
      <PageHeader>
        <PageTitle>Explore Your Reef</PageTitle>
        <PageDescription>
          Preview a sample coral below. Login to load your own runs, inspect branches, and share a
          link.
        </PageDescription>
        <Link
          to="/login"
          className="mt-4 inline-flex px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition"
        >
          Login to see your coral →
        </Link>
      </PageHeader>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-2xl overflow-hidden border border-border/50 bg-card/40 h-[620px] p-2">
            <OrganismViewport
              data={SAMPLE_ORGANISM_DATA}
              dataSource="sample"
              appearance="dark"
            />
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">Sample reef · not your data</p>
        </div>
        <aside className="col-span-12 lg:col-span-4 rounded-2xl border border-border/60 bg-card p-6 flex flex-col justify-center">
          <SectionTitle>What you unlock</SectionTitle>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>· Your latest run’s 3D coral</li>
            <li>· Click branches to inspect real posts</li>
            <li>· Screenshot and shareable recruiter links</li>
          </ul>
          <Link
            to="/login"
            className="mt-6 inline-flex justify-center px-5 py-2.5 rounded-full border border-border text-sm font-semibold hover:bg-background/60 transition"
          >
            Login
          </Link>
        </aside>
      </div>
    </PageShell>
  );
}

export function DashboardPage() {
  const { user } = useAuth();
  const { isGuest, withAuth } = useRequireAuth();
  const location = useLocation();
  const navState = (location.state || {}) as DashboardNavState;
  const viewportRef = useRef<OrganismViewportHandle>(null);
  const { status, analysis: latestAnalysis, error, reload } = useLatestAnalysis(user?.uid);
  const history = useAnalysisHistory(user?.uid);
  const uploads = useUploads(user?.uid);

  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [showDiffBanner, setShowDiffBanner] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [branchPosts, setBranchPosts] = useState<PostSummary[]>([]);
  const [branchLoading, setBranchLoading] = useState(false);
  const [branchError, setBranchError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [shareError, setShareError] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (navState.analysisId) {
      setSelectedAnalysisId(navState.analysisId);
      setShowDiffBanner(Boolean(navState.showDiff));
    } else if (latestAnalysis?.analysis_id && !selectedAnalysisId) {
      setSelectedAnalysisId(latestAnalysis.analysis_id);
    }
  }, [navState.analysisId, navState.showDiff, latestAnalysis?.analysis_id, selectedAnalysisId]);

  useEffect(() => {
    if (!user || !selectedAnalysisId) {
      setSelectedAnalysis(null);
      return;
    }

    if (latestAnalysis?.analysis_id === selectedAnalysisId) {
      setSelectedAnalysis(latestAnalysis);
      return;
    }

    const fromHistory = history.analyses.find((a) => a.analysis_id === selectedAnalysisId);
    if (fromHistory?.organism_data && fromHistory.post_insights) {
      setSelectedAnalysis(fromHistory);
      return;
    }

    let cancelled = false;
    setAnalysisLoading(true);
    void getAnalysis(user.uid, selectedAnalysisId)
      .then((result) => {
        if (!cancelled) setSelectedAnalysis(result);
      })
      .catch(() => {
        if (!cancelled && latestAnalysis) setSelectedAnalysis(latestAnalysis);
      })
      .finally(() => {
        if (!cancelled) setAnalysisLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, selectedAnalysisId, latestAnalysis, history.analyses]);

  const analysis = selectedAnalysis ?? latestAnalysis;
  const baseOrganism = resolveOrganismData(analysis?.organism_data);
  const organismData = useMemo(
    () =>
      organismDataForPlatform(
        baseOrganism.data,
        analysis?.post_insights,
        platformFilter,
      ),
    [baseOrganism.data, analysis?.post_insights, platformFilter],
  );
  const organismSource = baseOrganism.source;

  const showBanner = !isGuest && (status === "loading" || status === "error");
  const topics = organismData.topics;
  const selectedMeta = topics.find((t) => t.name === selectedTopic) ?? null;
  const runCount = history.analyses.length;
  const selectedRunNumber = useMemo(() => {
    if (!analysis) return 0;
    const index = history.analyses.findIndex((a) => a.analysis_id === analysis.analysis_id);
    if (index < 0) return runCount;
    return runCount - index;
  }, [analysis, history.analyses, runCount]);

  const platformTabs = useMemo(() => {
    const fromBreakdown = (analysis?.platform_breakdown || [])
      .map((row) => row.platform)
      .filter((p) => p && p !== "mixed" && p !== "unknown");
    return [...new Set(fromBreakdown)];
  }, [analysis?.platform_breakdown]);

  const uploadCount = analysis?.upload_ids?.length ?? uploads.uploads.length;
  const dateRangeLabel = useMemo(() => {
    const earliest = analysis?.date_range?.earliest;
    const latest = analysis?.date_range?.latest;
    if (!earliest && !latest) return null;
    if (earliest && latest) {
      return `${formatShortDate(earliest)} – ${formatShortDate(latest)}`;
    }
    return formatShortDate(earliest || latest || undefined);
  }, [analysis?.date_range]);

  const diffText = formatAnalysisDiff(analysis?.diff);

  const handleBranchClick = useCallback(
    async (topic: string) => {
      setSelectedTopic(topic);
      if (!user) {
        setBranchPosts([]);
        setBranchError("Login to load posts for this topic.");
        return;
      }
      setBranchLoading(true);
      setBranchError(null);
      try {
        const { posts } = await listPostsByTopic(
          user.uid,
          topic,
          20,
          platformFilter || undefined,
        );
        setBranchPosts(posts);
      } catch (err) {
        setBranchError(err instanceof Error ? err.message : "Failed to load posts.");
        setBranchPosts([]);
      } finally {
        setBranchLoading(false);
      }
    },
    [user, platformFilter],
  );

  useEffect(() => {
    setSelectedTopic(null);
    setBranchPosts([]);
    setBranchError(null);
  }, [platformFilter, selectedAnalysisId]);

  if (isGuest) {
    return <GuestDashboardPage />;
  }

  const handleExportPng = () => {
    withAuth(() => {
      const dataUrl = viewportRef.current?.exportPng();
      if (dataUrl) downloadDataUrl(dataUrl, "coralytics-coral.png");
    });
  };

  const handleCreateShare = async () => {
    if (!user || !analysis) return;
    setSharing(true);
    setShareError(null);
    try {
      const record = await createShare({
        user_id: user.uid,
        analysis_id: analysis.analysis_id,
      });
      const url = `${window.location.origin}/view/${record.token}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
    } catch (err) {
      setShareError(err instanceof Error ? err.message : "Failed to create share link.");
    } finally {
      setSharing(false);
    }
  };

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

      <PageHeader className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <PageTitle className="text-white">Explore Your Reef</PageTitle>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleExportPng}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm hover:bg-card transition"
          >
            <Download size={16} />
            Screenshot
          </button>
          <button
            type="button"
            disabled={sharing || !analysis}
            onClick={() => withAuth(() => void handleCreateShare())}
            className="px-4 py-2 rounded-full border border-border text-sm hover:bg-card transition disabled:opacity-50"
          >
            {sharing ? "Creating…" : "Share link"}
          </button>
        </div>
      </PageHeader>

      {shareUrl ? (
        <p className="mb-4 text-sm text-accent">
          Copied:{" "}
          <a href={shareUrl} className="underline break-all">
            {shareUrl}
          </a>
        </p>
      ) : null}
      {shareError ? <p className="mb-4 text-sm text-primary">{shareError}</p> : null}

      {analysis && runCount > 0 ? (
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <label className="inline-flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Run</span>
            <select
              value={analysis.analysis_id}
              onChange={(e) => {
                setSelectedAnalysisId(e.target.value);
                setShowDiffBanner(false);
              }}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground"
            >
              {history.analyses.map((item, index) => {
                const runNumber = runCount - index;
                return (
                  <option key={item.analysis_id} value={item.analysis_id}>
                    {formatRunLabel(item, runNumber)} · {item.post_count.toLocaleString()} posts
                  </option>
                );
              })}
            </select>
          </label>
          <span>
            {formatRunLabel(analysis, selectedRunNumber)} · {formatShortDate(analysis.created_at)} ·{" "}
            {analysis.post_count.toLocaleString()} posts · {uploadCount} upload
            {uploadCount === 1 ? "" : "s"}
            {dateRangeLabel ? ` · ${dateRangeLabel}` : null}
          </span>
          <Link to="/upload" className="text-accent hover:underline">
            Add data
          </Link>
        </div>
      ) : null}

      {showDiffBanner && diffText ? (
        <div className="mb-4 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm flex flex-wrap items-center justify-between gap-2">
          <p>
            <span className="font-semibold text-accent">What changed: </span>
            {diffText}
          </p>
          <button
            type="button"
            onClick={() => setShowDiffBanner(false)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {platformTabs.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setPlatformFilter(null)}
            className={cn(
              "px-3 py-1.5 rounded-full border text-xs font-semibold transition",
              platformFilter === null
                ? "border-accent bg-accent/15 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            All
          </button>
          {platformTabs.map((platform) => (
            <button
              key={platform}
              type="button"
              onClick={() => setPlatformFilter(platform)}
              className={cn(
                "px-3 py-1.5 rounded-full border text-xs font-semibold transition",
                platformFilter === platform
                  ? "border-accent bg-accent/15 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {formatPlatform(platform)}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-2xl overflow-hidden border border-border/50 bg-card/40 h-[620px] p-2">
            <OrganismViewport
              ref={viewportRef}
              data={organismData}
              dataSource={organismSource}
              appearance="dark"
              isLoading={status === "loading" || analysisLoading}
              onBranchClick={(topic) => void handleBranchClick(topic)}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-3 justify-center text-xs">
            <Legend swatch="var(--sentiment-positive)" label="Positive sentiment" />
            <Legend swatch="var(--sentiment-neutral)" label="Neutral" />
            <Legend swatch="var(--sentiment-negative)" label="Negative / risky" />
            <span className="text-muted-foreground">
              · Trunk height = account age · Branch thickness = post volume
            </span>
          </div>
        </div>

        <aside className="col-span-12 lg:col-span-4 rounded-2xl border border-border/60 bg-card p-6 min-h-[400px]">
          {selectedTopic ? (
            <div>
              <div className="text-accent text-xs font-bold tracking-[0.2em]">TOPIC</div>
              <h2 className="mt-2 text-2xl font-bold">{selectedTopic}</h2>
              {selectedMeta ? (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-background/60 p-3">
                    <div className="text-2xl font-bold">{selectedMeta.postVolume}</div>
                    <div className="text-xs text-muted-foreground">Posts</div>
                  </div>
                  <div className="rounded-xl bg-background/60 p-3">
                    <div
                      className={`text-2xl font-bold ${
                        selectedMeta.sentiment < 0 ? "text-primary" : "text-accent"
                      }`}
                    >
                      {formatSentiment(selectedMeta.sentiment)}
                    </div>
                    <div className="text-xs text-muted-foreground">Sentiment</div>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Sample posts
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedTopic(null)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              </div>

              {branchLoading ? (
                <p className="mt-3 text-sm text-muted-foreground">Loading posts…</p>
              ) : null}
              {branchError ? <p className="mt-3 text-sm text-primary">{branchError}</p> : null}

              <div className="mt-3 space-y-3 max-h-[320px] overflow-y-auto pr-1">
                {!branchLoading && !branchError && branchPosts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No posts found for this topic.</p>
                ) : null}
                {branchPosts.map((post) => (
                  <div
                    key={post.id ?? post.content}
                    className="rounded-xl bg-background/50 p-3 border border-border/50"
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatPlatform(post.platform ?? "unknown")}</span>
                      <span>{formatSentiment(post.sentiment_compound)}</span>
                    </div>
                    <p className="mt-1.5 text-sm">{post.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <p className="max-w-xs mx-auto">
                Click a branch on the organism to inspect what grew it.
              </p>
            </div>
          )}
        </aside>
      </div>
    </PageShell>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full" style={{ background: swatch }} />
      {label}
    </span>
  );
}
