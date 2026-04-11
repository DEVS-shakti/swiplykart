import { Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  title?: string;
  name: string;
  price: number;
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
};

export type UserProfile = {
  uid: string;
  preferences: string[];
  likedProducts: string[];
  savedProducts: string[];
  role?: "admin" | "user";
};

export type ClickEvent = {
  id?: string;
  productId: string;
  userId?: string;
  timestamp: Timestamp;
};
