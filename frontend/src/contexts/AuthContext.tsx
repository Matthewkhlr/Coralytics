import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
  type User,
} from "firebase/auth";
import { setAuthTokenProvider } from "../api/client";
import { invalidateAnalysisCache } from "../lib/analysisCache";
import { auth } from "../lib/firebase";
import {
  changeUsernameClaim,
  claimUsername,
  isUsernameAvailable,
  looksLikeEmail,
  resolveLoginEmail,
  validateUsername,
} from "../lib/usernames";
import { clearCachedProfile, writeCachedProfile } from "../lib/profileCache";
import { invalidateUploadFlowSession } from "../lib/uploadFlowSession";
import { invalidateUploadsCache } from "../lib/uploadsCache";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  /** Login with username or email + password */
  login: (identifier: string, password: string) => Promise<void>;
  /** Sign up with unique username + email + password */
  signUp: (username: string, email: string, password: string) => Promise<void>;
  /** Google login (existing) or Google sign-up (requires username) */
  loginWithGoogle: (username?: string) => Promise<void>;
  /** Update display name + Firestore username claim */
  updateUsername: (username: string) => Promise<void>;
  /** Reauthenticate with current password, then set a new password */
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  logOut: () => Promise<void>;
};

function hasPasswordProvider(user: User) {
  return user.providerData.some((provider) => provider.providerId === "password");
}

const AuthContext = createContext<AuthContextValue | null>(null);
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      if (nextUser) {
        writeCachedProfile(
          nextUser.displayName || nextUser.email?.split("@")[0] || "User",
          nextUser.email,
        );
      } else {
        clearCachedProfile();
        invalidateAnalysisCache();
        invalidateUploadsCache();
        invalidateUploadFlowSession();
      }
      setUser(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    setAuthTokenProvider(async () => {
      if (!auth.currentUser) return null;
      return auth.currentUser.getIdToken();
    });
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    const email = looksLikeEmail(identifier) ? identifier.trim() : await resolveLoginEmail(identifier);
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback(async (username: string, email: string, password: string) => {
    const usernameError = validateUsername(username);
    if (usernameError) throw new Error(usernameError);
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await updateProfile(credential.user, { displayName: username.trim() });
    try {
      await claimUsername(username, credential.user.uid, email.trim());
    } catch (err) {
      console.warn("Account created, but username claim failed:", err);
    }
  }, []);

  const loginWithGoogle = useCallback(async (username?: string) => {
    if (username !== undefined) {
      const usernameError = validateUsername(username);
      if (usernameError) throw new Error(usernameError);
      if (!(await isUsernameAvailable(username))) {
        throw new Error("That username is already taken.");
      }
    }

    const result = await signInWithPopup(auth, googleProvider);
    const email = result.user.email ?? "";

    if (username) {
      try {
        await updateProfile(result.user, { displayName: username.trim() });
        await claimUsername(username, result.user.uid, email);
      } catch (err) {
        await signOut(auth);
        throw err;
      }
    }
  }, []);

  const refreshUser = useCallback(async () => {
    if (!auth.currentUser) {
      setUser(null);
      return;
    }
    await auth.currentUser.reload();
    setUser(auth.currentUser);
  }, []);

  const updateUsername = useCallback(
    async (username: string) => {
      const current = auth.currentUser;
      if (!current) throw new Error("You must be signed in to change your username.");

      const trimmed = username.trim();
      const usernameError = validateUsername(trimmed);
      if (usernameError) throw new Error(usernameError);

      await changeUsernameClaim(
        current.displayName,
        trimmed,
        current.uid,
        current.email ?? "",
      );
      await updateProfile(current, { displayName: trimmed });
      writeCachedProfile(trimmed, current.email);
      await refreshUser();
    },
    [refreshUser],
  );

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    const current = auth.currentUser;
    if (!current) throw new Error("You must be signed in to change your password.");
    if (!current.email) throw new Error("Your account has no email address.");
    if (!hasPasswordProvider(current)) {
      throw new Error("Password changes are only available for email/password accounts.");
    }
    if (newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters.");
    }

    const credential = EmailAuthProvider.credential(current.email, currentPassword);
    await reauthenticateWithCredential(current, credential);
    await updatePassword(current, newPassword);
  }, []);

  const logOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      signUp,
      loginWithGoogle,
      updateUsername,
      changePassword,
      logOut,
    }),
    [user, loading, login, signUp, loginWithGoogle, updateUsername, changePassword, logOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
