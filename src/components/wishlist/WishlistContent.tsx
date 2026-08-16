"use client";

import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";

import ProductCard from "@/components/product/ProductCard";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistContent() {
  const { items, clearWishlist } = useWishlist();

  return (
    <section className="bg-white py-10 sm:py-14 lg:py-18">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#78a800]">Saved cars</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.045em] text-[#141414] sm:text-5xl">Your wishlist</h1>
          </div>
          {items.length > 0 && (
            <button type="button" onClick={clearWishlist} className="flex h-10 items-center gap-2 rounded-full border border-zinc-200 px-4 text-xs font-extrabold text-zinc-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600">
              <Trash2 size={16} /> Clear all
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {items.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="mt-8 flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border border-dashed border-zinc-300 bg-[#f7f8f4] px-6 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-[#bdff11]"><Heart size={26} /></span>
            <h2 className="mt-5 text-2xl font-black text-[#141414]">Your wishlist is empty</h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">Tap the heart on any RC car to keep it here for later.</p>
            <Link href="/shop" className="mt-6 rounded-full bg-[#141414] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#bdff11] hover:text-[#141414]">Explore the shop</Link>
          </div>
        )}
      </div>
    </section>
  );
}
