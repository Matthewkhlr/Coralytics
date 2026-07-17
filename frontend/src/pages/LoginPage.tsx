import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { isUsernameAvailable, validateUsername } from "@/lib/usernames";

export function LoginPage() {
  const { user, loading, login, signUp, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const checkUsernameTaken = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      setUsernameError(null);
      return false;
    }
    const formatError = validateUsername(trimmed);
    if (formatError) {
      setUsernameError(formatError);
      return false;
    }
    try {
      const available = await isUsernameAvailable(trimmed);
      if (!available) {
        setUsernameError("That username is already taken.");
        return false;
      }
      setUsernameError(null);
      return true;
    } catch {
      setUsernameError("Could not verify username. Is the Firestore emulator running?");
      return false;
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(identifier, password);
      } else {
        const ok = await checkUsernameTaken(username);
        if (!ok) {
          setSubmitting(false);
          return;
        }
        await signUp(username, email, password);
      }
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const ok = await checkUsernameTaken(username);
        if (!ok) {
          setSubmitting(false);
          return;
        }
        await loginWithGoogle(username);
      } else {
        await loginWithGoogle();
      }
    } catch (err) {
      setError(formatAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-ocean-radial flex items-center justify-center px-6 py-16">
      <section className="relative w-full max-w-md rounded-3xl border border-border/60 bg-card p-8">
        <button
          type="button"
          aria-label="Cancel"
          onClick={() => navigate("/")}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:bg-background/60 hover:text-foreground"
        >
          <X size={18} />
        </button>

        <Link to="/" className="mb-6 flex items-center gap-2.5 pr-10">
          <span
            className="h-8 w-8 rounded-md border border-dashed border-border/60 bg-background/40"
            aria-label="Logo placeholder"
          />
          <span className="text-lg font-bold tracking-tight text-white">
            Coralytics
          </span>
        </Link>

        <h1 className="text-3xl font-bold tracking-tight">
          {mode === "login" ? "Login" : "Sign up"}
        </h1>

        <form className="mt-6 space-y-4" onSubmit={(e) => void handleSubmit(e)}>
          {mode === "signup" ? (
            <label className="block text-sm">
              <span className="text-muted-foreground">Username</span>
              <input
                type="text"
                autoComplete="username"
                required
                minLength={3}
                maxLength={20}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError(null);
                }}
                onBlur={() => void checkUsernameTaken(username)}
                placeholder="unique_username"
                className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
              {usernameError ? (
                <p className="mt-1.5 text-sm text-primary" role="alert">
                  {usernameError}
                </p>
              ) : null}
            </label>
          ) : (
            <label className="block text-sm">
              <span className="text-muted-foreground">Username or email</span>
              <input
                type="text"
                autoComplete="username"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          )}

          {mode === "signup" ? (
            <label className="block text-sm">
              <span className="text-muted-foreground">Email</span>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          ) : null}

          <label className="block text-sm">
            <span className="text-muted-foreground">Password</span>
            <input
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          {error ? (
            <p className="text-sm text-primary" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting || Boolean(usernameError)}
            className="w-full rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:brightness-110 disabled:opacity-50"
          >
            {submitting ? "Please wait…" : mode === "login" ? "Login" : "Sign up"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          disabled={submitting || (mode === "signup" && (!username.trim() || Boolean(usernameError)))}
          onClick={() => void handleGoogle()}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/40 px-5 py-3 text-sm font-semibold transition hover:bg-card disabled:opacity-50"
        >
          <GoogleMark />
          {mode === "login" ? "Continue with Google" : "Sign up with Google"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
            setUsernameError(null);
          }}
          className="mt-4 w-full text-sm text-muted-foreground transition hover:text-foreground"
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Login"}
        </button>
      </section>
    </main>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.5-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.1 8 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.5 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.4 39.6 16.1 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l.1.1 6.2 5.2C39.2 37.1 44 32 44 24c0-1.3-.1-2.5-.4-3.5z"
      />
    </svg>
  );
}

function formatAuthError(err: unknown): string {
  const code = (err as { code?: string }).code;
  if (code === "auth/network-request-failed") {
    return "Cannot reach Firebase Auth. Restart emulators from the repo root: npm run firebase:emulators (needs Auth on port 9099).";
  }
  if (code === "auth/popup-closed-by-user") {
    return "Google login was cancelled.";
  }
  if (code === "auth/email-already-in-use") {
    return "That email is already registered. Try logging in instead.";
  }
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
    return "Incorrect username/email or password.";
  }
  if (code === "auth/unauthorized-domain") {
    return "This domain is not authorized for Google login in Firebase Console.";
  }
  return err instanceof Error ? err.message : "Authentication failed.";
}
