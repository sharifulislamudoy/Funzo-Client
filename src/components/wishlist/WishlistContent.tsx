"use client";

import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";

import ProductCard from "@/components/product/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistContent() {
  const { items, clearWishlist } = useWishlist();

  return (
    <section className="bg-[#070908] py-10 sm:py-14 lg:py-18">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#bdff11]">Saved cars</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.045em] text-[#f4f7ef] sm:text-5xl">Your wishlist</h1>
          </div>
          {items.length > 0 && (
            <button type="button" onClick={clearWishlist} className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 text-xs font-extrabold text-[#9ba39a] transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-red-400">
              <Trash2 size={16} /> Clear all
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="mt-8 flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border border-dashed border-white/15 bg-[#101310] px-6 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-[#bdff11]"><Heart size={26} /></span>
            <h2 className="mt-5 text-2xl font-black text-[#f4f7ef]">Your wishlist is empty</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#8f978d]">Tap the heart on any RC car to keep it here for later.</p>
            <Link href="/shop" className="mt-6 rounded-full bg-[#bdff11] px-6 py-3 text-sm font-extrabold text-[#070908] transition hover:bg-[#d0ff55]">Explore the shop</Link>
          </div>
        )}
      </div>
    </section>
  );
}
