import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductDetailCTA } from "@/components/ProductDetailCTA";
import { VibeTag } from "@/components/VibeTag";
import { ViewTracker } from "@/components/ViewTracker";
import { getProductById, getRelatedProducts } from "@/services/productService";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pb-28 pt-10 md:px-8">
        <ViewTracker id={product.id} />
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <ProductGallery product={product} />
          <div className="lg:sticky lg:top-28">
            <div className="space-y-8 rounded-[32px] border border-white/6 bg-surface-container/70 p-7 backdrop-blur-2xl">
              <div className="flex flex-wrap gap-2">
                <VibeTag label={product.featuredLabel ?? "New drop"} accent="primary" active />
                <VibeTag label="Limited edition" accent="tertiary" active />
              </div>
              <div>
                <h1 className="font-headline text-5xl font-extrabold text-white md:text-6xl">{product.name}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  {typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price ? (
                    <span className="text-lg text-white/25 line-through">${product.compareAtPrice.toFixed(2)}</span>
                  ) : null}
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  The vibe
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.vibes.map((vibe, index) => (
                    <VibeTag key={vibe} label={vibe} accent={index === 0 ? product.accent : "secondary"} />
                  ))}
                </div>
              </div>
              <div className="rounded-[28px] border border-white/6 bg-black/12 p-6">
                <p className="leading-8 text-white/65">{product.description}</p>
                <ul className="mt-5 space-y-3 text-sm text-white/70">
                  {product.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
              <ProductDetailCTA product={product} />
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <h2 className="font-headline text-4xl font-bold text-white">Match Your Vibe</h2>
              <p className="mt-2 text-white/55">Curated recommendations based on the {product.name} aesthetic.</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} compact priority={index < 2} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
