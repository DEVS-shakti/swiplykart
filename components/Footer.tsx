"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Mail, Sparkles } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { brandLogo } from "@/lib/brandAssets";
import { cn } from "@/lib/utils";

const sparkleAngles = [-18, 6, 30, 54];

export function Footer() {
  const { user, loading } = useAuth();

  return (
    <footer className="theme-footer relative w-full overflow-hidden border-t">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgb(109_40_217/0.22),transparent_55%),radial-gradient(ellipse_60%_50%_at_80%_20%,rgb(236_72_153/0.12),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-[min(100%,720px)] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/25 via-fuchsia-500/20 to-pink-500/25 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center px-6 pb-14 pt-16 md:px-10 md:pb-16 md:pt-20">
        <div className="relative mb-10 flex flex-col items-center md:mb-12">
          <div
            className="pointer-events-none absolute -inset-16 opacity-[0.35] brand-orbit-slow"
            style={{
              background:
                "conic-gradient(from 180deg, transparent, rgb(192 38 211 / 0.15), transparent 40%, rgb(139 92 246 / 0.12), transparent 70%)",
              maskImage: "radial-gradient(circle, transparent 42%, black 48%, black 52%, transparent 58%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 42%, black 48%, black 52%, transparent 58%)",
            }}
            aria-hidden
          />

          <div className="relative flex flex-col items-center justify-center">
            <div className="pointer-events-none absolute -right-6 -top-6 z-20 h-24 w-24 md:-right-10 md:-top-10 md:h-32 md:w-32">
              {sparkleAngles.map((deg, i) => (
                <span
                  key={deg}
                  className={cn(
                    "brand-sparkle-ray absolute bottom-2 left-1/2 h-10 w-[2px] origin-bottom rounded-full bg-gradient-to-t from-fuchsia-500 via-pink-300 to-white/90 shadow-[0_0_8px_rgb(244_114_182/0.8)] md:h-14",
                  )}
                  style={{
                    transform: `translateX(-50%) rotate(${deg}deg)`,
                    animationDelay: `${i * 0.22}s`,
                  }}
                  aria-hidden
                />
              ))}
            </div>

            <div className="relative flex items-center justify-center">
              <Image
                src={brandLogo}
                alt="SwiplyKart"
                width={280}
                height={280}
                unoptimized
                className="brand-logo-float mx-auto h-auto w-full max-w-[200px] object-contain md:max-w-xs"
              />
            </div>
          </div>

          <p className="mt-6 text-center font-headline text-lg font-black uppercase tracking-[0.35em] text-transparent md:text-xl md:tracking-[0.4em]">
            <span className="bg-gradient-to-r from-violet-200 via-fuchsia-300 to-pink-400 bg-clip-text">
              SwiplyKart
            </span>
          </p>

          {user ? (
            <p className="mt-5 max-w-md text-center text-sm text-faint-foreground">
              Thanks for flowing with us - your drops, your vibe.
            </p>
          ) : loading ? (
            <p className="mt-5 text-center text-sm text-faint-foreground">Loading your session...</p>
          ) : (
            <div className="mt-5 flex max-w-md flex-col items-center gap-2 text-center">
              <p className="flex items-center gap-2 text-sm font-medium text-soft-foreground">
                <Sparkles className="size-4 shrink-0 text-fuchsia-400/90" aria-hidden />
                You&apos;re browsing as a guest - saves and a tuned feed unlock when you join.
              </p>
              <Link
                href="/auth/login"
                className="rounded-full border border-fuchsia-500/35 bg-gradient-to-r from-violet-600/25 to-pink-600/20 px-5 py-2 text-xs font-bold uppercase tracking-widest text-fuchsia-100 shadow-[0_0_24px_rgb(192_38_211/0.2)] transition hover:border-fuchsia-400/50 hover:from-violet-600/35 hover:to-pink-600/30"
              >
                Sign in free
              </Link>
            </div>
          )}

          <p className="mt-4 max-w-lg text-center font-body text-xs uppercase leading-relaxed tracking-[0.2em] text-faint-foreground">
            The neon curator · discovery built for modern collectors
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 border-t border-outline/50 pt-10 md:gap-12">
          <span className="font-headline text-[10px] uppercase tracking-widest text-faint-foreground">Terms</span>
          <span className="font-headline text-[10px] uppercase tracking-widest text-faint-foreground">
            Privacy
          </span>
          <span className="font-headline text-[10px] uppercase tracking-widest text-faint-foreground">
            Shipping
          </span>
          <Link
            href="/auth/login"
            className="font-headline text-[10px] uppercase tracking-widest text-faint-foreground transition-colors hover:text-fuchsia-300"
          >
            Help
          </Link>
        </div>

        <div className="mt-6 flex gap-4">
          <span
            className="theme-panel-soft flex size-10 cursor-default items-center justify-center rounded-xl text-faint-foreground"
            aria-hidden
          >
            <Globe className="size-[18px]" strokeWidth={1.75} />
          </span>
          <span
            className="theme-panel-soft flex size-10 cursor-default items-center justify-center rounded-xl text-faint-foreground"
            aria-hidden
          >
            <Mail className="size-[18px]" strokeWidth={1.75} />
          </span>
        </div>

        <div className="mt-10 flex items-center gap-2 opacity-60">
          <Image src={brandLogo} alt="" width={28} height={28} unoptimized className="size-7 object-contain" />
          <p className="font-headline text-[10px] uppercase tracking-widest text-faint-foreground">
            © {new Date().getFullYear()} SwiplyKart · all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
