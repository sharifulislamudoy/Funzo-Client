"use client";

import { useMemo, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, LockKeyhole, ShoppingBag } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { getProductBySlug } from "@/data/featuredProducts";
import type { CartItem } from "@/types/cart";

const DELIVERY_CHARGE = 120;

function formatPrice(price: number) {
  return `৳${new Intl.NumberFormat("en-BD", {
    maximumFractionDigits: 0,
  }).format(price)}`;
}

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const { items: cartItems, isReady, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const isDirectCheckout = searchParams.get("mode") === "buy-now";
  const productSlug = searchParams.get("product") ?? "";
  const requestedQuantity = Number.parseInt(
    searchParams.get("quantity") ?? "1",
    10,
  );

  const directProduct = isDirectCheckout
    ? getProductBySlug(productSlug)
    : undefined;

  const checkoutItems = useMemo<CartItem[]>(() => {
    if (!isDirectCheckout) return cartItems;
    if (!directProduct || directProduct.stock <= 0) return [];

    const safeQuantity = Math.min(
      directProduct.stock,
      Number.isFinite(requestedQuantity) && requestedQuantity > 0
        ? requestedQuantity
        : 1,
    );

    return [
      {
        id: directProduct.id,
        name: directProduct.name,
        price: directProduct.price,
        image: directProduct.images[0],
        quantity: safeQuantity,
      },
    ];
  }, [cartItems, directProduct, isDirectCheckout, requestedQuantity]);

  const subtotal = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = subtotal + DELIVERY_CHARGE;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const orderPayload = {
      checkoutMode: isDirectCheckout ? "BUY_NOW" : "CART",
      customer: {
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email: String(formData.get("email") ?? ""),
        address: String(formData.get("address") ?? ""),
        area: String(formData.get("area") ?? ""),
        city: String(formData.get("city") ?? ""),
        note: String(formData.get("note") ?? ""),
      },
      paymentMethod: "CASH_ON_DELIVERY",
      items: checkoutItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    // Send orderPayload to your NestJS order endpoint here.
    // Never send or trust product prices from the browser in production.
    console.info("Funzo order payload", orderPayload);

    if (!isDirectCheckout) clearCart();
    setOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!isDirectCheckout && !isReady) {
    return (
      <section className="grid min-h-[60vh] place-items-center bg-[#070908] px-4">
        <div className="size-9 animate-spin rounded-full border-2 border-white/15 border-t-[#bdff11]" />
      </section>
    );
  }

  if (orderPlaced) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-[#070908] px-4 py-16">
        <div className="w-full max-w-lg rounded-[28px] border border-[#bdff11]/25 bg-[#101310] p-7 text-center shadow-[0_24px_70px_rgba(0,0,0,0.36)] sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#bdff11] text-[#070908]">
            <CheckCircle2 size={32} aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-2xl font-black text-[#f4f7ef] sm:text-3xl">
            Order details are ready
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#9ba39a]">
            The direct checkout flow is complete. Connect the marked submit
            handler to your NestJS order API to save and process the order.
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#bdff11] px-7 text-sm font-black text-[#070908] transition hover:bg-[#d0ff55]"
          >
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-[#070908] px-4 py-16">
        <div className="w-full max-w-lg rounded-[28px] border border-white/[0.09] bg-[#101310] p-7 text-center sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#f4f7ef]">
            <ShoppingBag size={29} aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-2xl font-black text-[#f4f7ef]">
            Nothing to checkout
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#9ba39a]">
            {isDirectCheckout
              ? "This product is unavailable or the checkout link is invalid."
              : "Your cart is currently empty."}
          </p>
          <Link
            href="/shop"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#bdff11] px-7 text-sm font-black text-[#070908]"
          >
            Browse products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#070908] py-7 sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href={isDirectCheckout && directProduct ? `/products/${directProduct.slug}` : "/shop"}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#9ba39a] transition hover:text-[#bdff11]"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to shopping
        </Link>

        <div className="mt-5">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#bdff11]">
            {isDirectCheckout ? "Direct purchase" : "Cart checkout"}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-[-0.035em] text-[#f4f7ef] sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-[#9ba39a]">
            {isDirectCheckout
              ? "Only your selected product will be ordered. Your cart stays unchanged."
              : "Review your cart and enter the delivery information."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10"
        >
          <div className="rounded-[26px] border border-white/[0.09] bg-[#101310] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black text-[#f4f7ef]">
                Delivery information
              </h2>
              <LockKeyhole size={19} className="text-[#bdff11]" aria-hidden="true" />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold text-[#a7afa5]">
                Full name
                <input name="name" required autoComplete="name" className="h-12 rounded-xl border border-white/10 bg-[#080a09] px-4 text-sm text-[#f4f7ef] outline-none transition placeholder:text-[#5f665e] focus:border-[#bdff11]" placeholder="Your full name" />
              </label>
              <label className="grid gap-2 text-xs font-bold text-[#a7afa5]">
                Phone number
                <input name="phone" required inputMode="tel" autoComplete="tel" pattern="01[3-9][0-9]{8}" className="h-12 rounded-xl border border-white/10 bg-[#080a09] px-4 text-sm text-[#f4f7ef] outline-none transition placeholder:text-[#5f665e] focus:border-[#bdff11]" placeholder="01XXXXXXXXX" />
              </label>
              <label className="grid gap-2 text-xs font-bold text-[#a7afa5] sm:col-span-2">
                Email address <span className="font-normal text-[#697067]">(optional)</span>
                <input name="email" type="email" autoComplete="email" className="h-12 rounded-xl border border-white/10 bg-[#080a09] px-4 text-sm text-[#f4f7ef] outline-none transition placeholder:text-[#5f665e] focus:border-[#bdff11]" placeholder="you@example.com" />
              </label>
              <label className="grid gap-2 text-xs font-bold text-[#a7afa5] sm:col-span-2">
                Full delivery address
                <textarea name="address" required autoComplete="street-address" rows={3} className="resize-none rounded-xl border border-white/10 bg-[#080a09] px-4 py-3 text-sm text-[#f4f7ef] outline-none transition placeholder:text-[#5f665e] focus:border-[#bdff11]" placeholder="House, road, area and nearby landmark" />
              </label>
              <label className="grid gap-2 text-xs font-bold text-[#a7afa5]">
                Area
                <input name="area" required className="h-12 rounded-xl border border-white/10 bg-[#080a09] px-4 text-sm text-[#f4f7ef] outline-none transition placeholder:text-[#5f665e] focus:border-[#bdff11]" placeholder="Your area" />
              </label>
              <label className="grid gap-2 text-xs font-bold text-[#a7afa5]">
                City
                <input name="city" required autoComplete="address-level2" className="h-12 rounded-xl border border-white/10 bg-[#080a09] px-4 text-sm text-[#f4f7ef] outline-none transition placeholder:text-[#5f665e] focus:border-[#bdff11]" placeholder="Dhaka" />
              </label>
              <label className="grid gap-2 text-xs font-bold text-[#a7afa5] sm:col-span-2">
                Order note <span className="font-normal text-[#697067]">(optional)</span>
                <textarea name="note" rows={3} className="resize-none rounded-xl border border-white/10 bg-[#080a09] px-4 py-3 text-sm text-[#f4f7ef] outline-none transition placeholder:text-[#5f665e] focus:border-[#bdff11]" placeholder="Special delivery instructions" />
              </label>
            </div>

            <div className="mt-6 rounded-2xl border border-[#bdff11]/25 bg-[#bdff11]/[0.055] p-4">
              <p className="text-sm font-black text-[#f4f7ef]">Cash on delivery</p>
              <p className="mt-1 text-xs leading-5 text-[#9ba39a]">
                Pay the courier after receiving your order.
              </p>
            </div>
          </div>

          <aside className="rounded-[26px] border border-white/[0.09] bg-[#101310] p-5 lg:sticky lg:top-24 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-[#f4f7ef]">Order summary</h2>
              <span className="rounded-full bg-[#bdff11]/10 px-2.5 py-1 text-[10px] font-extrabold text-[#bdff11]">
                {checkoutItems.reduce((totalItems, item) => totalItems + item.quantity, 0)} items
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {checkoutItems.map((item) => (
                <article key={item.id} className="grid grid-cols-[68px_1fr] gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-[#171b17]">
                    {item.image && <Image src={item.image} alt={item.name} fill sizes="68px" className="object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-[#f4f7ef]">{item.name}</h3>
                    <div className="mt-2 flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-[#8f978d]">Qty: {item.quantity}</span>
                      <span className="font-black text-[#bdff11]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <dl className="mt-5 space-y-3 border-t border-white/[0.09] pt-5 text-sm">
              <div className="flex items-center justify-between gap-3 text-[#9ba39a]">
                <dt>Subtotal</dt>
                <dd className="font-bold text-[#f4f7ef]">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 text-[#9ba39a]">
                <dt>Delivery</dt>
                <dd className="font-bold text-[#f4f7ef]">{formatPrice(DELIVERY_CHARGE)}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/[0.09] pt-4">
                <dt className="font-black text-[#f4f7ef]">Total</dt>
                <dd className="text-xl font-black text-[#bdff11]">{formatPrice(total)}</dd>
              </div>
            </dl>

            <button type="submit" className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#bdff11] px-6 text-sm font-black text-[#070908] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d0ff55] hover:shadow-[0_14px_34px_rgba(189,255,17,0.16)]">
              Confirm order
              <CheckCircle2 size={18} aria-hidden="true" />
            </button>

            <p className="mt-3 text-center text-[10px] leading-4 text-[#697067]">
              Product price and stock must be revalidated by your backend before
              creating the order.
            </p>
          </aside>
        </form>
      </div>
    </section>
  );
}