"use client";
import { useGetShowcaseUserQuery } from "@/features/UserApi";
import Link from "next/link";
import React from "react";

export default function Page() {
  const { data, isLoading } = useGetShowcaseUserQuery();

  const users = data?.users || [];

  if (isLoading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="w-full px-6 min-h-screen md:px-16 py-10">

      <h1 className="text-3xl font-semibold mb-8 text-center">Showcase Users</h1>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">

        <table className="w-full text-left min-w-[700px]">
          
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Portfolio Items</th>
              <th className="p-4 font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* USER + AVATAR */}
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={user?.profileImg || "https://i.ibb.co/RTp7fyr/user.png"}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{user?.name || "No Name"}</p>
                    <p className="text-xs text-gray-500">ID: {user?._id}</p>
                  </div>
                </td>

                {/* EMAIL */}
                <td className="p-4">{user?.email}</td>

                {/* PORTFOLIO ITEMS COUNT */}
                <td className="p-4">
                  <span className="px-3 py-1 bg-black text-white text-xs rounded-full">
                    {user?.portfolio?.length} items
                  </span>
                </td>

                {/* ACTION BUTTON */}
                <td className="p-4 text-right">
                  <Link
                    href={`/dashboard/portfolio/${user?.email}`}
                    className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
                  >
                    View Portfolio
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* CARD VIEW (Mobile Friendly) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:hidden">

        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white shadow-md rounded-xl p-5 border"
          >
            <div className="flex items-center gap-4">
              <img
                src={u.profileImg || "https://i.ibb.co/RTp7fyr/user.png"}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg">{u.name || "No Name"}</h2>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-700">
                Portfolio Items:{" "}
                <span className="font-semibold">
                  {u.portfolio?.length || 0}
                </span>
              </p>
            </div>

            <Link
              href={`/hi/${u._id}`}
              className="mt-4 block w-full text-center py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition"
            >
              View Portfolio
            </Link>
          </div>
        ))}

      </div>

    </div>
  );
}
