import { initializeApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "localhost",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "coralytics-c8767",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const useEmulator =
  import.meta.env.VITE_USE_AUTH_EMULATOR === "true" || import.meta.env.DEV;

const AUTH_EMULATOR_URL = "http://localhost:9099";

if (useEmulator) {
  try {
    connectAuthEmulator(auth, AUTH_EMULATOR_URL, { disableWarnings: true });
  } catch {
    // Emulator already connected (hot reload).
  }
  try {
    connectFirestoreEmulator(db, "localhost", 8080);
  } catch {
    // Emulator already connected (hot reload).
  }
}
