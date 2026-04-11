"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { Grid2x2, Heart, House, LogOut, Moon, Search, Shield, ShoppingCart, Sparkles, Sun, UserRound } from "lucide-react";

import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";

import { brandIconSrc } from "@/lib/brandAssets";
import { cn } from "@/lib/utils";
import { auth } from "@/firebase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { getUserProfile } from "@/services/userService";

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
  const router = useRouter();
  const { user, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    getUserProfile(user.uid).then((p) => {
      if (!cancelled) setIsAdmin(p?.role === "admin");
    });
    return () => {
      cancelled = true;
    };
  }, [user]);

  async function handleSignOut() {
    await signOut(auth);
  }

  function onSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem("q") as HTMLInputElement)?.value?.trim();
    if (q) router.push(`/products?q=${encodeURIComponent(q)}`);
    else router.push("/products");
  }

  return (
    <>
      <header className="theme-header fixed top-0 z-50 w-full shadow-[0px_0px_15px_rgba(255,137,171,0.15)] backdrop-blur-xl transition-colors duration-300">
        <nav className="mx-auto flex h-20 w-full max-w-[1920px] items-center justify-between px-6 text-foreground">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="group flex items-center justify-center gap-2 font-headline text-lg md:text-xl font-black tracking-[0.18em] transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 shrink-0">
                <Image
                  src={brandIconSrc}
                  alt="SwiplyKart"
                  width={56}
                  height={56}
                  unoptimized
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
              <span className="hidden sm:inline bg-gradient-to-r from-violet-200 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(192,38,211,0.25)]">
                SWIPLYKART
              </span>
            </Link>
            <div className="hidden items-center gap-6 md:flex">
              {topLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-headline border-b-2 pb-1 text-sm font-bold uppercase tracking-[0.05em] transition-colors duration-300",
                      active ? "border-pink-500 text-pink-400" : "border-transparent text-soft-foreground hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {user && isAdmin ? (
                <Link
                  href="/admin"
                  className={cn(
                    "flex items-center gap-1.5 border-b-2 pb-1 font-headline text-sm font-bold uppercase tracking-[0.05em] transition-colors",
                    pathname === "/admin" ? "border-sky-400 text-sky-400" : "border-transparent text-soft-foreground hover:text-foreground",
                  )}
                >
                  <Shield className="size-3.5" />
                  Admin
                </Link>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <form
              onSubmit={onSearchSubmit}
              className="hidden items-center rounded-lg border border-outline/60 bg-surface-container-low/80 px-4 py-2 transition-all focus-within:border-pink-500 lg:flex"
            >
              <Search className="size-[18px] text-faint-foreground" aria-hidden />
              <input
                name="q"
                type="search"
                placeholder="Search vibes..."
                className="ml-2 w-48 border-none bg-transparent text-sm text-foreground placeholder:text-faint-foreground focus:ring-0 focus:outline-none"
                autoComplete="off"
              />
            </form>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => void setTheme(theme === "dark" ? "light" : "dark")}
                className={`transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? "text-soft-foreground hover:text-pink-500"
                    : "text-faint-foreground hover:text-rose-500"
                }`}
                aria-label="Toggle theme"
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="size-[22px]" strokeWidth={1.75} />
                ) : (
                  <Moon className="size-[22px]" strokeWidth={1.75} />
                )}
              </button>
              <Link
                href="/products"
                className="text-soft-foreground transition-all duration-300 hover:scale-110 hover:text-pink-500"
                aria-label="Shop cart"
              >
                <ShoppingCart className="size-[22px]" strokeWidth={1.75} />
              </Link>
              <Link
                href="/dashboard"
                className="hidden text-soft-foreground transition-all duration-300 hover:scale-110 hover:text-pink-500 sm:flex"
                aria-label="Saved"
              >
                <Heart className="size-[22px]" strokeWidth={1.75} />
              </Link>
              {!loading && user ? (
                <>
                  <button
                    type="button"
                    onClick={() => void handleSignOut()}
                    className="hidden text-soft-foreground transition-all duration-300 hover:text-pink-500 sm:block"
                    aria-label="Sign out"
                  >
                    <LogOut className="size-[22px]" strokeWidth={1.75} />
                  </button>
                  <Link
                    href="/dashboard"
                    className="text-soft-foreground transition-all duration-300 hover:scale-110 hover:text-pink-500"
                    aria-label="Account"
                  >
                    <UserRound className="size-[22px]" strokeWidth={1.75} />
                  </Link>
                </>
              ) : !loading ? (
                <Link
                  href="/auth/login"
                  className="text-soft-foreground transition-all duration-300 hover:scale-110 hover:text-pink-500"
                  aria-label="Sign in"
                >
                  <UserRound className="size-[22px]" strokeWidth={1.75} />
                </Link>
              ) : null}
            </div>
          </div>
        </nav>
      </header>
      <div className="h-20 shrink-0" aria-hidden />
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4 md:hidden">
        <nav className="theme-panel pointer-events-auto flex w-full max-w-sm items-center justify-between rounded-2xl px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)]">
          {mobileLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex min-w-14 flex-col items-center gap-1 text-[10px] font-bold transition-colors",
                  active ? "text-pink-400" : "text-faint-foreground",
                )}
              >
                <Icon className={cn("size-4", active && "glow-pink-500")} strokeWidth={active ? 2.25 : 1.75} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
