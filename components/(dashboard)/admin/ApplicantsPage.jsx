'use client'
import { useGetAllApplicantrQuery, useUpdateApplicantStatusMutation } from '@/features/EmployeeApi';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function ApplicantsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  const { data, isLoading, error } = useGetAllApplicantrQuery({
    page,
    limit: 10,
    search: debouncedSearch,
    sortOrder
  });

  const [updateStatus] = useUpdateApplicantStatusMutation();

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getApplicationsCount = (applicant) => {
    return applicant.applications || 0;
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  const handleStatusChange = async (applicantId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    
    // Show confirmation
    const confirmMessage = `Are you sure you want to ${newStatus === 'suspended' ? 'suspend' : 'activate'} this applicant?`;
    
    if (window.confirm(confirmMessage)) {
      try {
        console.log('Updating status:', { applicantId, newStatus });
        
        const result = await updateStatus({ 
          id: applicantId, 
          status: newStatus 
        }).unwrap();
        
        console.log('Update successful:', result);
        alert(`Applicant ${newStatus === 'suspended' ? 'suspended' : 'activated'} successfully!`);
        
      } catch (error) {
        console.error('Error updating status:', error);
        alert('Error updating applicant status. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <div className="text-lg">Loading applicants...</div>
      </div>
    );
  }

  if (error) {
    console.error('API Error:', error);
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
        <div className="text-red-500 text-lg">Error loading applicants</div>
      </div>
    );
  }

  const apiData = data;
  const applicants = apiData?.data || [];
  const pagination = apiData?.pagination;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Job Applicants</h2>
          <p className="text-sm text-gray-500">Manage and review job applications</p>
        </div>
        <div className="text-sm text-right text-blue-600 font-semibold">
          Total Applicants: <span>{pagination?.total || 0}</span>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="bg-white rounded-md shadow p-4 flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 
              1.415-1.415l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 
              5 5 0 0 1 0 10z" />
          </svg>
        </div>

        <div className="w-full md:w-1/4">
          <select 
            value={sortOrder}
            onChange={handleSortChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm rounded-lg shadow">
          <thead className="text-left text-gray-500 bg-gray-100 font-medium">
            <tr>
              <th className="py-3 px-4">Applicant</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Applications</th>
              <th className="py-3 px-4">Joined Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {applicants.map((applicant) => (
              <tr
                key={applicant._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Name */}
                <td className="py-4 px-4">
                  <div className="font-medium">{applicant.fullName}</div>
                  {applicant.professionalTitle && (
                    <div className="text-xs text-gray-500">{applicant.professionalTitle}</div>
                  )}
                </td>

                {/* Contact */}
                <td className="py-4 px-4">
                  <div>{applicant.email}</div>
                  <div className="text-xs text-gray-500">{applicant.phoneNumber}</div>
                </td>

                {/* Applications */}
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-xs">
                    {getApplicationsCount(applicant)} applications
                  </span>
                </td>

                {/* Joined Date */}
                <td className="py-4 px-4 text-sm">
                  {formatDate(applicant.createdAt)}
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      applicant.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : applicant.status === 'suspended'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {applicant.status ? applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1) : 'N/A'}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 space-x-2">
                  <Link href={`/dashboard/job-applicants/${applicant._id}`}>
                    <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-3 py-1 text-xs rounded-md">
                      View Profile
                    </button>
                  </Link>
                  
                  {/* {applicant.status === 'active' ? (
                    <button 
                      onClick={() => handleStatusChange(applicant._id, applicant.status)}
                      className="bg-red-100 text-red-500 px-3 py-1 text-xs rounded-md hover:bg-red-200 transition"
                    >
                      Suspend
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleStatusChange(applicant._id, applicant.status)}
                      className="bg-green-100 text-green-600 px-3 py-1 text-xs rounded-md hover:bg-green-200 transition"
                    >
                      Activate
                    </button>
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Data Message */}
        {applicants.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {debouncedSearch ? 'No applicants found matching your search.' : 'No applicants found.'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md ${
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
            className={`px-4 py-2 rounded-md ${
              page === pagination.totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}