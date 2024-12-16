import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PromoBanner from "@/components/sections/PromoBanner";
import Header from "@/components/sections/Header";
import NavBar from "@/components/sections/NavBar";
import React from "react";

import Footer from "@/components/sections/Footer";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Diamondock",
  description: "E-commerce Multi-vendeur",
};

const headerProps = {
  cartCount: 0,
  wishlistCount: 0,
  userCount: 0,
  totalPrice: 0.0,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Vous pouvez gérer ces valeurs avec un state manager comme Redux ou Zustand
  // ou les récupérer depuis une API

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      

        <Header
          cartCount={headerProps.cartCount}
          wishlistCount={headerProps.wishlistCount}
          userCount={headerProps.userCount}
          totalPrice={headerProps.totalPrice}
        />
        <NavBar />
       
       

        {children}
        <Footer />
      </body>
    </html>
  );
}
