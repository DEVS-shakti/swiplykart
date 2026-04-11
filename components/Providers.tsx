"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { getUserProfile, createUserProfile } from "@/services/userService";
import { useStore } from "@/store/useStore";

function ThemeInitializer() {
  const { isLoading: themeLoading } = useTheme();

  // Theme is initialized in useTheme hook
  // This component just ensures the hook runs at the provider level
  return null;
}

function AuthSync() {
  const { user, isAuthenticated } = useAuth();
  const syncFromFirebase = useStore((state) => state.syncFromFirebase);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    async function sync() {
      if (!user) return;
      let profile = await getUserProfile(user.uid);
      if (!profile) {
        // First time login
        await createUserProfile(user.uid, {
          preferences: [],
          likedProducts: [],
          savedProducts: [],
        });
        profile = { uid: user.uid, preferences: [], likedProducts: [], savedProducts: [] };
      }
      
      syncFromFirebase({
        likes: profile.likedProducts || [],
        saved: profile.savedProducts || [],
        preferences: profile.preferences || [],
      });
    }

    sync();
  }, [user, isAuthenticated, syncFromFirebase]);

  return null;
}

import { AppCheckInit } from "./AppCheckInit";
import { CategoryOnboarding } from "./CategoryOnboarding";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppCheckInit />
      <ThemeInitializer />
      <AuthSync />
      <CategoryOnboarding />
      {children}
    </>
  );
}
