/** First chip in shop filters — shows every product. */
export const ALL_CATEGORIES_LABEL = "All categories";

/** Legacy persisted value from older builds. */
const LEGACY_ALL_LABEL = "All Drops";

export function isAllCategoriesFilter(value: string): boolean {
  return value === ALL_CATEGORIES_LABEL || value === LEGACY_ALL_LABEL;
}

/** Used only when Firestore returns no categories yet. */
export const FALLBACK_CATEGORIES = ["Tech", "Fashion", "Gaming", "Budget", "Luxury"] as const;
