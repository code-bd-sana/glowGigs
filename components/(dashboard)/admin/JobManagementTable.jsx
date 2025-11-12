'use client'
import { useGetAllJobsQuery } from "@/features/EmployeeApi";
import React, { useState, useEffect } from "react";
import { IoEyeOutline, IoClose } from "react-icons/io5";

const getStatusColor = (status) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-700";
    case "Pending": return "bg-yellow-100 text-yellow-700";
    case "Approved": return "bg-blue-100 text-blue-700";
    case "Rejected": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Mock departments - replace with actual departments from your API
const departments = [
  "Engineering",
  "Product", 
  "Design",
  "Data & Analytics",
  "Infrastructure",
  "Development",
  "HR"
];

// Job Details Modal Component
const JobDetailsModal = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
            <p className="text-gray-600 mt-1">{job.companyName} • {job.companyLocation}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job ID:</span>
                    <span className="font-medium">{job._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Type:</span>
                    <span className="font-medium">{job.jobType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pay Type:</span>
                    <span className="font-medium">{job.payType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Applicants:</span>
                    <span className="font-medium text-blue-600">{job.applicants?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{formatDate(job.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">{formatDate(job.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Details</h3>
              <div className="space-y-3">
                {job.thumbnail && (
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src={job.thumbnail} 
                        alt={job.companyName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{job.companyName}</p>
                      <p className="text-sm text-gray-600">{job.companyLocation}</p>
                    </div>
                  </div>
                )}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Job Poster ID:</p>
                  <p className="text-xs font-mono text-gray-800 break-all">{job.jobPoster}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>
          </div>

          {/* Company Perks */}
          {job.companyPerks && job.companyPerks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Perks & Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {job.companyPerks.map((perk, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-800 text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Applicants List */}
       

      
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          >
            Close
          </button>
       
        </div>
      </div>
    </div>
  );
};

export default function JobManagementTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error } = useGetAllJobsQuery({
    page,
    limit: 10,
    search: debouncedSearch,
    status: statusFilter !== 'All' ? statusFilter : '',
    department: departmentFilter !== 'All' ? departmentFilter : '',
    sortOrder: 'desc'
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1);
  };

  const handleDepartmentChange = (e) => {
    setDepartmentFilter(e.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setDepartmentFilter('All');
    setPage(1);
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
        <div className="text-lg">Loading jobs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex justify-center items-center">
        <div className="text-red-500 text-lg">Error loading jobs</div>
      </div>
    );
  }

  const jobs = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
      {/* Job Details Modal */}
      <JobDetailsModal 
        job={selectedJob} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />

      {/* Top Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-3 md:space-y-0">
        <input
          type="text"
          placeholder="Search jobs by title, company, or description..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex flex-wrap items-center gap-2">
          <select 
            value={statusFilter}
            onChange={handleStatusChange}
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <select 
            value={departmentFilter}
            onChange={handleDepartmentChange}
            className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
          >
            <option value="All">Dept: All</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <button 
            onClick={handleClearFilters}
            className="text-sm text-gray-600 hover:text-red-500"
          >
            ✕ Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full rounded border-collapse text-sm">
          <thead>
            <tr className="bg-[#EDEDED] text-gray-700 text-left">
              <th className="p-3">Job Details</th>
              <th className="p-3">Company / Location</th>
              <th className="p-3">Job Type</th>
              <th className="p-3">Applicants</th>
              <th className="p-3">Status</th>
              <th className="p-3">Published</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b border-[#E5E7EB] hover:bg-gray-50">
                <td className="p-3">
                  <div className="font-medium text-gray-900">{job.title}</div>
                  <div className="text-xs text-gray-500">ID: {job._id.slice(-8)}</div>
                </td>
                <td className="p-3">
                  <div className="font-medium">{job.companyName}</div>
                  <div className="text-xs text-gray-500">{job.companyLocation}</div>
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {job.jobType}
                  </span>
                </td>
                <td className="p-3 text-blue-600 font-medium cursor-pointer">
                  {job.applicants?.length || 0}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor("Active")}`}>
                    Active
                  </span>
                </td>
                <td className="p-3 text-[#6B7280]">
                  {formatDate(job.createdAt)}
                </td>
                <td className="p-3 text-center space-x-2">
                  <button 
                    onClick={() => handleViewDetails(job)}
                    className="text-blue-500 hover:text-blue-700 bg-[#DBEAFE] rounded-full p-2 hover:bg-blue-100 transition-colors"
                    title="View Details"
                  >
                    <IoEyeOutline size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Data Message */}
        {jobs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {debouncedSearch || statusFilter !== 'All' || departmentFilter !== 'All' 
              ? 'No jobs found matching your filters.' 
              : 'No jobs found.'
            }
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * pagination.limit + 1} to {Math.min(page * pagination.limit, pagination.total)} of {pagination.total} jobs
          </p>
          
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md text-sm ${
                page === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>
            
            <span className="px-4 py-2 text-sm text-gray-600">
              Page {page} of {pagination.totalPages}
            </span>
            
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === pagination.totalPages}
              className={`px-4 py-2 rounded-md text-sm ${
                page === pagination.totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Show total count when no pagination needed */}
      {pagination && pagination.totalPages <= 1 && (
        <p className="text-xs text-gray-500 mt-3">
          Showing {jobs.length} of {pagination.total} jobs
        </p>
      )}
    </div>
  );
}