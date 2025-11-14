"use client";

import React, { useState, useRef, useEffect } from "react";
import profileImg from "@/app/(public)/dashboard/profile.png";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";
import { useGetSingleUserQuery } from "@/features/AuthApi";
import { ImUser } from "react-icons/im";
import Link from "next/link";

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export default function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const data = useSession();

  const user = data?.data?.user;
  const email = user?.email;

  const { data: singleUser, isLoading } = useGetSingleUserQuery(email!, {
    skip: !email,
  });
  console.log(singleUser)

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
    // You can add your search logic here
  };

  const handleLogout = async () => {
    // Implement logout logic

    await signOut();

    setOpen(false);
  };

  return (
    <div
    className="w-full fixed lg:sticky top-0 left-0 z-50 bg-white
    shadow-sm px-4 py-3 flex items-center justify-between"
    >
      {/* Left - Mobile Menu Button & Title */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lgonMenuClick:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <FiMenu className="text-xl text-gray-600" />
        </button>

        <h4 className="text-base font-semibold text-gray-900">
        <span className="capitalize"> { user?.role } </span> Dashboard
        </h4>
      </div>

      {/* Center - Search Bar */}
      {/* <form
        onSubmit={handleSearch}
        className="relative max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] bg-[#F8FAFC] mx-4 flex-1 hidden md:block"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search agents, statements..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
      </form> */}

      {/* Right - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Mobile Search Button */}
        <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
        </button>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-4-5.7V5a2 2 0 10-4 0v.3A6 6 0 006 11v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Profile Section */}
        <div ref={dropdownRef} className="relative">
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
          >
            {singleUser?.data?.img ? (
              <Image
                src={singleUser?.data?.img}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <ImUser className="text-3xl" />
            )}
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium whitespace-nowrap text-gray-900">
                {singleUser?.data?.fullName}
              </p>
              <p className="text-xs text-gray-500">{singleUser?.data?.role}</p>
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          {/* Enhanced Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
              {/* Profile Option */}
              <Link href="/dashboard/profile">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </button>
              </Link>

              {/* Settings Option */}

              {/* Divider */}
              <div className="my-1 border-t border-gray-200"></div>

              {/* Logout Option */}
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
