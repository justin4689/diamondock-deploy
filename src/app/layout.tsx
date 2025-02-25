import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from 'next/font/google'
 


import "./globals.css";

import Header from "@/components/sections/Header";
import NavBar from "@/components/sections/NavBar";
import BackToTop from "@/components/BackToTop";

import { Toaster, toast } from "sonner";

import Footer from "@/components/sections/Footer";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientSessionProvider from "@/components/ClientSessionProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import CookieConsent from "@/components/CookieConsent";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session =   await getServerSession(authOptions);

  

  return (
    <html lang="fr">
      <body
        className={`${roboto.className} ${roboto.className} font-sans relative`}
      >
        <ClientSessionProvider session={session}>
          <QueryProvider>
            <Toaster richColors position="top-right" />
            <Header {...headerProps} />
            <NavBar />
            <main className="min-h-screen">{children}</main>
            <BackToTop />
            <CookieConsent />
            <Footer />
          </QueryProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
