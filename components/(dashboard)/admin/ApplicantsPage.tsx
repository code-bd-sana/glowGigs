'use client';

import { useAllApplicantsQuery, useUpdateApplicantStatusMutation } from '@/features/UserApi';
import Link from 'next/link';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

// 🧩 Applicant টাইপ ডেফিনিশন
interface Applicant {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  applications?: number;
  createdAt: string;
  status: 'active' | 'banned';
}

interface PaginationInfo {
  total: number;
  page: number;
  totalPages: number;
}

export default function ApplicantsPage() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [showBanModal, setShowBanModal] = useState<boolean>(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const limit = 5;

  const { data, isLoading, refetch } = useAllApplicantsQuery({
    page,
    limit,
    search: debouncedSearch,
    sortOrder,
  });

  const [updateApplicantStatus] = useUpdateApplicantStatusMutation();

  // ⏳ Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const applicants: Applicant[] = data?.data ?? [];
  const pagination: PaginationInfo | undefined = data?.pagination;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'asc' | 'desc');
    setPage(1);
  };

  const handleBanClick = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setShowBanModal(true);
  };

  const handleConfirmBan = async () => {
    if (!selectedApplicant) return;
    try {
      const newStatus: 'active' | 'banned' =
        selectedApplicant.status === 'active' ? 'banned' : 'active';

      await updateApplicantStatus({
        id: selectedApplicant._id,
        status: newStatus,
      }).unwrap();

      refetch();
      setShowBanModal(false);
      setSelectedApplicant(null);
    } catch (error) {
      console.error('Error updating applicant status:', error);
    }
  };

  const handleCloseModal = () => {
    setShowBanModal(false);
    setSelectedApplicant(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading applicants...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Job Applicants</h2>
          <p className="text-sm text-gray-500">Manage and review job applications</p>
        </div>
        <div className="text-sm text-right text-blue-600 font-semibold">
          Total Applicants: <span>{pagination?.total ?? 0}</span>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="bg-white rounded-md shadow p-4 flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name, ID, email..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
            {applicants.map((applicant, idx) => (
              <tr
                key={applicant._id ?? idx}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-4 px-4">
                  <div className="font-medium">{applicant.fullName}</div>
                  <div className="text-xs text-gray-500">ID: {applicant._id}</div>
                </td>
                <td className="py-4 px-4">
                  <div>{applicant.email}</div>
                  <div className="text-xs text-gray-500">{applicant.phoneNumber ?? 'N/A'}</div>
                </td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-xs">
                    {applicant.applications ?? 0} applications
                  </span>
                </td>
                <td className="py-4 px-4 text-sm">
                  {new Date(applicant.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      applicant.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {applicant.status === 'active' ? 'Active' : 'Banned'}
                  </span>
                </td>
                <td className="py-4 px-4 space-x-2">
                  <Link href={`/dashboard/job-applicants/${applicant._id}`}>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs rounded-md">
                      View Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => handleBanClick(applicant)}
                    className={`px-3 py-1 text-xs rounded-md transition ${
                      applicant.status === 'active'
                        ? 'bg-red-100 hover:bg-red-200 text-red-500'
                        : 'bg-green-100 hover:bg-green-200 text-green-600'
                    }`}
                  >
                    {applicant.status === 'active' ? 'Ban' : 'Unban'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applicants.length === 0 && (
          <div className="text-center py-8 text-gray-500">No applicants found</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className={`px-4 py-2 rounded-md ${
            page === 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>

        <p className="text-gray-600 text-sm">
          Page {pagination?.page ?? 1} of {pagination?.totalPages ?? 1}
        </p>

        <button
          disabled={page === pagination?.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className={`px-4 py-2 rounded-md ${
            page === pagination?.totalPages
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>

      {/* Ban/Unban Confirmation Modal */}
      {showBanModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm {selectedApplicant.status === 'active' ? 'Ban' : 'Unban'}
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to{' '}
              {selectedApplicant.status === 'active' ? 'ban' : 'unban'}{' '}
              <strong>{selectedApplicant.fullName}</strong> ({selectedApplicant.email})?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBan}
                className={`px-4 py-2 rounded-md text-white ${
                  selectedApplicant.status === 'active'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                } transition`}
              >
                Confirm {selectedApplicant.status === 'active' ? 'Ban' : 'Unban'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
