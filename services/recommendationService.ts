import { getProducts, getProductsByIds } from "./productService";
import { getUserProfile } from "./userService";
import { Product } from "@/types";

export async function getPersonalizedFeed(uid?: string, itemsCount: number = 10): Promise<Product[]> {
  // If not logged in, just return trending products essentially
  const { products: randomProducts } = await getProducts(itemsCount * 2);

  if (!uid) {
    return randomProducts.slice(0, itemsCount);
  }

  const user = await getUserProfile(uid);
  if (!user || user.preferences.length === 0) {
    return randomProducts.slice(0, itemsCount);
  }

  // Basic Algorithm:
  // We want parts to come from preferred categories.
  const preferences = user.preferences.map(p => p.toLowerCase());
  
  // For demo: filter fetched from all random
  // Realistically we'd query by each category but Firestore in/array-contains queries can be restricted.
  
  const preferredMatch = randomProducts.filter(p => 
    (p.tags || p.vibes || []).some(tag => preferences.includes(tag.toLowerCase())) || 
    preferences.includes(p.category.toLowerCase())
  );
  
  // Merge preferred, recent interactions, and random
  const combined = Array.from(new Set([...preferredMatch, ...randomProducts]));
  
  // Filter out products they already have liked/saved if necessary, but returning all is fine for now
  
  return combined.slice(0, itemsCount);
}
