import "client-only";

import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider, type AppCheck } from "firebase/app-check";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/firebase/app";

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

let analyticsPromise: Promise<Analytics | null> | null = null;
let appCheckInit = false;

export function getFirebaseAnalytics() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  analyticsPromise ??= isSupported()
    .then((supported) => (supported ? getAnalytics(app) : null))
    .catch(() => null);

  return analyticsPromise;
}

/**
 * Optional App Check (reCAPTCHA Enterprise). Set NEXT_PUBLIC_APPCHECK_SITE_KEY to enable.
 * Register the site in Firebase Console → App Check.
 */
export function initFirebaseAppCheck(): AppCheck | null {
  if (typeof window === "undefined" || appCheckInit) {
    return null;
  }
  const siteKey = process.env.NEXT_PUBLIC_APPCHECK_SITE_KEY;
  if (!siteKey) {
    return null;
  }
  appCheckInit = true;
  try {
    return initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch {
    appCheckInit = false;
    return null;
  }
}
