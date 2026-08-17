import { Suspense } from "react";

import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata = {
  title: "Checkout | Funzo",
  description: "Complete your Funzo RC car order.",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070908]" />}>
      <CheckoutContent />
    </Suspense>
  );
}