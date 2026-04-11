import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { CartFAB } from "@/components/CartFAB";
import { Footer } from "@/components/Footer";
import { HeroProductShowcase } from "@/components/HeroProductShowcase";
import { Navbar } from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { getDistinctCategories, getHeroProducts, getProducts } from "@/services/productService";
import { FALLBACK_CATEGORIES } from "@/utils/catalog";
import { cn } from "@/lib/utils";

export default async function Home() {
  const [heroProducts, { products }, catalogCategories] = await Promise.all([
    getHeroProducts(8),
    getProducts(10),
    getDistinctCategories(400),
  ]);
  const trendingCategoryChips = (catalogCategories.length > 0 ? catalogCategories : [...FALLBACK_CATEGORIES]).slice(0, 12);
  const bentoProducts = products.length >= 4 ? products : [...products, ...products, ...products, ...products];

  return (
    <div className="min-h-screen bg-surface font-body selection:bg-primary/30">
      <Navbar />
      <main className="pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden px-8 pb-24 pt-16 md:px-12">
          <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="z-10 lg:col-span-6">
              <h1 className="mb-8 font-headline text-6xl font-extrabold leading-[0.9] tracking-tighter text-white md:text-8xl">
                Where{" "}
                <span className="bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">Shopping</span> Meets Your Vibe
              </h1>
              <p className="mb-12 max-w-md text-lg leading-relaxed text-zinc-400">
                Discover a curated flow of streetwear, tech-wear, and aesthetic essentials. Swipe through the future of retail.
              </p>
              <Link
                href="/swipe"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    className:
                      "rounded-lg border-0 bg-gradient-to-r from-pink-500 to-rose-600 px-10 py-5 font-headline font-extrabold tracking-tight text-white shadow-[0_10px_30px_rgba(255,51,133,0.3)] hover:scale-105 hover:from-pink-500 hover:to-rose-600 active:scale-95",
                  }),
                )}
              >
                Start Swiping
              </Link>
            </div>
            <div className="relative flex justify-center lg:col-span-6">
              <HeroProductShowcase products={heroProducts} />
            </div>
          </div>
          <div className="pointer-events-none absolute right-0 top-0 -z-10 size-[500px] rounded-full bg-pink-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-0 -z-10 size-[400px] rounded-full bg-rose-500/5 blur-[100px]" />
        </section>

        {/* Trending chips */}
        <section className="px-8 py-12 md:px-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight text-white">Categories</h2>
              <Link
                href="/products"
                className="font-headline border-b border-pink-500/20 text-sm font-bold text-pink-400 transition-all hover:border-pink-500"
              >
                Explore All
              </Link>
            </div>
            <div className="-mx-2 flex gap-4 overflow-x-auto px-2 pb-4 no-scrollbar">
              {trendingCategoryChips.map((label, index) => (
                <Link
                  key={label}
                  href={`/products?cat=${encodeURIComponent(label)}`}
                  className={cn(
                    "flex-none rounded-lg border px-8 py-3 font-headline text-sm font-bold tracking-wide transition-all",
                    index === 0
                      ? "border-pink-500 bg-pink-500 text-white shadow-[0_0_20px_rgba(255,51,133,0.4)]"
                      : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-pink-500/50",
                  )}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured bento */}
        <section className="bg-zinc-950/50 px-8 py-24 md:px-12">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {bentoProducts[0] ? (
                <Link
                  href={`/product/${bentoProducts[0].id}`}
                  className="group relative col-span-2 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all hover:border-pink-500/20 hover:shadow-[0_0_40px_rgba(255,51,133,0.15)] md:row-span-2 min-h-[320px] md:min-h-0"
                >
                  <Image
                    src={bentoProducts[0].image}
                    alt={bentoProducts[0].name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <span className="mb-3 inline-block rounded-lg border border-pink-500/30 bg-pink-500/20 px-3 py-1 font-headline text-xs font-bold text-pink-400 backdrop-blur-sm">
                      ESSENTIAL
                    </span>
                    <h3 className="font-headline text-3xl font-bold tracking-tight text-white">{bentoProducts[0].name}</h3>
                    <p className="mt-2 font-headline text-xl font-bold text-pink-500">${bentoProducts[0].price?.toFixed(2)}</p>
                  </div>
                </Link>
              ) : null}

              {bentoProducts[1] ? (
                <Link
                  href={`/product/${bentoProducts[1].id}`}
                  className="group relative col-span-1 aspect-[2/3] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
                >
                  <Image
                    src={bentoProducts[1].image}
                    alt={bentoProducts[1].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="25vw"
                  />
                  <div className="absolute right-4 top-4 text-white/50 transition-colors hover:text-pink-500">
                    <Heart className="size-6" strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-headline text-lg font-bold tracking-tight text-white">{bentoProducts[1].name}</h3>
                    <p className="mt-1 text-sm text-zinc-400">${bentoProducts[1].price?.toFixed(2)}</p>
                  </div>
                </Link>
              ) : null}

              {bentoProducts[2] ? (
                <Link
                  href={`/product/${bentoProducts[2].id}`}
                  className="group relative col-span-1 aspect-square overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
                >
                  <Image
                    src={bentoProducts[2].image}
                    alt={bentoProducts[2].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="25vw"
                  />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-headline text-lg font-bold tracking-tight text-white">{bentoProducts[2].name}</h3>
                    <p className="mt-1 text-sm text-zinc-400">${bentoProducts[2].price?.toFixed(2)}</p>
                  </div>
                </Link>
              ) : null}

              {bentoProducts[3] ? (
                <Link
                  href={`/product/${bentoProducts[3].id}`}
                  className="group relative col-span-2 aspect-[16/9] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900"
                >
                  <Image
                    src={bentoProducts[3].image}
                    alt={bentoProducts[3].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-headline text-2xl font-bold tracking-tight text-white">{bentoProducts[3].name}</h3>
                    <p className="mt-1 text-zinc-400">${bentoProducts[3].price?.toFixed(2)}</p>
                  </div>
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden px-8 py-32 md:px-12">
          <div className="relative z-10 mx-auto max-w-[1000px] text-center">
            <h2 className="mb-8 font-headline text-5xl font-extrabold tracking-tighter text-white md:text-7xl">
              Ready to find your <br />
              <span className="font-normal italic text-pink-400">aesthetic?</span>
            </h2>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 md:flex-row">
              <Link
                href="/swipe"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    className:
                      "rounded-lg border-0 bg-pink-500 px-12 py-6 font-headline text-lg font-black text-white hover:scale-110 hover:bg-pink-500 hover:shadow-[0_0_30px_rgba(255,51,133,0.6)]",
                  }),
                )}
              >
                Launch Swiper
              </Link>
              <Link
                href="/products"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "lg",
                    className:
                      "rounded-lg border-2 border-pink-500/30 px-12 py-6 font-headline text-lg font-black text-zinc-100 hover:bg-pink-500/10",
                  }),
                )}
              >
                View Editorial
              </Link>
            </div>
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent" />
        </section>
      </main>
      <Footer />
      <CartFAB />
    </div>
  );
}
