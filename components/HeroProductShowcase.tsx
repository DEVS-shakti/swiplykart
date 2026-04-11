"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Product } from "@/types";
import { cn } from "@/lib/utils";

const ROTATE_MS = 5500;

type HeroProductShowcaseProps = {
  products: Product[];
};

export function HeroProductShowcase({ products }: HeroProductShowcaseProps) {
  const [index, setIndex] = useState(0);
  const len = products.length;

  const go = useCallback(
    (delta: number) => {
      if (len === 0) return;
      setIndex((i) => (i + delta + len) % len);
    },
    [len],
  );

  useEffect(() => {
    if (len <= 1) return;
    const t = window.setInterval(() => go(1), ROTATE_MS);
    return () => window.clearInterval(t);
  }, [len, go]);

  if (len === 0) {
    return (
      <div className="theme-panel-strong relative flex min-h-[420px] w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg shadow-[0_40px_100px_rgba(0,0,0,0.25)]">
        <div className="px-8 text-center">
          <p className="font-headline text-lg text-soft-foreground">Add products in Firestore to power the hero.</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 px-8 py-3 font-headline text-sm font-bold text-white"
          >
            Browse shop
          </Link>
        </div>
      </div>
    );
  }

  const current = products[index];
  const next = products[(index + 1) % len];
  const label = current.featuredLabel?.trim() || "Featured";

  return (
    <div className="relative flex w-full max-w-[520px] flex-col items-center lg:max-w-none">
      <div className="relative flex w-full justify-center">
        <div className="relative aspect-[3/4] w-full max-w-[500px] rotate-3 overflow-hidden rounded-lg shadow-[0_40px_100px_rgba(0,0,0,0.28)] transition-transform duration-700 hover:rotate-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0"
            >
              <Link href={`/product/${current.id}`} className="relative block size-full">
                <Image
                  src={current.image}
                  alt={current.shortDescription || current.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 right-8 rounded-lg border border-white/15 bg-black/35 p-6 backdrop-blur-xl">
                  <span className="font-headline text-xs font-bold tracking-[0.2em] text-pink-300">{label}</span>
                  <h3 className="mt-1 line-clamp-2 font-headline text-2xl font-bold text-white">{current.name}</h3>
                  <p className="mt-2 font-headline text-lg font-bold text-pink-300">${current.price?.toFixed(2)}</p>
                </div>
              </Link>
            </motion.div>
          </AnimatePresence>

          {len > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous product"
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next product"
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          ) : null}
        </div>

        {len > 1 && next ? (
          <Link
            href={`/product/${next.id}`}
            className="absolute bottom-20 -left-10 hidden aspect-[4/5] w-44 -rotate-12 overflow-hidden rounded-lg border border-white/10 shadow-2xl transition-transform hover:scale-[1.02] md:block lg:-left-12"
            aria-label={`Next: ${next.name}`}
          >
            <div className="relative size-full">
              <Image src={next.image} alt={next.shortDescription || next.name} fill className="object-cover" sizes="176px" />
            </div>
          </Link>
        ) : null}
      </div>

      {len > 1 ? (
        <div className="mt-6 flex items-center gap-2">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Show ${p.name}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-8 bg-pink-500" : "w-2 bg-outline hover:bg-soft-foreground",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
