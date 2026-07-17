import { useCallback, useEffect, useState } from "react";
import { listAnalyses } from "../api/client";
import type { Analysis } from "../api/types";
import { formatApiError } from "../lib/apiError";

export type AnalysisHistoryState =
  | { status: "loading"; analyses: Analysis[]; error: null }
  | { status: "empty"; analyses: []; error: null }
  | { status: "success"; analyses: Analysis[]; error: null }
  | { status: "error"; analyses: []; error: string };

export function useAnalysisHistory(userId: string | undefined) {
  const [state, setState] = useState<AnalysisHistoryState>({
    status: "loading",
    analyses: [],
    error: null,
  });

  const load = useCallback(async () => {
    if (!userId) {
      setState({ status: "empty", analyses: [], error: null });
      return;
    }

    setState({ status: "loading", analyses: [], error: null });
    try {
      const { analyses } = await listAnalyses(userId);
      if (!analyses.length) {
        setState({ status: "empty", analyses: [], error: null });
        return;
      }
      setState({ status: "success", analyses, error: null });
    } catch (error) {
      setState({
        status: "error",
        analyses: [],
        error: formatApiError(error, "Failed to load analysis history."),
      });
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { ...state, reload: load };
}
