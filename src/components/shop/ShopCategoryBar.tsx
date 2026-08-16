"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { productCategories } from "@/data/productCategories";

export default function ShopCategoryBar() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";

  return (
    <div className="pointer-events-auto mx-auto mt-2 w-[calc(100%-1.5rem)] max-w-7xl overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 shadow-[0_10px_30px_rgba(20,20,20,0.08)] backdrop-blur-xl sm:w-[calc(100%-2.5rem)] lg:w-[calc(100%-4rem)]">
      <nav
        aria-label="Shop categories"
        className="flex gap-2 overflow-x-auto px-2.5 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-3"
      >
        {productCategories.map((category) => {
          const active = activeCategory === category.value;
          const href = category.value === "all" ? "/shop" : `/shop?category=${category.value}`;

          return (
            <Link
              key={category.value}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-extrabold transition duration-300 sm:text-sm ${
                active
                  ? "border-[#141414] bg-[#141414] text-white shadow-sm"
                  : "border-zinc-200 bg-white text-zinc-500 hover:border-[#141414]/40 hover:text-[#141414]"
              }`}
            >
              {category.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
