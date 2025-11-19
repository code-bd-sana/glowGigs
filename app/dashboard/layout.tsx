import type { Metadata } from "next";

import "../globals.css";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Noir font


export const metadata: Metadata = {
  title: "Glow Gigs",
  description: " ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>

        <DashboardLayout>

                  {children}

        </DashboardLayout>
 

  
      
        </body>
    </html>
  );
}
