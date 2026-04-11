import { Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  title?: string;
  name: string;
  price: number;
  /** Optional “was” price for discount badge */
  compareAtPrice?: number;
  discountPercent?: number;
  category: string;
  image: string;
  gallery: string[];
  affiliateLink?: string;
  tags?: string[];
  vibes: string[];
  description: string;
  shortDescription: string;
  bullets: string[];
  createdAt: string;
  ratio?: string;
  accent?: "primary" | "secondary" | "tertiary";
  featuredLabel?: string;
  /** When true, product is eligible for the home hero rotation (set in Firestore or admin). */
  heroFeatured?: boolean;
  /** Lower sorts first within hero picks. */
  heroOrder?: number;
};

export type UserProfile = {
  uid: string;
  preferences: string[];
  likedProducts: string[];
  savedProducts: string[];
  dislikedProducts?: string[];
  displayName?: string;
  role?: "admin" | "user";
};

export type ClickEvent = {
  id?: string;
  productId: string;
  userId?: string;
  timestamp: Timestamp;
};
