/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useMemo } from "react";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetApplicationsByApplicantQuery } from "@/features/jobAppliedSlice";

export default function StatusCards() {
  const { data: session } = useSession();
  const applicantId = session?.user?.id;

  // Fetch real applications
  const { data: applications = [] } = useGetApplicationsByApplicantQuery(
    applicantId ? applicantId : skipToken
  );

  // Count statuses
  const counts = useMemo(() => {
    const stats = {
      all: applications.length,
      pending: 0,
      shortlisted: 0,
      interview: 0,
      rejected: 0,
    };

    applications.forEach((app: any) => {
      const status = app.status?.toLowerCase();

      if (status === "pending" || status === "applied" || status === "under review") {
        stats.pending++;
      }
      if (status === "shortlisted") {
        stats.shortlisted++;
      }
      if (status === "rejected") {
        stats.rejected++;
      }
    });

    return stats;
  }, [applications]);

  // Format same structure as your dummy array
  const statuses = [
    { count: counts.all, label: "All Status" },
    { count: counts.pending, label: "Pending" },
    { count: counts.shortlisted, label: "Shortlisted" },
 
    { count: counts.rejected, label: "Rejected" },
  ];

  return (
    <div className="flex gap-4 py-4">
      {statuses.map((item, index) => (
        <div
          key={index}
          className="flex flex-1 flex-col items-center justify-center w-[231.04px] h-[98.03px] bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
        >
          <span className="text-2xl font-semibold text-gray-900">
            {item.count}
          </span>
          <span className="text-sm text-gray-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
