"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ProductsFeed } from "@/components/ProductsFeed";
import { Input } from "@/components/ui/input";
import { VibeTag } from "@/components/VibeTag";
import { filterProductsBySearch } from "@/services/productService";
import { Product } from "@/types";
import { useStore } from "@/store/useStore";
import { ALL_CATEGORIES_LABEL, FALLBACK_CATEGORIES, isAllCategoriesFilter } from "@/utils/catalog";

export function ProductListingShell({
  products,
  catalogCategories,
  initialQuery = "",
  initialCategory,
}: {
  products: Product[];
  /** Distinct `category` values from Firestore (or fallback if empty). */
  catalogCategories: string[];
  initialQuery?: string;
  /** e.g. from `?cat=` — applies once on mount. */
  initialCategory?: string;
}) {
  const activeVibe = useStore((state) => state.activeVibe);
  const setActiveVibe = useStore((state) => state.setActiveVibe);
  const [search, setSearch] = useState(initialQuery);
  const [appliedDeepLink, setAppliedDeepLink] = useState(false);

  const chips = useMemo(() => {
    const list = catalogCategories.length > 0 ? catalogCategories : [...FALLBACK_CATEGORIES];
    return [ALL_CATEGORIES_LABEL, ...list];
  }, [catalogCategories]);

  useEffect(() => {
    setSearch(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (appliedDeepLink) return;
    const cat = initialCategory?.trim();
    if (!cat) {
      setAppliedDeepLink(true);
      return;
    }
    const list = catalogCategories.length > 0 ? catalogCategories : [...FALLBACK_CATEGORIES];
    const match = list.find((c) => c.toLowerCase() === cat.toLowerCase());
    setActiveVibe(match ?? cat);
    setAppliedDeepLink(true);
  }, [appliedDeepLink, initialCategory, catalogCategories, setActiveVibe]);

  const vibeFiltered = useMemo(() => {
    if (isAllCategoriesFilter(activeVibe)) return products;
    const want = activeVibe.trim().toLowerCase();
    return products.filter((product) => product.category?.trim().toLowerCase() === want);
  }, [products, activeVibe]);

  const filteredProducts = useMemo(() => filterProductsBySearch(vibeFiltered, search), [vibeFiltered, search]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/35" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, vibes, categories…"
            className="border-white/10 bg-black/20 pl-10 text-sm"
            aria-label="Search products"
          />
        </div>
        <p className="text-xs text-white/40">{filteredProducts.length} results</p>
      </div>

      <section className="hide-scrollbar mb-10 flex gap-3 overflow-x-auto pb-2">
        {chips.map((filter) => {
          const isAll = filter === ALL_CATEGORIES_LABEL;
          const active = isAll
            ? isAllCategoriesFilter(activeVibe)
            : filter.toLowerCase() === activeVibe.trim().toLowerCase();
          return (
            <button key={filter} type="button" onClick={() => setActiveVibe(filter)}>
              <VibeTag
                label={filter}
                active={active}
                accent={active ? "secondary" : "primary"}
                className="whitespace-nowrap px-5 py-2 text-sm"
              />
            </button>
          );
        })}
      </section>
      <ProductsFeed products={filteredProducts} />
    </>
  );
}
