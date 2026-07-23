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
import { SelectedStemCallout } from "@/components/SelectedStemCallout";
import { SelectedTopicCallout } from "@/components/SelectedTopicCallout";
import { Button } from "@/components/ui/button";
import { OceanPageFrame, PageHeader, PageTitle } from "@/components/PageShell";
import { useAuth } from "@/contexts/AuthContext";
import { useReefTheme } from "@/hooks/useReefTheme";
import { useSelectedAnalysis } from "@/hooks/useSelectedAnalysis";
import { EXHIBIT_PANEL } from "@/lib/buttonStyles";
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

type ReefSelection =
  | { kind: "post"; postId: string }
  | { kind: "topic"; name: string }
  | { kind: "stem" };

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
  const [reefSelection, setReefSelection] = useState<ReefSelection | null>(null);
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
    if (reefSelection?.kind !== "post" || !analysis?.post_insights?.length) return null;
    const platformLower = platformFilter?.toLowerCase().trim();
    return (
      analysis.post_insights.find((post) => {
        if (post.id !== reefSelection.postId) return false;
        if (platformLower && (post.platform ?? "").toLowerCase() !== platformLower) {
          return false;
        }
        return true;
      }) ?? null
    );
  }, [reefSelection, analysis?.post_insights, platformFilter]);

  const selectedPostFlags = useMemo(() => {
    if (reefSelection?.kind !== "post") return [];
    return (
      analysis?.red_flags?.flags?.filter((flag) => flag.post_id === reefSelection.postId) ?? []
    );
  }, [reefSelection, analysis?.red_flags?.flags]);

  const selectedTopic = useMemo(() => {
    if (reefSelection?.kind !== "topic") return null;
    const target = reefSelection.name.toLowerCase();
    return organismData.topics.find((topic) => topic.name.toLowerCase() === target) ?? null;
  }, [reefSelection, organismData.topics]);

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

  const clearReefSelection = useCallback(() => {
    setReefSelection(null);
    setConnectorLayout(null);
  }, []);

  const handleBranchClick = useCallback((topicName: string) => {
    setReefSelection({ kind: "topic", name: topicName });
  }, []);

  const handleTrunkClick = useCallback(() => {
    setReefSelection({ kind: "stem" });
  }, []);

  const handlePostClick = useCallback((_topic: string, postId: string) => {
    setReefSelection({ kind: "post", postId });
  }, []);

  const updateConnector = useCallback(() => {
    if (!reefSelection || !gridRef.current || !reefRef.current || !calloutRef.current) {
      setConnectorLayout(null);
      return;
    }

    let screenPos: ConnectorPoint | null = null;
    if (reefSelection.kind === "post") {
      screenPos = viewportRef.current?.getPostScreenPosition(reefSelection.postId) ?? null;
    } else if (reefSelection.kind === "topic") {
      screenPos = viewportRef.current?.getTopicScreenPosition(reefSelection.name) ?? null;
    } else if (reefSelection.kind === "stem") {
      screenPos = viewportRef.current?.getTrunkScreenPosition() ?? null;
    }

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
  }, [reefSelection]);

  useLayoutEffect(() => {
    updateConnector();
    window.addEventListener("resize", updateConnector);
    window.addEventListener("scroll", updateConnector, true);
    return () => {
      window.removeEventListener("resize", updateConnector);
      window.removeEventListener("scroll", updateConnector, true);
    };
  }, [updateConnector, selectedPost, selectedTopic, reefSelection]);

  useEffect(() => {
    setPlatformFilter(null);
    clearReefSelection();
  }, [selectedAnalysisId, clearReefSelection]);

  useEffect(() => {
    clearReefSelection();
  }, [platformFilter, clearReefSelection]);

  useEffect(() => {
    if (!reefSelection) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") clearReefSelection();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [reefSelection, clearReefSelection]);

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
    void reefTheme.commitDraft().finally(() => {
      setCustomizeOpen(false);
      setSidebarCover(null);
    });
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
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-10 rounded-full bg-transparent text-muted-foreground/90 hover:bg-transparent hover:text-foreground"
                aria-label="Customise reef"
                onClick={handleCustomizeOpen}
              >
                <Palette className="size-5" aria-hidden />
              </Button>
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
                onTrunkClick={handleTrunkClick}
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
          </div>
        </div>

        <aside ref={sidebarRef} className="flex min-w-0 flex-col gap-3 lg:pl-2">
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

          {reefSelection?.kind === "post" && analysisLoading ? (
            <p className="text-sm text-muted-foreground">Loading post…</p>
          ) : reefSelection?.kind === "post" && selectedPost ? (
            <SelectedPostCallout
              ref={calloutRef}
              post={selectedPost}
              flags={selectedPostFlags}
              onClose={clearReefSelection}
            />
          ) : reefSelection?.kind === "post" ? (
            <p className="text-sm text-muted-foreground">
              Could not find that post in the current run.
            </p>
          ) : reefSelection?.kind === "topic" && selectedTopic ? (
            <SelectedTopicCallout
              ref={calloutRef}
              topic={selectedTopic}
              onClose={clearReefSelection}
            />
          ) : reefSelection?.kind === "topic" ? (
            <p className="text-sm text-muted-foreground">
              Could not find that topic in the current view.
            </p>
          ) : reefSelection?.kind === "stem" ? (
            <SelectedStemCallout
              ref={calloutRef}
              organismData={organismData}
              onClose={clearReefSelection}
            />
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
        onReset={reefTheme.resetDraft}
      />
    </OceanPageFrame>
  );
}
