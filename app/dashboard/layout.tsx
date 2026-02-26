import DashboardLayout from "@/components/layout/DashboardLayout";
import "../globals.css";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
