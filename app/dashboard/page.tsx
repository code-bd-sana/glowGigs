"use client";

import AdminDashboard from "@/components/(dashboard)/AdminDashboard";
import JoobSeekerDashboard from "@/components/(dashboard)/JoobSeekerDashboard";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data, status } = useSession();
  const role = data?.user?.role;

  if (status === "loading") {
    return (
      <div className="p-6 space-y-6 animate-pulse">
        {/* ---- Top 4 cards ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-24 bg-gray-200 rounded-lg" />
          ))}
        </div>

        {/* ---- Charts section ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div className="h-80 bg-gray-200 rounded-lg" /> {/* Pie chart skeleton */}
          <div className="h-80 bg-gray-200 rounded-lg" /> {/* Graph skeleton */}
        </div>
      </div>
    );
  }

  return (
    <div>
      {role === "ADMIN" ? (
        <AdminDashboard />
      ) : role === "JOB_SEEKER" ? (
        <JoobSeekerDashboard />
      ) : (
        <p>Coming soon!</p>
      )}
    </div>
  );
}
