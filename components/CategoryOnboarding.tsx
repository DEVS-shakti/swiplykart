"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getDistinctCategories } from "@/services/productService";
import { updateUserProfile } from "@/services/userService";
import { useStore } from "@/store/useStore";
import { FALLBACK_CATEGORIES } from "@/utils/catalog";

export function CategoryOnboarding() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const preferences = useStore((state) => state.preferences);
  const setPreferences = useStore((state) => state.setPreferences);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getDistinctCategories(400)
      .then((list) => {
        if (!cancelled) {
          setCategories(list.length >= 2 ? list : [...FALLBACK_CATEGORIES]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingCategories(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
        <p className="mb-6 text-sm text-white/60">
          Select categories from our catalog to tune your discovery feed. (Loaded from your Firestore products.)
        </p>
        <div className="mb-8 flex flex-wrap gap-2">
          {loadingCategories ? (
            <p className="text-sm text-white/45">Loading categories…</p>
          ) : (
            categories.map((cat) => {
              const active = selected.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggle(cat)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    active
                      ? "border-primary bg-primary text-background"
                      : "border-white/20 text-white/80 hover:border-white/50"
                  }`}
                >
                  {cat}
                </button>
              );
            })
          )}
        </div>
        <Button onClick={() => void handleSave()} disabled={selected.length === 0 || loading || loadingCategories} className="w-full">
          {loading ? "Saving..." : "Start Swiping"}
        </Button>
      </div>
    </div>
  );
}
