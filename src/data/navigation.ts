import {
  CircleHelp,
  FileText,
  Heart,
  House,
  Info,
  LayoutGrid,
  LifeBuoy,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const desktopNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "Shop",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: LayoutGrid,
  },
];

export const bottomNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "Shop",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    label: "Wishlist",
    href: "/wishlist",
    icon: Heart,
  },
  {
    label: "Category",
    href: "/categories",
    icon: LayoutGrid,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: PackageCheck,
  },
];

export const drawerNavigation: NavigationItem[] = [
  {
    label: "About us",
    href: "/about-us",
    icon: Info,
  },
  {
    label: "Help & contact",
    href: "/contact-us",
    icon: LifeBuoy,
  },
  {
    label: "Common questions",
    href: "/faq",
    icon: CircleHelp,
  },
  {
    label: "Return & refund policy",
    href: "/return-refund-policy",
    icon: RotateCcw,
  },
  {
    label: "Delivery information",
    href: "/delivery-information",
    icon: Truck,
  },
  {
    label: "Privacy policy",
    href: "/privacy-policy",
    icon: ShieldCheck,
  },
  {
    label: "Terms & conditions",
    href: "/terms-and-conditions",
    icon: FileText,
  },
];