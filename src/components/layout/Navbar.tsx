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
  return href === "/"
    ? pathname === "/"
    : pathname.startsWith(href);
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={`pointer-events-auto relative mx-auto mt-3 grid h-[62px] w-[calc(100%-1.5rem)] max-w-7xl grid-cols-[48px_minmax(0,1fr)_48px] items-center rounded-full border px-2.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:mt-4 sm:h-[68px] sm:w-[calc(100%-2.5rem)] sm:px-4 lg:w-[calc(100%-4rem)] lg:grid-cols-[minmax(220px,1fr)_auto_minmax(220px,1fr)] lg:px-5 ${
            isHomePage
              ? "border-white/70 bg-white/88 shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
              : "border-zinc-200/90 bg-white shadow-[0_12px_35px_rgba(20,20,20,0.1)]"
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

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className={`hidden items-center gap-1 rounded-full border p-1.5 transition-[background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:flex ${
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
                active={isCurrentRoute(
                  pathname,
                  "/wishlist",
                )}
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
                active={isCurrentRoute(
                  pathname,
                  "/orders",
                )}
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

      {/* Non-home page content spacing */}
      <div
        aria-hidden="true"
        className={
          isHomePage
            ? "h-0 shrink-0"
            : "h-[86px] shrink-0 sm:h-[100px]"
        }
      />

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