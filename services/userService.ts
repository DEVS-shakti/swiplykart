import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserProfile } from "@/types";

export const USERS_COLLECTION = "users";

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const docRef = doc(db, USERS_COLLECTION, uid);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { uid: snapshot.id, ...snapshot.data() } as UserProfile;
  }
  return null;
}

export async function createUserProfile(uid: string, data?: Partial<UserProfile>): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, uid);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    await setDoc(docRef, { ...data } as Record<string, unknown>, { merge: true });
    return;
  }
  await setDoc(docRef, {
    preferences: [],
    likedProducts: [],
    savedProducts: [],
    dislikedProducts: [],
    ...data,
  });
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(docRef, data as Record<string, unknown>);
}

export async function updateUserPreference(uid: string, data: Partial<UserProfile>): Promise<void> {
  const docRef = doc(db, USERS_COLLECTION, uid);
  await updateDoc(docRef, data as Record<string, unknown>);
}

export async function trackUserInteraction(
  uid: string,
  interactionType: "like" | "save" | "dislike",
  productId: string,
  remove: boolean = false,
) {
  const docRef = doc(db, USERS_COLLECTION, uid);
  const operator = remove ? arrayRemove(productId) : arrayUnion(productId);

  if (interactionType === "like") {
    await updateDoc(docRef, {
      likedProducts: operator,
      ...(remove
        ? {}
        : {
            dislikedProducts: arrayRemove(productId),
          }),
    });
  } else if (interactionType === "save") {
    await updateDoc(docRef, { savedProducts: operator });
  } else if (interactionType === "dislike") {
    await updateDoc(docRef, {
      dislikedProducts: operator,
      ...(remove
        ? {}
        : {
            likedProducts: arrayRemove(productId),
            savedProducts: arrayRemove(productId),
          }),
    });
  }
}
