import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Caveat, Patrick_Hand, DM_Sans } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patrick-hand",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'ESPS PTA - Coming Soon',
  description: 'ESPS PTA website coming soon',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${caveat.variable} ${patrickHand.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
