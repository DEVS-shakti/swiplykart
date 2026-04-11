import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Providers } from "@/components/Providers";
import { brandAppleTouchIcon, brandIconsForMetadata } from "@/lib/brandAssets";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SWIPLYKART",
  description: "Where Shopping Meets Your Vibe",
  icons: {
    icon: [...brandIconsForMetadata],
    apple: [...brandAppleTouchIcon],
  },
};

const themeInitScript = `
(() => {
  try {
    const stored = localStorage.getItem("theme-preference");
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    html.dataset.theme = theme;
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-on-background" suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
