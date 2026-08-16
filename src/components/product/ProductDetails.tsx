"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { Check, Heart, Minus, Plus, ShoppingCart, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { FunzoProduct } from "@/types/product";

const specificationLabels: Array<[keyof FunzoProduct["specifications"], string]> = [
  ["scale", "Scale"],
  ["drive", "Drive"],
  ["motor", "Motor"],
  ["esc", "ESC"],
  ["battery", "Battery"],
  ["topSpeed", "Top Speed"],
  ["radio", "Radio"],
  ["tires", "Tires"],
  ["weight", "Weight"],
  ["suspension", "Suspension"],
  ["drivetrain", "Drivetrain"],
  ["wheelieBar", "Wheelie Bar"],
];

export default function ProductDetails({ product }: { product: FunzoProduct }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const formatter = useMemo(
    () => new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT", currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 }),
    [],
  );

  function addToCart() {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] }, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  function buyNow() {
    addToCart();
    router.push("/checkout");
  }

  return (
    <section className="bg-[#070908] py-6 sm:py-10 lg:py-14">
      <div className="mx-auto grid w-full max-w-7xl gap-9 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#151915] shadow-[0_24px_65px_rgba(0,0,0,0.3)]">
            <img src={activeImage} alt={product.name} className="h-full w-full object-cover" />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-[#141414] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white">
                {product.badge}
              </span>
            )}
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(image)}
                aria-label={`View ${product.name} image ${index + 1}`}
                className={`size-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-[#151915] transition sm:size-24 ${activeImage === image ? "border-[#bdff11]" : "border-white/[0.08] hover:border-white/30"}`}
              >
                <img src={image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:pt-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#bdff11]">{product.category}</p>
              <h1 className="mt-2 text-3xl font-black leading-tight tracking-[-0.04em] text-[#f4f7ef] sm:text-4xl lg:text-5xl">{product.name}</h1>
            </div>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wishlisted}
              className={`grid size-12 shrink-0 place-items-center rounded-full border transition duration-300 ${wishlisted ? "border-[#bdff11] bg-[#bdff11] text-[#070908]" : "border-white/10 bg-white/[0.04] text-[#f4f7ef] hover:border-[#bdff11] hover:text-[#bdff11]"}`}
            >
              <Heart size={20} className={wishlisted ? "fill-current" : ""} />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-black text-[#f4f7ef]">{formatter.format(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-base font-semibold text-[#697067] line-through">{formatter.format(product.compareAtPrice)}</span>
            )}
          </div>

          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-2 text-xs font-extrabold text-emerald-300">
            <Truck size={16} aria-hidden="true" /> Free delivery
          </span>

          <p className="mt-6 text-sm leading-7 text-[#a7afa5] sm:text-base">{product.description}</p>

          <dl className="mt-6 grid gap-x-6 gap-y-2 rounded-[24px] border border-white/[0.08] bg-[#101310] p-5 sm:grid-cols-2 sm:p-6">
            {specificationLabels.map(([key, label]) => (
              <div key={key} className="flex items-start justify-between gap-3 border-b border-white/[0.08] py-2 text-sm sm:block">
                <dt className="font-bold text-[#747c73]">{label}</dt>
                <dd className="text-right font-extrabold text-[#f4f7ef] sm:mt-1 sm:text-left">{product.specifications[key]}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-y border-white/[0.08] py-5 text-xs font-semibold text-[#a7afa5] sm:text-sm">
            {["Free delivery in BD", "Cash on delivery", "7-day easy returns", "WhatsApp support"].map((benefit) => (
              <span key={benefit} className="flex items-center gap-2"><Check size={15} className="text-[#bdff11]" />{benefit}</span>
            ))}
          </div>

          <div className="mt-6 flex w-fit items-center rounded-full border border-white/10 bg-white/[0.035] p-1">
            <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label="Decrease quantity" className="grid size-9 place-items-center rounded-full transition hover:bg-white/10"><Minus size={16} /></button>
            <span className="w-10 text-center text-sm font-black">{quantity}</span>
            <button type="button" onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))} aria-label="Increase quantity" className="grid size-9 place-items-center rounded-full transition hover:bg-[#bdff11] hover:text-[#070908]"><Plus size={16} /></button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={addToCart} className="flex h-13 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-extrabold text-[#f4f7ef] transition duration-300 hover:border-[#bdff11] hover:text-[#bdff11]">
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}{added ? "Added to cart" : "Add to bag"}
            </button>
            <button type="button" onClick={buyNow} className="h-13 rounded-full bg-[#bdff11] px-6 text-sm font-extrabold text-[#070908] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d0ff55] hover:shadow-[0_14px_34px_rgba(189,255,17,0.16)]">Buy now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
