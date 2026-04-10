"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";

import { VibeTag } from "@/components/VibeTag";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/db";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  compact?: boolean;
  className?: string;
  showTags?: boolean;
  showAction?: boolean;
};

export function ProductCard({
  product,
  priority = false,
  compact = false,
  className,
  showTags = true,
  showAction = true,
}: ProductCardProps) {
  const likes = useStore((state) => state.likes);
  const saved = useStore((state) => state.saved);
  const likeProduct = useStore((state) => state.likeProduct);
  const toggleSaved = useStore((state) => state.toggleSaved);
  const viewProduct = useStore((state) => state.viewProduct);

  const liked = likes.includes(product.id);
  const bookmarked = saved.includes(product.id);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[28px] border border-white/6 bg-surface-container shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(255,138,169,0.16)]",
        className,
      )}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: compact ? "1 / 1" : product.ratio }}>
        <Link
          href={`/product/${product.id}`}
          className="block h-full"
          onClick={() => viewProduct(product.id)}
          aria-label={`Open ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.shortDescription}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary">{product.category}</p>
              <h3 className="mt-2 font-headline text-xl font-bold text-white">{product.name}</h3>
              <p className="mt-1 text-sm text-white/60">${product.price.toFixed(2)}</p>
            </div>
          </div>
        </Link>
        {showAction ? (
          <Button
            size="icon"
            className={cn(
              "absolute bottom-5 right-5 z-10 size-12 shrink-0 shadow-[0_0_24px_rgba(255,138,169,0.35)]",
              liked ? "bg-white text-background" : "",
            )}
            onClick={() => likeProduct(product.id)}
          >
            {liked ? <Heart className="size-4 fill-current" /> : <Plus className="size-5" />}
          </Button>
        ) : null}
      </div>
      <div className="space-y-4 p-5">
        <Link href={`/product/${product.id}`} className="block" onClick={() => viewProduct(product.id)}>
          <p className="line-clamp-2 text-sm leading-6 text-white/60">{product.description}</p>
        </Link>
        {showTags ? (
          <div className="flex flex-wrap gap-2">
            {product.vibes.slice(0, compact ? 2 : 3).map((vibe, index) => (
              <VibeTag key={vibe} label={vibe} accent={index === 0 ? product.accent : "secondary"} />
            ))}
          </div>
        ) : null}
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors",
            bookmarked ? "text-tertiary" : "text-white/45 hover:text-white",
          )}
          onClick={() => toggleSaved(product.id)}
        >
          <Heart className={cn("size-4", bookmarked && "fill-current")} />
          {bookmarked ? "Saved" : "Save vibe"}
        </button>
      </div>
    </article>
  );
}
