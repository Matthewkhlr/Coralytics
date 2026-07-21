import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { createShare, listPostsByTopic } from "@/api/client";
import type { PostSummary } from "@/api/types";
import { AnalysisSnapshotBar } from "@/components/AnalysisSnapshotBar";
import { DataStatusBanner } from "@/components/DataStatusBanner";
import { OlderSnapshotBanner } from "@/components/OlderSnapshotBanner";
import { PageLoadingOverlay } from "@/components/PageLoadingOverlay";
import {
  OrganismViewport,
  type OrganismViewportHandle,
} from "@/components/OrganismViewport";
import { OceanPageFrame, PageHeader, PageTitle } from "@/components/PageShell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useSelectedAnalysis } from "@/hooks/useSelectedAnalysis";
import { useUploads } from "@/hooks/useUploads";
import { LANDING_BUTTON, LANDING_BUTTON_SM, UPLOAD_CARD } from "@/lib/buttonStyles";
import { formatPlatform } from "@/lib/format";
import {
  formatAnalysisDiff,
  formatSentiment,
  organismDataForPlatform,
  resolveOrganismData,
} from "@/lib/organismData";
import { cn } from "@/lib/utils";

type DashboardNavState = {
  showDiff?: boolean;
};

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

export function DashboardPage() {
  const { user } = useAuth();
  const location = useLocation();
  const navState = (location.state || {}) as DashboardNavState;
  const viewportRef = useRef<OrganismViewportHandle>(null);
  const uploads = useUploads(user?.uid);

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
  } = useSelectedAnalysis(user?.uid, { requirePostInsights: true });

  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [showDiffBanner, setShowDiffBanner] = useState(Boolean(navState.showDiff));

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [branchPosts, setBranchPosts] = useState<PostSummary[]>([]);
  const [branchLoading, setBranchLoading] = useState(false);
  const [branchError, setBranchError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [shareError, setShareError] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    if (navState.showDiff) setShowDiffBanner(true);
  }, [navState.showDiff]);

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

  const showBanner = latestStatus === "error";
  const isPageLoading = latestStatus === "loading" || analysisLoading;
  const topics = organismData.topics;
  const selectedMeta = topics.find((t) => t.name === selectedTopic) ?? null;

  const platformTabs = useMemo(() => {
    const fromBreakdown = (analysis?.platform_breakdown || [])
      .map((row) => row.platform)
      .filter((p) => p && p !== "mixed" && p !== "unknown");
    return [...new Set(fromBreakdown)];
  }, [analysis?.platform_breakdown]);

  const uploadCount = analysis?.upload_ids?.length ?? uploads.uploads.length;
  const diffText = formatAnalysisDiff(analysis?.diff);
  const selectedAnalysisId = analysis?.analysis_id ?? null;

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

  const handleExportPng = () => {
    const dataUrl = viewportRef.current?.exportPng();
    if (dataUrl) downloadDataUrl(dataUrl, "coralytics-coral.png");
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

  const handleSnapshotSelect = (analysisId: string) => {
    selectAnalysis(analysisId);
    setShowDiffBanner(false);
  };

  return (
    <OceanPageFrame>
      {showBanner ? (
        <div className="mb-6">
          <DataStatusBanner status="error" error={latestError} onRetry={() => void reloadLatest()} />
        </div>
      ) : null}

      <PageLoadingOverlay loading={isPageLoading} className="min-h-[60vh]">
      <PageHeader className="mb-6">
        <PageTitle>Explore Your Reef</PageTitle>
      </PageHeader>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-10 xl:gap-12">
        <div className="min-w-0 space-y-6">
          <Card className={cn(UPLOAD_CARD, "py-4")}>
            <CardContent className="space-y-4 px-4">
              <AnalysisSnapshotBar
                tone="upload"
                analyses={history.analyses}
                analysis={analysis}
                onSelect={handleSnapshotSelect}
                uploadCount={uploadCount}
                showAddDataLink
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                {platformTabs.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    <PlatformChip
                      active={platformFilter === null}
                      onClick={() => setPlatformFilter(null)}
                    >
                      All
                    </PlatformChip>
                    {platformTabs.map((platform) => (
                      <PlatformChip
                        key={platform}
                        active={platformFilter === platform}
                        onClick={() => setPlatformFilter(platform)}
                      >
                        {formatPlatform(platform)}
                      </PlatformChip>
                    ))}
                  </div>
                ) : (
                  <span />
                )}

                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className={LANDING_BUTTON}
                    onClick={handleExportPng}
                  >
                    <Download size={14} className="mr-2" />
                    Screenshot
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className={LANDING_BUTTON}
                    disabled={sharing || !analysis}
                    onClick={() => void handleCreateShare()}
                  >
                    {sharing ? "Creating…" : "Share link"}
                  </Button>
                </div>
              </div>

              {!isLatest && analysis ? (
                <OlderSnapshotBanner
                  tone="upload"
                  analysis={analysis}
                  postsDeltaFromLatest={postsDeltaFromLatest}
                  onViewLatest={selectLatest}
                />
              ) : null}

              {showDiffBanner && diffText ? (
                <Alert className="border-accent/35 bg-accent/10">
                  <AlertDescription className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span>
                      <span className="font-bold tracking-tight text-foreground">What changed: </span>
                      {diffText}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      className={LANDING_BUTTON_SM}
                      onClick={() => setShowDiffBanner(false)}
                    >
                      Dismiss
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : null}

              {shareUrl ? (
                <Alert className="border-accent/35 bg-accent/10">
                  <AlertDescription className="text-sm">
                    Copied:{" "}
                    <a href={shareUrl} className="underline break-all text-accent">
                      {shareUrl}
                    </a>
                  </AlertDescription>
                </Alert>
              ) : null}

              {shareError ? (
                <Alert variant="destructive">
                  <AlertDescription>{shareError}</AlertDescription>
                </Alert>
              ) : null}
            </CardContent>
          </Card>

          <Card className={cn(UPLOAD_CARD, "overflow-hidden py-0")}>
            <CardContent className="p-2">
              <div className="h-[min(62vh,620px)] min-h-[420px] overflow-hidden border border-foreground/15 bg-background/20">
                <OrganismViewport
                  ref={viewportRef}
                  data={organismData}
                  dataSource={organismSource}
                  appearance="dark"
                  isLoading={latestStatus === "loading" || analysisLoading}
                  onBranchClick={(topic) => void handleBranchClick(topic)}
                />
              </div>
            </CardContent>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 pb-4 text-xs text-muted-foreground">
              <Legend swatch="var(--sentiment-positive)" label="Positive sentiment" />
              <Legend swatch="var(--sentiment-neutral)" label="Neutral" />
              <Legend swatch="var(--sentiment-negative)" label="Negative / risky" />
              <span>
                Stem = account history · Branch = topic · Thickness = post volume · Color =
                avg sentiment
              </span>
            </div>
          </Card>
        </div>

        <aside className="min-w-0 lg:pl-2">
          <Card className={cn(UPLOAD_CARD, "py-4 lg:sticky lg:top-24")}>
            <CardHeader className="px-4 pb-3">
              <CardTitle className="text-[0.975rem] font-bold tracking-tight">
                Topic Explorer
              </CardTitle>
            </CardHeader>

            <CardContent className="px-4">
              {selectedTopic ? (
                <div>
                  <p className="text-[0.975rem] font-bold tracking-tight text-foreground">
                    {selectedTopic}
                  </p>

                  {selectedMeta ? (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <StatTile label="Posts" value={String(selectedMeta.postVolume)} />
                      <StatTile
                        label="Sentiment"
                        value={formatSentiment(selectedMeta.sentiment)}
                        valueClassName={
                          selectedMeta.sentiment < 0 ? "text-primary" : "text-accent"
                        }
                      />
                    </div>
                  ) : null}

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <p className="text-[0.975rem] font-bold tracking-tight text-foreground">
                      Sample posts
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className={LANDING_BUTTON_SM}
                      onClick={() => setSelectedTopic(null)}
                    >
                      Clear
                    </Button>
                  </div>

                  {branchLoading ? (
                    <p className="mt-3 text-sm text-muted-foreground">Loading posts…</p>
                  ) : null}
                  {branchError ? (
                    <p className="mt-3 text-sm text-primary">{branchError}</p>
                  ) : null}

                  <ScrollArea className="mt-3 max-h-[22rem]">
                    <div className="space-y-3 pr-3">
                      {!branchLoading && !branchError && branchPosts.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          No posts found for this topic.
                        </p>
                      ) : null}
                      {branchPosts.map((post) => (
                        <div
                          key={post.id ?? post.content}
                          className="border border-foreground/15 bg-background/35 p-3 backdrop-blur-sm"
                        >
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{formatPlatform(post.platform ?? "unknown")}</span>
                            <span>{formatSentiment(post.sentiment_compound)}</span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                            {post.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                <div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Hover a topic branch for volume and sentiment · click to load sample posts.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {topics.map((topic) => (
                      <Button
                        key={topic.name}
                        type="button"
                        variant="outline"
                        className={LANDING_BUTTON_SM}
                        onClick={() => void handleBranchClick(topic.name)}
                      >
                        {topic.name}
                      </Button>
                    ))}
                  </div>
                  {topics.length === 0 ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                      No topics yet.{" "}
                      <Link
                        to="/upload"
                        className="font-medium uppercase tracking-[0.18em] text-foreground/80 hover:text-foreground"
                      >
                        Upload data
                      </Link>
                    </p>
                  ) : null}
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
      </PageLoadingOverlay>
    </OceanPageFrame>
  );
}

function PlatformChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={cn(
        LANDING_BUTTON_SM,
        active && "border-foreground/60 bg-accent/20 text-foreground",
      )}
    >
      {children}
    </Button>
  );
}

function StatTile({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="border border-foreground/15 bg-background/35 p-3 backdrop-blur-sm">
      <div className={cn("text-2xl font-bold font-display", valueClassName)}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: swatch }} />
      {label}
    </span>
  );
}
