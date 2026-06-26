import { API_BASE_URL } from "./config";
import type {
  AnalysesResponse,
  AnalyzeRequest,
  Analysis,
  HealthResponse,
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

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...init?.headers,
      },
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

    if (response.status >= 500 && detail === "Internal Server Error") {
      detail =
        "API server error. Check backend logs and that FIRESTORE_EMULATOR_HOST is set for local dev.";
    }

    throw new ApiError(detail || `Request failed (${response.status})`, response.status);
  }

  return response.json() as Promise<T>;
}

export function getHealth() {
  return apiFetch<HealthResponse>("/health");
}

export function listAnalyses(userId: string) {
  return apiFetch<AnalysesResponse>(`/analyses/${encodeURIComponent(userId)}`);
}

export function listUploads(userId: string) {
  return apiFetch<UploadsResponse>(`/uploads/${encodeURIComponent(userId)}`);
}

export function uploadExport(userId: string, file: File, platform?: string) {
  const body = new FormData();
  body.append("user_id", userId);
  body.append("file", file);
  if (platform) body.append("platform", platform);

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
      upload_ids: request.upload_ids,
      posts: [],
      persist: request.persist ?? true,
    }),
  });
}
