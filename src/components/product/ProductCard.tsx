"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, Heart, ShoppingCart, Star } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { ProductCardProps } from "@/types/product";

type CartStatus = "idle" | "added";

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [cartStatus, setCartStatus] = useState<CartStatus>("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [primaryImage, secondaryImage] = product.images;
  const productHref = product.href ?? `/products/${product.slug}`;
  const isAvailable = product.stock > 0;
  const wishlisted = isInWishlist(product.id);

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const discountPercentage = useMemo(() => {
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
      return 0;
    }

    return Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
    );
  }, [product.compareAtPrice, product.price]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  function handleAddToCart() {
    if (!isAvailable) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: primaryImage,
    });

    setCartStatus("added");

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setCartStatus("idle");
    }, 1500);
  }

  return (
    <article className="group/card relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-zinc-200 bg-white shadow-[0_12px_34px_rgba(20,20,20,0.07)] transition duration-500 hover:-translate-y-1 hover:border-[#bdff11] hover:shadow-[0_22px_52px_rgba(20,20,20,0.13)]">
      <div className="relative aspect-square shrink-0 overflow-hidden bg-[#f3f4ef]">
        <Link
          href={productHref}
          aria-label={product.name}
          className="absolute inset-0"
        >
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover/card:scale-[1.05] group-hover/card:opacity-0"
          />

          <img
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.06] object-cover opacity-0 transition-all duration-700 ease-out group-hover/card:scale-100 group-hover/card:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 z-10 flex max-w-[calc(100%-1rem)] flex-wrap gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
          {discountPercentage > 0 && (
            <span className="rounded-full bg-[#bdff11] px-2 py-1 text-[9px] font-black text-[#141414] shadow-sm sm:px-2.5 sm:text-[10px]">
              -{discountPercentage}%
            </span>
          )}

          {product.badge && (
            <span className="rounded-full border border-white/75 bg-white/90 px-2 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#141414] shadow-sm backdrop-blur-md sm:px-2.5 sm:text-[9px]">
              {product.badge}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wishlisted}
          className={`absolute right-2 top-2 z-20 grid size-9 place-items-center rounded-full border shadow-sm backdrop-blur-md transition duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414] sm:right-3 sm:top-3 sm:size-10 ${
            wishlisted
              ? "border-[#bdff11] bg-[#bdff11] text-[#141414]"
              : "border-white/80 bg-white/90 text-[#141414] hover:bg-[#141414] hover:text-white"
          }`}
        >
          <Heart
            aria-hidden="true"
            size={18}
            strokeWidth={2.3}
            className={wishlisted ? "fill-current" : ""}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-0 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-y-[calc(100%+1rem)] lg:opacity-0 lg:group-hover/card:translate-y-0 lg:group-hover/card:opacity-100">
          <button
            type="button"
            disabled={!isAvailable}
            onClick={handleAddToCart}
            aria-label={isAvailable ? `Add ${product.name} to cart` : `${product.name} is out of stock`}
            className={`group/cart relative flex h-10 w-full items-center justify-center overflow-hidden px-3 text-xs font-extrabold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#bdff11] sm:h-11 sm:text-sm ${
              isAvailable
                ? "bg-[#141414] text-white hover:bg-[#bdff11] hover:text-[#141414] active:scale-[0.99]"
                : "cursor-not-allowed bg-zinc-400 text-white"
            }`}
          >
            {cartStatus === "added" ? (
              <span className="flex items-center gap-2">
                <Check aria-hidden="true" size={18} strokeWidth={2.6} />
                Added to cart
              </span>
            ) : (
              <>
                <span className="transition-all duration-300 lg:group-hover/cart:-translate-y-8 lg:group-hover/cart:opacity-0">
                  {isAvailable ? "Add to cart" : "Out of stock"}
                </span>

                {isAvailable && (
                  <ShoppingCart
                    aria-hidden="true"
                    size={21}
                    strokeWidth={2.4}
                    className="pointer-events-none absolute translate-y-8 opacity-0 transition-all duration-300 lg:group-hover/cart:translate-y-0 lg:group-hover/cart:opacity-100"
                  />
                )}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <p className="min-w-0 truncate text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#78a800] sm:text-[10px]">
            {product.category}
          </p>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-bold sm:text-[9px] ${
              isAvailable
                ? "bg-[#bdff11]/20 text-[#587b00]"
                : "bg-red-50 text-red-600"
            }`}
          >
            {isAvailable ? `in stock` : "Out of stock"}
          </span>
        </div>

        <Link href={productHref} className="mt-2">
          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#141414] transition-colors hover:text-[#6f9900] sm:text-base sm:leading-[22px]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-zinc-500 sm:text-xs sm:leading-5">
          {product.shortDescription}
        </p>

        <div className="mt-3 flex items-end justify-between gap-2 border-t border-zinc-200 pt-3">
          <div className="flex min-w-0 flex-wrap items-baseline gap-1 sm:gap-2">
            <span className="text-sm font-black text-[#141414] sm:text-lg">
              {priceFormatter.format(product.price)}
            </span>

            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[9px] font-semibold text-zinc-400 line-through sm:text-[11px]">
                {priceFormatter.format(product.compareAtPrice)}
              </span>
            )}
          </div>

          {product.rating !== undefined && (
            <div className="flex shrink-0 items-center gap-1">
              <Star
                aria-hidden="true"
                className="size-3 fill-[#bdff11] text-[#7aa500] sm:size-3.5"
              />
              <span className="text-[10px] font-extrabold text-[#141414] sm:text-xs">
                {product.rating.toFixed(1)}
              </span>
              <span className="hidden text-[9px] text-zinc-400 sm:inline">
                ({product.reviewCount ?? 0})
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
