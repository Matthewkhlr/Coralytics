import { useCallback, useEffect, useState } from "react";
import { listUploads } from "../api/client";
import type { Upload } from "../api/types";
import { formatApiError } from "../lib/apiError";
export type UploadsLoadState =
  | { status: "loading"; uploads: Upload[]; error: null }
  | { status: "success"; uploads: Upload[]; error: null }
  | { status: "error"; uploads: Upload[]; error: string };

export function useUploads(userId: string | undefined) {
  const [state, setState] = useState<UploadsLoadState>({
    status: "loading",
    uploads: [],
    error: null,
  });

  const load = useCallback(async () => {
    if (!userId) {
      setState({ status: "success", uploads: [], error: null });
      return;
    }

    setState((prev) => ({ ...prev, status: "loading", error: null }));

    try {
      const { uploads } = await listUploads(userId);
      setState({ status: "success", uploads, error: null });
    } catch (error) {
      setState({
        status: "error",
        uploads: [],
        error: formatApiError(error, "Failed to load uploads."),
      });
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { ...state, reload: load };
}
