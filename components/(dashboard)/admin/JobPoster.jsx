'use client'
import { useGetAllJobPosterQuery } from "@/features/EmployeeApi";
import { useGetJobsByPosterQuery } from "@/features/JobSlice";
import Link from "next/link";
import React from "react";

export default function JobPoster() {
  const posters = [
    {
      id: 1,
      name: "John Anderson",
      company: "TechCorp Inc.",
      email: "donna@jigroup.com",
      phone: "+1 555-432-2299",
      postedJobs: 12,
      applicants: 245,
      status: "Active",
    },
    {
      id: 2,
      name: "John Anderson",
      company: "TechCorp Inc.",
      email: "donna@jigroup.com",
      phone: "+1 555-432-2299",
      postedJobs: 12,
      applicants: 245,
      status: "Active",
    },
    {
      id: 3,
      name: "John Anderson",
      company: "TechCorp Inc.",
      email: "donna@jigroup.com",
      phone: "+1 555-432-2299",
      postedJobs: 12,
      applicants: 245,
      status: "Suspended",
    },
    {
      id: 4,
      name: "John Anderson",
      company: "TechCorp Inc.",
      email: "donna@jigroup.com",
      phone: "+1 555-432-2299",
      postedJobs: 12,
      applicants: 245,
      status: "Active",
    },
    {
      id: 5,
      name: "John Anderson",
      company: "TechCorp Inc.",
      email: "donna@jigroup.com",
      phone: "+1 555-432-2299",
      postedJobs: 12,
      applicants: 245,
      status: "Active",
    },
  ];

  const {data} =useGetAllJobPosterQuery();
  console.log(data?.data, "this is all job poster")

  return (
    
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h6 className="text-lg font-semibold">Manage Job Posters</h6>
        <Link
          href="/dashboard/create-job-post"
          className="bg-[#2199E8] cursor-pointer text-white text-sm px-4 py-2 rounded"
        >
          + Add New Poster
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row  items-center mb-4 gap-3">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name, ID, email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 
            1.415-1.415l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 
            5 5 0 0 1 0 10z"
            />
          </svg>
        </div>
        <div className="flex gap-2 items-center">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-[#475569] font-medium ">
            <tr>
              <th className="py-3 px-4">Poster / Company</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Posted Jobs</th>
              <th className="py-3 px-4">Total Applicants</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posters.map((poster) => (
              <tr
                key={poster.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <div className="font-medium text-[#000000]">
                    {poster.name}
                  </div>
                  <div className="text-xs text-gray-500">{poster.company}</div>
                </td>
                <td className="py-4 px-4 text-sm">
                  <div>{poster.email}</div>
                  <div className="text-xs text-gray-500">{poster.phone}</div>
                </td>
                <td className="py-4 px-4 text-center">{poster.postedJobs}</td>
                <td className="py-4 px-4 text-center">{poster.applicants}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      poster.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {poster.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm space-x-2">
                  <Link href={"/dashboard/job-posters/3243"}>
                    <button className="text-[#EF4444] hover:underline">
                      Info
                    </button>
                  </Link>

                  <button className="text-indigo-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-[#000000]">
        <span>Showing 1-5 of 5 agents</span>
        <div className="space-x-4">
          <button className="hover:underline">Previous</button>
          <button className="hover:underline">Next</button>
        </div>
      </div>
    </div>
  );
}