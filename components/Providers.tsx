"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getUserProfile, createUserProfile } from "@/services/userService";
import { useStore } from "@/store/useStore";

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
      <AuthSync />
      <CategoryOnboarding />
      {children}
    </>
  );
}
