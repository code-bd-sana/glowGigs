"use client";

import React, { ReactNode } from "react";

import DashboardNavbar from "../shared/DashboardNavbar";
import Sidebar from "./SideBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />   
      <main className="flex-1">
        <DashboardNavbar />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
