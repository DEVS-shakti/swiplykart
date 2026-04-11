"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Link2 } from "lucide-react";

import { VibeTag } from "@/components/VibeTag";
import { Product } from "@/types";
import { discountPercent, formatPrice, productTitle } from "@/utils/productDisplay";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";

type SwipeCardProps = {
  product: Product;
  saved: boolean;
  onSave: () => void;
  canSave: boolean;
  userId?: string;
};

function TagBadges({ product }: { product: Product }) {
  const badges: { label: string; emoji: string }[] = [];
  const tags = (product.tags || []).map((t) => t.toLowerCase());
  if (tags.some((t) => t.includes("trend") || t === "trending")) {
    badges.push({ label: "Trending", emoji: "🔥" });
  }
  if (tags.some((t) => t.includes("premium") || t.includes("luxury"))) {
    badges.push({ label: "Premium", emoji: "💎" });
  }
  if (badges.length === 0 && product.featuredLabel) {
    badges.push({ label: product.featuredLabel, emoji: "✨" });
  }
  if (badges.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((b) => (
        <span
          key={b.label}
          className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md"
        >
          {b.emoji} {b.label}
        </span>
      ))}
    </div>
  );
}

export function SwipeCard({ product, saved, onSave, canSave, userId }: SwipeCardProps) {
  const viewProduct = useStore((s) => s.viewProduct);
  const title = productTitle(product);
  const pct = discountPercent(product);
  const showCompare =
    typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price;
  const detailHref = `/product/${product.id}`;

  function buyNow(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const url = product.affiliateLink?.trim();
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
    import("@/services/analyticsService").then((a) => a.trackClick(product.id, userId));
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[34px] border border-white/10 bg-surface-container/90 shadow-[0_40px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm">
      <Link
        href={detailHref}
        onClick={() => viewProduct(product.id)}
        className="absolute inset-0 z-[1] rounded-[34px] outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Open ${title} — product page`}
      >
        <span className="sr-only">Open product details</span>
      </Link>

      <div className="relative z-0 min-h-[min(52vh,340px)] flex-1">
        <Image
          src={product.image}
          alt={product.shortDescription || title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 420px"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0c0218]/85 via-transparent to-black/30" />
      </div>

      <div className="relative z-[2] -mt-6 shrink-0 px-3 pb-3 pointer-events-none md:-mt-7 md:px-4 md:pb-4">
        <div className="rounded-[28px] border border-white/12 bg-surface-container-highest/75 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-6">
          <TagBadges product={product} />
          <div className="mt-3 flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-tertiary">
                {product.featuredLabel ?? "Swipe pick"}
              </span>
              <h2 className="mt-1 line-clamp-2 font-headline text-2xl font-extrabold leading-tight text-white md:text-3xl">
                {title}
              </h2>
            </div>
            <div className="shrink-0 text-right">
              {pct !== null ? (
                <span className="mb-1 inline-block rounded-full bg-primary px-2 py-0.5 text-[10px] font-extrabold text-background">
                  −{pct}%
                </span>
              ) : null}
              <div className="rounded-2xl border border-primary/25 bg-primary/12 px-3 py-2">
                <p className="text-lg font-bold text-primary md:text-xl">{formatPrice(product.price)}</p>
                {showCompare ? (
                  <p className="text-xs text-white/40 line-through">{formatPrice(product.compareAtPrice!)}</p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(product.vibes || []).slice(0, 4).map((vibe, index) => (
              <VibeTag key={vibe} label={vibe} accent={index === 0 ? product.accent ?? "primary" : "secondary"} />
            ))}
          </div>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/65">{product.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 pointer-events-auto">
            <button
              type="button"
              disabled={!canSave}
              onClick={(e) => {
                e.preventDefault();
                onSave();
              }}
              className={cn(
                "flex items-center justify-center gap-2 rounded-2xl border border-white/15 py-3.5 text-sm font-bold transition",
                saved ? "bg-tertiary/20 text-tertiary border-tertiary/30" : "bg-white/6 text-white hover:bg-white/10",
                !canSave && "cursor-not-allowed opacity-40",
              )}
            >
              <Bookmark className={cn("size-4", saved && "fill-current")} />
              {saved ? "Saved" : "Save"}
            </button>
            <button
              type="button"
              onClick={buyNow}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-secondary-container to-primary py-3.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(109,11,236,0.35)] transition hover:opacity-95"
            >
              <Link2 className="size-4" />
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
