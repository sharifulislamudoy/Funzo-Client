import { Suspense } from "react";

import ShopCatalog from "@/components/shop/ShopCatalog";

export const metadata = {
  title: "Shop RC Cars | Funzo",
  description: "Shop Funzo RC drift cars, crawlers, racers and off-road trucks.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070908]" />}>
      <ShopCatalog />
    </Suspense>
  );
}
