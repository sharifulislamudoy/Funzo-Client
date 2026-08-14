import Link from "next/link";
import { ArrowRight, Gauge, Radio, Trophy } from "lucide-react";

const highlights = [
  { icon: Gauge, label: "Performance ready" },
  { icon: Radio, label: "Total control" },
  { icon: Trophy, label: "Built to compete" },
];

export default function HomePage() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7f8f4]">
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#bdff11]/35 blur-3xl" />
      <div className="mx-auto grid min-h-[calc(100vh-76px)] w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="relative z-10 max-w-3xl">
          <p className="mb-5 inline-flex rounded-full border border-[#141414]/10 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#141414] shadow-sm">
            Fun powered by speed
          </p>
          <h1 className="text-5xl font-black leading-[0.94] tracking-[-0.055em] text-[#141414] sm:text-6xl lg:text-8xl">
            Take control.
            <span className="block text-[#78a800]">Own the track.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-zinc-600 sm:text-lg">
            Discover RC cars, off-road machines, drift builds and racing gear
            engineered for every kind of fun.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#141414] px-6 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#2a2a2a] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414]"
            >
              Shop now
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              href="/categories"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#141414]/15 bg-white px-6 text-sm font-extrabold text-[#141414] transition duration-300 hover:-translate-y-0.5 hover:border-[#141414]/35"
            >
              Explore categories
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4">
            {highlights.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-bold text-zinc-700">
                <span className="grid size-8 place-items-center rounded-full bg-[#bdff11] text-[#141414]">
                  <Icon aria-hidden="true" size={16} strokeWidth={2.4} />
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-lg items-center justify-center rounded-[3rem] bg-[#141414] p-10 shadow-[0_35px_90px_rgba(20,20,20,0.24)]">
          <div className="absolute inset-6 rounded-[2.4rem] border border-white/10" />
          <div className="absolute left-10 top-10 h-3 w-28 -skew-x-12 rounded-full bg-[#bdff11]" />
          <p className="relative text-center text-6xl font-black uppercase italic tracking-[-0.07em] text-white sm:text-7xl">
            Ready.
            <span className="block text-[#bdff11]">Set. Go!</span>
          </p>
        </div>
      </div>
    </section>
  );
}
