"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid2x2, Heart, House, Sparkles, UserRound } from "lucide-react";

import Image from "next/image";

import { cn } from "@/lib/utils";

const topLinks = [
  { href: "/products", label: "Shop" },
  { href: "/swipe", label: "Curated" },
  { href: "/dashboard", label: "Drops" },
];

const mobileLinks = [
  { href: "/", label: "Home", icon: House },
  { href: "/swipe", label: "Swipe", icon: Sparkles },
  { href: "/products", label: "Shop", icon: Grid2x2 },
  { href: "/dashboard", label: "You", icon: UserRound },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/6 bg-background/80 backdrop-blur-2xl">
        <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-8">
          <Link href="/" className="flex items-center gap-3 font-headline text-xl font-extrabold uppercase tracking-[0.28em] text-white">
            <Image src="/icon.png" alt="Logo" width={28} height={28} className="rounded" />
            SwiplyKart
          </Link>
          <div className="hidden items-center gap-10 md:flex">
            {topLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "border-b-2 pb-1 text-sm font-semibold transition-colors",
                    active ? "border-primary text-primary" : "border-transparent text-white/56 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/dashboard"
              className="rounded-full p-2 text-white/70 transition hover:bg-white/6 hover:text-primary"
            >
              <Heart className="size-4" />
            </Link>
            <Link
              href="/products"
              className="rounded-full p-2 text-white/70 transition hover:bg-white/6 hover:text-primary"
            >
              <Grid2x2 className="size-4" />
            </Link>
            <Link
              href="/auth/login"
              className="rounded-full p-2 text-white/70 transition hover:bg-white/6 hover:text-primary"
            >
              <UserRound className="size-4" />
            </Link>
          </div>
        </nav>
      </header>
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 md:hidden">
        <nav className="pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-full border border-white/8 bg-surface-container-highest/90 px-5 py-3 shadow-2xl backdrop-blur-2xl">
          {mobileLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex min-w-14 flex-col items-center gap-1 text-[10px] font-semibold transition-colors",
                  active ? "text-primary" : "text-white/45",
                )}
              >
                <Icon className={cn("size-4", active && "drop-shadow-[0_0_16px_rgba(255,138,169,0.45)]")} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
