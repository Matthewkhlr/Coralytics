import { useCallback, useEffect, useState } from "react";
import { getReefSettings, updateReefSettings } from "@/api/client";
import { formatApiError } from "@/lib/apiError";
import {
  DEFAULT_REEF_THEME,
  reefThemeFromApi,
  reefThemeToApi,
  type ReefThemeSettings,
} from "@/lib/reefTheme";

type ReefThemeState =
  | { status: "idle"; settings: ReefThemeSettings; error: null }
  | { status: "loading"; settings: ReefThemeSettings; error: null }
  | { status: "success"; settings: ReefThemeSettings; error: null }
  | { status: "error"; settings: ReefThemeSettings; error: string };

export function useReefTheme(userId: string | undefined) {
  const [state, setState] = useState<ReefThemeState>({
    status: "idle",
    settings: DEFAULT_REEF_THEME,
    error: null,
  });
  const [draft, setDraft] = useState<ReefThemeSettings | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!userId) {
      setState({ status: "idle", settings: DEFAULT_REEF_THEME, error: null });
      setDraft(null);
      return;
    }

    setState((prev) => ({ ...prev, status: "loading", error: null }));
    try {
      const result = await getReefSettings(userId);
      const settings = reefThemeFromApi(result);
      setState({ status: "success", settings, error: null });
      setDraft(null);
    } catch (error) {
      setState({
        status: "error",
        settings: DEFAULT_REEF_THEME,
        error: formatApiError(error, "Failed to load reef settings."),
      });
    }
  }, [userId]);

  useEffect(() => {
    void load();
  }, [load]);

  const beginDraft = useCallback(() => {
    setDraft((prev) => prev ?? { ...state.settings });
  }, [state.settings]);

  const updateDraft = useCallback((next: ReefThemeSettings) => {
    setDraft(next);
  }, []);

  const cancelDraft = useCallback(() => {
    setDraft(null);
  }, []);

  const saveDraft = useCallback(async () => {
    if (!userId || !draft) return;
    setSaving(true);
    try {
      const result = await updateReefSettings(userId, reefThemeToApi(draft));
      const settings = reefThemeFromApi(result);
      setState({ status: "success", settings, error: null });
      setDraft(null);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        status: "error",
        error: formatApiError(error, "Failed to save reef settings."),
      }));
      throw error;
    } finally {
      setSaving(false);
    }
  }, [userId, draft]);

  const resetDraft = useCallback(() => {
    setDraft({ ...DEFAULT_REEF_THEME });
  }, []);

  const activeTheme = draft ?? state.settings;

  return {
    settings: state.settings,
    activeTheme,
    draft,
    loading: state.status === "loading",
    saving,
    error: state.error,
    beginDraft,
    updateDraft,
    cancelDraft,
    saveDraft,
    resetDraft,
    reload: load,
  };
}
