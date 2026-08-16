import BottomNavigation from "@/components/layout/BottomNavigation";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

type MainLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="flex min-h-screen flex-col bg-white">
          <Navbar />
          <main className="flex flex-1 flex-col pb-20 lg:pb-0">{children}</main>
          <BottomNavigation />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
