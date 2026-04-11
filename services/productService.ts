import { collection, query, limit, getDocs, orderBy, startAfter, QueryDocumentSnapshot, where, doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types";

export const PRODUCT_COLLECTION = "products";

function serializeProduct(docSnap: DocumentSnapshot | QueryDocumentSnapshot): Product {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    ...data,
    createdAt: data?.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data?.createdAt || new Date().toISOString()
  } as Product;
}

export async function getProducts(itemsPerPage: number = 10, lastDoc?: QueryDocumentSnapshot): Promise<{ products: Product[], lastDoc: QueryDocumentSnapshot | null }> {
  let q = query(
    collection(db, PRODUCT_COLLECTION),
    orderBy("createdAt", "desc"),
    limit(itemsPerPage)
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  const snapshot = await getDocs(q);
  const products: Product[] = snapshot.docs.map(serializeProduct);

  return {
    products,
    lastDoc: snapshot.docs[snapshot.docs.length - 1] || null
  };
}

export async function getByCategory(category: string, itemsPerPage: number = 10): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCT_COLLECTION),
    where("category", "==", category),
    limit(itemsPerPage)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(serializeProduct);
}

export async function getTrendingProducts(itemsPerPage: number = 10): Promise<Product[]> {
  const q = query(
    collection(db, PRODUCT_COLLECTION),
    orderBy("createdAt", "desc"), 
    limit(itemsPerPage)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(serializeProduct);
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
    limit(limitCount + 1)
  );
  
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(serializeProduct);
  return products.filter(p => p.id !== product.id).slice(0, limitCount);
}
