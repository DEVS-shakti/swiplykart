import {
  collection,
  query,
  limit,
  getDocs,
  orderBy,
  startAfter,
  QueryDocumentSnapshot,
  where,
  doc,
  getDoc,
  DocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types";

export const PRODUCT_COLLECTION = "products";

function serializeProduct(docSnap: DocumentSnapshot | QueryDocumentSnapshot): Product {
  const data = docSnap.data() as DocumentData | undefined;
  const image = typeof data?.image === "string" ? data.image : "";
  const gallery = Array.isArray(data?.gallery) ? (data.gallery as string[]) : image ? [image] : [];
  const vibes = Array.isArray(data?.vibes) ? (data.vibes as string[]) : [];
  const bullets = Array.isArray(data?.bullets) ? (data.bullets as string[]) : [];
  const tags = Array.isArray(data?.tags) ? (data.tags as string[]) : [];
  const name = (data?.name as string) || (data?.title as string) || "Untitled";
  const title = (data?.title as string) || name;

  return {
    id: docSnap.id,
    ...data,
    name,
    title,
    image,
    gallery,
    vibes,
    bullets,
    tags,
    category: typeof data?.category === "string" ? data.category : "general",
    price: typeof data?.price === "number" ? data.price : 0,
    description: typeof data?.description === "string" ? data.description : "",
    shortDescription:
      typeof data?.shortDescription === "string" ? data.shortDescription : name,
    affiliateLink: typeof data?.affiliateLink === "string" ? data.affiliateLink : undefined,
    compareAtPrice: typeof data?.compareAtPrice === "number" ? data.compareAtPrice : undefined,
    discountPercent: typeof data?.discountPercent === "number" ? data.discountPercent : undefined,
    heroFeatured: data?.heroFeatured === true,
    heroOrder: typeof data?.heroOrder === "number" ? data.heroOrder : undefined,
    createdAt: data?.createdAt?.toDate
      ? data.createdAt.toDate().toISOString()
      : typeof data?.createdAt === "string"
        ? data.createdAt
        : new Date().toISOString(),
  } as Product;
}

export async function getProducts(
  itemsPerPage: number = 10,
  lastDoc?: QueryDocumentSnapshot,
): Promise<{ products: Product[]; lastDoc: QueryDocumentSnapshot | null }> {
  let q = query(
    collection(db, PRODUCT_COLLECTION),
    orderBy("createdAt", "desc"),
    limit(itemsPerPage),
  );

  if (lastDoc) {
    q = query(
      collection(db, PRODUCT_COLLECTION),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(itemsPerPage),
    );
  }

  const snapshot = await getDocs(q);
  const products: Product[] = snapshot.docs.map(serializeProduct);

  return {
    products,
    lastDoc: (snapshot.docs[snapshot.docs.length - 1] as QueryDocumentSnapshot) || null,
  };
}

/**
 * Collects unique `category` values from products (paginated scan).
 * Use for filters, onboarding, and dashboard — no separate `categories` collection required.
 */
export async function getDistinctCategories(maxScan = 500): Promise<string[]> {
  const seen = new Set<string>();
  let lastDoc: QueryDocumentSnapshot | null = null;
  let total = 0;
  const batchSize = 80;

  while (total < maxScan) {
    const { products, lastDoc: nextLast } = await getProducts(
      Math.min(batchSize, maxScan - total),
      lastDoc ?? undefined,
    );
    for (const p of products) {
      const c = p.category?.trim();
      if (c) seen.add(c);
    }
    total += products.length;
    if (!nextLast || products.length === 0) break;
    lastDoc = nextLast;
  }

  return Array.from(seen).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

/** Client-safe pagination: continue after last loaded product id */
export async function getProductsAfter(
  lastProductId: string,
  itemsPerPage: number,
): Promise<{ products: Product[]; lastDoc: QueryDocumentSnapshot | null }> {
  const lastRef = doc(db, PRODUCT_COLLECTION, lastProductId);
  const snap = await getDoc(lastRef);
  if (!snap.exists()) {
    return { products: [], lastDoc: null };
  }
  return getProducts(itemsPerPage, snap as QueryDocumentSnapshot);
}

export async function getByCategory(category: string, itemsPerPage: number = 10): Promise<Product[]> {
  const q = query(collection(db, PRODUCT_COLLECTION), where("category", "==", category), limit(itemsPerPage));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(serializeProduct);
}

export async function getTrendingProducts(itemsPerPage: number = 10): Promise<Product[]> {
  const q = query(collection(db, PRODUCT_COLLECTION), orderBy("createdAt", "desc"), limit(itemsPerPage));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(serializeProduct);
}

/**
 * Products for the home hero: `heroFeatured: true` first (sorted by `heroOrder`, then recency),
 * otherwise latest trending items.
 */
export async function getHeroProducts(limitCount: number = 8): Promise<Product[]> {
  try {
    const q = query(
      collection(db, PRODUCT_COLLECTION),
      where("heroFeatured", "==", true),
      limit(48),
    );
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(serializeProduct);
    if (list.length === 0) {
      return getTrendingProducts(limitCount);
    }
    list.sort((a, b) => {
      const ao = typeof a.heroOrder === "number" ? a.heroOrder : 999;
      const bo = typeof b.heroOrder === "number" ? b.heroOrder : 999;
      if (ao !== bo) return ao - bo;
      return b.createdAt.localeCompare(a.createdAt);
    });
    return list.slice(0, limitCount);
  } catch {
    return getTrendingProducts(limitCount);
  }
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (!ids || ids.length === 0) return [];
  const chunks = [];
  for (let i = 0; i < ids.length; i += 10) {
    chunks.push(ids.slice(i, i + 10));
  }

  const productPromises = chunks.map(async (chunk) => {
    const q = query(collection(db, PRODUCT_COLLECTION), where("__name__", "in", chunk));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(serializeProduct);
  });

  const results = await Promise.all(productPromises);
  return results.flat();
}

export async function getProductById(id: string): Promise<Product | null> {
  const docRef = doc(db, PRODUCT_COLLECTION, id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return serializeProduct(snapshot);
  }
  return null;
}

export async function getRelatedProducts(product: Product, limitCount: number = 4): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCT_COLLECTION),
    where("category", "==", product.category),
    limit(limitCount + 1),
  );

  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(serializeProduct);
  return products.filter((p) => p.id !== product.id).slice(0, limitCount);
}

/** Case-insensitive substring match on client-loaded catalog (Firestore has no native full-text search). */
export function filterProductsBySearch(products: Product[], raw: string): Product[] {
  const q = raw.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => {
    const hay = [
      p.name,
      p.title,
      p.description,
      p.shortDescription,
      p.category,
      ...(p.vibes || []),
      ...(p.tags || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
