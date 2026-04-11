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
            <div className="theme-panel space-y-8 rounded-[32px] p-7">
              <div className="flex flex-wrap gap-2">
                <VibeTag label={product.featuredLabel ?? "New drop"} accent="primary" active />
                <VibeTag label="Limited edition" accent="tertiary" active />
              </div>
              <div>
                <h1 className="font-headline text-5xl font-extrabold text-foreground md:text-6xl">{product.name}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                  {typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price ? (
                    <span className="text-lg text-faint-foreground line-through">${product.compareAtPrice.toFixed(2)}</span>
                  ) : null}
                </div>
              </div>
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-primary">The vibe</p>
                <div className="flex flex-wrap gap-2">
                  {product.vibes.map((vibe, index) => (
                    <VibeTag key={vibe} label={vibe} accent={index === 0 ? product.accent : "secondary"} />
                  ))}
                </div>
              </div>
              <div className="theme-panel-soft rounded-[28px] p-6">
                <p className="leading-8 text-soft-foreground">{product.description}</p>
                <ul className="mt-5 space-y-3 text-sm text-soft-foreground">
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
              <h2 className="font-headline text-4xl font-bold text-foreground">Match Your Vibe</h2>
              <p className="mt-2 text-soft-foreground">Curated recommendations based on the {product.name} aesthetic.</p>
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
