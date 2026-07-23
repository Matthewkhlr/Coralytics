import { useCallback, useEffect, useState } from "react";
import type { Analysis } from "../api/types";
import { formatApiError } from "../lib/apiError";
import { fetchAnalysisList, peekAnalysisList } from "../lib/analysisCache";

export type AnalysisHistoryState =
  | { status: "loading"; analyses: Analysis[]; error: null }
  | { status: "empty"; analyses: []; error: null }
  | { status: "success"; analyses: Analysis[]; error: null }
  | { status: "error"; analyses: []; error: string };

function initialState(userId: string | undefined): AnalysisHistoryState {
  if (!userId) return { status: "empty", analyses: [], error: null };

  const cached = peekAnalysisList(userId);
  if (cached) {
    if (cached.length === 0) return { status: "empty", analyses: [], error: null };
    return { status: "success", analyses: cached, error: null };
  }

  return { status: "loading", analyses: [], error: null };
}

export function useAnalysisHistory(userId: string | undefined) {
  const [state, setState] = useState<AnalysisHistoryState>(() => initialState(userId));

  const load = useCallback(
    async (options?: { force?: boolean }) => {
      if (!userId) {
        setState({ status: "empty", analyses: [], error: null });
        return;
      }

      const cached = peekAnalysisList(userId);
      if (cached && !options?.force) {
        setState(
          cached.length === 0
            ? { status: "empty", analyses: [], error: null }
            : { status: "success", analyses: cached, error: null },
        );
        return;
      }

      if (!cached) {
        setState({ status: "loading", analyses: [], error: null });
      }

      try {
        const analyses = await fetchAnalysisList(userId, { force: options?.force });
        if (!analyses.length) {
          setState({ status: "empty", analyses: [], error: null });
          return;
        }
        setState({ status: "success", analyses, error: null });
      } catch (error) {
        if (cached?.length) {
          setState({ status: "success", analyses: cached, error: null });
          return;
        }
        setState({
          status: "error",
          analyses: [],
          error: formatApiError(error, "Failed to load analysis history."),
        });
      }
    },
    [userId],
  );

  useEffect(() => {
    setState(initialState(userId));
    void load();
  }, [userId, load]);

  const reload = useCallback(() => load({ force: true }), [load]);

  return { ...state, reload };
}
