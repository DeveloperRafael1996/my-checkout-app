import { Inter } from "next/font/google";

import "./globals.css";
import { Providers } from "./providers";
import type { Metadata } from "next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pay Belity",
  description:
    "Pay Belity is a payment solution that allows you to pay your bills in a secure way.",
  robots: {
    index: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Pay Belity</title>
        <Script
          src={process.env.NEXT_PUBLIC_CHECKOUT_SCRIPT}
          strategy="beforeInteractive"
        ></Script>
      </head>
      <body className={`${inter.className} bg-primary`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
