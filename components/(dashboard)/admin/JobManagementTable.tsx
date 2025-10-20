import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoCheckmarkSharp, IoEyeOutline } from "react-icons/io5";

interface Job {
  id: number;
  title: string;
  poster: string;
  company: string;
  department: string;
  applicants: number;
  status: "Active" | "Pending" | "Approved" | "Rejected";
  published: string;
}

const jobs: Job[] = [
  { id: 1, title: "Senior Frontend Developer", poster: "Jennifer Martinez", company: "TechCorp Inc.", department: "Engineering", applicants: 24, status: "Active", published: "1/10/2024" },
  { id: 2, title: "React Developer", poster: "Jennifer Martinez", company: "TechCorp Inc.", department: "Engineering", applicants: 18, status: "Pending", published: "1/8/2024" },
  { id: 3, title: "Full Stack Developer", poster: "Robert Kim", company: "StartupXYZ", department: "Engineering", applicants: 28, status: "Approved", published: "1/12/2024" },
  { id: 4, title: "Product Manager", poster: "Amanda Foster", company: "DesignStudio", department: "Product", applicants: 15, status: "Rejected", published: "1/7/2024" },
  { id: 5, title: "Senior Data Scientist", poster: "Michael Thompson", company: "Enterprise Solutions", department: "Data & Analytics", applicants: 45, status: "Active", published: "1/14/2024" },
  { id: 6, title: "DevOps Engineer", poster: "Sarah Chen", company: "CloudTech", department: "Infrastructure", applicants: 31, status: "Approved", published: "1/10/2024" },
  { id: 7, title: "Mobile Developer", poster: "David Rodriguez", company: "AppStudio", department: "Development", applicants: 19, status: "Pending", published: "1/9/2024" },
  { id: 8, title: "UI/UX Designer", poster: "Jennifer Martinez", company: "TechCorp Inc.", department: "Design", applicants: 32, status: "Active", published: "1/5/2024" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-700";
    case "Pending": return "bg-yellow-100 text-yellow-700";
    case "Approved": return "bg-blue-100 text-blue-700";
    case "Rejected": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export default function JobManagementTable() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
      {/* Top Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
        <input
          type="text"
          placeholder="Search jobs by title, company, or poster..."
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap items-center gap-2">
          <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm">
            <option>Status: All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm">
            <option>Category: All</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-2 py-1 text-sm">
            <option>Dept: All</option>
          </select>
          <button className="text-sm text-gray-600 hover:text-red-500">✕ Clear</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full rounded border-collapse text-sm">
          <thead>
            <tr className="bg-[#EDEDED] text-gray-700 text-left">
              <th className="p-3">Job Details</th>
              <th className="p-3">Poster / Company</th>
              <th className="p-3">Department</th>
              <th className="p-3">Applicants</th>
              <th className="p-3">Status</th>
              <th className="p-3">Published</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-[#E5E7EB] hover:bg-gray-50">
                <td className="p-3">
                  <div className="font-medium text-gray-900">{job.title}</div>
                  <div className="text-xs text-gray-500">ID: {job.id}</div>
                </td>
                <td className="p-3">
                  <div className="font-medium">{job.poster}</div>
                  <div className="text-xs text-gray-500">{job.company}</div>
                </td>
                <td className="p-3">{job.department}</td>
                <td className="p-3 text-blue-600 font-medium cursor-pointer">{job.applicants}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                    {job.status}
                  </span>
                </td>
                <td className="p-3 text-[#6B7280]">{job.published}</td>
                <td className="p-3 text-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 bg-[#DBEAFE] rounded-full p-1"><IoEyeOutline /></button>
                  <button className="text-green-500 hover:text-green-700 bg-[#DCFCE7] rounded-full p-1"><IoCheckmarkSharp /></button>
                  <button className="text-red-500 hover:text-red-700 bg-[#FEE2E2] rounded-full p-1"><AiOutlineClose /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-3">Showing {jobs.length} of {jobs.length} jobs</p>
    </div>
  );
}
