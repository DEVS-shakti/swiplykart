/**
 * Public path for the app icon / wordmark (`public/icon.png`).
 * Use `unoptimized` on `next/image` for this asset so alpha isn’t flattened by the optimizer.
 * For the sharpest favicons, keep `icon.png` at least ~512×512; browsers downscale as needed.
 */
export const brandLogo = "/Logo.png";
export const brandIconSrc = "/icon.png";

/** Declared sizes so browsers / “Add to Home Screen” can pick a crisp icon (same asset scales). */
export const brandIconsForMetadata = [
  { url: brandIconSrc, sizes: "32x32", type: "image/png" as const },
  { url: brandIconSrc, sizes: "48x48", type: "image/png" as const },
  { url: brandIconSrc, sizes: "96x96", type: "image/png" as const },
  { url: brandIconSrc, sizes: "192x192", type: "image/png" as const },
  { url: brandIconSrc, sizes: "512x512", type: "image/png" as const },
] as const;

export const brandAppleTouchIcon = [
  { url: brandIconSrc, sizes: "180x180", type: "image/png" as const },
] as const;
