"use client";

import { useEffect, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { Bookmark, Heart, Sparkles, X } from "lucide-react";

import { SwipeCard } from "@/components/SwipeCard";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/hooks/useAuth";

const swipeThreshold = 120;

type SwipeExperienceProps = {
  products: Product[];
};

export function SwipeExperience({ products }: SwipeExperienceProps) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<"liked" | "disliked" | "saved" | null>(null);
  const likeProduct = useStore((state) => state.likeProduct);
  const dislikeProduct = useStore((state) => state.dislikeProduct);
  const toggleSaved = useStore((state) => state.toggleSaved);
  const viewProduct = useStore((state) => state.viewProduct);

  useEffect(() => {
    const nextImages = products.slice(index + 1, index + 4);

    nextImages.forEach((product) => {
      const preloadedImage = new window.Image();
      preloadedImage.src = product.image;
    });
  }, [index, products]);

  const visible = products.slice(index, index + 3);

  function advance() {
    setIndex((current) => (current + 1 >= products.length ? 0 : current + 1));
  }

  const { user } = useAuth();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') react('liked');
      else if (e.key === 'ArrowLeft') react('disliked');
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, products]);

  function react(action: "liked" | "disliked" | "saved") {
    const current = products[index];

    if (!current) {
      return;
    }

    viewProduct(current.id);

    if (action === "liked") {
      likeProduct(current.id);
      if (user) import("@/services/userService").then(s => s.trackUserInteraction(user.uid, "like", current.id));
      advance();
    }

    if (action === "disliked") {
      dislikeProduct(current.id);
      advance();
    }

    if (action === "saved") {
      toggleSaved(current.id);
      if (user) import("@/services/userService").then(s => s.trackUserInteraction(user.uid, "save", current.id));
    }

    setFeedback(action);
    window.setTimeout(() => setFeedback(null), 700);
  }

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (info.offset.x > swipeThreshold) {
      react("liked");
      return;
    }

    if (info.offset.x < -swipeThreshold) {
      react("disliked");
    }
  }

  return (
    <section className="relative mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-6xl flex-col items-center justify-center px-6 pb-24 pt-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[12%] h-72 w-72 rounded-full bg-secondary-container/20 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[8%] h-72 w-72 rounded-full bg-primary/12 blur-[120px]" />
      </div>
      <div className="relative z-10 flex w-full flex-col items-center gap-10">
        <div className="relative h-[70vh] max-h-[680px] w-full max-w-[420px]">
          <Button 
            variant="secondary" 
            size="icon" 
            onClick={() => react("disliked")} 
            className="absolute -left-24 top-1/2 -translate-y-1/2 hidden md:flex rounded-full w-14 h-14 bg-white/5 hover:bg-white/10 border-white/10"
          >
            <span className="text-2xl font-bold">&lt;</span>
          </Button>
          
          <Button 
            variant="secondary" 
            size="icon" 
            onClick={() => react("liked")} 
            className="absolute -right-24 top-1/2 -translate-y-1/2 hidden md:flex rounded-full w-14 h-14 bg-white/5 hover:bg-white/10 border-white/10 text-primary"
          >
            <span className="text-2xl font-bold">&gt;</span>
          </Button>

          {visible
            .slice()
            .reverse()
            .map((product, reverseIndex) => {
              const depth = visible.length - reverseIndex - 1;
              const isTopCard = depth === 0;

              return (
                <motion.div
                  key={`${product.id}-${depth}`}
                  className="absolute inset-0"
                  style={{
                    scale: 1 - depth * 0.05,
                    y: depth * 16,
                    opacity: 1 - depth * 0.18,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={isTopCard ? onDragEnd : undefined}
                  whileDrag={{ rotate: 10, scale: 1.02 }}
                >
                  <SwipeCard product={product} />
                </motion.div>
              );
            })}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="secondary" size="icon" onClick={() => react("disliked")}>
            <X className="size-6" />
          </Button>
          <Button variant="secondary" size="icon" onClick={() => react("saved")}>
            <Bookmark className="size-5" />
          </Button>
          <Button size="icon" className="h-20 w-20 rounded-full" onClick={() => react("liked")}>
            <Heart className="size-7 fill-current" />
          </Button>
        </div>

        <div className="flex w-full max-w-md items-center gap-5 text-white/36">
          <div className="flex flex-1 items-center gap-3">
            <Sparkles className="size-4" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">Similar</span>
          </div>
          <div className="relative h-px flex-[2] overflow-hidden bg-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-primary shadow-[0_0_28px_rgba(255,138,169,0.45)] transition-[width] duration-500"
              style={{ width: `${((index + 1) / products.length) * 100}%` }}
            />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.24em]">
            {feedback ? feedback : `${index + 1}/${products.length}`}
          </div>
        </div>
      </div>
    </section>
  );
}
