// components/LatestApplications.tsx
import React from "react";

interface Applicant {
  name: string;
  role: string;
  status: "New" | "Reviewed" | "Shortlisted";
  time: string;
}

interface LatestApplicationsProps {
  applicants: Applicant[];
}

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Reviewed: "bg-yellow-100 text-yellow-800",
  Shortlisted: "bg-green-100 text-green-800",
};

const LatestApplications: React.FC<LatestApplicationsProps> = ({ applicants }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <div className="flex justify-between items-center my-4">
        <p className="font-bold">Latest Applications</p>
        <a href="#" className="text-blue-600">View All</a>
      </div>
      <ul className="space-y-9 mt-10">

        {applicants.map((applicant, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {applicant.name[0]}
              </div>
              <div>
                <p className="font-medium">{applicant.name}</p>
                <p className="text-gray-500 text-sm">{applicant.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-xl text-xs ${statusColors[applicant.status]}`}>
                {applicant.status}
              </span>
              <span className="text-gray-400 text-xs">{applicant.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestApplications;
