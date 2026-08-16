import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ProductCard from "@/components/product/ProductCard";
import { featuredProducts } from "@/data/featuredProducts";
import type { FunzoProduct } from "@/types/product";

type FeaturedProductsSectionProps = {
  products?: FunzoProduct[];
};

export default function FeaturedProductsSection({
  products = featuredProducts,
}: FeaturedProductsSectionProps) {
  const adminFeaturedProducts = products
    .filter((product) => product.isFeatured)
    .slice(0, 8);

  if (adminFeaturedProducts.length === 0) return null;

  return (
    <section
      aria-labelledby="featured-products-title"
      className="bg-white py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
          <div className="max-w-2xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#78a800] sm:text-xs">
              Handpicked by Funzo
            </p>
            <h2
              id="featured-products-title"
              className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#141414] sm:text-4xl lg:text-5xl"
            >
              Featured RC machines
            </h2>
            <p className="mt-3 hidden max-w-xl text-sm leading-6 text-zinc-500 sm:block sm:text-base">
              Discover the standout cars selected for speed, control and serious
              fun.
            </p>
          </div>

          <Link
            href="/shop"
            className="group inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 text-xs font-extrabold text-[#141414] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#141414] hover:bg-[#141414] hover:text-white sm:h-11 sm:gap-2 sm:px-5 sm:text-sm"
          >
            View all
            <ArrowRight
              aria-hidden="true"
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
          {adminFeaturedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
