"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { productCategories } from "@/data/productCategories";

export default function ShopCategoryBar() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";

  return (
    <div className="pointer-events-auto mx-auto mt-2 w-[calc(100%-1.5rem)] max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e0c]/95 shadow-[0_14px_38px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:w-[calc(100%-2.5rem)] lg:w-[calc(100%-4rem)]">
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
                  ? "border-[#bdff11] bg-[#bdff11] text-[#070908] shadow-[0_8px_22px_rgba(189,255,17,0.12)]"
                  : "border-white/10 bg-white/[0.035] text-[#8f978d] hover:border-[#bdff11]/45 hover:text-[#f4f7ef]"
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
