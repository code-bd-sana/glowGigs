import React from "react";
import { BiPencil } from "react-icons/bi";
import { FaTrash, FaEye } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

interface Application {
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: string;
  location?: string;
  salaryRange?: string;
}

const applications: Application[] = [
  {
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    appliedDate: "Jan 15, 2024",
    status: "Under Review",
    location: "San Francisco, CA",
    salaryRange: "$120,000 - $150,000",
  },
  {
    jobTitle: "Full Stack Engineer",
    company: "StartupXYZ",
    appliedDate: "Jan 14, 2024",
    status: "Shortlisted",
    location: "Remote",
    salaryRange: "$100,000 - $130,000",
  },
  {
    jobTitle: "React Developer",
    company: "Digital Agency Pro",
    appliedDate: "Jan 13, 2024",
    status: "Interview Scheduled",
    location: "New York, NY",
    salaryRange: "$90,000 - $110,000",
  },
  {
    jobTitle: "UI/UX Developer",
    company: "Creative Studios",
    appliedDate: "Jan 12, 2024",
    status: "Application Sent",
    location: "Los Angeles, CA",
    salaryRange: "$85,000 - $100,000",
  },
  {
    jobTitle: "JavaScript Developer",
    company: "WebTech Inc",
    appliedDate: "Jan 11, 2024",
    status: "Under Review",
    location: "Austin, TX",
    salaryRange: "$95,000 - $115,000",
  },
];

const RecentApplications: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="flex px-6 justify-between">
        <p className="text-2xl font-semibold text-gray-800 mb-6">
          Recent Applications
        </p>
        <button className="text-[#2563EB] flex justify-center gap-1 items-center">View all<FaArrowRight /></button>
      </div>
      <div className="overflow-x-auto">
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
            {applications.map((application, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  index === applications.length - 1
                    ? ""
                    : "border-b border-gray-200"
                }`}
              >
                <td className="py-4 px-6">
                  <div className="text-gray-800">{application.jobTitle}</div>
                  {application.location && (
                    <div className="text-sm text-gray-500">
                      {application.location}
                    </div>
                  )}
                  {application.salaryRange && (
                    <div className="text-sm text-gray-500">
                      {application.salaryRange}
                    </div>
                  )}
                </td>
                <td className="py-4 px-6">{application.company}</td>
                <td className="py-4 px-6">{application.appliedDate}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                      application.status
                    )}`}
                  >
                    {application.status}
                  </span>
                </td>
                <td className="py-4 text-gray-500 px-6">
                  <button className="mr-2">
                    <FaEye className="inline-block mr-1" />
                  </button>
                  <button className="mr-2">
                    <BiPencil className="inline-block mr-1" />
                  </button>
                  <button>
                    <FaTrash className="inline-block mr-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Under Review":
      return "bg-orange-100 text-orange-600";
    case "Shortlisted":
      return "bg-green-100 text-green-600";
    case "Interview Scheduled":
      return "bg-purple-100 text-purple-600";
    case "Application Sent":
      return "bg-blue-100 text-blue-600";
    default:
      return "";
  }
};

export default RecentApplications;
