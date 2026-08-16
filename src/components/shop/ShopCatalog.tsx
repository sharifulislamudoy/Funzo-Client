"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";

import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/featuredProducts";

export default function ShopCatalog() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const [query, setQuery] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "all" || product.categorySlug === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.shortDescription.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="bg-white pb-16 sm:pb-20">
      <section className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
        <div className="relative isolate min-h-[210px] overflow-hidden rounded-[26px] bg-[#141414] sm:min-h-[285px] lg:min-h-[330px]">
          <img
            src={products[0].images[1]}
            alt="Featured RC car collection"
            className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          <div className="relative flex min-h-[210px] max-w-2xl flex-col justify-center p-6 text-white sm:min-h-[285px] sm:p-10 lg:min-h-[330px] lg:p-14">
            <span className="mb-3 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#bdff11] sm:text-xs">
              <Sparkles size={15} aria-hidden="true" />
              Built for serious fun
            </span>
            <h1 className="text-3xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Grab your next RC car.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-white/75 sm:text-base">
              Brushless speed, precise control and trail-ready durability—picked for RC drivers in Bangladesh.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="shop-title" className="mx-auto w-full max-w-7xl px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#78a800]">Shop</p>
        <h2 id="shop-title" className="mt-2 text-4xl font-black tracking-[-0.045em] text-[#141414] sm:text-5xl lg:text-6xl">
          Everything in one place.
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-500 sm:text-base">
          Free delivery across Bangladesh, cash on delivery available, easy returns.
        </p>

        <label className="relative mt-7 block max-w-md">
          <Search aria-hidden="true" size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className="h-12 w-full rounded-full border border-zinc-300 bg-white pl-12 pr-5 text-sm text-[#141414] outline-none transition placeholder:text-zinc-400 focus:border-[#141414] focus:ring-4 focus:ring-[#bdff11]/20"
          />
        </label>

        <p className="mt-5 text-sm font-semibold text-zinc-500">
          {visibleProducts.length} {visibleProducts.length === 1 ? "product" : "products"}
        </p>

        {visibleProducts.length > 0 ? (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-7 rounded-[24px] border border-dashed border-zinc-300 bg-[#f7f8f4] px-6 py-16 text-center">
            <h3 className="text-xl font-black text-[#141414]">No RC cars found</h3>
            <p className="mt-2 text-sm text-zinc-500">Try another search or choose a different category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
