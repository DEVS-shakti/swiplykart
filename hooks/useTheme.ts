"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getUserProfile, updateUserPreference } from "@/services/userService";

export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
  isLoading: boolean;
}

const THEME_KEY = "theme-preference";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function useTheme(): ThemeContextType {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Theme>("dark");
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize theme
  useEffect(() => {
    setIsMounted(true);
    
    async function initTheme() {
      try {
        // If user is logged in, get theme from Firebase
        if (user) {
          const profile = await getUserProfile(user.uid);
          if (profile?.theme) {
            setThemeState(profile.theme as Theme);
          } else {
            // Use system preference if no saved preference
            const systemTheme = getSystemTheme();
            setThemeState(systemTheme);
            // Save to Firebase
            try {
              await updateUserPreference(user.uid, { theme: systemTheme });
            } catch (error) {
              console.error("Error saving initial theme to Firebase:", error);
            }
          }
        } else {
          // Guest user: check localStorage first, then system preference
          const saved = localStorage.getItem(THEME_KEY);
          if (saved) {
            setThemeState(saved as Theme);
          } else {
            const systemTheme = getSystemTheme();
            setThemeState(systemTheme);
            localStorage.setItem(THEME_KEY, systemTheme);
          }
        }
      } catch (error) {
        console.error("Error initializing theme:", error);
        setThemeState("dark"); // Fallback
      } finally {
        setIsLoading(false);
      }
    }

    initTheme();
  }, [user]);

  // Apply theme to DOM
  useEffect(() => {
    if (!isMounted) return;
    
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    
    // Store in localStorage for guest users
    if (!user) {
      localStorage.setItem(THEME_KEY, theme);
    }
  }, [theme, user, isMounted]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);

    if (user) {
      try {
        await updateUserPreference(user.uid, { theme: newTheme });
      } catch (error) {
        console.error("Error saving theme preference:", error);
      }
    } else {
      localStorage.setItem(THEME_KEY, newTheme);
    }
  };

  return { theme, setTheme, isLoading };
}
