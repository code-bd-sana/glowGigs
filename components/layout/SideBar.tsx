"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiGift,
  FiDollarSign,
  FiX,
  FiPlusCircle,
} from "react-icons/fi";
import { MdMessage } from "react-icons/md";
import { RiHandbagLine } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";
import Image from "next/image";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  const data = useSession();

  const role = data?.data?.user?.role;

  console.log(role, "I am your role");

  const EmployeeItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard" },
    {
      name: "Create Job Post",
      icon: <FiPlusCircle />,
      href: "/dashboard/create-job-post",
    },
    { name: "My Jobs", icon: <RiHandbagLine />, href: "/dashboard/my-jobs" },
    {
      name: "Applicants",
      icon: <FiFileText />,
      href: "/dashboard/applicants",
    },
    {
      name: "Pricing",
      icon: <IoPricetagOutline />,
      href: "/dashboard/employeePricing",
    },
    {
      name: "Chat",
      icon: <MdMessage />,
      href: "/dashboard/chat",
    },
  ];
  const adminItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard" },
    { name: "Job Posters", icon: <FiUsers />, href: "/dashboard/job-posters" },
    {
      name: "Job Applicants",
      icon: <FiFileText />,
      href: "/dashboard/job-applicants",
    },
    { name: "Manage Jobs", icon: <FiGift />, href: "/dashboard/manage-jobs" },
    { name: "Payments", icon: <FiDollarSign />, href: "/dashboard/payments" },
    {
      name: "Chat",
      icon: <MdMessage />,
      href: "/dashboard/chat",
    },
    // { name: "Profile", icon: <FaRegUser />, href: "/admin/profile" },
  ];
  const jobSeekerItems = [
    { name: "Dashboard", icon: <FiHome />, href: "/dashboard" },
    {
      name: "My Applications",
      icon: <FiUsers />,
      href: "/dashboard/my-application",
    },
    {
      name: "Profile & Resume",
      icon: <FiFileText />,
      href: "/dashboard/profile",
    },
    {
      name: "Chat",
      icon: <MdMessage />,
      href: "/dashboard/chat",
    },
  ];

  const sidebarItems =
    role === "ADMIN"
      ? adminItems
      : role == "JOB_SEEKER"
      ? jobSeekerItems
      : EmployeeItems;

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onClose && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside className="w-[260px]  h-dvh bg-white flex flex-col">
      {/* Header with close button for mobile */}
      <div className="flex items-center justify-center px-6 py-5 border-b border-gray-200 lg:border-none">
        <Link href={"/"} className="">
          <Image
            src="/logo.png"
            alt="GlowGigs Logo"
            width={70}
            height={40}
            priority
          />
        </Link>
        {/* Close button - only visible on mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <FiX className="text-lg text-gray-600" />
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-6 py-5 overflow-y-auto">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={`flex items-center px-4 py-3 my-3 rounded-md text-lg font-medium
                  transition-all border-l-4
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 border-blue-500"
                      : "text-gray-700 bg-[#F8FAFC] border-transparent hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
