import { useCallback, useEffect, useRef, useState } from "react";
import { getReefSettings, updateReefSettings } from "@/api/client";
import { formatApiError } from "@/lib/apiError";
import {
  DEFAULT_REEF_THEME,
  reefThemeFromApi,
  reefThemesEqual,
  reefThemeToApi,
  type ReefThemeSettings,
} from "@/lib/reefTheme";

type ReefThemeState =
  | { status: "idle"; settings: ReefThemeSettings; error: null }
  | { status: "loading"; settings: ReefThemeSettings; error: null }
  | { status: "success"; settings: ReefThemeSettings; error: null }
  | { status: "error"; settings: ReefThemeSettings; error: string };

const PERSIST_DEBOUNCE_MS = 350;

export function useReefTheme(userId: string | undefined) {
  const [state, setState] = useState<ReefThemeState>({
    status: "idle",
    settings: DEFAULT_REEF_THEME,
    error: null,
  });
  const [draft, setDraft] = useState<ReefThemeSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const persistTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSettingsRef = useRef<ReefThemeSettings | null>(null);

  const clearPersistTimeout = useCallback(() => {
    if (persistTimeoutRef.current) {
      clearTimeout(persistTimeoutRef.current);
      persistTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => () => clearPersistTimeout(), [clearPersistTimeout]);

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

  const persistSettings = useCallback(
    async (settings: ReefThemeSettings) => {
      if (!userId) return;
      pendingSettingsRef.current = null;
      setSaving(true);
      try {
        const result = await updateReefSettings(userId, reefThemeToApi(settings));
        const saved = reefThemeFromApi(result);
        setState({ status: "success", settings: saved, error: null });
        setDraft((current) => (current && reefThemesEqual(current, settings) ? null : current));
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
    },
    [userId],
  );

  const schedulePersist = useCallback(
    (settings: ReefThemeSettings) => {
      if (!userId) return;
      pendingSettingsRef.current = settings;
      clearPersistTimeout();
      persistTimeoutRef.current = setTimeout(() => {
        persistTimeoutRef.current = null;
        const pending = pendingSettingsRef.current;
        if (!pending) return;
        void persistSettings(pending);
      }, PERSIST_DEBOUNCE_MS);
    },
    [userId, clearPersistTimeout, persistSettings],
  );

  const beginDraft = useCallback(() => {
    setDraft((prev) => prev ?? { ...state.settings });
  }, [state.settings]);

  const updateDraft = useCallback(
    (next: ReefThemeSettings) => {
      setDraft(next);
      schedulePersist(next);
    },
    [schedulePersist],
  );

  const cancelDraft = useCallback(() => {
    clearPersistTimeout();
    pendingSettingsRef.current = null;
    setDraft(null);
  }, [clearPersistTimeout]);

  const commitDraft = useCallback(async () => {
    clearPersistTimeout();
    const pending = pendingSettingsRef.current ?? draft;
    pendingSettingsRef.current = null;
    if (pending && userId && !reefThemesEqual(pending, state.settings)) {
      await persistSettings(pending);
    }
    setDraft(null);
  }, [clearPersistTimeout, draft, userId, state.settings, persistSettings]);

  const resetDraft = useCallback(() => {
    const next = { ...DEFAULT_REEF_THEME };
    setDraft(next);
    clearPersistTimeout();
    void persistSettings(next);
  }, [clearPersistTimeout, persistSettings]);

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
    commitDraft,
    resetDraft,
    reload: load,
  };
};
