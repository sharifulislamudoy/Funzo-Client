import type { Metadata } from "next";
import { Baloo_Da_2, Exo_2 } from "next/font/google";

import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  display: "swap",
});

const balooDa2 = Baloo_Da_2({
  variable: "--font-baloo-da-2",
  subsets: ["bengali", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Funzo",
    template: "%s | Funzo",
  },
  description:
    "RC cars, racing toys, accessories and more from Funzo.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${exo2.variable} ${balooDa2.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-[#070908] font-sans text-[#f4f7ef]"
      >
        {children}
      </body>
    </html>
  );
}
