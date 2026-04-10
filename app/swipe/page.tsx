import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SwipeExperience } from "@/components/SwipeExperience";
import { getProducts } from "@/lib/db";

export default function SwipePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SwipeExperience products={getProducts()} />
      <Footer />
    </div>
  );
}
