import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { ArrowLeft, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LandingReef } from "@/components/LandingReef";
import { auth } from "@/lib/firebase";
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
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  const checkUsernameTaken = async (value: string, { quiet = false } = {}) => {
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
    } catch (err) {
      console.warn("Username availability check skipped:", err);
      if (!quiet) {
        setUsernameError(null);
      }
      return true;
    }
  };

  const validateEmailField = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return "Enter a valid email address.";
    }
    return null;
  };

  const validatePasswordField = (value: string) => {
    if (!value) return "Password is required.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
      return "Password must include at least one letter and one number.";
    }
    return null;
  };

  const checkEmailRegistered = async (value: string) => {
    const validationError = validateEmailField(value);
    if (validationError) {
      setEmailError(validationError);
      return false;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, value.trim());
      if (methods.length > 0) {
        setEmailError("That email is already registered. Try logging in instead.");
        return false;
      }
      setEmailError(null);
      return true;
    } catch (err) {
      console.warn("Email registration check failed:", err);
      setEmailError(null);
      return true;
    }
  };

  const validateSignupForm = async () => {
    const usernameValidation = validateUsername(username);
    const emailValidation = validateEmailField(email);
    const passwordValidation = validatePasswordField(password);

    setUsernameError(usernameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (usernameValidation || emailValidation || passwordValidation) {
      return false;
    }

    const emailOk = await checkEmailRegistered(email);
    const usernameOk = await checkUsernameTaken(username, { quiet: true });
    return emailOk && usernameOk;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(identifier, password);
      } else {
        const ok = await validateSignupForm();
        if (!ok) return;
        await signUp(username, email, password);
      }
    } catch (err) {
      console.error(`${mode === "login" ? "Login" : "Sign up"} failed:`, err);
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
      console.error("Google authentication failed:", err);
      setError(formatAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#78a4bb] dark:bg-[#00264d]">
        <LandingReef appearance={theme} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/25 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full bg-gradient-to-l from-background/80 via-background/35 to-transparent lg:w-2/3" />
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col px-5 py-6 md:px-10">
        <header className="flex items-center justify-between gap-4">
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-none border-foreground/35 bg-accent/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] backdrop-blur-md hover:border-foreground/60 hover:bg-accent/20"
          >
            <Link to="/">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="border border-foreground/20 bg-background/45 backdrop-blur-md hover:bg-background/65"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </header>

        <div className="grid flex-1 items-end gap-8 pb-10 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] lg:items-center lg:pb-16">
          <section className="max-w-lg self-end lg:pb-12">
            <p className="mb-3 text-caps text-muted-foreground">Coralytics Access</p>
            <h1 className="font-display text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              {mode === "login" ? (
                <>
                  Return to Your <span className="text-primary">Reef</span>
                </>
              ) : (
                <>
                  Start Your <span className="text-primary">Bloom</span>
                </>
              )}
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-[1.65] text-muted-foreground">
              {mode === "login"
                ? "Sign in to continue exploring your digital coral, saved analyses, and recruiter-ready snapshots."
                : "Create a secure account before uploading social exports and growing your personalized coral profile."}
            </p>
          </section>

          <Card className="w-full border-foreground/20 bg-background/45 shadow-none backdrop-blur-[10px]">
            <CardHeader className="space-y-3">
              <Link to="/" className="flex w-fit items-center gap-2.5">
                <span
                  className="relative flex size-8 items-center justify-center overflow-hidden border border-primary/35 bg-primary/15"
                  aria-hidden
                >
                  <span className="absolute inset-[3px] bg-gradient-to-br from-primary to-accent opacity-90" />
                </span>
                <span className="font-display text-xl font-semibold tracking-tight">
                  Coralytics
                </span>
              </Link>
              <div>
                <CardTitle className="font-display text-3xl font-semibold">
                  {mode === "login" ? "Welcome back" : "Create account"}
                </CardTitle>
                <CardDescription className="mt-1.5 text-sm leading-[1.65]">
                  {mode === "login"
                    ? "Access your reef and keep your analysis history in sync."
                    : "Use email and password to secure your Coralytics workspace."}
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
                  setEmailError(null);
                  setPasswordError(null);
                }}
              >
                <TabsList className="grid w-full grid-cols-2 rounded-none border border-foreground/20 bg-background/45 p-0 backdrop-blur-md">
                  <TabsTrigger
                    value="login"
                    className="rounded-none text-[12px] font-medium uppercase tracking-[0.2em] data-[state=active]:bg-accent/15"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-none text-[12px] font-medium uppercase tracking-[0.2em] data-[state=active]:bg-accent/15"
                  >
                    Sign up
                  </TabsTrigger>
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
                    emailError={emailError}
                    passwordError={passwordError}
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
                    emailError={emailError}
                    passwordError={passwordError}
                    onUsernameBlur={() => void checkUsernameTaken(username)}
                    onUsernameChange={() => setUsernameError(null)}
                    onEmailBlur={() => void checkEmailRegistered(email)}
                    onEmailChange={() => setEmailError(null)}
                    onPasswordBlur={() => setPasswordError(validatePasswordField(password))}
                    onPasswordChange={() => setPasswordError(null)}
                    onSubmit={handleSubmit}
                  />
                </TabsContent>
              </Tabs>

              <div className="my-6 flex items-center gap-3">
                <Separator className="flex-1 bg-foreground/20" />
                <span className="text-caps text-muted-foreground">or</span>
                <Separator className="flex-1 bg-foreground/20" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-auto w-full rounded-none border-foreground/35 bg-accent/10 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.18em] backdrop-blur-md hover:border-foreground/60 hover:bg-accent/20"
                disabled={
                  submitting ||
                  (mode === "signup" &&
                    (!username.trim() || Boolean(usernameError) || Boolean(emailError)))
                }
                onClick={() => void handleGoogle()}
              >
                <GoogleMark />
                {mode === "login" ? "Continue with Google" : "Sign up with Google"}
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="pointer-events-none text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span>© Coralytics · HEAP 2026</span>
        </div>
      </div>
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
  emailError,
  passwordError,
  onUsernameBlur,
  onUsernameChange,
  onEmailBlur,
  onEmailChange,
  onPasswordBlur,
  onPasswordChange,
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
  emailError?: string | null;
  passwordError?: string | null;
  onUsernameBlur?: () => void;
  onUsernameChange?: () => void;
  onEmailBlur?: () => void;
  onEmailChange?: () => void;
  onPasswordBlur?: () => void;
  onPasswordChange?: () => void;
  onSubmit: (e: FormEvent) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

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
            onChange={(e) => {
              setEmail?.(e.target.value);
              onEmailChange?.();
            }}
            onBlur={onEmailBlur}
          />
          {emailError ? (
            <p className="text-sm text-destructive" role="alert">
              {emailError}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={mode === "login" ? 6 : 8}
            value={password}
            className="pr-11"
            onChange={(e) => {
              setPassword(e.target.value);
              onPasswordChange?.();
            }}
            onBlur={onPasswordBlur}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        </div>
        {mode === "signup" && passwordError ? (
          <p className="text-sm text-destructive" role="alert">
            {passwordError}
          </p>
        ) : null}
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}

      <Button
        type="submit"
        className="w-full"
        disabled={submitting || Boolean(usernameError) || Boolean(emailError) || Boolean(passwordError)}
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
  if (code === "permission-denied") {
    return "Firestore permissions denied. Deploy firestore.rules to Firebase, then retry.";
  }
  if (code === "auth/network-request-failed") {
    return "Cannot reach Firebase Auth. Check your Firebase config and network connection.";
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
