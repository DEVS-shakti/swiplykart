"use client";

import { useEffect, useRef, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types";

type ProductsFeedProps = {
  products: Product[];
};

export function ProductsFeed({ products }: ProductsFeedProps) {
  const [visibleCount, setVisibleCount] = useState(8);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = loaderRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          setVisibleCount((count) => Math.min(count + 4, products.length));
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [products.length]);

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <>
      <div className="masonry-columns">
        {visibleProducts.map((product, index) => (
          <div key={product.id} className="masonry-item">
            <ProductCard product={product} priority={index < 2} />
          </div>
        ))}
      </div>
      {visibleCount < products.length ? <div ref={loaderRef} className="h-12" /> : null}
    </>
  );
}
