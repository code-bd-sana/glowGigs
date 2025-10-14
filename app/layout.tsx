import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";

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
    <html lang="en" className={`${noir.variable} ${lato.variable}`}>
      <body>
        <NavBar></NavBar>
        {children}
        </body>
    </html>
  );
}
