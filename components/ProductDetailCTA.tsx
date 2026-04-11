"use client";

import { useCallback } from "react";
import { Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useStore } from "@/store/useStore";
import { Product } from "@/types";
import { formatPrice } from "@/utils/productDisplay";

type ProductDetailCTAProps = {
  product: Product;
};

export function ProductDetailCTA({ product }: ProductDetailCTAProps) {
  const { user } = useAuth();
  const viewProduct = useStore((s) => s.viewProduct);

  const buy = useCallback(() => {
    const url = product.affiliateLink?.trim();
    if (!url) return;
    viewProduct(product.id);
    window.open(url, "_blank", "noopener,noreferrer");
    void import("@/services/analyticsService").then((a) => a.trackClick(product.id, user?.uid));
  }, [product.affiliateLink, product.id, user?.uid, viewProduct]);

  const share = useCallback(async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/product/${product.id}` : "";
    const title = product.name || product.title || "SwiplyKart";
    try {
      if (navigator.share) {
        await navigator.share({ title, text: product.shortDescription || title, url });
      } else if (url) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      /* user cancelled or blocked */
    }
  }, [product.id, product.name, product.shortDescription, product.title]);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button size="lg" variant="secondary" type="button" className="gap-2" onClick={() => void share()}>
        <Share2 className="size-4" />
        Share
      </Button>
      <Button size="lg" type="button" onClick={buy} disabled={!product.affiliateLink?.trim()}>
        Buy now · {formatPrice(product.price)}
      </Button>
    </div>
  );
}
