"use client";

import { ProductsFeed } from "@/components/ProductsFeed";
import { VibeTag } from "@/components/VibeTag";
import { getProductsByVibe, type Product, vibeFilters } from "@/lib/db";
import { useStore } from "@/store/useStore";

export function ProductListingShell({ products }: { products: Product[] }) {
  const activeVibe = useStore((state) => state.activeVibe);
  const setActiveVibe = useStore((state) => state.setActiveVibe);

  const filteredProducts = activeVibe === "All Drops" ? products : getProductsByVibe(activeVibe);

  return (
    <>
      <section className="hide-scrollbar mb-10 flex gap-3 overflow-x-auto pb-2">
        {vibeFilters.map((filter) => (
          <button key={filter} type="button" onClick={() => setActiveVibe(filter)}>
            <VibeTag
              label={filter}
              active={activeVibe === filter}
              accent={activeVibe === filter ? "secondary" : "primary"}
              className="whitespace-nowrap px-5 py-2 text-sm"
            />
          </button>
        ))}
      </section>
      <ProductsFeed products={filteredProducts} />
    </>
  );
}
