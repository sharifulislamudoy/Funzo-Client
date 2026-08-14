"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { bottomNavigation } from "@/data/navigation";

function isCurrentRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 px-2 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-12px_35px_rgba(20,20,20,0.08)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto grid max-w-xl grid-cols-5">
        {bottomNavigation.map(({ label, href, icon: Icon }) => {
          const active = isCurrentRoute(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              className={`group relative flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-extrabold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#141414] sm:text-[11px] ${
                active ? "text-[#141414]" : "text-zinc-400 hover:text-[#141414]"
              }`}
            >
              <span className={`absolute top-0 h-1 rounded-full bg-[#bdff11] transition-all duration-300 ${active ? "w-7 opacity-100" : "w-0 opacity-0"}`} />
              <span className={`grid size-7 place-items-center rounded-full transition duration-300 ${active ? "-translate-y-0.5 bg-[#bdff11]" : "group-hover:-translate-y-0.5"}`}>
                <Icon aria-hidden="true" size={19} strokeWidth={active ? 2.6 : 2.1} />
              </span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
