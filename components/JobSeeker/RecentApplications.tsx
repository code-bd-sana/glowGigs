/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetApplicationsByApplicantQuery } from "@/features/jobAppliedSlice";
import Link from "next/link";

const RecentApplications: React.FC = () => {
  const { data: session, status } = useSession();
  const applicantId = session?.user?.id;

  const {
    data: applications = [],
    isLoading,
    error,
  } = useGetApplicationsByApplicantQuery(applicantId ? applicantId : skipToken);

  // Extract most recent 5 applications
  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.applicationDate).getTime() -
        new Date(a.applicationDate).getTime()
    )
    .slice(0, 5);

  // Modal State
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  // Show loader while session is loading
  if (status === "loading") {
    return <div className="bg-white p-6 rounded-xl">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-2xl p-6">
      {/* Header */}
      <div className="flex px-6 justify-between">
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          Recent Applications
        </p>
        <Link href="/dashboard/my-application">
          <button className="text-[#2563EB] flex justify-center gap-1 items-center">
            View all <FaArrowRight />
          </button>
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="text-center py-6 text-gray-500">
          Loading applications...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-6 text-red-500">
          Failed to load applications.
        </div>
      )}

      {/* Data Table */}
      {!isLoading && !error && (
        <div className="overflow-x-scroll ">
          <table className="min-w-full bg-white border-collapse whitespace-nowrap">
            <thead>
              <tr className="text-left text-sm font-medium px-5 py-10 text-gray-600 border-b-2 border-gray-300">
                <th className="py-3 px-6">Job Details</th>
                <th className="py-3 px-6">Company</th>
                <th className="py-3 px-6">Applied Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {recentApplications.map((application: any, index: number) => (
                <tr
                  key={application._id}
                  className={`hover:bg-gray-50 ${
                    index === recentApplications.length - 1
                      ? ""
                      : "border-b border-gray-200"
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="text-gray-800">{application?.job?.title}</div>
                    <div className="text-sm text-gray-500">
                      {application?.job?.companyLocation}
                    </div>
                  </td>

                  <td className="py-4 px-6">{application.job.companyName}</td>

                  <td className="py-4 px-6">
                    {new Date(application.applicationDate).toDateString()}
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  {/* Eye button */}
                  <td className="py-4 text-gray-500 px-6">
                    <button onClick={() => setSelectedApplication(application)}>
                      <FaEye className="inline-block mr-1 text-blue-600 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}

              {applications.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================= MODAL ========================= */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-2xl w-full relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setSelectedApplication(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            {/* Job Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative w-16 h-16">
                <Image
                  src={selectedApplication.job.thumbnail || "/default-logo.png"}
                  alt={selectedApplication.job.companyName}
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              <div>
                <h2 className="text-[24px] font-semibold text-gray-900">
                  {selectedApplication.job.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {selectedApplication.job.companyName}
                </p>
                <p className="text-gray-500 text-sm">
                  {selectedApplication.job.companyLocation}
                </p>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-3 text-gray-700">
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

              {selectedApplication.job.companyPerks &&
                selectedApplication.job.companyPerks.length > 0 && (
                  <div>
                    <strong>Company Perks:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                      {selectedApplication.job.companyPerks.map(
                        (perk: string, idx: number) => (
                          <li key={idx}>{perk}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {/* Application Info */}
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

            {/* Footer */}
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
};

/* ------------------ STATUS BADGE COLORS ------------------ */
const getStatusClass = (status: string) => {
  switch (status) {
    case "Under Review":
    case "Applied":
      return "bg-orange-100 text-orange-600";
    case "Shortlisted":
    case "Offer":
      return "bg-green-100 text-green-600";
    case "Interview":
    case "Interview Scheduled":
      return "bg-purple-100 text-purple-600";
    case "Application Sent":
      return "bg-blue-100 text-blue-600";
    case "Rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default RecentApplications;
