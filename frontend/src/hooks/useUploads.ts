import { useCallback, useEffect, useState } from "react";
import type { Upload } from "../api/types";
import { formatApiError } from "../lib/apiError";
import { fetchUploads, peekUploads } from "../lib/uploadsCache";

export type UploadsLoadState =
  | { status: "loading"; uploads: Upload[]; error: null }
  | { status: "success"; uploads: Upload[]; error: null }
  | { status: "error"; uploads: Upload[]; error: string };

function initialState(userId: string | undefined): UploadsLoadState {
  if (!userId) return { status: "success", uploads: [], error: null };
  const cached = peekUploads(userId);
  if (cached) return { status: "success", uploads: cached, error: null };
  return { status: "loading", uploads: [], error: null };
}

export function useUploads(userId: string | undefined) {
  const [state, setState] = useState<UploadsLoadState>(() => initialState(userId));

  const load = useCallback(
    async (options?: { force?: boolean }) => {
      if (!userId) {
        setState({ status: "success", uploads: [], error: null });
        return;
      }

      const cached = peekUploads(userId);
      if (cached && !options?.force) {
        setState({ status: "success", uploads: cached, error: null });
        return;
      }

      if (!cached) {
        setState((prev) => ({ ...prev, status: "loading", error: null }));
      }

      try {
        const uploads = await fetchUploads(userId, { force: options?.force });
        setState({ status: "success", uploads, error: null });
      } catch (error) {
        if (cached) {
          setState({ status: "success", uploads: cached, error: null });
          return;
        }
        setState({
          status: "error",
          uploads: [],
          error: formatApiError(error, "Failed to load uploads."),
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
