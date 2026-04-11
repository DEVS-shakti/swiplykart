import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { CLICKS_COLLECTION } from "@/services/analyticsService";

export type ClickRow = {
  id: string;
  productId: string;
  userId: string | null;
  at: string | null;
};

export async function getRecentClicks(max: number = 30): Promise<ClickRow[]> {
  const q = query(collection(db, CLICKS_COLLECTION), orderBy("timestamp", "desc"), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    const ts = data.timestamp;
    return {
      id: d.id,
      productId: String(data.productId ?? ""),
      userId: data.userId ?? null,
      at: ts?.toDate ? ts.toDate().toISOString() : null,
    };
  });
}

export function aggregateClicksByProduct(rows: ClickRow[]): Map<string, number> {
  const map = new Map<string, number>();
  for (const r of rows) {
    if (!r.productId) continue;
    map.set(r.productId, (map.get(r.productId) ?? 0) + 1);
  }
  return map;
}
