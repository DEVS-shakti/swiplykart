import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductListingShell } from "@/components/ProductListingShell";
import { getProducts } from "@/services/productService";

export default async function ProductsPage() {
  const { products } = await getProducts(50);
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-[1600px] px-6 pb-28 pt-10 md:px-8">
        <ProductListingShell products={products} />
      </main>
      <Footer />
    </div>
  );
}
