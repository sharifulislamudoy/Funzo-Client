"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, PackageOpen, Plus, ShoppingBag, Trash2 } from "lucide-react";

import Drawer from "@/components/layout/Drawer";
import { useCart } from "@/context/CartContext";

type CartDrawerProps = { open: boolean; onClose: () => void };

function formatPrice(price: number) {
  return `৳${new Intl.NumberFormat("en-BD", { maximumFractionDigits: 0 }).format(price)}`;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, itemCount, subtotal, removeItem, setQuantity, clearCart } = useCart();

  return (
    <Drawer open={open} side="right" title={`Your cart (${itemCount})`} onClose={onClose}>
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="relative grid size-24 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-[#f4f7ef]">
            <ShoppingBag aria-hidden="true" size={38} strokeWidth={1.8} />
            <span className="absolute right-1 top-1 size-6 rounded-full bg-[#bdff11]" />
          </span>
          <h3 className="mt-6 text-xl font-black tracking-tight text-[#f4f7ef]">Your cart is ready to race</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-[#9ba39a]">
            Add your favourite RC cars and accessories. They will appear here.
          </p>
          <Link
            href="/shop"
            onClick={onClose}
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#bdff11] px-6 text-sm font-extrabold text-[#070908] transition duration-300 hover:-translate-y-0.5 hover:bg-[#d0ff55] hover:shadow-[0_14px_34px_rgba(189,255,17,0.16)]"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-5 sm:px-6">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-[#747c73]">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-extrabold text-[#8f978d] underline-offset-4 transition hover:text-red-400 hover:underline"
              >
                Clear cart
              </button>
            </div>

            {items.map((item) => (
              <article key={item.id} className="grid grid-cols-[76px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3">
                <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-[#151915] text-[#747c73]">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill sizes="76px" className="object-cover" />
                  ) : (
                    <PackageOpen aria-hidden="true" size={28} />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-[#f4f7ef]">{item.name}</h3>
                      <p className="mt-1 text-sm font-black text-[#bdff11]">{formatPrice(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="grid size-8 shrink-0 place-items-center rounded-full text-[#747c73] transition hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 aria-hidden="true" size={16} />
                    </button>
                  </div>
                  <div className="mt-3 inline-flex items-center rounded-full border border-white/10 bg-black/20 p-0.5">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease ${item.name} quantity`}
                      className="grid size-7 place-items-center rounded-full transition hover:bg-white/10"
                    >
                      <Minus aria-hidden="true" size={13} />
                    </button>
                    <span className="w-7 text-center text-xs font-black">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase ${item.name} quantity`}
                      className="grid size-7 place-items-center rounded-full transition hover:bg-[#bdff11]"
                    >
                      <Plus aria-hidden="true" size={13} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="shrink-0 border-t border-white/10 bg-[#0e110f] p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#747c73]">Subtotal</p>
                <p className="mt-1 text-xs text-[#9ba39a]">Shipping calculated at checkout</p>
              </div>
              <strong className="text-xl font-black text-[#f4f7ef]">{formatPrice(subtotal)}</strong>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#bdff11] text-sm font-black text-[#141414] transition duration-300 hover:-translate-y-0.5 hover:bg-[#aef000] hover:shadow-lg"
            >
              Proceed to checkout
            </Link>
          </div>
        </>
      )}
    </Drawer>
  );
}
