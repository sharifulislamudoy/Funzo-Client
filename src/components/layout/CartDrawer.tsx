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
          <span className="relative grid size-24 place-items-center rounded-full bg-[#f3f4ef] text-[#141414]">
            <ShoppingBag aria-hidden="true" size={38} strokeWidth={1.8} />
            <span className="absolute right-1 top-1 size-6 rounded-full bg-[#bdff11]" />
          </span>
          <h3 className="mt-6 text-xl font-black tracking-tight text-[#141414]">Your cart is ready to race</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
            Add your favourite RC cars and accessories. They will appear here.
          </p>
          <Link
            href="/shop"
            onClick={onClose}
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#141414] px-6 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#2a2a2a] hover:shadow-lg"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-5 sm:px-6">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-extrabold text-zinc-500 underline-offset-4 transition hover:text-red-600 hover:underline"
              >
                Clear cart
              </button>
            </div>

            {items.map((item) => (
              <article key={item.id} className="grid grid-cols-[76px_1fr] gap-3 rounded-2xl border border-zinc-200 p-3">
                <div className="relative grid aspect-square place-items-center overflow-hidden rounded-xl bg-[#f3f4ef] text-zinc-400">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill sizes="76px" className="object-cover" />
                  ) : (
                    <PackageOpen aria-hidden="true" size={28} />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-[#141414]">{item.name}</h3>
                      <p className="mt-1 text-sm font-black text-[#78a800]">{formatPrice(item.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="grid size-8 shrink-0 place-items-center rounded-full text-zinc-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 aria-hidden="true" size={16} />
                    </button>
                  </div>
                  <div className="mt-3 inline-flex items-center rounded-full border border-zinc-200 p-0.5">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease ${item.name} quantity`}
                      className="grid size-7 place-items-center rounded-full transition hover:bg-zinc-100"
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

          <div className="shrink-0 border-t border-zinc-200 bg-white p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Subtotal</p>
                <p className="mt-1 text-xs text-zinc-500">Shipping calculated at checkout</p>
              </div>
              <strong className="text-xl font-black text-[#141414]">{formatPrice(subtotal)}</strong>
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
