import { getProducts, getProductsByIds } from "./productService";
import { getUserProfile } from "./userService";
import { Product } from "@/types";

function scoreProduct(p: Product, preferences: string[], likedIds: string[]): number {
  let score = 0;
  const prefs = preferences.map((x) => x.toLowerCase());
  const cat = p.category?.toLowerCase() ?? "";
  if (prefs.some((pr) => cat.includes(pr) || pr.includes(cat))) score += 3;
  const tagLike = [...(p.tags || []), ...(p.vibes || [])].map((t) => t.toLowerCase());
  for (const pr of prefs) {
    if (tagLike.some((t) => t.includes(pr) || pr.includes(t))) score += 2;
  }
  if (likedIds.length && p.category) {
    score += likedIds.length * 0.01;
  }
  return score;
}

export async function getPersonalizedFeed(uid?: string, itemsCount: number = 10): Promise<Product[]> {
  const { products: pool } = await getProducts(Math.max(itemsCount * 3, 24));

  if (!uid) {
    return pool.slice(0, itemsCount);
  }

  const user = await getUserProfile(uid);
  if (!user) {
    return pool.slice(0, itemsCount);
  }

  const preferences = user.preferences || [];
  const likedIds = user.likedProducts || [];
  const disliked = new Set(user.dislikedProducts || []);

  const preferredMatch = pool.filter((p) => {
    if (disliked.has(p.id)) return false;
    return scoreProduct(p, preferences, likedIds) > 0;
  });

  const boosted = [...pool].sort((a, b) => {
    if (disliked.has(a.id) && !disliked.has(b.id)) return 1;
    if (!disliked.has(a.id) && disliked.has(b.id)) return -1;
    return scoreProduct(b, preferences, likedIds) - scoreProduct(a, preferences, likedIds);
  });

  const seen = new Set<string>();
  const merged: Product[] = [];
  for (const p of [...preferredMatch, ...boosted, ...pool]) {
    if (seen.has(p.id) || disliked.has(p.id)) continue;
    seen.add(p.id);
    merged.push(p);
    if (merged.length >= itemsCount) break;
  }

  if (merged.length < itemsCount && likedIds.length) {
    const related = await getProductsByIds(likedIds.slice(0, 10));
    const cats = new Set(related.map((r) => r.category));
    for (const p of pool) {
      if (merged.length >= itemsCount) break;
      if (seen.has(p.id) || disliked.has(p.id)) continue;
      if (cats.has(p.category)) {
        seen.add(p.id);
        merged.push(p);
      }
    }
  }

  return merged.slice(0, itemsCount);
}
