"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CiCalendar, CiClock2, CiMail } from "react-icons/ci";
import { LuDownload, LuEye } from "react-icons/lu";
import { useSession } from "next-auth/react";
import {
  useGetApplicantsForPosterQuery,
  useRejectApplicantMutation,
  useUpdateJobAppliedStatusMutation,
} from "@/features/JobSlice";
import { IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Link from "next/link";

interface ApplicantData {
  _id: string;
  applicantName: string;
  applicantEmail: string;
  applicantImg: string;
  applicantBio: string;
  applicantAddress: string;
  applicantDob: string;
  applicantCertificates: string[];
  applicantPhoneNumber: string;
  jobTitle: string;
  appliedDate: string;
  status: string;
  
applicant:string
}

const StatusBadge = ({ status }: { status: string }) => {
  if (!status) return null;

  const colorMap: Record<string, string> = {
    New: "bg-blue-100 text-blue-600",
    Reviewed: "bg-yellow-100 text-yellow-600",
    Shortlisted: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-xl ${colorMap[status]}`}
    >
      {status}
    </span>
  );
};

const ApplicantsPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [selectedApplicant, setSelectedApplicant] =
    useState<ApplicantData | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      console.log("Logged-in User ID:", session.user.id);
      console.log("Role:", session.user.role);
      console.log("Email:", session.user.email);
    }
  }, [session, status]);

  const { data, isLoading, isError, refetch } = useGetApplicantsForPosterQuery(
    session?.user?.id,
    { skip: !session?.user?.id }
  );
  console.log(data?.applicants, "khela hobeeee");
  // const [rejectApplicant, { isLoading: isRejecting }] =
  //   useRejectApplicantMutation();

  // ✅ RTK Query mutation hook
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateJobAppliedStatusMutation();
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );

  const handleShortlist = async (id: string) => {
    try {
      const res = await updateStatus({ id, status: "Shortlisted" }).unwrap();
      console.log("✅ Status updated:", res);
      toast.success("Applicant Shortlisted Successfully!");

      // Refetch applicants to update UI
      refetch();
    } catch (err) {
      console.error("❌ Error updating status:", err);
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  const handleReject = async (id: string) => {
    console.log(id);
    // try {
    //   await rejectApplicant(id).unwrap();
    //   toast.success("Applicant rejected and deleted successfully!");
    //   refetch();
    // } catch (err) {
    //   console.error(err);
    //   toast.error(err?.data?.message || "Failed to reject applicant");
    // }
    try {
      const res = await updateStatus({ id, status: "Rejected" }).unwrap();
      console.log("✅ Status updated:", res);
      toast.success("Applicant Rejected Successfully!");

      // Refetch applicants to update UI
      refetch();
    } catch (err) {
      console.error("❌ Error updating status:", err);
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Applicants</h1>
      </div>

      {/* Applicants Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.applicants.map((applicant: ApplicantData, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 hover:shadow-md transition"
          >
            {/* Header section */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={applicant.applicantImg}
                    alt="applicant"
                    fill
                    className="rounded-full object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-6">
                    <p className="font-[500] leading-tight">
                      {applicant.applicantName}
                    </p>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-xl 
    ${
      applicant?.status === "Shortlisted"
        ? "bg-green-100 text-green-700"
        : applicant?.status === "Applied"
        ? "bg-blue-100 text-blue-700"
        : applicant?.status === "Rejected"
        ? "bg-red-100 text-red-700"
        : "bg-gray-100 text-gray-700"
    }`}
                    >
                      {applicant?.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{applicant.jobTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedApplicant(applicant)}
                className="text-gray-600 hover:text-black"
              >
                <IoEyeOutline size={20} />
              </button>
            </div>

            {/* Info section */}
            <div className="text-[#6B7280] space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <CiMail className="text-black" size={14} />{" "}
                {applicant.applicantEmail}
              </div>
              <div className="flex items-center gap-2">
                <CiClock2 className="text-black" size={14} /> 7 Years Experience
              </div>
              <div className="flex items-center gap-2">
                <CiCalendar className="text-black" size={14} /> Applied:{" "}
                {new Date(applicant.appliedDate).toLocaleDateString()}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between gap-2">
                <button
                  onClick={() => handleShortlist(applicant?._id)}
                  disabled={applicant?.status === "Shortlisted"}
                  className={`flex-1 text-sm font-bold px-3 py-1.5 rounded-md border ${
                    applicant?.status === "Shortlisted"
                      ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                      : "bg-[#BEF8D4] text-[#137317] border-green-200 hover:bg-green-200"
                  }`}
                >
                  ✓ Shortlist
                </button>
                <button
                  onClick={() => handleReject(applicant?._id)}
                  className={`flex-1 text-sm font-bold px-3 py-1.5 rounded-md border ${
                    applicant?.status === "Rejected"
                      ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                      : "bg-[#f3cfcf] text-red-600 border-red-200 hover:bg-red-200"
                  }`}
                >
                  ✗ Reject
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* 🟢 Applicant Details Modal */}
        {selectedApplicant && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30 animate-fadeIn">
            <div className="relative bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl w-full max-w-lg p-6 animate-scaleUp">
              {/* Close Button */}
              <button
                onClick={() => setSelectedApplicant(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>

              {/* Profile Section */}
              <div className="flex flex-col items-center text-center">
                <Image
                  src={selectedApplicant.applicantImg}
                  alt="Applicant"
                  width={100}
                  height={100}
                  className=" w-26 h-26 rounded-full object-cover mb-3 border-4 border-white shadow-md"
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedApplicant.applicantName}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedApplicant.applicantEmail}
                </p>
              </div>

              {/* Info */}
              <div className="mt-5 text-gray-700 space-y-3">
                <p>
                  <span className="font-semibold">Bio:</span>{" "}
                  {selectedApplicant.applicantBio || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedApplicant.applicantAddress || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Date of Birth:</span>{" "}
                  {selectedApplicant.applicantDob
                    ? new Date(
                        selectedApplicant.applicantDob
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {selectedApplicant.applicantPhoneNumber || "N/A"}
                </p>

                <div>
                  <span className="font-semibold">Certificates:</span>
                  <ul className="list-disc pl-6 text-sm mt-1">
                    {selectedApplicant.applicantCertificates?.length > 0 ? (
                      selectedApplicant.applicantCertificates.map((cert, i) => (
                        <li key={i}>{cert}</li>
                      ))
                    ) : (
                      <li>No certificates available</li>
                    )}
                  </ul>
                </div>

          <Link 
  href={`/dashboard/portfolio/${selectedApplicant?.applicantEmail}`}
  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600   text-white rounded-lg "
>
  {/* Portfolio Icon */}
  <svg 
    className="w-4 h-4" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
    />
  </svg>
  
  See Portfolio
</Link>
              </div>
            </div>
          </div>
        )}

        {/* ✨ Simple fade-in & scale animations */}
        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes scaleUp {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.25s ease forwards;
          }
          .animate-scaleUp {
            animation: scaleUp 0.3s ease forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default ApplicantsPage;
