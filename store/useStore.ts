"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SwiplyState = {
  likes: string[];
  dislikes: string[];
  saved: string[];
  recentlyViewed: string[];
  activeVibe: string;
  likeProduct: (id: string) => void;
  dislikeProduct: (id: string) => void;
  toggleSaved: (id: string) => void;
  viewProduct: (id: string) => void;
  setActiveVibe: (vibe: string) => void;
  resetPreferences: () => void;
};

const initialState = {
  likes: [] as string[],
  dislikes: [] as string[],
  saved: [] as string[],
  recentlyViewed: [] as string[],
  activeVibe: "All Drops",
};

export const useStore = create<SwiplyState>()(
  persist(
    (set) => ({
      ...initialState,
      likeProduct: (id) =>
        set((state) => ({
          likes: state.likes.includes(id) ? state.likes : [id, ...state.likes].slice(0, 24),
          dislikes: state.dislikes.filter((item) => item !== id),
          saved: state.saved.includes(id) ? state.saved : [id, ...state.saved].slice(0, 24),
        })),
      dislikeProduct: (id) =>
        set((state) => ({
          dislikes: state.dislikes.includes(id)
            ? state.dislikes
            : [id, ...state.dislikes].slice(0, 24),
          likes: state.likes.filter((item) => item !== id),
          saved: state.saved.filter((item) => item !== id),
        })),
      toggleSaved: (id) =>
        set((state) => ({
          saved: state.saved.includes(id)
            ? state.saved.filter((item) => item !== id)
            : [id, ...state.saved].slice(0, 24),
        })),
      viewProduct: (id) =>
        set((state) => ({
          recentlyViewed: [id, ...state.recentlyViewed.filter((item) => item !== id)].slice(0, 18),
        })),
      setActiveVibe: (vibe) => set({ activeVibe: vibe }),
      resetPreferences: () => set(initialState),
    }),
    {
      name: "swiplykart-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
