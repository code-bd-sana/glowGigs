"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiGift,
  FiDollarSign,
  FiUser,
} from "react-icons/fi"

const sidebarItems = [
  { name: "Dashboard", icon: <FiHome />, href: "dashboard/" },
  { name: "Job Posters", icon: <FiUsers />, href: "/dashboard/job-posters" },
  { name: "Job Applicants", icon: <FiFileText />, href: "/admin/job-applicants" },
  { name: "Manage Jobs", icon: <FiGift />, href: "/admin/manage-jobs" },
  { name: "Payments", icon: <FiDollarSign />, href: "/admin/payments" },
  { name: "Profile", icon: <FiUser />, href: "/admin/profile" },
];

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[260px] bg-white border-r px-6 py-4">
      <h1 className="text-2xl text-center font-bold mb-6">GlowGigs</h1>
      <div className="space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${isActive ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}
