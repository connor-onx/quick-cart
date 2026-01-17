import ShoppingCartProvider from "./context/ShoppingCartContext";
import ThemeProvider from "./context/ThemeContext";
import CartDrawer from "../components/cart/CartDrawer";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Cart",
  description: "Kiosk shopping made quick and easy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full" lang="en">
      <body
        className={`${geistSans.variable} antialiased h-full`}
      >
        <ThemeProvider>
          <ShoppingCartProvider>
            {children}
            <CartDrawer/>
          </ShoppingCartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
