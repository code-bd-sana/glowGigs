import type { Metadata } from "next";
import localFont from "next/font/local";



// Noir font


// Lato font

export const metadata: Metadata = {
  title: "Glow Gigs",
  description: " ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" >
      <body>
     
        {children}
  
        </body>
    </html>
  );
}
