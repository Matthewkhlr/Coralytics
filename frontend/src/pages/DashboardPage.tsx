import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Palette } from "lucide-react";
import type { PostInsight } from "@/api/types";
import { DataStatusBanner } from "@/components/DataStatusBanner";
import { PageLoadingOverlay } from "@/components/PageLoadingOverlay";
import {
  OrganismViewport,
  type OrganismViewportHandle,
} from "@/components/OrganismViewport";
import { ReefCustomizeSheet } from "@/components/ReefCustomizeSheet";
import {
  ReefSidebarDropdowns,
  type PlatformFilterOption,
} from "@/components/ReefSidebarDropdowns";
import { ReefPostConnector, type ConnectorPoint } from "@/components/ReefPostConnector";
import { SelectedPostCallout } from "@/components/SelectedPostCallout";
import { OceanPageFrame, PageHeader, PageTitle } from "@/components/PageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useReefTheme } from "@/hooks/useReefTheme";
import { useSelectedAnalysis } from "@/hooks/useSelectedAnalysis";
import { CHIP_RADIUS, EXHIBIT_PANEL } from "@/lib/buttonStyles";
import { ReefInstructionPanel } from "@/components/ReefInstructionPanel";
import { formatPlatform } from "@/lib/format";
import { organismDataForPlatform, resolveOrganismData } from "@/lib/organismData";
import { REEF_SOURCE_PLATFORMS } from "@/lib/runScope";
import { cn } from "@/lib/utils";

type ConnectorLayout = {
  from: ConnectorPoint;
  to: ConnectorPoint;
  ring: ConnectorPoint;
};

export function DashboardPage() {
  const { user } = useAuth();
  const viewportRef = useRef<OrganismViewportHandle>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reefRef = useRef<HTMLDivElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);

  const {
    history,
    latestStatus,
    latestError,
    reloadLatest,
    analysis,
    analysisLoading,
    selectAnalysis,
  } = useSelectedAnalysis(user?.uid, { requirePostInsights: true });

  const reefTheme = useReefTheme(user?.uid);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const dropdownPanelRef = useRef<HTMLDivElement>(null);
  const [sidebarCover, setSidebarCover] = useState<{ left: number; width: number } | null>(
    null,
  );

  const [platformFilter, setPlatformFilter] = useState<string | null>(null);
  const [highlightedPostId, setHighlightedPostId] = useState<string | null>(null);
  const [connectorLayout, setConnectorLayout] = useState<ConnectorLayout | null>(null);

  const baseOrganism = useMemo(
    () => resolveOrganismData(analysis?.organism_data),
    [analysis?.organism_data],
  );
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

  const selectedPost = useMemo<PostInsight | null>(() => {
    if (!highlightedPostId || !analysis?.post_insights?.length) return null;
    const platformLower = platformFilter?.toLowerCase().trim();
    return (
      analysis.post_insights.find((post) => {
        if (post.id !== highlightedPostId) return false;
        if (platformLower && (post.platform ?? "").toLowerCase() !== platformLower) {
          return false;
        }
        return true;
      }) ?? null
    );
  }, [highlightedPostId, analysis?.post_insights, platformFilter]);

  const selectedPostFlags = useMemo(() => {
    if (!highlightedPostId) return [];
    return (
      analysis?.red_flags?.flags?.filter((flag) => flag.post_id === highlightedPostId) ?? []
    );
  }, [highlightedPostId, analysis?.red_flags?.flags]);

  const platformOptions = useMemo<PlatformFilterOption[]>(() => {
    const breakdown = (analysis?.platform_breakdown ?? []).filter(
      (row) =>
        row.platform &&
        row.platform !== "mixed" &&
        row.platform !== "unknown" &&
        row.platform !== "sample",
    );
    const countByPlatform = new Map(breakdown.map((row) => [row.platform, row.post_count]));

    return [
      { key: null, label: "All" },
      ...REEF_SOURCE_PLATFORMS.map((platform) => ({
        key: platform,
        label: formatPlatform(platform),
        postCount: countByPlatform.get(platform) ?? 0,
      })),
    ];
  }, [analysis?.platform_breakdown]);

  const selectedAnalysisId = analysis?.analysis_id ?? null;
  const hasRuns = history.status === "success" && history.analyses.length > 0;
  const showEmptyReef =
    !isPageLoading && (history.status === "empty" || latestStatus === "empty" || !hasRuns);

  const showEmptyPlatform =
    Boolean(platformFilter) &&
    !isPageLoading &&
    !showEmptyReef &&
    organismData.topics.length === 0 &&
    (organismData.posts?.length ?? 0) === 0;

  const clearSelectedPost = useCallback(() => {
    setHighlightedPostId(null);
    setConnectorLayout(null);
  }, []);

  const handleBranchClick = useCallback(() => {
    clearSelectedPost();
  }, [clearSelectedPost]);

  const handlePostClick = useCallback((_topic: string, postId: string) => {
    setHighlightedPostId(postId);
  }, []);

  const updateConnector = useCallback(() => {
    if (!highlightedPostId || !gridRef.current || !reefRef.current || !calloutRef.current) {
      setConnectorLayout(null);
      return;
    }

    const screenPos = viewportRef.current?.getPostScreenPosition(highlightedPostId);
    if (!screenPos) {
      setConnectorLayout(null);
      return;
    }

    const grid = gridRef.current.getBoundingClientRect();
    const reef = reefRef.current.getBoundingClientRect();
    const callout = calloutRef.current.getBoundingClientRect();
    const targetY = callout.top - grid.top + Math.min(callout.height * 0.2, 40);

    setConnectorLayout({
      from: {
        x: screenPos.x - grid.left,
        y: screenPos.y - grid.top,
      },
      to: {
        x: callout.left - grid.left - 8,
        y: targetY,
      },
      ring: {
        x: screenPos.x - reef.left,
        y: screenPos.y - reef.top,
      },
    });
  }, [highlightedPostId]);

  useLayoutEffect(() => {
    updateConnector();
    window.addEventListener("resize", updateConnector);
    window.addEventListener("scroll", updateConnector, true);
    return () => {
      window.removeEventListener("resize", updateConnector);
      window.removeEventListener("scroll", updateConnector, true);
    };
  }, [updateConnector, selectedPost, highlightedPostId]);

  useEffect(() => {
    setPlatformFilter(null);
    clearSelectedPost();
  }, [selectedAnalysisId, clearSelectedPost]);

  useEffect(() => {
    clearSelectedPost();
  }, [platformFilter, clearSelectedPost]);

  useEffect(() => {
    if (!highlightedPostId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") clearSelectedPost();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [highlightedPostId, clearSelectedPost]);

  const handleSnapshotSelect = (analysisId: string) => {
    selectAnalysis(analysisId);
  };

  const handleCustomizeOpen = () => {
    reefTheme.beginDraft();
    setCustomizeOpen(true);
  };

  const handleCustomizeOpenChange = (open: boolean) => {
    if (open) {
      reefTheme.beginDraft();
      setCustomizeOpen(true);
      return;
    }
    reefTheme.cancelDraft();
    setCustomizeOpen(false);
    setSidebarCover(null);
  };

  useLayoutEffect(() => {
    if (!customizeOpen) {
      setSidebarCover(null);
      return;
    }

    const updateCover = () => {
      const panel = dropdownPanelRef.current;
      if (!panel) return;

      const isStacked = window.matchMedia("(max-width: 1023px)").matches;
      if (isStacked) {
        setSidebarCover(null);
        return;
      }

      const panelRect = panel.getBoundingClientRect();
      setSidebarCover({
        left: panelRect.left,
        width: window.innerWidth - panelRect.left,
      });
    };

    updateCover();
    const observer = new ResizeObserver(updateCover);
    if (dropdownPanelRef.current) observer.observe(dropdownPanelRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    window.addEventListener("resize", updateCover);
    window.addEventListener("scroll", updateCover, true);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateCover);
      window.removeEventListener("scroll", updateCover, true);
    };
  }, [customizeOpen]);

  return (
    <OceanPageFrame animated>
      {showBanner ? (
        <div className="mb-6">
          <DataStatusBanner status="error" error={latestError} onRetry={() => void reloadLatest()} />
        </div>
      ) : null}

      <PageLoadingOverlay loading={isPageLoading} className="min-h-[60vh]">
      <PageHeader className="mb-6">
        <PageTitle>Explore Your Reef</PageTitle>
      </PageHeader>

      <div
        ref={gridRef}
        className="relative grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-10 xl:gap-12"
      >
        {connectorLayout ? (
          <ReefPostConnector
            className="hidden lg:block"
            from={connectorLayout.from}
            to={connectorLayout.to}
          />
        ) : null}

        <div className="min-w-0 space-y-6">
          <div>
            <div
              ref={reefRef}
              className="relative h-[min(64vh,636px)] min-h-[436px] overflow-hidden border border-foreground/20 bg-background/25"
            >
              <button
                type="button"
                className={cn(
                  "absolute top-3 right-3 z-10 inline-flex size-9 items-center justify-center border border-foreground/25 bg-background/55 text-foreground/85 backdrop-blur-sm transition hover:border-foreground/45 hover:bg-background/75 hover:text-foreground",
                  CHIP_RADIUS,
                )}
                aria-label="Customize reef"
                onClick={handleCustomizeOpen}
              >
                <Palette className="size-4" aria-hidden />
              </button>
              <OrganismViewport
                ref={viewportRef}
                data={organismData}
                dataSource={organismSource}
                appearance="dark"
                reefTheme={reefTheme.activeTheme}
                frameless
                isLoading={latestStatus === "loading" || analysisLoading}
                isEmpty={showEmptyReef}
                onBranchClick={handleBranchClick}
                onPostClick={handlePostClick}
                onSceneChange={updateConnector}
              />
              {connectorLayout ? (
                <span
                  className="reef-post-callout__anchor"
                  style={{ left: connectorLayout.ring.x, top: connectorLayout.ring.y }}
                  aria-hidden
                />
              ) : null}
              {showEmptyPlatform ? (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-background/55 px-6 text-center backdrop-blur-[2px]"
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    No posts from {formatPlatform(platformFilter!)} in this run.
                  </p>
                </div>
              ) : null}
            </div>
            <div className="mt-3">
              <ReefInstructionPanel />
              {topics.length === 0 && !showEmptyReef ? (
                <p className="mt-3 text-sm leading-[1.65] text-foreground/95">
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
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-3 text-xs">
              <Legend sentiment="positive" label="Positive" />
              <Legend sentiment="neutral" label="Neutral" />
              <Legend sentiment="negative" label="Negative / Risky" />
            </div>
          </div>
        </div>

        <aside ref={sidebarRef} className="flex min-w-0 flex-col gap-4 lg:pl-2">
          <div
            ref={dropdownPanelRef}
            className={cn(EXHIBIT_PANEL, "p-4 lg:sticky lg:top-24")}
          >
            <ReefSidebarDropdowns
              analyses={history.analyses}
              selectedAnalysisId={selectedAnalysisId}
              onRunSelect={handleSnapshotSelect}
              platformFilter={platformFilter}
              onPlatformChange={setPlatformFilter}
              platformOptions={platformOptions}
            />

            {showEmptyPlatform ? (
              <p className="mt-4 text-sm leading-[1.65] text-foreground/95">
                No posts from {formatPlatform(platformFilter!)} in this run.
              </p>
            ) : null}
          </div>

          {highlightedPostId && analysisLoading ? (
            <p className="text-sm text-muted-foreground">Loading post…</p>
          ) : highlightedPostId && selectedPost ? (
            <SelectedPostCallout
              ref={calloutRef}
              post={selectedPost}
              flags={selectedPostFlags}
              onClose={clearSelectedPost}
            />
          ) : highlightedPostId ? (
            <p className="text-sm text-muted-foreground">
              Could not find that post in the current run.
            </p>
          ) : null}
        </aside>
      </div>
      </PageLoadingOverlay>

      <ReefCustomizeSheet
        open={customizeOpen}
        draft={reefTheme.draft ?? reefTheme.settings}
        saving={reefTheme.saving}
        coverRect={sidebarCover}
        onOpenChange={handleCustomizeOpenChange}
        onDraftChange={reefTheme.updateDraft}
        onSave={reefTheme.saveDraft}
        onCancel={reefTheme.cancelDraft}
        onReset={reefTheme.resetDraft}
      />
    </OceanPageFrame>
  );
}

function Legend({
  sentiment,
  label,
}: {
  sentiment: "positive" | "neutral" | "negative";
  label: string;
}) {
  const colorClass =
    sentiment === "positive"
      ? "text-sentiment-positive"
      : sentiment === "neutral"
        ? "text-sentiment-neutral"
        : "text-sentiment-negative";
  const swatchClass =
    sentiment === "positive"
      ? "bg-sentiment-positive"
      : sentiment === "neutral"
        ? "bg-sentiment-neutral"
        : "bg-sentiment-negative";

  return (
    <span className={cn("flex items-center gap-1.5", colorClass)}>
      <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", swatchClass)} />
      {label}
    </span>
  );
}
