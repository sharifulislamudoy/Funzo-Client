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
      className="relative overflow-hidden bg-[#070908] py-12 sm:py-16 lg:py-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,80rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute -right-40 top-20 size-96 rounded-full bg-[#bdff11]/5 blur-3xl" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
          <div className="max-w-2xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#bdff11] sm:text-xs">
              Handpicked by Funzo
            </p>
            <h2
              id="featured-products-title"
              className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#f4f7ef] sm:text-4xl lg:text-5xl"
            >
              Featured RC machines
            </h2>
            <p className="mt-3 hidden max-w-xl text-sm leading-6 text-[#9ba39a] sm:block sm:text-base">
              Discover the standout cars selected for speed, control and serious
              fun.
            </p>
          </div>

          <Link
            href="/shop"
            className="group inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-4 text-xs font-extrabold text-[#f4f7ef] transition duration-300 hover:-translate-y-0.5 hover:border-[#bdff11] hover:bg-[#bdff11] hover:text-[#070908] sm:h-11 sm:gap-2 sm:px-5 sm:text-sm"
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
