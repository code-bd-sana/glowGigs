/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useGetJobsByPosterQuery } from "@/features/JobSlice";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { BiCalendarAlt } from "react-icons/bi";
import { useSession } from "next-auth/react";
import {
  useApplyForJobMutation,
  useGetApplicationsByApplicantQuery,
} from "@/features/jobAppliedSlice";
import toast from "react-hot-toast";

export default function JobList() {
  interface Job {
    _id: string;
    title: string;
    department: string;
    companyName: string;
    companyLocation: string;
    jobType: string;
    payType: string;
    description: string;
    companyPerks?: string[];
    thumbnail?: string;
    createdAt: string;
  }

  // Auth session from NextAuth (to get applicant id)
  const { data: session } = useSession();
  const applicantId = session?.user?.id;
  console.log(applicantId);

  // Fetch jobs from your backend
  const { data: jobsResponse, isLoading } = useGetJobsByPosterQuery("");
  const jobs = jobsResponse?.data || [];

  // Fetch all applications for this applicant (to detect already applied)
  const { data: appliedResponse } = useGetApplicationsByApplicantQuery(
    applicantId!,
    {
      skip: !applicantId,
    }
  );

  // Extract job IDs that the user already applied to
  const appliedJobIds =
    appliedResponse?.map((app: any) => app.job?._id || app.job) || [];

  // Apply mutation
  const [applyForJob, { isLoading: applying }] = useApplyForJobMutation();

  // Local states
  const [typeFilter, setTypeFilter] = useState("All Type");
  const [deptFilter, setDeptFilter] = useState("All Department");
  const [locationFilter, setLocationFilter] = useState("All Location");
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Loader
  if (isLoading) {
    return (
      <div className="flex justify-center min-h-screen items-center py-24">
        <div className="animate-spin h-8 w-8 border-2 border-gray-300 border-t-blue-500 rounded-full" />
      </div>
    );
  }

  // Filtering logic
  const filteredJobs = jobs?.filter((job) => {
    return (
      (typeFilter === "All Type" || job.jobType === typeFilter) &&
      (deptFilter === "All Department" ||
        job.department?.toLowerCase().includes(deptFilter.toLowerCase())) &&
      (locationFilter === "All Location" ||
        job.companyLocation
          ?.toLowerCase()
          .includes(locationFilter.toLowerCase()))
    );
  });

  // Helper to shorten long text
  const truncateDescription = (text: string, wordLimit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // Apply button handler
  const handleApply = async () => {
  if (!applicantId) {
    toast.error("Please log in to apply for this job.");
    return;
  }

  try {
    // 1️⃣ Apply for the job
    const res = await applyForJob({
      job: selectedJob._id,
      applicant: applicantId,
    }).unwrap();

    // 2️⃣ Create OR Get Conversation between Applicant + Job Poster
    const convoRes = await fetch("/api/chat/conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user1Id: applicantId,
        user2Id: selectedJob.jobPoster, // 👈 EMPLOYER ID
      }),
    });

    const convoData = await convoRes.json();
    console.log("🔗 Conversation created or returned:", convoData);

    toast.success(
      res?.message || `Applied successfully for ${selectedJob.title}!`
    );

    setSelectedJob(null);
  } catch (error: any) {
    console.error("Application failed:", error);

    if (error?.data?.message?.includes("already applied")) {
      toast.error("You have already applied for this job.");
    } else {
      toast.error(error?.data?.message || "Failed to apply. Please try again.");
    }
  }
};

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      {/* ---------- FILTER BAR ---------- */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option>All Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
        </select>
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option>All Department</option>
        </select>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option>All Location</option>
        </select>
      </div>

      {/* ---------- JOB CARDS ---------- */}
      <div className="space-y-5">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="flex justify-between items-start bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src={job.thumbnail || "/default-logo.png"}
                  alt={job.companyName}
                  fill
                  className="object-cover rounded-full"
                  sizes="56px"
                  priority
                />
              </div>

              <div>
                <p className="text-[24px] font-semibold text-gray-900 leading-tight">
                  {job.title}
                </p>
                <p className="text-[16px] my-2.5 text-gray-500">
                  {job.payType || "Competitive pay or commission structure"}
                </p>
                <p className="text-[20px] font-medium text-gray-900 mt-1">
                  {job.companyName}
                </p>
                <p className="text-[16px] text-gray-500 mt-1 leading-relaxed max-w-lg">
                  {truncateDescription(job.description, 12)}
                </p>

                {/* View Details Button */}
                <button
                  onClick={() => setSelectedJob(job)}
                  className="mt-4 bg-black cursor-pointer text-white text-sm font-medium px-4 py-2 rounded-md 
                   border border-black hover:bg-white hover:text-black 
                   transition-all duration-300"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Right Section - Deadline */}
            <div className="flex flex-col items-end">
              <span className="bg-[#3E6AAC33] flex justify-center gap-1.5 items-center text-[#4B5563] px-3 py-1.5 text-sm rounded-2xl whitespace-nowrap">
                <BiCalendarAlt className="text-[16px]" /> Dead Line:{" "}
                {format(new Date(job.createdAt), "yyyy-MM-dd")}
              </span>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="text-center text-gray-500 text-sm py-8">
            No jobs found for your selected filters.
          </div>
        )}
      </div>

      {/* ---------- MODAL ---------- */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            {/* Job Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-16">
                <Image
                  src={selectedJob.thumbnail || "/default-logo.png"}
                  alt={selectedJob.companyName}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div>
                <h2 className="text-[24px] font-semibold text-gray-900">
                  {selectedJob.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {selectedJob.companyName}
                </p>
                <p className="text-gray-500 text-sm">
                  {selectedJob.companyLocation}
                </p>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Job Type:</strong> {selectedJob.jobType}
              </p>
              <p>
                <strong>Pay Type:</strong> {selectedJob.payType}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>

              {selectedJob.companyPerks &&
                selectedJob.companyPerks.length > 0 && (
                  <div>
                    <strong>Company Perks:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                      {selectedJob.companyPerks.map(
                        (perk: string, index: number) => (
                          <li key={index}>{perk}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex gap-2 justify-end">
              {appliedJobIds.includes(selectedJob._id) ? (
                <button
                  disabled
                  className="bg-gray-400 text-white font-medium px-5 py-2.5 rounded-md cursor-not-allowed"
                >
                  Applied
                </button>
              ) : (
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="bg-gradient-to-r from-[#f0efca] to-[#83a7dc] cursor-pointer text-black font-medium px-5 py-2.5 rounded-md 
               hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-sm disabled:opacity-50"
                >
                  {applying ? "Applying..." : "Apply"}
                </button>
              )}

              <button
                onClick={() => setSelectedJob(null)}
                className="bg-black text-white cursor-pointer px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
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
