"use client";

import React, { ReactNode, useState } from "react";
import DashboardNavbar from "../shared/DashboardNavbar";
import Sidebar from "./SideBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex gap-4 max-w-[1920px] mx-auto min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar onClose={closeSidebar} />
      </div>
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-0 min-w-0">
        <DashboardNavbar onMenuClick={toggleSidebar} />
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}