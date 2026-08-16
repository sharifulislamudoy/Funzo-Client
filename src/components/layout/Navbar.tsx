"use client";

import { Suspense, useCallback, useState, type ReactNode } from "react";
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
import ShopCategoryBar from "@/components/shop/ShopCategoryBar";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
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
  const className = `relative grid size-11 shrink-0 place-items-center rounded-full border transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bdff11] ${
    active
      ? "border-[#bdff11] bg-[#bdff11] text-[#070908] shadow-[0_0_24px_rgba(189,255,17,0.15)]"
      : "border-white/10 bg-white/[0.055] text-[#f4f7ef] hover:-translate-y-0.5 hover:border-[#bdff11]/45 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
  }`;

  const content = (
    <>
      {children}

      {typeof count === "number" && count > 0 && (
        <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-[#bdff11] px-1 text-[10px] font-black leading-none text-[#070908] ring-2 ring-[#0c0f0d]">
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
  const { itemCount: wishlistCount } = useWishlist();

  const isHomePage = pathname === "/";
  const isShopPage = pathname === "/shop";

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
              ? "border-white/12 bg-[#0b0e0c]/80 shadow-[0_18px_55px_rgba(0,0,0,0.38)]"
              : "border-white/10 bg-[#0b0e0c]/94 shadow-[0_18px_55px_rgba(0,0,0,0.34)]"
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
                ? "border-white/10 bg-black/20"
                : "border-white/10 bg-white/[0.045]"
            }`}
          >
            {desktopNavigation.map(({ label, href }) => {
              const active = isCurrentRoute(pathname, href);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-extrabold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bdff11] ${
                    active
                      ? "bg-[#bdff11] text-[#070908] shadow-[0_8px_24px_rgba(189,255,17,0.13)]"
                      : "text-[#a7afa5] hover:bg-white/[0.07] hover:text-white"
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
                count={wishlistCount}
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

        {isShopPage && (
          <Suspense fallback={<div className="h-[54px]" />}>
            <ShopCategoryBar />
          </Suspense>
        )}
      </header>

      {/* Non-home page content spacing */}
      <div
        aria-hidden="true"
        className={
          isHomePage
            ? "h-0 shrink-0"
            : isShopPage
              ? "h-[148px] shrink-0 sm:h-[160px]"
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
