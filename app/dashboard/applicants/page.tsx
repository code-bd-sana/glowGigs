"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { CiCalendar, CiClock2, CiMail } from "react-icons/ci";
import { LuDownload, LuEye } from "react-icons/lu";
import { useSession } from "next-auth/react";
import {
  useGetApplicantsForPosterQuery,
  useUpdateJobAppliedStatusMutation,
} from "@/features/JobSlice";
import { IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";

interface ApplicantData {
  _id: string;
  applicantName: string;
  applicantEmail: string;
  applicantImg: string;
  jobTitle: string;
  appliedDate: string;
  status: string;
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
  // ✅ RTK Query mutation hook
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateJobAppliedStatusMutation();
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  console.log(data?.applicants);

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

  const handleReject =async (id: string) =>{
    console.log(id);
  }

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
                    <StatusBadge status="New" />
                  </div>
                  <p className="text-sm text-gray-500">{applicant.jobTitle}</p>
                </div>
              </div>
              <IoEyeOutline />
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
                  className={`flex-1 text-sm font-bold px-3 py-1.5 rounded-md border 
    ${
      applicant?.status === "Shortlisted"
        ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
        : "bg-[#BEF8D4] text-[#137317] border-green-200 hover:bg-green-200"
    }`}
                >
                  ✓ Shortlist
                </button>
                <button onClick={()=> handleReject(applicant?._id)} className="flex-1 text-[#E53935] border font-bold border-[#E53935] text-sm px-3 py-1.5 rounded-md">
                  ✗ Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsPage;
