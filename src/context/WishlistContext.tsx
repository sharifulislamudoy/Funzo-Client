"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { FunzoProduct } from "@/types/product";

const WISHLIST_STORAGE_KEY = "funzo-wishlist";

type WishlistContextValue = {
  items: FunzoProduct[];
  itemCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: FunzoProduct) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FunzoProduct[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (saved) setItems(JSON.parse(saved) as FunzoProduct[]);
      } catch {
        window.localStorage.removeItem(WISHLIST_STORAGE_KEY);
      } finally {
        setHasLoaded(true);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    }
  }, [hasLoaded, items]);

  const isInWishlist = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items],
  );

  const toggleWishlist = useCallback((product: FunzoProduct) => {
    setItems((current) =>
      current.some((item) => item.id === product.id)
        ? current.filter((item) => item.id !== product.id)
        : [...current, product],
    );
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      itemCount: items.length,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [clearWishlist, isInWishlist, items, removeFromWishlist, toggleWishlist],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside WishlistProvider");
  return context;
}
