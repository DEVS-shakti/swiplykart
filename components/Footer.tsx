import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/6 bg-black/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 text-sm text-white/40 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <div className="flex items-center gap-3 font-headline text-lg font-extrabold uppercase tracking-[0.22em] text-white">
            <Image src="/icon.png" alt="Logo" width={24} height={24} className="rounded" />
            SwiplyKart
          </div>
          <p className="mt-2 max-w-sm">Where Shopping Meets Your Vibe.</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/products" className="transition-colors hover:text-white">
            Shop
          </Link>
          <Link href="/swipe" className="transition-colors hover:text-white">
            Swipe
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-white">
            Dashboard
          </Link>
          <Link href="/auth/login" className="transition-colors hover:text-white">
            Account
          </Link>
        </div>
      </div>
    </footer>
  );
}
