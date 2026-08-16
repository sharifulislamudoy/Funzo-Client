"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Headphones } from "lucide-react";

import BrandLogo from "@/components/layout/BrandLogo";
import Drawer from "@/components/layout/Drawer";
import { drawerNavigation } from "@/data/navigation";

type MenuDrawerProps = { open: boolean; onClose: () => void };

function isCurrentRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const pathname = usePathname();

  return (
    <Drawer open={open} side="left" title="Explore Funzo" onClose={onClose}>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-6 sm:px-6">
        <BrandLogo onClick={onClose} className="my-6 self-start" />
        <nav aria-label="Information navigation" className="space-y-1.5">
          {drawerNavigation.map(({ label, href, icon: Icon }) => {
            const active = isCurrentRoute(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`group flex min-h-12 items-center gap-3 rounded-2xl px-3.5 text-sm font-bold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bdff11] ${
                  active
                    ? "bg-[#bdff11] text-[#070908]"
                    : "text-[#a7afa5] hover:translate-x-1 hover:bg-white/[0.06] hover:text-[#f4f7ef]"
                }`}
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-xl transition-colors ${
                  active
                    ? "bg-[#bdff11] text-[#141414]"
                    : "bg-white/[0.055] text-[#9ba39a] group-hover:bg-[#bdff11] group-hover:text-[#070908]"
                }`}>
                  <Icon aria-hidden="true" size={17} strokeWidth={2.2} />
                </span>
                <span className="flex-1">{label}</span>
                <ArrowUpRight aria-hidden="true" size={16} className="opacity-35 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-8">
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-[#bdff11] p-4 text-[#141414]">
            <Headphones aria-hidden="true" size={21} strokeWidth={2.4} />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest opacity-65">Need help?</p>
              <p className="mt-0.5 text-sm font-black">We are here for you</p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
