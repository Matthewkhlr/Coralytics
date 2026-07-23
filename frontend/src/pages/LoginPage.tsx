import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail, updateProfile } from "firebase/auth";
import { Eye, EyeOff, Moon, Sun, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { LandingReef } from "@/components/LandingReef";
import { sanitizeRedirectPath } from "@/lib/authRedirect";
import { auth } from "@/lib/firebase";
import {
  claimUsername,
  getMyUsername,
  isUsernameAvailable,
  validateUsername,
} from "@/lib/usernames";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AuthStep = "auth" | "username";

export function LoginPage() {
  const { user, loading, login, signUp, loginWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState<AuthStep>("auth");
  const [checkingProfile, setCheckingProfile] = useState(false);
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

  const nextPath = useMemo(() => {
    const fromState = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
    const fromQuery = new URLSearchParams(location.search).get("next");
    return sanitizeRedirectPath(fromState || fromQuery);
  }, [location]);

  const finishLogin = useCallback(() => {
    navigate(nextPath, { replace: true });
  }, [navigate, nextPath]);

  useEffect(() => {
    if (loading || !user) {
      setStep("auth");
      return;
    }

    let cancelled = false;
    setCheckingProfile(true);
    void getMyUsername()
      .then((owned) => {
        if (cancelled) return;
        if (!owned) {
          setStep("username");
        } else {
          finishLogin();
        }
      })
      .catch(() => {
        if (!cancelled) setStep("username");
      })
      .finally(() => {
        if (!cancelled) setCheckingProfile(false);
      });

    return () => {
      cancelled = true;
    };
  }, [loading, user, finishLogin]);

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

  const handleGoogleSignIn = async () => {
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const usernameValidation = validateUsername(username);
        if (usernameValidation) {
          setUsernameError(usernameValidation);
          return;
        }
        const usernameOk = await checkUsernameTaken(username, { quiet: true });
        if (!usernameOk) return;
        await loginWithGoogle(username.trim());
      } else {
        await loginWithGoogle();
      }
    } catch (err) {
      console.error("Google sign-in failed:", err);
      setError(formatAuthError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleUsernameSetup = async (event: FormEvent) => {
    event.preventDefault();
    if (!user?.email) {
      setError("Your account has no email address. Try signing in with email/password.");
      return;
    }

    const usernameValidation = validateUsername(username);
    if (usernameValidation) {
      setUsernameError(usernameValidation);
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const available = await checkUsernameTaken(username, { quiet: true });
      if (!available) return;
      await claimUsername(username, user.uid, user.email);
      await updateProfile(user, { displayName: username.trim() });
      finishLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not claim username.");
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (next: "login" | "signup") => {
    setMode(next);
    setError(null);
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
  };

  const busy = loading || checkingProfile || submitting;

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#78a4bb] dark:bg-[#00264d]">
        <div className="h-full w-full blur-[6px]">
          <LandingReef appearance={theme} ambient frozen />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-background/40" />
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col">
        <header className="flex h-[4.75rem] shrink-0 items-center justify-end gap-2 px-5 md:px-10">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground/90 hover:text-foreground"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </header>

        <div className="flex flex-1 items-center justify-center px-5 py-10 md:px-10">
          <Card className="relative w-full max-w-md rounded-none border-foreground/20 bg-background/45 shadow-none backdrop-blur-[10px]">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3 rounded-full text-muted-foreground/90 hover:text-foreground"
            >
              <Link to="/" aria-label="Close and return home">
                <X />
              </Link>
            </Button>
            <CardHeader className="space-y-3 text-center">
              <img src="/favicon.ico" alt="" className="mx-auto size-12" aria-hidden />
              <span className="block font-display text-2xl font-semibold tracking-tight">
                Coralytics
              </span>
            </CardHeader>

            <CardContent>
              {loading || checkingProfile ? (
                <p className="py-8 text-center text-sm text-muted-foreground">Please wait…</p>
              ) : step === "username" ? (
                <UsernameSetupForm
                  username={username}
                  setUsername={setUsername}
                  usernameError={usernameError}
                  error={error}
                  submitting={submitting}
                  onUsernameBlur={() => void checkUsernameTaken(username)}
                  onUsernameChange={() => setUsernameError(null)}
                  onSubmit={handleUsernameSetup}
                />
              ) : mode === "login" ? (
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
                  onGoogleSignIn={() => void handleGoogleSignIn()}
                  googleDisabled={busy}
                />
              ) : (
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
                  onGoogleSignIn={() => void handleGoogleSignIn()}
                  googleDisabled={busy}
                />
              )}

              {step === "auth" && !loading && !checkingProfile ? (
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  {mode === "login" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        className="underline underline-offset-4 hover:text-foreground"
                        onClick={() => switchMode("signup")}
                      >
                        Sign up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="underline underline-offset-4 hover:text-foreground"
                        onClick={() => switchMode("login")}
                      >
                        Login
                      </button>
                    </>
                  )}
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function UsernameSetupForm({
  username,
  setUsername,
  usernameError,
  error,
  submitting,
  onUsernameBlur,
  onUsernameChange,
  onSubmit,
}: {
  username: string;
  setUsername: (v: string) => void;
  usernameError: string | null;
  error: string | null;
  submitting: boolean;
  onUsernameBlur: () => void;
  onUsernameChange: () => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <form className="space-y-4" onSubmit={(e) => void onSubmit(e)}>
      <p className="text-center text-sm text-muted-foreground">
        Pick a username to finish setting up your account.
      </p>
      <div className="space-y-2">
        <Input
          id="setup-username"
          type="text"
          autoComplete="username"
          aria-label="Username"
          required
          minLength={3}
          maxLength={20}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            onUsernameChange();
          }}
          onBlur={onUsernameBlur}
          placeholder="Username"
          className="rounded-[10px]"
        />
        {usernameError ? (
          <p className="text-sm text-destructive" role="alert">
            {usernameError}
          </p>
        ) : null}
      </div>
      {error ? (
        <Alert variant="destructive" className="rounded-[10px]">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <Button
        type="submit"
        className="w-full rounded-[10px]"
        disabled={submitting || Boolean(usernameError)}
      >
        {submitting ? "Please wait…" : "Continue"}
      </Button>
    </form>
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
  onGoogleSignIn,
  googleDisabled,
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
  onGoogleSignIn: () => void;
  googleDisabled: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 rounded-[10px] border-foreground/25 bg-background/40 text-[12px] font-medium uppercase tracking-[0.18em]"
        disabled={googleDisabled}
        onClick={onGoogleSignIn}
      >
        <GoogleLogo className="size-4 shrink-0" />
        Continue with Google
      </Button>

      <div className="relative py-1 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span className="bg-transparent px-2">or</span>
        <span
          className="pointer-events-none absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border/70"
          aria-hidden
        />
      </div>

      <form className="space-y-4" onSubmit={(e) => void onSubmit(e)}>
        {mode === "signup" ? (
          <div className="space-y-2">
            <Input
              id="username"
              type="text"
              autoComplete="username"
              aria-label="Username"
              required
              minLength={3}
              maxLength={20}
              value={username}
              onChange={(e) => {
                setUsername?.(e.target.value);
                onUsernameChange?.();
              }}
              onBlur={onUsernameBlur}
              placeholder="Username"
              className="rounded-[10px]"
            />
            {usernameError ? (
              <p className="text-sm text-destructive" role="alert">
                {usernameError}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="space-y-2">
            <Input
              id="identifier"
              type="text"
              autoComplete="username"
              aria-label="Username or email"
              required
              value={identifier}
              onChange={(e) => setIdentifier?.(e.target.value)}
              placeholder="Username or email"
              className="rounded-[10px]"
            />
          </div>
        )}

        {mode === "signup" ? (
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-label="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail?.(e.target.value);
                onEmailChange?.();
              }}
              onBlur={onEmailBlur}
              placeholder="Email"
              className="rounded-[10px]"
            />
            {emailError ? (
              <p className="text-sm text-destructive" role="alert">
                {emailError}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="space-y-2">
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              aria-label="Password"
              required
              minLength={mode === "login" ? 6 : 8}
              value={password}
              placeholder="Password"
              className="rounded-[10px] pr-11"
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
          <Alert variant="destructive" className="rounded-[10px]">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : null}

        <Button
          type="submit"
          className="w-full rounded-[10px]"
          disabled={
            submitting || Boolean(usernameError) || Boolean(emailError) || Boolean(passwordError)
          }
        >
          {submitting ? "Please wait…" : mode === "login" ? "Login" : "Create account"}
        </Button>
      </form>
    </div>
  );
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
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
