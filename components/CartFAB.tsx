"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export function CartFAB({ href = "/dashboard" }: { href?: string }) {
  return (
    <div className="fixed bottom-10 right-10 z-50 max-md:bottom-24 max-md:right-4">
      <Link
        href={href}
        className="flex size-16 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 shadow-[0_20px_40px_rgba(255,51,133,0.4)] transition-transform hover:scale-110 active:scale-95"
        aria-label="Saved and cart"
      >
        <ShoppingCart className="size-7 text-white" strokeWidth={2} />
      </Link>
    </div>
  );
}
