"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { updateUserProfile } from "@/services/userService";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";

const VIBE_CATEGORIES = ["Tech", "Fashion", "Gaming", "Budget", "Luxury"];

export function CategoryOnboarding() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const preferences = useStore((state) => state.preferences);
  const setPreferences = useStore((state) => state.setPreferences);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  if (authLoading || !isAuthenticated || !user || preferences.length > 0) return null;

  async function handleSave() {
    if (selected.length === 0) return;
    setLoading(true);
    await updateUserProfile(user!.uid, { preferences: selected });
    setPreferences(selected);
    setLoading(false);
  }

  function toggle(cat: string) {
    if (selected.includes(cat)) setSelected((prev) => prev.filter((c) => c !== cat));
    else setSelected((prev) => [...prev, cat]);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-surface-container p-6 shadow-2xl">
        <h2 className="mb-2 font-headline text-2xl font-bold text-white">Curate Your Vibe</h2>
        <p className="mb-6 text-sm text-white/60">Select your favorite categories to instantly tune your discovery feed.</p>
        <div className="mb-8 flex flex-wrap gap-2">
          {VIBE_CATEGORIES.map((cat) => {
            const active = selected.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggle(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "bg-primary border-primary text-background"
                    : "border-white/20 text-white/80 hover:border-white/50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <Button onClick={handleSave} disabled={selected.length === 0 || loading} className="w-full">
          {loading ? "Saving..." : "Start Swiping"}
        </Button>
      </div>
    </div>
  );
}
