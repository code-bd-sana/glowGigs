"use client";
import Image from "next/image";
import React, { useState } from "react";

const jobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    date: "2024-03-15",
    status: "Shortlisted",
  },
  {
    title: "Full Stack Engineer",
    company: "StartUpZZ",
    date: "2024-03-14",
    status: "Pending",
  },
  {
    title: "React Developer",
    company: "Digital Solutions",
    date: "2024-03-13",
    status: "Interview",
  },
  {
    title: "UI/UX Developer",
    company: "Creative Labs",
    date: "2024-03-12",
    status: "Rejected",
  },
  {
    title: "Backend Developer",
    company: "DataSky Technologies",
    date: "2024-03-10",
    status: "Pending",
  },
  {
    title: "DevOps Engineer",
    company: "Cloud Innovations",
    date: "2024-03-08",
    status: "Shortlisted",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-[#FEF9C3] text-[#854D0E]";
    case "Shortlisted":
      return "bg-[#DCFCE7] text-[#166534]";
    case "Interview":
      return "bg-[#DBEAFE] text-[#3E6AAC]";
    case "Rejected":
      return "bg-[#FFF2F2] text-[#C62828]";
    default:
      return "bg-gray-50 text-gray-500 border border-gray-200";
  }
};

export default function JobApplications() {
  const [filter, setFilter] = useState("All Status");





  

  const filteredJobs =
    filter === "All Status"
      ? jobs
      : jobs.filter((job) => job.status === filter);

  return (
    <div className="py-6 bg-gray-50 min-h-screen">
      {/* Header Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-gray-600 font-medium">
            Filter by Status
          </label>
          <select
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Shortlisted</option>
            <option>Interview</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-gray-600 font-medium">Sort by</label>
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white">
            <option>Application Date (A-Z)</option>
            <option>Application Date (Z-A)</option>
          
          </select>
        </div>
      </div>

      {/* Job List */}
      <p className="text-sm text-gray-500 mb-3">
        Showing <strong>{filteredJobs.length}</strong> of {jobs.length}{" "}
        applications
      </p>

      <div className="space-y-4">
        {filteredJobs.map((job, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all p-5"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[18.94px] font-[600] text-gray-800 mb-4">
                  {job.title}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                  <Image
                    src="/jobSeeker/Frame.png"
                    alt="Company Icon"
                    width={14}
                    height={14}
                    className="inline-block"
                  />
                  {job.company}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Image
                    src="/jobSeeker/Frame (1).png"
                    alt="Calendar Icon"
                    width={14}
                    height={14}
                    className="inline-block"
                  />
                  Applied: {job.date}
                </p>
              </div>

              <div className="mt-3 md:mt-0 flex items-center gap-3">
                <p
                  className={`px-3 py-1 text-xs rounded-2xl font-medium ${getStatusColor(
                    job.status
                  )}`}
                >
                  {job.status}
                </p>
              </div>
            </div>

            <div className="mt-5 flex gap-4 text-sm font-medium">
              <button className="text-[#3E6AAC] hover:underline">
                View Details
              </button>
              <button className="text-[#C62828] hover:underline">
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
