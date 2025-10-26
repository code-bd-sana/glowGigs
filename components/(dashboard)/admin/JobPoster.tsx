'use client'
import { useAllEmployeerQuery } from '@/features/UserApi';
import Link from 'next/link';
import React, { useState } from 'react';

interface JobPoster {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  status: string;
  postedJobs?: number;
  applicants?: number;
}

export default function JobPoster() {
  const { data: jobPosterData, isLoading, error } = useAllEmployeerQuery();
  const [selectedPoster, setSelectedPoster] = useState<JobPoster | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Transform API data to match our table structure
  const posters = jobPosterData?.data?.map((poster: any) => ({
    id: poster._id,
    name: poster.fullName,
    company: poster.companyName || 'N/A',
    email: poster.email,
    phone: poster.phoneNumber,
    postedJobs: poster.postedJobs || 0, // You might need to calculate this from actual jobs data
    applicants: poster.applicants || 0, // You might need to calculate this from actual applicants data
    status: poster.status || 'Active',
    _id: poster._id
  })) || [];

  const handleStatusChange = (poster: JobPoster) => {
    setSelectedPoster(poster);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    if (selectedPoster) {
      const newStatus = selectedPoster.status === 'active' ? 'suspended' : 'active';
      console.log('Changing status for:', selectedPoster.email, 'to:', newStatus);
      // Here you would typically make an API call to update the status
      // updateEmployerStatus({ id: selectedPoster._id, status: newStatus });
    }
    setShowStatusModal(false);
    setSelectedPoster(null);
  };

  const closeModal = () => {
    setShowStatusModal(false);
    setSelectedPoster(null);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-center items-center h-32">
          <div className="text-lg text-red-500">Error loading job posters</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
        <h6 className="text-lg font-semibold">Manage Job Posters</h6>
        <button className="bg-[#2199E8] cursor-pointer text-white text-sm px-4 py-2 rounded">
          + Add New Poster
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center mb-4 gap-3">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name, ID, email..."
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
        <div className="flex gap-2 items-center">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-[#475569] font-medium ">
            <tr>
              <th className="py-3 px-4">Poster / Company</th>
              <th className="py-3 px-4">Contact</th>
              <th className="py-3 px-4">Posted Jobs</th>
              <th className="py-3 px-4">Total Applicants</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posters.map((poster: any) => (
              <tr key={poster.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="font-medium text-[#000000]">{poster.name}</div>
                  <div className="text-xs text-gray-500">{poster.company}</div>
                </td>
                <td className="py-4 px-4 text-sm">
                  <div>{poster.email}</div>
                  <div className="text-xs text-gray-500">{poster.phone}</div>
                </td>
                <td className="py-4 px-4 text-center">{poster.postedJobs}</td>
                <td className="py-4 px-4 text-center">{poster.applicants}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      poster.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {poster.status.charAt(0).toUpperCase() + poster.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm space-x-2">
                  <Link href={`/dashboard/job-posters/${poster._id}`}>
                    <button className="text-[#EF4444] hover:underline">Info</button>
                  </Link>
                  <button 
                    className="text-indigo-500 hover:underline"
                    onClick={() => handleStatusChange(poster)}
                  >
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-[#000000]">
        <span>Showing 1-{posters.length} of {posters.length} posters</span>
        <div className="space-x-4">
          <button className="hover:underline">Previous</button>
          <button className="hover:underline">Next</button>
        </div>
      </div>

      {/* Status Change Modal */}
      {showStatusModal && selectedPoster && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Change Status</h3>
            <p className="mb-4">
              Are you sure you want to change the status  from{' '}
              <span className={`font-semibold ${
                selectedPoster.status === 'active' ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedPoster.status}
              </span>{' '}
              to{' '}
              <span className={`font-semibold ${
                selectedPoster.status === 'active' ? 'text-red-600' : 'text-green-600'
              }`}>
                {selectedPoster.status === 'active' ? 'suspended' : 'active'}
              </span>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="px-4 py-2 bg-[#2199E8] text-white rounded-md text-sm hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}