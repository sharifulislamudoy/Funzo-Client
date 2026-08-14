import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";

import "./globals.css";

const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
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
      className={`${exo2.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-white font-sans text-[#141414]"
      >
        {children}
      </body>
    </html>
  );
}