import { collection, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { PRODUCT_COLLECTION } from "@/services/productService";

export type ProductDraft = {
  name: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  image: string;
  affiliateLink: string;
  description: string;
  shortDescription: string;
  vibes: string[];
  tags: string[];
  bullets: string[];
  gallery?: string[];
  featuredLabel?: string;
  heroFeatured?: boolean;
  heroOrder?: number;
};

function normalizeDraft(draft: ProductDraft) {
  const gallery = draft.gallery?.filter(Boolean).length ? draft.gallery! : [draft.image];
  return {
    name: draft.name.trim(),
    title: draft.name.trim(),
    price: Number(draft.price),
    compareAtPrice:
      typeof draft.compareAtPrice === "number" && !Number.isNaN(draft.compareAtPrice)
        ? draft.compareAtPrice
        : undefined,
    category: draft.category.trim() || "general",
    image: draft.image.trim(),
    affiliateLink: draft.affiliateLink.trim(),
    description: draft.description.trim(),
    shortDescription: (draft.shortDescription || draft.name).trim(),
    vibes: draft.vibes.map((v) => v.trim()).filter(Boolean),
    tags: draft.tags.map((t) => t.trim()).filter(Boolean),
    bullets: draft.bullets.map((b) => b.trim()).filter(Boolean),
    gallery,
    featuredLabel: draft.featuredLabel?.trim() || null,
    heroFeatured: draft.heroFeatured === true,
    heroOrder:
      typeof draft.heroOrder === "number" && !Number.isNaN(draft.heroOrder) ? draft.heroOrder : null,
  };
}

export async function saveProduct(existingId: string | null, draft: ProductDraft): Promise<string> {
  const payload = normalizeDraft(draft);
  const ref = existingId ? doc(db, PRODUCT_COLLECTION, existingId) : doc(collection(db, PRODUCT_COLLECTION));

  if (existingId) {
    await setDoc(
      ref,
      {
        ...payload,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
    return existingId;
  }

  await setDoc(ref, {
    ...payload,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function removeProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, PRODUCT_COLLECTION, id));
}
