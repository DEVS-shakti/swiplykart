"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { DashboardProfileSection } from "@/components/DashboardProfileSection";
import { ProductCard } from "@/components/ProductCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { getDistinctCategories, getProductsByIds, getProducts } from "@/services/productService";
import { updateUserProfile } from "@/services/userService";
import { useStore } from "@/store/useStore";
import { Product } from "@/types";
import { FALLBACK_CATEGORIES } from "@/utils/catalog";

export function DashboardShell() {
  const { user } = useAuth();
  const likes = useStore((state) => state.likes);
  const saved = useStore((state) => state.saved);
  const recentlyViewed = useStore((state) => state.recentlyViewed);
  const preferences = useStore((state) => state.preferences);
  const setPreferences = useStore((state) => state.setPreferences);
  const resetPreferences = useStore((state) => state.resetPreferences);

  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState<string[]>(() => [...FALLBACK_CATEGORIES]);

  useEffect(() => {
    let cancelled = false;
    getDistinctCategories(400).then((list) => {
      if (!cancelled) setCategoryOptions(list.length >= 2 ? list : [...FALLBACK_CATEGORIES]);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [liked, vault, recent, { products: suggested }] = await Promise.all([
        getProductsByIds(likes),
        getProductsByIds(saved),
        getProductsByIds(recentlyViewed),
        getProducts(6),
      ]);
      setLikedProducts(liked);
      setSavedProducts(vault);
      setRecentProducts(recent);
      setSuggestedProducts(suggested);
      setLoading(false);
    }
    void loadData();
  }, [likes, saved, recentlyViewed]);

  async function togglePreference(cat: string) {
    const next = preferences.includes(cat) ? preferences.filter((c) => c !== cat) : [...preferences, cat];
    setPreferences(next);
    if (user) {
      setSavingPrefs(true);
      try {
        await updateUserProfile(user.uid, { preferences: next });
      } finally {
        setSavingPrefs(false);
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 py-16">
        <div className="h-40 animate-pulse rounded-[28px] bg-surface-container-high/80" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="h-64 animate-pulse rounded-[28px] bg-surface-container-high/80" />
          <div className="h-64 animate-pulse rounded-[28px] bg-surface-container-high/80" />
        </div>
      </div>
    );
  }

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Curator";

  return (
    <div className="space-y-10">
      <section className="section-shell overflow-hidden rounded-[34px] p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary">Your space</p>
            <h1 className="mt-3 font-headline text-4xl font-extrabold text-foreground md:text-5xl">{displayName}</h1>
            <p className="mt-3 max-w-xl text-soft-foreground">
              Saved picks, recent glances, and vibe preferences stay synced when you&apos;re signed in. Tune categories
              anytime - the feed learns with you.
            </p>
            {!user ? (
              <p className="mt-4 text-sm text-tertiary">
                <Link href="/auth/login" className="font-semibold underline-offset-2 hover:underline">
                  Sign in
                </Link>{" "}
                to sync saves across devices.
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="theme-panel-soft rounded-[24px] p-4 text-center">
              <div className="font-headline text-3xl font-extrabold text-primary">{likes.length}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-faint-foreground">Likes</div>
            </div>
            <div className="theme-panel-soft rounded-[24px] p-4 text-center">
              <div className="font-headline text-3xl font-extrabold text-tertiary">{saved.length}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-faint-foreground">Saved</div>
            </div>
            <div className="theme-panel-soft rounded-[24px] p-4 text-center">
              <div className="font-headline text-3xl font-extrabold text-secondary">{recentlyViewed.length}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-faint-foreground">Viewed</div>
            </div>
          </div>
        </div>
      </section>

      <DashboardProfileSection />

      <section className="theme-panel rounded-[28px] p-6">
        <h2 className="font-headline text-lg font-bold text-foreground">Vibe preferences</h2>
        <p className="mt-1 text-sm text-faint-foreground">Used to weight your swipe feed and recommendations.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {categoryOptions.map((cat) => {
            const active = preferences.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                disabled={savingPrefs}
                onClick={() => void togglePreference(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-outline text-soft-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-headline text-2xl font-bold text-foreground">Saved products</h2>
              <Link href="/swipe" className={cn(buttonVariants({ variant: "secondary", size: "md" }))}>
                Keep swiping
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {(savedProducts.length ? savedProducts : suggestedProducts).slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} compact priority={index < 2} />
              ))}
            </div>
            {!savedProducts.length ? (
              <p className="mt-4 text-sm text-faint-foreground">Nothing saved yet - tap Save on a card or product tile.</p>
            ) : null}
          </div>

          <div>
            <h2 className="mb-5 font-headline text-2xl font-bold text-foreground">Liked products</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {(likedProducts.length ? likedProducts : suggestedProducts).slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} compact priority={index < 2} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 font-headline text-2xl font-bold text-foreground">Recently viewed</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {(recentProducts.length ? recentProducts : suggestedProducts).slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-headline text-2xl font-bold text-foreground">Suggested for you</h2>
            <Button variant="ghost" className="text-faint-foreground hover:text-foreground" onClick={resetPreferences}>
              Clear local state
            </Button>
          </div>
          <div className="space-y-5">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact showTags={false} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
