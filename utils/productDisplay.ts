import type { Product } from "@/types";

export function productTitle(product: Product): string {
  return product.name || product.title || "Product";
}

export function discountPercent(product: Product): number | null {
  if (typeof product.compareAtPrice === "number" && product.compareAtPrice > product.price) {
    return Math.round((1 - product.price / product.compareAtPrice) * 100);
  }
  if (typeof product.discountPercent === "number" && product.discountPercent > 0) {
    return Math.round(product.discountPercent);
  }
  return null;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value);
}
