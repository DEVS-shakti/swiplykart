import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { VibeTag } from "@/components/VibeTag";
import { getFeaturedProducts, getProducts } from "@/lib/db";
import { cn } from "@/lib/utils";

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const bentoProducts = getProducts().slice(2, 7);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pb-24">
        <section className="relative overflow-hidden px-6 pb-20 pt-14 md:px-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
            <h1 className="max-w-5xl font-headline text-5xl font-extrabold leading-[0.95] tracking-tight text-white md:text-8xl">
              Where Shopping
              <br />
              Meets Your Vibe
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/58 md:text-xl">
              Ditch the endless scroll. Swipe through curated drops, image-first discovery, and products that match your mood.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/swipe" className={cn(buttonVariants({ size: "lg" }))}>
                Start swiping
              </Link>
              <Link href="/products" className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}>
                Browse the grid
              </Link>
            </div>

            <div className="relative mt-16 flex h-[420px] w-full items-end justify-center md:h-[460px]">
              <div className="absolute bottom-8 left-1/2 h-[320px] w-[220px] -translate-x-[160px] rotate-[-11deg] overflow-hidden rounded-[28px] border border-white/8 bg-surface-container opacity-45 shadow-2xl">
                <Image src={featuredProducts[2].image} alt={featuredProducts[2].shortDescription} fill className="object-cover" sizes="220px" />
              </div>
              <div className="absolute bottom-6 left-1/2 h-[340px] w-[220px] translate-x-[160px] rotate-[9deg] overflow-hidden rounded-[28px] border border-white/8 bg-surface-container opacity-45 shadow-2xl">
                <Image src={featuredProducts[3].image} alt={featuredProducts[3].shortDescription} fill className="object-cover" sizes="220px" />
              </div>
              <div className="glass-panel relative z-10 h-[380px] w-[250px] overflow-hidden rounded-[30px] border border-white/10 shadow-[0_32px_90px_rgba(0,0,0,0.45)] md:h-[430px] md:w-[290px]">
                <Image src={featuredProducts[0].image} alt={featuredProducts[0].shortDescription} fill className="object-cover" sizes="290px" priority />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/40 to-transparent p-6 text-left">
                  <div className="font-headline text-2xl font-bold text-white">{featuredProducts[0].name}</div>
                  <div className="mt-1 text-sm font-semibold text-primary">${featuredProducts[0].price}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-headline text-4xl font-bold text-white">Trending Vibes</h2>
                <p className="mt-3 max-w-xl text-white/55">
                  Pinterest-scale visual browsing, but tighter, faster, and tuned to what your recent likes say about you.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <VibeTag label="Cyberpunk" accent="secondary" active />
                <VibeTag label="Y2K Soft" />
                <VibeTag label="Dark Academia" />
                <VibeTag label="Street Luxe" />
                <VibeTag label="Hyper-Pop" accent="tertiary" active />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-4 md:grid-rows-[340px_260px]">
              <Link
                href={`/product/${bentoProducts[0].id}`}
                className="group relative overflow-hidden rounded-[32px] border border-white/8 md:col-span-2 md:row-span-2"
              >
                <Image
                  src={bentoProducts[0].image}
                  alt={bentoProducts[0].shortDescription}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <div className="absolute bottom-6 left-6 max-w-sm rounded-[28px] border border-white/10 bg-surface-container-highest/70 p-6 backdrop-blur-2xl">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-tertiary">Neon Essentials</div>
                  <h3 className="mt-3 font-headline text-3xl font-bold text-white">The Glow-Up Collection</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">
                    High-impact accessories and room objects for the late-night creator setup.
                  </p>
                </div>
              </Link>

              {bentoProducts.slice(1).map((product) => (
                <ProductCard key={product.id} product={product} compact className="md:mb-0" />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-8 md:px-8">
          <div className="mx-auto w-full max-w-7xl rounded-[36px] border border-white/8 bg-surface-container-highest/65 px-8 py-14 text-center shadow-[0_20px_90px_rgba(0,0,0,0.24)] backdrop-blur-2xl md:px-16">
            <h2 className="font-headline text-4xl font-bold text-white md:text-5xl">Ready to Swipe?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/58">
              Find Your Vibe. Swipe Your Style. Discover Deals That Match Your Mood.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/swipe" className={cn(buttonVariants({ size: "lg" }))}>
                Open discovery
              </Link>
              <Link href="/dashboard" className={cn(buttonVariants({ size: "lg", variant: "secondary" }))}>
                See your dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
