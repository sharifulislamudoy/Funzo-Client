"use client";

import { useCallback, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";

import BrandLogo from "@/components/layout/BrandLogo";
import CartDrawer from "@/components/layout/CartDrawer";
import MenuDrawer from "@/components/layout/MenuDrawer";
import { useCart } from "@/context/CartContext";
import { desktopNavigation } from "@/data/navigation";

function isCurrentRoute(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

type RoundActionProps = {
  label: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
  href?: string;
  children: ReactNode;
};

function RoundAction({
  label,
  count,
  active = false,
  onClick,
  href,
  children,
}: RoundActionProps) {
  const className = `relative grid size-11 shrink-0 place-items-center rounded-full border transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414] ${
    active
      ? "border-[#141414] bg-[#141414] text-white"
      : "border-zinc-200 bg-white text-[#141414] hover:-translate-y-0.5 hover:border-[#141414]/35 hover:bg-[#f5f6f1] hover:shadow-md"
  }`;

  const content = (
    <>
      {children}

      {typeof count === "number" && count > 0 && (
        <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#bdff11] px-1 text-[10px] font-black leading-none text-[#141414] ring-2 ring-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={label}
        className={className}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={className}
    >
      {content}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { itemCount } = useCart();

  const isHomePage = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  return (
    <>
      <header
        className={
          isHomePage
            ? "absolute inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 lg:px-8"
            : "sticky top-0 z-50 border-b border-zinc-200/80 bg-white"
        }
      >
        <div
          className={`mx-auto grid w-full max-w-7xl grid-cols-[48px_minmax(0,1fr)_48px] items-center transition-all duration-300 lg:grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)] ${
            isHomePage
              ? "h-[62px] rounded-full border border-white/70 bg-white/88 px-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:h-[68px] sm:px-4 lg:px-5"
              : "h-[70px] px-4 sm:h-[76px] sm:px-6 lg:px-8"
          }`}
        >
          {/* Left side */}
          <div className="flex min-w-0 items-center gap-3 lg:gap-4">
            <RoundAction
              label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu
                aria-hidden="true"
                size={21}
                strokeWidth={2.4}
              />
            </RoundAction>

            {/* Desktop logo */}
            <div className="hidden lg:block">
              <BrandLogo />
            </div>
          </div>

          {/* Mobile and tablet centered logo */}
          <div className="flex min-w-0 justify-center lg:hidden">
            <BrandLogo />
          </div>

          {/* Desktop middle navigation */}
          <nav
            aria-label="Primary navigation"
            className={`hidden items-center gap-1 rounded-full border p-1.5 lg:flex ${
              isHomePage
                ? "border-black/10 bg-white/55"
                : "border-zinc-200 bg-[#f7f8f4]"
            }`}
          >
            {desktopNavigation.map(({ label, href }) => {
              const active = isCurrentRoute(pathname, href);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-extrabold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141414] ${
                    active
                      ? "bg-[#141414] text-white shadow-sm"
                      : "text-zinc-600 hover:bg-white hover:text-[#141414]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex justify-end gap-2">
            <div className="hidden gap-2 lg:flex">
              <RoundAction
                label="Wishlist"
                href="/wishlist"
                active={isCurrentRoute(pathname, "/wishlist")}
              >
                <Heart
                  aria-hidden="true"
                  size={19}
                  strokeWidth={2.2}
                />
              </RoundAction>

              <RoundAction
                label="Orders"
                href="/orders"
                active={isCurrentRoute(pathname, "/orders")}
              >
                <PackageCheck
                  aria-hidden="true"
                  size={19}
                  strokeWidth={2.2}
                />
              </RoundAction>
            </div>

            <RoundAction
              label={`Open cart with ${itemCount} items`}
              count={itemCount}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingCart
                aria-hidden="true"
                size={19}
                strokeWidth={2.3}
              />
            </RoundAction>
          </div>
        </div>
      </header>

      <MenuDrawer
        open={menuOpen}
        onClose={closeMenu}
      />

      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
      />
    </>
  );
}