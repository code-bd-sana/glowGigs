"use client";

import { useGetJobsByPosterQuery } from "@/features/JobSlice";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { FaCircle } from "react-icons/fa6";

// ✅ Define Department type
interface Department {
  _id: string;
  name: string;
}

// ✅ Define Job type
interface Job {
  _id: string;
  title: string;
  department: Department | string; // department can be object or string
  jobType: string;
}

// ✅ Type guard to safely check if department is object
function isDepartmentObject(
  department: string | Department
): department is Department {
  return typeof department === "object" && department !== null && "name" in department;
}

const LatestApplications = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      console.log("Logged-in User ID:", session.user.id);
      console.log("Role:", session.user.role);
      console.log("Email:", session.user.email);
    }
  }, [session, status]);

  const posterId = session?.user?.id;
  const {
    data: jobs,
    isLoading,
    error,
  } = useGetJobsByPosterQuery(posterId ?? "", {
    skip: !posterId,
  });

  if (isLoading)
    return (
      <div className="flex justify-center py-10 w-full">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <div className="flex justify-between items-center my-4">
        <p className="font-bold text-2xl">Latest Posted Jobs</p>
        <a href="#" className="text-blue-600">
          View All
        </a>
      </div>

      <ul className="space-y-9 mt-10">
        {jobs?.data?.slice(4).map((job: Job, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 border-b border-gray-200 last:border-none"
          >
            <div>
              <p className="font-semibold text-gray-800">{job?.title}</p>
              <p className="text-sm text-gray-500">
                Expires: <span className="ml-1">2024-02-15</span>
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm">
              {/* ✅ Safe department name rendering */}
              <span className="text-gray-700">
                {isDepartmentObject(job.department)
                  ? job.department.name
                  : job.department}
              </span>

              <span
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700`}
              >
                <FaCircle className="text-xs" />
                Active
              </span>

              <span className="text-gray-700">{job?.jobType}</span>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default LatestApplications;
