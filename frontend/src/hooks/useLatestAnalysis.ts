import { useCallback, useEffect, useState } from "react";
import { listAnalyses } from "../api/client";
import type { Analysis } from "../api/types";
import { formatApiError } from "../lib/apiError";
export type AnalysisLoadState =
  | { status: "loading"; analysis: null; error: null }
  | { status: "empty"; analysis: null; error: null }
  | { status: "success"; analysis: Analysis; error: null }
  | { status: "error"; analysis: null; error: string };

export function useLatestAnalysis(userId: string | undefined) {
  const [state, setState] = useState<AnalysisLoadState>({
    status: "loading",
    analysis: null,
    error: null,
  });

  const load = useCallback(async () => {
    if (!userId) {
      setState({ status: "empty", analysis: null, error: null });
      return;
    }

    setState({ status: "loading", analysis: null, error: null });

    try {
      const { analyses } = await listAnalyses(userId);
      const latest = analyses[0] ?? null;

      if (!latest) {
        setState({ status: "empty", analysis: null, error: null });
        return;
      }

      setState({ status: "success", analysis: latest, error: null });
    } catch (error) {
      setState({
        status: "error",
        analysis: null,
        error: formatApiError(error, "Failed to load analysis data."),
      });
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { ...state, reload: load };
}
