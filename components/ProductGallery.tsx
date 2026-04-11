"use client";

import { useState } from "react";
import Image from "next/image";

import { Product } from "@/types";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image);

  return (
    <div className="grid gap-4">
      <div className="theme-panel relative overflow-hidden rounded-[28px]" style={{ aspectRatio: "4 / 5" }}>
        <Image
          src={activeImage}
          alt={product.shortDescription}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 55vw"
          priority
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {product.gallery.map((image) => (
          <button
            key={image}
            type="button"
            className={cn(
              "theme-panel-soft relative overflow-hidden rounded-[22px] transition",
              activeImage === image ? "border-primary/40 shadow-[0_0_28px_rgba(255,138,169,0.18)]" : "",
            )}
            style={{ aspectRatio: "1 / 1" }}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt={product.name} fill className="object-cover" sizes="33vw" />
          </button>
        ))}
      </div>
    </div>
  );
}
