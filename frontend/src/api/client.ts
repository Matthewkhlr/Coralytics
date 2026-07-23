import { API_BASE_URL } from "./config";
import type {
  AnalysesResponse,
  AnalyzeRequest,
  Analysis,
  ReefThemeSettingsApi,
  ShareRecord,
  UploadResponse,
  UploadsResponse,
} from "./types";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

let authTokenProvider: (() => Promise<string | null>) | null = null;

export function setAuthTokenProvider(provider: () => Promise<string | null>) {
  authTokenProvider = provider;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(init?.headers as Record<string, string> | undefined),
  };

  if (authTokenProvider) {
    const token = await authTokenProvider();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
    });
  } catch {
    throw new ApiError(
      "Cannot reach the API. Start the backend and Firestore emulator (see README).",
      0,
    );
  }

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const body = (await response.json()) as { detail?: string | { msg?: string }[] };
      if (typeof body.detail === "string") {
        detail = body.detail;
      } else if (Array.isArray(body.detail) && body.detail[0]?.msg) {
        detail = body.detail[0].msg;
      }
    } catch {
      // Response body was not JSON.
    }

    if (response.status === 401) {
      detail = "Please login again.";
    }

    if (response.status >= 500 && detail === "Internal Server Error") {
      detail =
        "API server error. Check backend logs and that FIRESTORE_EMULATOR_HOST is set for local dev.";
    }

    throw new ApiError(detail || `Request failed (${response.status})`, response.status);
  }

  return response.json() as Promise<T>;
}

export function listAnalyses(userId: string) {
  return apiFetch<AnalysesResponse>(`/analyses/${encodeURIComponent(userId)}`);
}

export function getAnalysis(userId: string, analysisId: string) {
  return apiFetch<Analysis>(
    `/analyses/${encodeURIComponent(userId)}/${encodeURIComponent(analysisId)}`,
  );
}

export function deleteAnalysis(userId: string, analysisId: string) {
  return apiFetch<{ deleted: boolean; analysis_id: string }>(
    `/analyses/${encodeURIComponent(userId)}/${encodeURIComponent(analysisId)}`,
    { method: "DELETE" },
  );
}

export function listUploads(userId: string) {
  return apiFetch<UploadsResponse>(`/uploads/${encodeURIComponent(userId)}`);
}

export function updateUploadPlatform(userId: string, uploadId: string, platform: string) {
  return apiFetch<UploadResponse>(
    `/uploads/${encodeURIComponent(userId)}/${encodeURIComponent(uploadId)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform }),
    },
  );
}

export type UploadExportOptions = {
  platform?: string;
  runAnalysis?: boolean;
};

export function uploadExport(
  userId: string,
  file: File,
  options?: string | UploadExportOptions,
) {
  const opts: UploadExportOptions =
    typeof options === "string" ? { platform: options } : (options ?? {});

  const body = new FormData();
  body.append("user_id", userId);
  body.append("file", file);
  if (opts.platform) body.append("platform", opts.platform);
  if (opts.runAnalysis !== undefined) {
    body.append("run_analysis", opts.runAnalysis ? "true" : "false");
  }

  return apiFetch<UploadResponse>("/uploads", {
    method: "POST",
    body,
  });
}

export function analyzeUploads(request: AnalyzeRequest) {
  return apiFetch<Analysis>("/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: request.user_id,
      posts: [],
      persist: request.persist ?? true,
      name: request.name?.trim() || null,
    }),
  });
}

export function getShare(token: string) {
  return apiFetch<ShareRecord>(`/shares/${encodeURIComponent(token)}`);
}

export function getReefSettings(userId: string) {
  return apiFetch<ReefThemeSettingsApi>(
    `/users/${encodeURIComponent(userId)}/reef-settings`,
  );
}

export function updateReefSettings(userId: string, settings: Partial<ReefThemeSettingsApi>) {
  return apiFetch<ReefThemeSettingsApi>(
    `/users/${encodeURIComponent(userId)}/reef-settings`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    },
  );
}
