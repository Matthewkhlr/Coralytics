import { initializeApp, getApps } from "firebase/app";
import {
  browserLocalPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "localhost",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "coralytics-c8767",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Keep the Firebase login session across page reloads and tab switches.
void setPersistence(auth, browserLocalPersistence);

const useAuthEmulator = import.meta.env.VITE_USE_AUTH_EMULATOR === "true";
const useFirestoreEmulator = import.meta.env.VITE_USE_FIRESTORE_EMULATOR === "true";

const AUTH_EMULATOR_URL = "http://localhost:9099";

if (useAuthEmulator) {
  try {
    connectAuthEmulator(auth, AUTH_EMULATOR_URL, { disableWarnings: true });
  } catch {
    // Emulator already connected (hot reload).
  }
}

if (useFirestoreEmulator) {
  try {
    connectFirestoreEmulator(db, "localhost", 8080);
  } catch {
    // Emulator already connected (hot reload).
  }
}
