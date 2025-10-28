"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { CiCalendar, CiClock2, CiMail } from "react-icons/ci";
import { LuDownload, LuEye } from "react-icons/lu";
import { useSession } from "next-auth/react";

interface Applicant {
  name: string;
  role: string;
  email: string;
  experience: string;
  applied: string;
  status: string;
  image: string;
}

const applicants: Applicant[] = [
  {
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    email: "sarah.johnson@email.com",
    experience: "5 years experience",
    applied: "01-20-2024",
    status: "New",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Michael Chen",
    role: "UX Designer",
    email: "michael.chen@email.com",
    experience: "3 years experience",
    applied: "01-19-2024",
    status: "Reviewed",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
    email: "emily.davis@email.com",
    experience: "7 years experience",
    applied: "01-18-2024",
    status: "Shortlisted",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "David Wilson",
    role: "Backend Developer",
    email: "david.wilson@email.com",
    experience: "4 years experience",
    applied: "01-17-2024",
    status: "",
    image: "https://i.pravatar.cc/100?img=4",
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  if (!status) return null;

  const colorMap: Record<string, string> = {
    New: "bg-blue-100 text-blue-600",
    Reviewed: "bg-yellow-100 text-yellow-600",
    Shortlisted: "bg-green-100 text-green-600",
  };

  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-md ${colorMap[status]}`}
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

  return (
    <div className="bg-white rounded-3xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Applicants</h1>
      </div>

      {/* Applicants Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {applicants.map((applicant, i) => (
          <div
            key={i}
            className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 hover:shadow-md transition"
          >
            {/* Header section */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={applicant.image}
                    alt={applicant.name}
                    fill
                    className="rounded-full object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="font-[500] leading-tight">{applicant.name}</p>
                  <p className="text-sm text-gray-500">{applicant.role}</p>
                </div>
              </div>
              <StatusBadge status={applicant.status} />
            </div>

            {/* Info section */}
            <div className="text-[#6B7280] space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <CiMail className="text-black" size={14} /> {applicant.email}
              </div>
              <div className="flex items-center gap-2">
                <CiClock2 className="text-black" size={14} />{" "}
                {applicant.experience}
              </div>
              <div className="flex items-center gap-2">
                <CiCalendar className="text-black" size={14} /> Applied:{" "}
                {applicant.applied}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between gap-2">
                <button className="flex items-center justify-center gap-1.5 border flex-1 border-gray-300 text-sm font-medium text-gray-700 px-4 py-1.5 rounded-md hover:bg-gray-50 transition">
                  <LuEye size={15} className="text-gray-600" />
                  <span>View</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 border flex-1 border-gray-300 text-sm font-medium text-gray-700 px-4 py-1.5 rounded-md hover:bg-gray-50 transition">
                  <LuDownload size={15} className="text-gray-600" />
                  <span>CV</span>
                </button>
              </div>

              <div className="flex justify-between gap-2">
                <button className="bg-[#BEF8D4] flex-1 text-[#137317] font-bold border border-green-200 text-sm px-3 py-1.5 rounded-md">
                  ✓ Shortlist
                </button>
                <button className="flex-1 text-[#E53935] border font-bold border-[#E53935] text-sm px-3 py-1.5 rounded-md">
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
