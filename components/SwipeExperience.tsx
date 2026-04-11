"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, PanInfo, useAnimationControls } from "framer-motion";
import { Bookmark, ChevronLeft, ChevronRight, Heart, Sparkles, X } from "lucide-react";

import { SwipeCard } from "@/components/SwipeCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/hooks/useAuth";
import { getProductsAfter } from "@/services/productService";
import { getPersonalizedFeed } from "@/services/recommendationService";
import { trackUserInteraction } from "@/services/userService";

const swipeThreshold = 110;
const prefetchAhead = 4;
const loadMoreBuffer = 5;

type SwipeExperienceProps = {
  initialProducts: Product[];
};

export function SwipeExperience({ initialProducts }: SwipeExperienceProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"liked" | "disliked" | "saved" | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [feedExhausted, setFeedExhausted] = useState(false);
  const [authHint, setAuthHint] = useState<string | null>(null);
  const [personalizedLoaded, setPersonalizedLoaded] = useState(false);

  const likeProduct = useStore((s) => s.likeProduct);
  const dislikeProduct = useStore((s) => s.dislikeProduct);
  const toggleSaved = useStore((s) => s.toggleSaved);
  const viewProduct = useStore((s) => s.viewProduct);
  const savedIds = useStore((s) => s.saved);

  const { user, loading: authLoading } = useAuth();
  const controls = useAnimationControls();
  const prevHadUser = useRef(false);

  useEffect(() => {
    setProducts(initialProducts);
    setIndex(0);
    setFeedExhausted(false);
  }, [initialProducts]);

  useEffect(() => {
    if (prevHadUser.current && !user) {
      setProducts(initialProducts);
      setIndex(0);
      setFeedExhausted(false);
      setPersonalizedLoaded(false);
    }
    prevHadUser.current = !!user;
  }, [user, initialProducts]);

  useEffect(() => {
    if (authLoading || !user?.uid || personalizedLoaded) return;
    let cancelled = false;
    (async () => {
      try {
        const personalized = await getPersonalizedFeed(user.uid, 28);
        if (!cancelled && personalized.length > 0) {
          setProducts(personalized);
          setIndex(0);
        }
      } finally {
        if (!cancelled) setPersonalizedLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authLoading, user?.uid, personalizedLoaded]);

  useEffect(() => {
    const nextImages = products.slice(index + 1, index + 1 + prefetchAhead);
    nextImages.forEach((product) => {
      const img = new window.Image();
      img.src = product.image;
    });
  }, [index, products]);

  const loadMore = useCallback(async () => {
    if (loadingMore || feedExhausted || products.length === 0) return;
    const lastId = products[products.length - 1]?.id;
    if (!lastId) return;
    setLoadingMore(true);
    try {
      const { products: more } = await getProductsAfter(lastId, 16);
      if (more.length === 0) {
        setFeedExhausted(true);
      } else {
        let grew = false;
        setProducts((prev) => {
          const seen = new Set(prev.map((p) => p.id));
          const merged = [...prev];
          for (const p of more) {
            if (!seen.has(p.id)) {
              seen.add(p.id);
              merged.push(p);
            }
          }
          grew = merged.length > prev.length;
          return merged;
        });
        if (!grew) {
          setFeedExhausted(true);
        }
      }
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, feedExhausted, products]);

  useEffect(() => {
    if (index >= products.length - loadMoreBuffer) {
      void loadMore();
    }
  }, [index, products.length, loadMore]);

  const advance = useCallback(() => {
    setIndex((current) => {
      if (products.length === 0) return 0;
      return current + 1 >= products.length ? 0 : current + 1;
    });
  }, [products.length]);

  const goNext = useCallback(async () => {
    if (products.length === 0) return;
    await controls.start({ x: 420, opacity: 0, rotate: 12, transition: { duration: 0.22 } });
    controls.set({ x: 0, opacity: 1, rotate: 0 });
    setIndex((current) => {
      if (products.length === 0) return 0;
      const next = current + 1 >= products.length ? 0 : current + 1;
      const p = products[next];
      if (p) queueMicrotask(() => viewProduct(p.id));
      return next;
    });
  }, [products, controls, viewProduct]);

  const goPrev = useCallback(async () => {
    if (index <= 0) return;
    await controls.start({ x: -420, opacity: 0, rotate: -12, transition: { duration: 0.22 } });
    controls.set({ x: 0, opacity: 1, rotate: 0 });
    setIndex((current) => Math.max(0, current - 1));
  }, [index, controls]);

  const react = useCallback(
    async (action: "liked" | "disliked" | "saved") => {
      const current = products[index];
      if (!current) return;

      viewProduct(current.id);

      if (action === "liked") {
        const wasLiked = useStore.getState().likes.includes(current.id);
        likeProduct(current.id);
        if (user && !wasLiked) {
          try {
            await trackUserInteraction(user.uid, "like", current.id, false);
          } catch {
            /* ignore */
          }
        }
        await controls.start({ x: 420, opacity: 0, rotate: 12, transition: { duration: 0.22 } });
        controls.set({ x: 0, opacity: 1, rotate: 0 });
        advance();
      }

      if (action === "disliked") {
        dislikeProduct(current.id);
        if (user) {
          try {
            await trackUserInteraction(user.uid, "dislike", current.id, false);
          } catch {
            /* ignore */
          }
        }
        await controls.start({ x: -420, opacity: 0, rotate: -12, transition: { duration: 0.22 } });
        controls.set({ x: 0, opacity: 1, rotate: 0 });
        advance();
      }

      if (action === "saved") {
        if (!user) {
          setAuthHint("Sign in to save products to your vault.");
          window.setTimeout(() => setAuthHint(null), 3200);
          return;
        }
        const wasSaved = useStore.getState().saved.includes(current.id);
        toggleSaved(current.id);
        try {
          await trackUserInteraction(user.uid, "save", current.id, wasSaved);
        } catch {
          /* ignore */
        }
      }

      setFeedback(action === "saved" ? "saved" : action);
      window.setTimeout(() => setFeedback(null), 700);
    },
    [products, index, user, likeProduct, dislikeProduct, toggleSaved, viewProduct, advance, controls],
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") void goNext();
      else if (e.key === "ArrowLeft") void goPrev();
      else if (e.key === "l" || e.key === "L") void react("liked");
      else if (e.key === "d" || e.key === "D" || e.key === "x" || e.key === "X") void react("disliked");
      else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") void react("saved");
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, react]);

  async function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x > swipeThreshold) {
      await goNext();
      return;
    }
    if (info.offset.x < -swipeThreshold) {
      await goPrev();
    }
  }

  const visible = products.slice(index, index + 3);
  const progress = products.length ? Math.min(100, ((index + 1) / products.length) * 100) : 0;

  if (!products.length) {
    return (
      <section className="relative mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-lg flex-col items-center justify-center gap-6 px-6 pb-24 pt-8 text-center">
        <p className="text-soft-foreground">No products in the feed yet. Add items in Firestore or check your connection.</p>
        <Link href="/products" className={cn(buttonVariants({ variant: "secondary", size: "md" }))}>
          Browse catalog
        </Link>
      </section>
    );
  }

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-6xl flex-col items-center justify-center px-4 pb-28 pt-6 md:px-6 md:pb-24 md:pt-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[12%] h-72 w-72 rounded-full bg-secondary-container/25 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[8%] h-72 w-72 rounded-full bg-primary/15 blur-[120px]" />
      </div>

      {!user ? (
        <p className="relative z-20 mb-4 max-w-md text-center text-xs text-faint-foreground">
          Browsing as guest - swipe freely.{" "}
          <Link href="/auth/login" className="font-semibold text-primary underline-offset-2 hover:underline">
            Sign in
          </Link>{" "}
          for saves and a tuned feed.
        </p>
      ) : null}

      {authHint ? (
        <div className="relative z-20 mb-3 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-2 text-sm text-foreground">
          {authHint}{" "}
          <Link href="/auth/login" className="font-bold text-primary">
            Log in
          </Link>
        </div>
      ) : null}

      <div className="relative z-10 flex w-full flex-col items-center gap-8 md:gap-10">
        <div className="relative h-[min(78vh,720px)] w-full max-w-[420px] touch-pan-y">
          <Button
            variant="secondary"
            size="icon"
            type="button"
            aria-label="Previous product"
            onClick={() => void goPrev()}
            disabled={index <= 0}
            className="absolute -left-2 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 rounded-full border-outline/60 bg-surface-container-high/80 hover:bg-surface-container-highest disabled:pointer-events-none disabled:opacity-35 md:flex md:-left-20 lg:-left-24"
          >
            <ChevronLeft className="size-6 shrink-0" strokeWidth={2} aria-hidden />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            type="button"
            aria-label="Next product"
            onClick={() => void goNext()}
            className="absolute -right-2 top-1/2 z-20 hidden h-14 w-14 -translate-y-1/2 rounded-full border-outline/60 bg-surface-container-high/80 text-primary hover:bg-surface-container-highest md:flex md:-right-20 lg:-right-24"
          >
            <ChevronRight className="size-6 shrink-0" strokeWidth={2} aria-hidden />
          </Button>

          {visible
            .slice()
            .reverse()
            .map((product, reverseIndex) => {
              const depth = visible.length - reverseIndex - 1;
              const isTopCard = depth === 0;

              return (
                <motion.div
                  key={`${index}-${depth}-${product.id}`}
                  className="absolute inset-0"
                  style={{
                    scale: 1 - depth * 0.045,
                    y: depth * 14,
                    opacity: 1 - depth * 0.16,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.22}
                  onDragEnd={isTopCard ? (_, info) => void onDragEnd(_, info) : undefined}
                  whileDrag={{ cursor: "grabbing" }}
                  animate={isTopCard ? controls : undefined}
                >
                  <SwipeCard
                    product={product}
                    saved={savedIds.includes(product.id)}
                    canSave={!!user}
                    userId={user?.uid}
                    onSave={() => void react("saved")}
                  />
                </motion.div>
              );
            })}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Button variant="secondary" size="icon" type="button" className="h-14 w-14 rounded-full" onClick={() => void react("disliked")}>
            <X className="size-6" />
          </Button>
          <Button variant="secondary" size="icon" type="button" className="h-14 w-14 rounded-full" onClick={() => void react("saved")}>
            <Bookmark className="size-5" />
          </Button>
          <Button
            size="icon"
            type="button"
            className="h-[4.5rem] w-[4.5rem] rounded-full shadow-[0_0_32px_rgba(255,138,169,0.4)]"
            onClick={() => void react("liked")}
          >
            <Heart className="size-8 fill-current" />
          </Button>
        </div>

        <div className="flex w-full max-w-md items-center gap-4 text-faint-foreground">
          <div className="flex flex-1 items-center gap-2">
            <Sparkles className="size-4 shrink-0 text-primary/80" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">Flow</span>
          </div>
          <div className="relative h-px flex-[2] overflow-hidden rounded-full bg-outline/40">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-secondary to-primary shadow-[0_0_20px_rgba(255,138,169,0.4)]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
            />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em]">
            {feedback ?? `${index + 1} / ${products.length}`}
            {loadingMore ? " · +" : ""}
          </div>
        </div>
        <p className="hidden text-[10px] text-faint-foreground md:block">
          Keyboard: left prev · right next · L like · D pass · S save
        </p>
      </div>
    </section>
  );
}
