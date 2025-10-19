"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiGift,
  FiDollarSign,
  FiPlusCircle,
} from "react-icons/fi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { RiHandbagLine } from "react-icons/ri";

const sidebarItems = [
  { name: "Dashboard", icon: <FiHome />, href: "dashboard/" },
  { name: "Job Posters", icon: <FiUsers />, href: "/dashboard/job-posters" },
  {
    name: "Job Applicants",
    icon: <FiFileText />,
    href: "/admin/job-applicants",
  },
  { name: "Manage Jobs", icon: <FiGift />, href: "/admin/manage-jobs" },
  { name: "Payments", icon: <FiDollarSign />, href: "/admin/payments" },
  { name: "Create Job Post", icon: <FiPlusCircle />, href: "/admin/profile" },
  { name: "My Jobs", icon: <RiHandbagLine />, href: "/admin/profile" },
  { name: "Profile", icon: <FaRegUser />, href: "/admin/profile" },
  {
    name: "Subscription",
    icon: <MdOutlineWorkspacePremium />,
    href: "/admin/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-white border-r px-6 py-4">
      <h1 className="text-2xl text-center font-bold mb-6">GlowGigs</h1>
      <div className="space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
