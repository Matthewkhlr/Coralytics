import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AtSign, CircleUserRound, KeyRound, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  clearCachedProfile,
  readCachedProfile,
  writeCachedProfile,
} from "@/lib/profileCache";
import { isUsernameAvailable, validateUsername } from "@/lib/usernames";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function ProfileMenu() {
  const { user, loading, updateUsername, changePassword, logOut } = useAuth();
  const navigate = useNavigate();

  const [usernameOpen, setUsernameOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cachedProfile = readCachedProfile();
  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    cachedProfile?.displayName ||
    "User";
  const email = user?.email ?? cachedProfile?.email ?? "";
  const canChangePassword =
    user?.providerData.some((provider) => provider.providerId === "password") ?? false;

  useEffect(() => {
    if (!user) return;
    writeCachedProfile(
      user.displayName || user.email?.split("@")[0] || "User",
      user.email,
    );
  }, [user]);

  const resetUsernameForm = () => {
    setNewUsername(displayName);
    setError(null);
    setSaving(false);
  };

  const resetPasswordForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    setSaving(false);
  };

  const handleSignOut = async () => {
    clearCachedProfile();
    await logOut();
    navigate("/");
  };

  const handleChangeUsername = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = newUsername.trim();
    const formatError = validateUsername(trimmed);
    if (formatError) {
      setError(formatError);
      return;
    }
    if (trimmed.toLowerCase() === displayName.toLowerCase()) {
      setError("That is already your username.");
      return;
    }

    setSaving(true);
    try {
      if (!(await isUsernameAvailable(trimmed))) {
        setError("That username is already taken.");
        setSaving(false);
        return;
      }
      await updateUsername(trimmed);
      setUsernameOpen(false);
      resetUsernameForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update username.");
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      await changePassword(currentPassword, newPassword);
      setPasswordOpen(false);
      resetPasswordForm();
    } catch (err) {
      setError(formatPasswordError(err));
      setSaving(false);
    }
  };

  if (loading && !user) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="rounded-full text-muted-foreground/90"
        aria-label="Account menu"
      >
        <CircleUserRound />
      </Button>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground/90 hover:text-foreground"
            aria-label="Account menu"
          >
            <CircleUserRound className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 border-foreground/20 bg-background/45 backdrop-blur-[10px]"
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="truncate text-sm font-semibold text-foreground">{displayName}</p>
              {email ? (
                <p className="truncate text-xs text-muted-foreground">{email}</p>
              ) : null}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              resetUsernameForm();
              setUsernameOpen(true);
            }}
          >
            <AtSign />
            Change username
          </DropdownMenuItem>
          {canChangePassword ? (
            <DropdownMenuItem
              onClick={() => {
                resetPasswordForm();
                setPasswordOpen(true);
              }}
            >
              <KeyRound />
              Change password
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem onClick={() => void handleSignOut()}>
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet
        open={usernameOpen}
        onOpenChange={(open) => {
          setUsernameOpen(open);
          if (!open) resetUsernameForm();
        }}
      >
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-left">Change username</SheetTitle>
            <SheetDescription className="text-left">
              Choose a unique username (3–20 letters, numbers, or underscore).
            </SheetDescription>
          </SheetHeader>

          <form
            className="mt-6 flex flex-col gap-4 px-4"
            onSubmit={(e) => void handleChangeUsername(e)}
          >
            <div className="space-y-2">
              <Label htmlFor="new-username">Username</Label>
              <Input
                id="new-username"
                type="text"
                autoComplete="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
                minLength={3}
                maxLength={20}
              />
            </div>

            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <Button type="submit" disabled={saving} className="mt-2">
              {saving ? "Updating…" : "Update username"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>

      <Sheet
        open={passwordOpen}
        onOpenChange={(open) => {
          setPasswordOpen(open);
          if (!open) resetPasswordForm();
        }}
      >
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display text-left">Change password</SheetTitle>
            <SheetDescription className="text-left">
              Enter your current password, then choose a new one.
            </SheetDescription>
          </SheetHeader>

          <form
            className="mt-6 flex flex-col gap-4 px-4"
            onSubmit={(e) => void handleChangePassword(e)}
          >
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <Button type="submit" disabled={saving} className="mt-2">
              {saving ? "Updating…" : "Update password"}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

function formatPasswordError(err: unknown): string {
  const code = (err as { code?: string }).code;
  if (
    code === "auth/invalid-credential" ||
    code === "auth/wrong-password" ||
    code === "auth/invalid-login-credentials"
  ) {
    return "Current password is incorrect.";
  }
  if (code === "auth/weak-password") {
    return "New password must be at least 6 characters.";
  }
  if (code === "auth/requires-recent-login") {
    return "Please sign out and sign in again, then retry.";
  }
  return err instanceof Error ? err.message : "Could not update password.";
}
