import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC54kkMbKR-ls4x-2_WRwrf50XK5k8Awto",
  authDomain: "swiplykart.firebaseapp.com",
  projectId: "swiplykart",
  storageBucket: "swiplykart.firebasestorage.app",
  messagingSenderId: "773102993769",
  appId: "1:773102993769:web:719dc053d72d166e957df8",
  measurementId: "G-X98DBWJH41",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

let analyticsPromise: Promise<Analytics | null> | null = null;

export function getFirebaseAnalytics() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  analyticsPromise ??= isSupported()
    .then((supported) => (supported ? getAnalytics(app) : null))
    .catch(() => null);

  return analyticsPromise;
}
