import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SwipeExperience } from "@/components/SwipeExperience";
import { getProducts } from "@/services/productService";

export default async function SwipePage() {
  const { products } = await getProducts(20);
  return (
    <div className="min-h-screen">
      <Navbar />
      <SwipeExperience products={products} />
      <Footer />
    </div>
  );
}
