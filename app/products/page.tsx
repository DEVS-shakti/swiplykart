import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductListingShell } from "@/components/ProductListingShell";
import { getDistinctCategories, getProducts } from "@/services/productService";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q, cat } = await searchParams;
  const [{ products }, catalogCategories] = await Promise.all([getProducts(50), getDistinctCategories(500)]);
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-[1600px] px-6 pb-28 pt-10 md:px-8">
        <ProductListingShell
          products={products}
          catalogCategories={catalogCategories}
          initialQuery={q ?? ""}
          initialCategory={cat}
        />
      </main>
      <Footer />
    </div>
  );
}
