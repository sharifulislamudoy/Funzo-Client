"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { ProductCardProps } from "@/types/product";

type CartStatus = "idle" | "added";

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
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
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
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

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    resetTimerRef.current = setTimeout(() => {
      setCartStatus("idle");
    }, 1500);
  }

  function handleBuyNow() {
    if (!isAvailable) return;

    router.push(
      `/checkout?mode=buy-now&product=${encodeURIComponent(product.slug)}&quantity=1`,
    );
  }

  return (
    <article className="group/card relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#101310] shadow-[0_16px_42px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1 hover:border-[#bdff11]/70 hover:shadow-[0_24px_62px_rgba(0,0,0,0.48),0_0_34px_rgba(189,255,17,0.06)]">
      <div className="relative aspect-square shrink-0 overflow-hidden bg-[#171b17]">
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
            <span className="rounded-full border border-white/15 bg-[#0b0e0c]/80 px-2 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-white shadow-sm backdrop-blur-md sm:px-2.5 sm:text-[9px]">
              {product.badge}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={wishlisted}
          className={`absolute right-2 top-2 z-20 grid size-9 place-items-center rounded-full border shadow-sm backdrop-blur-md transition duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bdff11] sm:right-3 sm:top-3 sm:size-10 ${
            wishlisted
              ? "border-[#bdff11] bg-[#bdff11] text-[#141414]"
              : "border-white/15 bg-[#0b0e0c]/75 text-white hover:border-[#bdff11] hover:bg-[#bdff11] hover:text-[#070908]"
          }`}
        >
          <Heart
            aria-hidden="true"
            size={18}
            strokeWidth={2.3}
            className={wishlisted ? "fill-current" : ""}
          />
        </button>

        {/* Mouse/trackpad device: animated Buy Now overlay */}
        <div className="buy-now-overlay absolute inset-x-0 bottom-0 z-20">
          <button
            type="button"
            disabled={!isAvailable}
            onClick={handleBuyNow}
            aria-label={
              isAvailable
                ? `Buy ${product.name} now`
                : `${product.name} is out of stock`
            }
            className={`group/buy relative flex h-11 w-full items-center justify-center overflow-hidden rounded-t-3xl px-3 text-sm font-black transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#bdff11] ${
              isAvailable
                ? "bg-[#bdff11] text-[#070908] hover:bg-[#d1ff59] active:scale-[0.99]"
                : "cursor-not-allowed bg-[#394037] text-[#8f978d]"
            }`}
          >
            <span className="flex items-center gap-2 transition-all duration-300 group-hover/buy:-translate-y-8 group-hover/buy:opacity-0">
              {isAvailable && (
                <Zap
                  aria-hidden="true"
                  size={17}
                  className="fill-current"
                  strokeWidth={2.4}
                />
              )}

              {isAvailable ? "Buy now" : "Out of stock"}
            </span>

            {isAvailable && (
              <Zap
                aria-hidden="true"
                size={21}
                className="pointer-events-none absolute translate-y-8 fill-current opacity-0 transition-all duration-300 group-hover/buy:translate-y-0 group-hover/buy:opacity-100"
                strokeWidth={2.4}
              />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex min-w-0 items-center justify-between gap-2">
          <p className="min-w-0 truncate text-[9px] font-extrabold uppercase tracking-[0.13em] text-[#bdff11] sm:text-[10px]">
            {product.category}
          </p>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-bold sm:text-[9px] ${
              isAvailable
                ? "bg-[#bdff11]/10 text-[#bdff11]"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {isAvailable ? "In stock" : "Out of stock"}
          </span>
        </div>

        <Link href={productHref} className="mt-2">
          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#f4f7ef] transition-colors hover:text-[#bdff11] sm:text-base sm:leading-[22px]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 hidden text-xs leading-5 text-[#8f978d] sm:line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="mt-auto pt-3">
          <div className="flex items-end justify-between gap-2 border-t border-white/[0.08] pt-3">
            <div className="flex min-w-0 flex-wrap items-baseline gap-1 sm:gap-2">
              <span className="text-sm font-black text-[#f4f7ef] sm:text-lg">
                {priceFormatter.format(product.price)}
              </span>

              {product.compareAtPrice &&
                product.compareAtPrice > product.price && (
                  <span className="text-[9px] font-semibold text-[#697067] line-through sm:text-[11px]">
                    {priceFormatter.format(product.compareAtPrice)}
                  </span>
                )}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {product.rating !== undefined && (
                <div className="flex items-center gap-1">
                  <Star
                    aria-hidden="true"
                    className="size-3 fill-[#bdff11] text-[#bdff11] sm:size-3.5"
                  />

                  <span className="text-[10px] font-extrabold text-[#f4f7ef] sm:text-xs">
                    {product.rating.toFixed(1)}
                  </span>

                  <span className="hidden text-[9px] text-[#697067] sm:inline">
                    ({product.reviewCount ?? 0})
                  </span>
                </div>
              )}

              {/* Mouse/trackpad device: secondary cart action */}
              <button
                type="button"
                disabled={!isAvailable}
                onClick={handleAddToCart}
                title={
                  cartStatus === "added" ? "Added to cart" : "Add to cart"
                }
                aria-label={
                  isAvailable
                    ? cartStatus === "added"
                      ? `${product.name} added to cart`
                      : `Add ${product.name} to cart`
                    : `${product.name} is out of stock`
                }
                className={`pointer-cart-action size-9 place-items-center rounded-xl border transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bdff11] ${
                  isAvailable
                    ? cartStatus === "added"
                      ? "border-[#bdff11] bg-[#bdff11]/10 text-[#bdff11]"
                      : "border-white/15 bg-white/[0.035] text-[#d9ded5] hover:border-[#bdff11] hover:text-[#bdff11]"
                    : "cursor-not-allowed border-white/[0.06] bg-[#242824] text-[#697067]"
                }`}
              >
                {cartStatus === "added" ? (
                  <Check aria-hidden="true" size={16} strokeWidth={2.7} />
                ) : (
                  <ShoppingCart
                    aria-hidden="true"
                    size={16}
                    strokeWidth={2.3}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Touch device: permanently visible actions */}
          <div className="touch-actions mt-3 grid-cols-[minmax(0,1fr)_40px] gap-2 sm:grid-cols-[minmax(0,1fr)_44px]">
            <button
              type="button"
              disabled={!isAvailable}
              onClick={handleBuyNow}
              aria-label={
                isAvailable
                  ? `Buy ${product.name} now`
                  : `${product.name} is out of stock`
              }
              className={`flex h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl px-2 text-[11px] font-black transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bdff11] sm:h-11 sm:gap-2 sm:px-4 sm:text-sm ${
                isAvailable
                  ? "bg-[#bdff11] text-[#070908] hover:-translate-y-0.5 hover:bg-[#d1ff59] hover:shadow-[0_10px_24px_rgba(189,255,17,0.16)] active:translate-y-0"
                  : "cursor-not-allowed bg-[#394037] text-[#8f978d]"
              }`}
            >
              {isAvailable && (
                <Zap
                  aria-hidden="true"
                  className="size-3.5 fill-current sm:size-4"
                  strokeWidth={2.4}
                />
              )}

              <span className="truncate">
                {isAvailable ? "Buy now" : "Out of stock"}
              </span>
            </button>

            <button
              type="button"
              disabled={!isAvailable}
              onClick={handleAddToCart}
              title={cartStatus === "added" ? "Added to cart" : "Add to cart"}
              aria-label={
                isAvailable
                  ? cartStatus === "added"
                    ? `${product.name} added to cart`
                    : `Add ${product.name} to cart`
                  : `${product.name} is out of stock`
              }
              className={`grid h-10 w-10 place-items-center rounded-xl border transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bdff11] sm:h-11 sm:w-11 ${
                isAvailable
                  ? cartStatus === "added"
                    ? "border-[#bdff11] bg-[#bdff11]/10 text-[#bdff11]"
                    : "border-white/15 bg-white/[0.035] text-[#d9ded5] hover:border-[#bdff11] hover:text-[#bdff11]"
                  : "cursor-not-allowed border-white/[0.06] bg-[#242824] text-[#697067]"
              }`}
            >
              {cartStatus === "added" ? (
                <Check aria-hidden="true" size={17} strokeWidth={2.7} />
              ) : (
                <ShoppingCart
                  aria-hidden="true"
                  size={17}
                  strokeWidth={2.3}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .buy-now-overlay,
        .pointer-cart-action {
          display: none;
        }

        .touch-actions {
          display: grid;
        }

        @media (hover: hover) and (pointer: fine) {
          .buy-now-overlay {
            display: block;
            opacity: 0;
            transform: translateY(calc(100% + 1rem));
            transition:
              opacity 500ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
          }

          article:hover .buy-now-overlay,
          .buy-now-overlay:focus-within {
            opacity: 1;
            transform: translateY(0);
          }

          .pointer-cart-action {
            display: grid;
          }

          .touch-actions {
            display: none;
          }
        }
      `}</style>
    </article>
  );
}