/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useApplyForJobMutation,
  useGetApplicationsByApplicantQuery,
} from "@/features/jobAppliedSlice";
import { useGetJobsByPosterQuery } from "@/features/JobSlice";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiCalendarAlt } from "react-icons/bi";

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
    jobPoster: string;
  }

  const { data: session } = useSession();
  console.log(session, "user is here");
  const applicantId = session?.user?.id;

  console.log("PLAN:", session?.user?.plan);

  const { data: jobsResponse, isLoading } = useGetJobsByPosterQuery("");
  const jobs = jobsResponse?.data || [];

  const { data: appliedResponse } = useGetApplicationsByApplicantQuery(
    applicantId!,
    { skip: !applicantId },
  );

  const router = useRouter();

  const appliedJobIds =
    appliedResponse?.map((app: any) => app.job?._id || app.job) || [];

  const [applyForJob, { isLoading: applying }] = useApplyForJobMutation();

  const [typeFilter, setTypeFilter] = useState("All Type");
  const [deptFilter, setDeptFilter] = useState("All Department");
  const [locationFilter, setLocationFilter] = useState("All Location");
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // ⭐ PREMIUM UPGRADE MODAL STATE
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  if (isLoading) {
    return (
      <div className='flex justify-center min-h-screen items-center py-24'>
        <div className='animate-spin h-8 w-8 border-2 border-gray-300 border-t-blue-500 rounded-full' />
      </div>
    );
  }

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

  const truncateDescription = (text: string, wordLimit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  // ⭐ APPLY HANDLER WITH SUBSCRIPTION PROTECTION
  const handleApply = async () => {
    if (!applicantId) {
      toast.error("Please log in to apply for this job.");
      return;
    }

    // ⛔ BLOCK FREE USERS
    if (!["bronze", "basic", "pro"].includes(session?.user?.plan)) {
      setShowUpgradeModal(true);
      return;
    }
    try {
      const res = await applyForJob({
        job: selectedJob._id,
        applicant: applicantId,
      }).unwrap();

      // create conversation
      await fetch("/api/chat/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user1Id: applicantId,
          user2Id: selectedJob.jobPoster,
        }),
      });

      toast.success(
        res?.message || `Applied successfully for ${selectedJob.title}!`,
      );

      setSelectedJob(null);
    } catch (error: any) {
      console.error("Application failed:", error);

      if (error?.data?.message?.includes("already applied")) {
        toast.error("You have already applied for this job.");
      } else {
        toast.error(
          error?.data?.message || "Failed to apply. Please try again.",
        );
      }
    }
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-10 min-h-screen'>
      {/* FILTER BAR */}
      <div className='flex flex-wrap gap-3 mb-8'>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className='border border-gray-300 rounded-md px-3 py-2 text-sm'>
          <option>All Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Remote</option>
        </select>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className='border border-gray-300 rounded-md px-3 py-2 text-sm'>
          <option>All Department</option>
        </select>

        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className='border border-gray-300 rounded-md px-3 py-2 text-sm'>
          <option>All Location</option>
        </select>
      </div>

      {/* JOB CARDS */}
      <div className='space-y-5'>
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className='flex justify-between items-start bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-all'>
            <div className='flex items-center gap-4'>
              <div className='relative w-14 h-14'>
                <Image
                  src={job.thumbnail || "/default-logo.png"}
                  alt={job.companyName}
                  fill
                  className='object-cover rounded-full'
                />
              </div>

              <div>
                <p className='text-[24px] font-semibold text-gray-900'>
                  {job.title}
                </p>
                <p className='text-[16px] text-gray-500'>
                  {job.payType || "Competitive pay"}
                </p>
                <p className='text-[20px] font-medium text-gray-900'>
                  {job.companyName}
                </p>
                <p className='text-[16px] text-gray-500 max-w-lg'>
                  {truncateDescription(job.description, 12)}
                </p>

                <button
                  onClick={() => setSelectedJob(job)}
                  className='mt-4 bg-black text-white text-sm font-medium px-4 py-2 rounded-md border border-black hover:bg-white hover:text-black transition-all'>
                  View Details
                </button>
              </div>
            </div>

            <div className='flex flex-col items-end'>
              <span className='bg-[#3E6AAC33] flex items-center gap-1.5 text-[#4B5563] px-3 py-1.5 text-sm rounded-2xl'>
                <BiCalendarAlt className='text-[16px]' />
                Dead Line: {format(new Date(job.createdAt), "yyyy-MM-dd")}
              </span>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className='text-center text-gray-500 text-sm py-8'>
            No jobs found.
          </div>
        )}
      </div>

      {/* JOB DETAILS MODAL */}
      {selectedJob && (
        <div className='fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl max-w-2xl w-full p-6 shadow-xl relative'>
            <button
              onClick={() => setSelectedJob(null)}
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl'>
              ✕
            </button>

            <div className='flex items-center gap-4 mb-5'>
              <div className='relative w-16 h-16'>
                <Image
                  src={selectedJob.thumbnail || "/default-logo.png"}
                  alt={selectedJob.companyName}
                  fill
                  className='object-cover rounded-full'
                />
              </div>
              <div>
                <h2 className='text-[24px] font-semibold text-gray-900'>
                  {selectedJob.title}
                </h2>
                <p className='text-gray-600 text-sm'>
                  {selectedJob.companyName}
                </p>
                <p className='text-gray-500 text-sm'>
                  {selectedJob.companyLocation}
                </p>
              </div>
            </div>

            <div className='space-y-3 text-gray-700'>
              <p>
                <strong>Job Type:</strong> {selectedJob.jobType}
              </p>
              <p>
                <strong>Pay Type:</strong> {selectedJob.payType}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>

              {selectedJob.companyPerks?.length > 0 && (
                <div>
                  <strong>Company Perks:</strong>
                  <ul className='list-disc pl-5 space-y-1 mt-2 text-gray-600'>
                    {selectedJob.companyPerks.map((perk: string, i: number) => (
                      <li key={i}>{perk}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className='mt-6 flex gap-2 justify-end'>
              {appliedJobIds.includes(selectedJob._id) ? (
                <button
                  disabled
                  className='bg-gray-400 text-white font-medium px-5 py-2.5 rounded-md cursor-not-allowed'>
                  Applied
                </button>
              ) : (
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className='bg-gradient-to-r from-[#f0efca] to-[#83a7dc] text-black font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-all disabled:opacity-50'>
                  {applying ? "Applying..." : "Apply"}
                </button>
              )}

              <button
                onClick={() => setSelectedJob(null)}
                className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PREMIUM UPGRADE MODAL ================= */}
      {showUpgradeModal && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[999]'>
          <div className='bg-white rounded-2xl shadow-2xl max-w-md w-full px-8 py-10 relative animate-fadeIn'>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className='absolute top-3 right-3 text-gray-500 hover:text-black text-xl'>
              ✕
            </button>

            <div className='flex justify-center mb-4'>
              <div className='w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg'>
                <Image src='/logo.png' alt='premium' width={40} height={40} />
              </div>
            </div>

            <h2 className='text-center text-2xl font-bold text-gray-900 mb-3'>
              Upgrade to Apply Jobs
            </h2>

            <p className='text-center text-gray-600 mb-6 leading-relaxed'>
              Apply to unlimited jobs, message employers directly & boost your
              hiring chances. Unlock all premium features now.
            </p>

            <div className='flex flex-col gap-3'>
              <button
                onClick={() => (window.location.href = "/plans-pricing")}
                className='w-full py-3 rounded-lg text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all'>
                Upgrade Now
              </button>

              <button
                onClick={() => setShowUpgradeModal(false)}
                className='w-full py-3 rounded-lg text-black border border-gray-300 hover:bg-gray-100 transition-all'>
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FADE ANIMATION */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn .25s ease-out; }
      `}</style>
    </div>
  );
}
