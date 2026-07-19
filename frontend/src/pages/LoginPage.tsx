import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Moon, Sun, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { isUsernameAvailable, validateUsername } from "@/lib/usernames";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function LoginPage() {
  const { user, loading, login, signUp, loginWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
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
    return <Navigate to="/" replace />;
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
    <main className="flex min-h-screen items-center justify-center bg-ocean-radial px-6 py-16">
      <Card className="relative w-full max-w-md border-border/60 bg-card/95 shadow-lg backdrop-blur-sm">
        <div className="absolute right-4 top-4 flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Cancel"
            onClick={() => navigate("/")}
          >
            <X />
          </Button>
        </div>

        <CardHeader className="space-y-4 pr-20">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <span
              className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg border border-primary/25 bg-primary/15"
              aria-hidden
            >
              <span className="absolute inset-[3px] rounded-md bg-gradient-to-br from-primary to-accent opacity-90" />
            </span>
            <span className="font-display text-xl font-semibold tracking-tight">
              Coralytics
            </span>
          </Link>
          <div>
            <CardTitle className="font-display text-3xl font-semibold">Welcome</CardTitle>
            <CardDescription className="mt-1.5">
              Sign in to grow and explore your reef.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs
            value={mode}
            onValueChange={(v) => {
              setMode(v as "login" | "signup");
              setError(null);
              setUsernameError(null);
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <AuthForm
                mode="login"
                identifier={identifier}
                setIdentifier={setIdentifier}
                password={password}
                setPassword={setPassword}
                error={error}
                submitting={submitting}
                usernameError={usernameError}
                onSubmit={handleSubmit}
              />
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <AuthForm
                mode="signup"
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                error={error}
                submitting={submitting}
                usernameError={usernameError}
                onUsernameBlur={() => void checkUsernameTaken(username)}
                onUsernameChange={() => setUsernameError(null)}
                onSubmit={handleSubmit}
              />
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={
              submitting ||
              (mode === "signup" && (!username.trim() || Boolean(usernameError)))
            }
            onClick={() => void handleGoogle()}
          >
            <GoogleMark />
            {mode === "login" ? "Continue with Google" : "Sign up with Google"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

function AuthForm({
  mode,
  username,
  setUsername,
  identifier,
  setIdentifier,
  email,
  setEmail,
  password,
  setPassword,
  error,
  submitting,
  usernameError,
  onUsernameBlur,
  onUsernameChange,
  onSubmit,
}: {
  mode: "login" | "signup";
  username?: string;
  setUsername?: (v: string) => void;
  identifier?: string;
  setIdentifier?: (v: string) => void;
  email?: string;
  setEmail?: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string | null;
  submitting: boolean;
  usernameError: string | null;
  onUsernameBlur?: () => void;
  onUsernameChange?: () => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <form className="space-y-4" onSubmit={(e) => void onSubmit(e)}>
      {mode === "signup" ? (
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            required
            minLength={3}
            maxLength={20}
            value={username}
            onChange={(e) => {
              setUsername?.(e.target.value);
              onUsernameChange?.();
            }}
            onBlur={onUsernameBlur}
            placeholder="unique_username"
          />
          {usernameError ? (
            <p className="text-sm text-destructive" role="alert">
              {usernameError}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="identifier">Username or email</Label>
          <Input
            id="identifier"
            type="text"
            autoComplete="username"
            required
            value={identifier}
            onChange={(e) => setIdentifier?.(e.target.value)}
          />
        </div>
      )}

      {mode === "signup" ? (
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail?.(e.target.value)}
          />
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <Button
        type="submit"
        className="w-full"
        disabled={submitting || Boolean(usernameError)}
      >
        {submitting ? "Please wait…" : mode === "login" ? "Login" : "Create account"}
      </Button>
    </form>
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
  if (
    code === "auth/invalid-credential" ||
    code === "auth/wrong-password" ||
    code === "auth/user-not-found"
  ) {
    return "Incorrect username/email or password.";
  }
  if (code === "auth/unauthorized-domain") {
    return "This domain is not authorized for Google login in Firebase Console.";
  }
  return err instanceof Error ? err.message : "Authentication failed.";
}
