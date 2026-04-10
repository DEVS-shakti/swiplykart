import Image from "next/image";

import { VibeTag } from "@/components/VibeTag";
import type { Product } from "@/lib/db";

export function SwipeCard({ product }: { product: Product }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[34px] border border-white/6 bg-surface-container shadow-[0_40px_90px_rgba(0,0,0,0.35)]">
      <Image
        src={product.image}
        alt={product.shortDescription}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 90vw, 420px"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#12031f] via-transparent to-black/30" />
      <div className="absolute inset-x-4 bottom-4 rounded-[28px] border border-white/10 bg-surface-container-highest/80 p-5 backdrop-blur-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-tertiary">
              {product.featuredLabel ?? "Swipe Pick"}
            </span>
            <h2 className="mt-2 font-headline text-3xl font-extrabold text-white">{product.name}</h2>
          </div>
          <div className="rounded-full border border-primary/20 bg-primary/15 px-4 py-2 text-lg font-bold text-primary">
            ${product.price}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.vibes.map((vibe, index) => (
            <VibeTag key={vibe} label={vibe} accent={index === 0 ? product.accent : "secondary"} />
          ))}
        </div>
        <p className="mt-4 text-sm leading-7 text-white/65">{product.description}</p>
      </div>
    </div>
  );
}
