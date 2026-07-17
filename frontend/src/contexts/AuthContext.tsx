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
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { setAuthTokenProvider } from "../api/client";
import { auth } from "../lib/firebase";
import {
  claimUsername,
  isUsernameAvailable,
  resolveLoginEmail,
  validateUsername,
} from "../lib/usernames";
import { clearCachedProfile, writeCachedProfile } from "../lib/profileCache";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  /** Login with username or email + password */
  login: (identifier: string, password: string) => Promise<void>;
  /** Sign up with unique username + email + password */
  signUp: (username: string, email: string, password: string) => Promise<void>;
  /** Google login (existing) or Google sign-up (requires username) */
  loginWithGoogle: (username?: string) => Promise<void>;
  logOut: () => Promise<void>;
};

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
    const email = await resolveLoginEmail(identifier);
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signUp = useCallback(async (username: string, email: string, password: string) => {
    const usernameError = validateUsername(username);
    if (usernameError) throw new Error(usernameError);
    if (!(await isUsernameAvailable(username))) {
      throw new Error("That username is already taken.");
    }
    const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await updateProfile(credential.user, { displayName: username.trim() });
    await claimUsername(username, credential.user.uid, email.trim());
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

  const logOut = useCallback(async () => {
    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, signUp, loginWithGoogle, logOut }),
    [user, loading, login, signUp, loginWithGoogle, logOut],
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
