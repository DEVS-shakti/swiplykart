"use client";

import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { getProducts, getSuggestedProducts } from "@/lib/db";
import { useStore } from "@/store/useStore";

export function DashboardShell() {
  const likes = useStore((state) => state.likes);
  const recentlyViewed = useStore((state) => state.recentlyViewed);
  const resetPreferences = useStore((state) => state.resetPreferences);
  const products = getProducts();

  const likedProducts = products.filter((product) => likes.includes(product.id));
  const recentProducts = products.filter((product) => recentlyViewed.includes(product.id));
  const suggestedProducts = getSuggestedProducts(
    likedProducts.length ? likedProducts.map((product) => product.id) : recentlyViewed,
  );

  return (
    <div className="space-y-10">
      <section className="section-shell overflow-hidden rounded-[34px] p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary">Elite Curator</p>
            <h1 className="mt-3 font-headline text-5xl font-extrabold text-white">Alex Chen</h1>
            <p className="mt-3 max-w-xl text-white/58">
              Your vibe map updates with every swipe. The more you like, save, and revisit, the sharper the recommendations get.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-[24px] border border-white/6 bg-white/4 p-4 text-center">
              <div className="font-headline text-3xl font-extrabold text-primary">{likes.length}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">Likes</div>
            </div>
            <div className="rounded-[24px] border border-white/6 bg-white/4 p-4 text-center">
              <div className="font-headline text-3xl font-extrabold text-tertiary">{recentlyViewed.length}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">Viewed</div>
            </div>
            <div className="rounded-[24px] border border-white/6 bg-white/4 p-4 text-center">
              <div className="font-headline text-3xl font-extrabold text-secondary">{suggestedProducts.length}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">Picks</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-10">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-headline text-2xl font-bold text-white">Liked Products</h2>
              <Button variant="secondary" onClick={resetPreferences}>
                Reset profile
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {(likedProducts.length ? likedProducts : suggestedProducts).slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} compact priority={index < 2} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-5 font-headline text-2xl font-bold text-white">Recently Viewed</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {(recentProducts.length ? recentProducts : products.slice(0, 4)).slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-5 font-headline text-2xl font-bold text-white">Suggested For You</h2>
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
