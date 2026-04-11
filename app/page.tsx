import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button";
import { VibeTag } from "@/components/VibeTag";
import { getTrendingProducts, getProducts } from "@/services/productService";
import { cn } from "@/lib/utils";

export default async function Home() {
  const featuredProducts = await getTrendingProducts(4);
  const { products } = await getProducts(10);
  // Ensure we have enough products, duplicate if needed for the exact 4-bento grid
  const bentoProducts = products.length >= 4 ? products : [...products, ...products, ...products, ...products];

  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <main className="pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 pb-20 pt-16 md:px-8 lg:pt-24">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between lg:flex-row">
            
            {/* Left Content */}
            <div className="text-center lg:text-left lg:w-1/2 z-10">
              <h1 className="max-w-3xl font-headline text-5xl font-extrabold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-8xl">
                Where <span className="text-primary block lg:inline">Shopping</span><br /> Meets Your Vibe
              </h1>
              <p className="mx-auto lg:mx-0 mt-8 max-w-xl text-lg leading-8 text-white/60">
                Discover a curated flow of streetwear, tech-wear, and aesthetic essentials. Swipe through the future of retail.
              </p>
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/swipe" className={cn(buttonVariants({ size: "lg", className: "bg-primary text-background hover:bg-primary-dim shadow-[0_0_24px_rgba(255,138,169,0.4)]" }))}>
                  Start Swiping
                </Link>
              </div>
            </div>

            {/* Right Graphics */}
            <div className="relative mt-16 flex h-[480px] w-full items-center justify-center lg:mt-0 lg:w-1/2 lg:h-[600px]">
              {/* Back Card */}
              <div className="absolute left-1/4 top-1/4 h-[240px] w-[240px] -translate-x-12 rotate-[-12deg] overflow-hidden rounded-[24px] border border-white/10 shadow-[0_32px_90px_rgba(0,0,0,0.6)] z-0">
                {featuredProducts[1] && (
                  <>
                    <Image src={featuredProducts[1].image} alt={featuredProducts[1].shortDescription || "Trending"} fill className="object-cover opacity-80" sizes="240px" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4">
                      <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary">Drop</div>
                      <div className="font-headline text-sm font-bold text-white line-clamp-1">{featuredProducts[1].name}</div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Main Prominent Card */}
              <div className="glass-panel relative z-10 h-[420px] w-[300px] overflow-hidden rounded-[32px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] lg:h-[500px] lg:w-[360px] translate-x-8 -rotate-2">
                {featuredProducts[0] && (
                  <>
                    <Image src={featuredProducts[0].image} alt={featuredProducts[0].shortDescription || "Featured"} fill className="object-cover" sizes="360px" priority />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/60 to-transparent p-8 text-center backdrop-blur-[2px]">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Editor's Pick</div>
                      <div className="font-headline text-2xl font-bold text-white">{featuredProducts[0].name}</div>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Trending Section */}
        <section className="px-6 py-16 md:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="font-headline text-3xl font-extrabold text-white">Trending Vibes</h2>
              <div className="hidden md:flex bg-primary/20 p-4 rounded-full shadow-[0_0_20px_rgba(255,138,169,0.3)] cursor-pointer hover:bg-primary/30 transition">
                 <ShoppingCart className="text-primary size-5" />
              </div>
            </div>

            <div className="mb-12 flex flex-wrap gap-4">
              <VibeTag label="Streetwear" className="px-6 py-2.5 text-sm" />
              <VibeTag label="Minimal" active accent="primary" className="px-6 py-2.5 text-sm font-bold" />
              <VibeTag label="Tech" className="px-6 py-2.5 text-sm" />
              <VibeTag label="Aesthetic" className="px-6 py-2.5 text-sm" />
              <VibeTag label="Cyberpunk" className="px-6 py-2.5 text-sm" />
              <VibeTag label="Gorpcore" className="px-6 py-2.5 text-sm" />
            </div>

            {/* Custom Bento Grid overlay design */}
            <div className="grid gap-6 md:grid-cols-4 md:grid-rows-[280px_280px]">
              
              {/* Huge Left Card */}
              {bentoProducts[0] && (
                <Link
                  href={`/product/${bentoProducts[0].id}`}
                  className="group relative overflow-hidden rounded-[32px] border border-white/8 md:col-span-2 md:row-span-2 shadow-2xl h-[400px] md:h-auto"
                >
                  <Image
                    src={bentoProducts[0].image}
                    alt={bentoProducts[0].name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <span className="rounded-full bg-primary/90 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-background">Essential</span>
                    <h3 className="mt-4 font-headline text-3xl font-extrabold text-white">{bentoProducts[0].name}</h3>
                    <p className="mt-2 text-lg font-bold text-primary">${bentoProducts[0].price?.toFixed(2)}</p>
                  </div>
                </Link>
              )}

              {/* Top Middle Small Card */}
              {bentoProducts[1] && (
                <Link
                  href={`/product/${bentoProducts[1].id}`}
                  className="group relative overflow-hidden rounded-[32px] border border-white/8 shadow-xl h-[260px] md:h-auto"
                >
                  <Image src={bentoProducts[1].image} alt={bentoProducts[1].name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-headline text-lg font-bold text-white line-clamp-1">{bentoProducts[1].name}</h3>
                    <p className="text-sm text-white/50">${bentoProducts[1].price?.toFixed(2)}</p>
                  </div>
                </Link>
              )}

              {/* Top Right Small Card */}
              {bentoProducts[2] && (
                <Link
                  href={`/product/${bentoProducts[2].id}`}
                  className="group relative overflow-hidden rounded-[32px] border border-white/8 shadow-xl h-[260px] md:h-auto"
                >
                  <Image src={bentoProducts[2].image} alt={bentoProducts[2].name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="25vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-headline text-lg font-bold text-white line-clamp-1">{bentoProducts[2].name}</h3>
                    <p className="text-sm text-white/50">${bentoProducts[2].price?.toFixed(2)}</p>
                  </div>
                </Link>
              )}

              {/* Bottom Right Wide Card */}
              {bentoProducts[3] && (
                <Link
                  href={`/product/${bentoProducts[3].id}`}
                  className="group relative overflow-hidden rounded-[32px] border border-white/8 md:col-span-2 shadow-xl h-[260px] md:h-auto"
                >
                  <Image src={bentoProducts[3].image} alt={bentoProducts[3].name} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="font-headline text-2xl font-bold text-white">{bentoProducts[3].name}</h3>
                    <p className="text-base text-tertiary font-medium">${bentoProducts[3].price?.toFixed(2)}</p>
                  </div>
                </Link>
              )}

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-16 md:px-8 lg:py-24">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <h2 className="font-headline text-5xl font-extrabold text-white md:text-6xl tracking-tight">
              Ready to find your <br />
              <span className="italic text-primary font-normal">aesthetic?</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <Link href="/swipe" className={cn(buttonVariants({ size: "lg", className: "bg-primary text-background hover:bg-primary-dim px-8 shadow-[0_0_24px_rgba(255,138,169,0.35)]" }))}>
                Launch Swiper
              </Link>
              <Link href="/products" className={cn(buttonVariants({ size: "lg", variant: "ghost", className: "border border-white/10 text-white hover:bg-white/5 px-8" }))}>
                View Editorial
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
