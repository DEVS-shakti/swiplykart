"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { useAuth } from "./useAuth";
import { getUserProfile, updateUserPreference } from "@/services/userService";

export type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  isLoading: boolean;
};

const THEME_KEY = "theme-preference";
const ThemeContext = createContext<ThemeContextType | null>(null);

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(THEME_KEY);
  return isTheme(stored) ? stored : null;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyThemeToDom(theme: Theme) {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.classList.remove("light", "dark");
  html.classList.add(theme);
  html.dataset.theme = theme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialTheme = getStoredTheme() ?? getSystemTheme();
    setThemeState(initialTheme);
    applyThemeToDom(initialTheme);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initTheme() {
      const fallbackTheme = getStoredTheme() ?? getSystemTheme();
      setIsLoading(true);

      try {
        if (user) {
          const profile = await getUserProfile(user.uid);
          if (cancelled) return;

          const rawTheme = profile?.theme ?? null;
          const profileTheme = isTheme(rawTheme) ? rawTheme : null;

          if (profileTheme) {
            setThemeState(profileTheme);
            window.localStorage.setItem(THEME_KEY, profileTheme);
          } else {
            setThemeState(fallbackTheme);
            window.localStorage.setItem(THEME_KEY, fallbackTheme);
            try {
              await updateUserPreference(user.uid, { theme: fallbackTheme });
            } catch (error) {
              console.error("Error saving initial theme to Firebase:", error);
            }
          }
        } else {
          setThemeState(fallbackTheme);
          window.localStorage.setItem(THEME_KEY, fallbackTheme);
        }
      } catch (error) {
        console.error("Error initializing theme:", error);
        if (!cancelled) {
          setThemeState(fallbackTheme);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void initTheme();

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    applyThemeToDom(theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme]);

  const setTheme = useCallback(async (nextTheme: Theme) => {
    setThemeState(nextTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_KEY, nextTheme);
    }

    if (!user) return;

    try {
      await updateUserPreference(user.uid, { theme: nextTheme });
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  }, [user]);

  const value = useMemo(
    () => ({ theme, setTheme, isLoading }),
    [theme, setTheme, isLoading],
  );

  return createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }
  return context;
}
