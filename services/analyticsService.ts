import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const CLICKS_COLLECTION = "clicks";

export async function trackClick(productId: string, userId?: string) {
  try {
    await addDoc(collection(db, CLICKS_COLLECTION), {
      productId,
      userId: userId || null,
      timestamp: serverTimestamp(),
    });
    console.log("Click tracked successfully", { productId, userId });
  } catch (error) {
    console.error("Failed to track click:", error);
  }
}
