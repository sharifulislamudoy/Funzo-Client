import Link from "next/link";
import { ArrowRight } from "lucide-react";

import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";

const HERO_VIDEO_URL =
  "https://res.cloudinary.com/dtelttpwx/video/upload/v1779083856/tr5oefsnnyvxxyfkob0g.webm";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-[#070908]">
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#141414] text-white">
        <video
          aria-hidden="true"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={HERO_VIDEO_URL} type="video/webm" />
        </video>

        <div className="pointer-events-none absolute inset-0 bg-black/55" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.46)_52%,rgba(0,0,0,0.2)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#070908] via-black/70 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-4 pb-28 pt-32 sm:px-6 sm:pb-32 sm:pt-36 lg:px-8 lg:pb-20 lg:pt-40">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.22em] text-white/70 sm:text-sm">
              #1 destination for RC adventures
            </p>

            <h1 className="max-w-4xl text-5xl font-black text-white md:text-7xl">
              Your Favorite RC Cars and Gadgets
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-white/80 sm:text-lg sm:leading-8">
              High-speed RC drift cars, off-road machines and premium racing
              gear — tested for performance and delivered across Bangladesh.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 sm:mt-9">
              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#bdff11] px-6 text-sm font-extrabold text-[#141414] transition duration-300 hover:-translate-y-0.5 hover:bg-[#aef000] hover:shadow-[0_14px_34px_rgba(189,255,17,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bdff11]"
              >
                Shop the collection
                <ArrowRight aria-hidden="true" size={18} />
              </Link>

              <Link
                href="/categories"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 bg-black/20 px-6 text-sm font-extrabold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore RC cars
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProductsSection />
    </div>
  );
}
