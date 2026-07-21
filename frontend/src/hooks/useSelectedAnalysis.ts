import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAnalysis } from "@/api/client";
import type { Analysis } from "@/api/types";
import { useAnalysisHistory } from "./useAnalysisHistory";
import { useLatestAnalysis } from "./useLatestAnalysis";

type NavState = {
  analysisId?: string;
};

type UseSelectedAnalysisOptions = {
  /** Dashboard needs full post_insights for platform filtering and branch drill-down. */
  requirePostInsights?: boolean;
};

export function useSelectedAnalysis(
  userId: string | undefined,
  options: UseSelectedAnalysisOptions = {},
) {
  const { requirePostInsights = false } = options;
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navState = (location.state || {}) as NavState;

  const history = useAnalysisHistory(userId);
  const latest = useLatestAnalysis(userId);

  const runFromUrl = searchParams.get("run");
  const analyses = history.analyses;
  const latestAnalysis = latest.analysis;

  const selectedAnalysisId = useMemo(() => {
    const candidates = [runFromUrl, navState.analysisId, latestAnalysis?.analysis_id].filter(
      Boolean,
    ) as string[];
    for (const id of candidates) {
      if (analyses.some((a) => a.analysis_id === id)) return id;
    }
    return latestAnalysis?.analysis_id ?? null;
  }, [runFromUrl, navState.analysisId, latestAnalysis?.analysis_id, analyses]);

  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  const selectAnalysis = useCallback(
    (analysisId: string) => {
      const isLatest = latestAnalysis?.analysis_id === analysisId;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (isLatest) next.delete("run");
          else next.set("run", analysisId);
          return next;
        },
        { replace: false },
      );
    },
    [latestAnalysis?.analysis_id, setSearchParams],
  );

  const selectLatest = useCallback(() => {
    if (latestAnalysis?.analysis_id) selectAnalysis(latestAnalysis.analysis_id);
  }, [latestAnalysis?.analysis_id, selectAnalysis]);

  useEffect(() => {
    if (!runFromUrl || history.status !== "success" || analyses.length === 0) return;
    if (!analyses.some((a) => a.analysis_id === runFromUrl) && latestAnalysis?.analysis_id) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("run");
          return next;
        },
        { replace: true },
      );
    }
  }, [runFromUrl, history.status, analyses, latestAnalysis?.analysis_id, setSearchParams]);

  useEffect(() => {
    if (!userId || !selectedAnalysisId) {
      setSelectedAnalysis(null);
      return;
    }

    if (latestAnalysis?.analysis_id === selectedAnalysisId) {
      setSelectedAnalysis(latestAnalysis);
      return;
    }

    const fromHistory = analyses.find((a) => a.analysis_id === selectedAnalysisId);
    if (fromHistory) {
      const hasOrganism = Boolean(fromHistory.organism_data);
      const hasInsights =
        !requirePostInsights || Boolean(fromHistory.post_insights?.length);
      if (hasOrganism && hasInsights) {
        setSelectedAnalysis(fromHistory);
        return;
      }
    }

    let cancelled = false;
    setAnalysisLoading(true);
    void getAnalysis(userId, selectedAnalysisId)
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
  }, [userId, selectedAnalysisId, latestAnalysis, analyses, requirePostInsights]);

  const analysis = selectedAnalysis ?? latestAnalysis;
  const isLatest = Boolean(
    analysis && latestAnalysis && analysis.analysis_id === latestAnalysis.analysis_id,
  );
  const runCount = analyses.length;
  const selectedRunNumber = useMemo(() => {
    if (!analysis) return 0;
    const index = analyses.findIndex((a) => a.analysis_id === analysis.analysis_id);
    if (index < 0) return runCount;
    return runCount - index;
  }, [analysis, analyses, runCount]);

  const postsDeltaFromLatest = useMemo(() => {
    if (!analysis || !latestAnalysis || isLatest) return 0;
    return Math.max(0, latestAnalysis.post_count - analysis.post_count);
  }, [analysis, latestAnalysis, isLatest]);

  return {
    history,
    latestStatus: latest.status,
    latestError: latest.error,
    reloadLatest: latest.reload,
    latestAnalysis,
    analysis,
    analysisLoading,
    selectedAnalysisId,
    selectAnalysis,
    selectLatest,
    isLatest,
    runCount,
    selectedRunNumber,
    postsDeltaFromLatest,
  };
}
