export function formatApiError(error: unknown, fallback: string) {
  if (error instanceof Error) {
    if (error.message === "Failed to fetch") {
      return "Cannot reach the API. Start the backend (uvicorn) and ensure VITE_API_URL points to /api or http://localhost:8000.";
    }
    if (error.message === "Internal Server Error") {
      return "API returned 500. Check the backend terminal — is Firestore emulator running on port 8080?";
    }
    return error.message;
  }
  return fallback;
}
