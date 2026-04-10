"use client";

import { useEffect } from "react";

import { useStore } from "@/store/useStore";

export function ViewTracker({ id }: { id: string }) {
  const viewProduct = useStore((state) => state.viewProduct);

  useEffect(() => {
    viewProduct(id);
  }, [id, viewProduct]);

  return null;
}
