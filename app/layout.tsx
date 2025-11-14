import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "./provider/ReduxProvider";
import SupportChat from "@/components/SupportChat/SupportChat";

import { Toaster } from "react-hot-toast";
// Noir font
const noir = localFont({
  src: "../public/NOIRetBLANC-Regular.woff2",
  variable: "--font-noir",
  weight: "400",
  style: "normal",
  display: "swap",
});

// Lato font
const lato = localFont({
  src: "../public/Lato-Regular.ttf",
  variable: "--font-lato",
  weight: "400",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glow Gigs",
  description: " ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={`${noir.variable} ${lato.variable}`}>
      <body>
        <ReduxProvider>
          <NavBar />
          {children}
          <SupportChat />
          <Footer />
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
