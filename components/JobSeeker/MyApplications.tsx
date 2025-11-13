/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/query";
import Swal from "sweetalert2";
import {
  useGetApplicationsByApplicantQuery,
  useDeleteApplicationMutation,
} from "@/features/jobAppliedSlice";


const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
    case "Applied":
    case "Under Review":
      return "bg-[#FEF9C3] text-[#854D0E]";
    case "Shortlisted":
      return "bg-[#DCFCE7] text-[#166534]";
    case "Interview":
    case "Interview Scheduled":
      return "bg-[#DBEAFE] text-[#3E6AAC]";
    case "Rejected":
      return "bg-[#FFF2F2] text-[#C62828]";
    default:
      return "bg-gray-50 text-gray-500 border border-gray-200";
  }
};

export default function JobApplications() {
  const [filter, setFilter] = useState("All Status");
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const { data: session } = useSession();
  const applicantId = session?.user?.id;

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useGetApplicationsByApplicantQuery(applicantId ? applicantId : skipToken);

  const [deleteApplication] = useDeleteApplicationMutation();

  // 🔹 Map backend data into the same shape as your dummy jobs
  const jobs = useMemo(
    () =>
      applications.map((app: any) => ({
        id: app._id,
        title: app.job.title,
        company: app.job.companyName,
        date: new Date(app.applicationDate).toISOString().split("T")[0], // YYYY-MM-DD
        status: app.status,
        full: app, // keep full object for View Details modal
      })),
    [applications]
  );

  // 🔹 Apply filter + sorting without changing design
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (filter !== "All Status") {
      result = result.filter((job) => job.status === filter);
    }

    // Sort by date string (YYYY-MM-DD) → A–Z / Z–A
    result.sort((a, b) =>
      sortType === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );

    return result;
  }, [jobs, filter, sortType]);

  // 🔹 Withdraw handler
  const handleWithdraw = async (id: string) => {
    const result = await Swal.fire({
      title: "Withdraw Application?",
      text: "Are you sure you want to withdraw your job application?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Withdraw",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteApplication(id).unwrap();
      await Swal.fire({
        title: "Application Withdrawn",
        text: "Your job application has been successfully withdrawn.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "Could not withdraw the application.",
        icon: "error",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="py-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading applications...</p>
      </div>
    );
  }

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
            <option>Applied</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Shortlisted</option>
            <option>Interview</option>
            <option>Interview Scheduled</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-sm text-gray-600 font-medium">Sort by</label>
          <select
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 bg-white"
            value={sortType}
            onChange={(e) =>
              setSortType(e.target.value === "asc" ? "asc" : "desc")
            }
          >
            <option value="asc">Application Date (A-Z)</option>
            <option value="desc">Application Date (Z-A)</option>
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
            key={job.id}
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
              <button
                className="text-[#3E6AAC] hover:underline"
                onClick={() => setSelectedApplication(job.full)}
              >
                View Details
              </button>
              <button
                className="text-[#C62828] hover:underline"
                onClick={() => handleWithdraw(job.id)}
              >
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full relative shadow-lg">
            <button
              onClick={() => setSelectedApplication(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-16">
                <Image
                  src={selectedApplication.job.thumbnail || "/default-logo.png"}
                  alt="Company Logo"
                  fill
                  className="rounded-full object-cover"
                />
              </div>

              <div>
                <p className="text-[22px] font-semibold text-gray-900">
                  {selectedApplication.job.title}
                </p>
                <p className="text-gray-600">
                  {selectedApplication.job.companyName}
                </p>
                <p className="text-gray-500">
                  {selectedApplication.job.companyLocation}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-gray-700 text-sm">
              <p>
                <strong>Job Type:</strong> {selectedApplication.job.jobType}
              </p>
              <p>
                <strong>Pay Type:</strong> {selectedApplication.job.payType}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedApplication.job.description}
              </p>

              {selectedApplication.job.companyPerks?.length > 0 && (
                <div>
                  <strong>Company Perks:</strong>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {selectedApplication.job.companyPerks.map(
                      (perk: string, idx: number) => (
                        <li key={idx}>{perk}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              <p>
                <strong>Status:</strong> {selectedApplication.status}
              </p>
              <p>
                <strong>Applied Date:</strong>{" "}
                {new Date(selectedApplication.applicationDate).toDateString()}
              </p>

              {selectedApplication.coverLetter && (
                <p>
                  <strong>Cover Letter:</strong>{" "}
                  {selectedApplication.coverLetter}
                </p>
              )}

              {selectedApplication.resume && (
                <p>
                  <strong>Resume:</strong>{" "}
                  <a
                    href={selectedApplication.resume}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedApplication(null)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
