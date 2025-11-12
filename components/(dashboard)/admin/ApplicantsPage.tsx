import Link from 'next/link';
import React from 'react';

interface Applicant {
  name: string;
  email: string;
  phone: string;
  applications: number;
  lastActive: string;
  status: 'Active' | 'Banned';
}

const applicants: Applicant[] = [
  {
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '+1 (555) 456-7890',
    applications: 15,
    lastActive: 'Jan 16, 2024',
    status: 'Active',
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '+1 (555) 345-6789',
    applications: 6,
    lastActive: 'Jan 13, 2024',
    status: 'Banned',
  },
  {
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: '+1 (555) 678-9012',
    applications: 4,
    lastActive: 'Jan 11, 2024',
    status: 'Active',
  },
  {
    name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    phone: '+1 (555) 567-8901',
    applications: 9,
    lastActive: 'Jan 12, 2024',
    status: 'Active',
  },
  {
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 234-5678',
    applications: 12,
    lastActive: 'Jan 14, 2024',
    status: 'Active',
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    applications: 8,
    lastActive: 'Jan 15, 2024',
    status: 'Active',
  },
];

export default function ApplicantsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Job Applicants</h2>
          <p className="text-sm text-gray-500">Manage and review job applications</p>
        </div>
        <div className="text-sm text-right text-blue-600 font-semibold">
          Total Applicants: <span>{applicants.length}</span>
        </div>
      </div>

      {/* Search & Sort */}
      <div className="bg-white rounded-md shadow p-4 flex flex-col md:flex-row justify-between gap-4 mb-4">
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

        <div className="w-full md:w-1/4">
          <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Sort Order</option>
            <option>Ascending</option>
            <option>Descending</option>
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
              <th className="py-3 px-4">Last Active</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {applicants.map((applicant, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Name */}
                <td className="py-4 px-4 font-medium">{applicant.name}</td>

                {/* Contact */}
                <td className="py-4 px-4">
                  <div>{applicant.email}</div>
                  <div className="text-xs text-gray-500">{applicant.phone}</div>
                </td>

                {/* Applications */}
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium text-xs">
                    {applicant.applications} applications
                  </span>
                </td>

                {/* Last Active */}
                <td className="py-4 px-4 text-sm">{applicant.lastActive}</td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      applicant.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {applicant.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 space-x-2">
              <Link href={'/dashboard/job-applicants/3974'}>
                  <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-3 py-1 text-xs rounded-md">
                    View Profile
                  </button></Link>
                  {applicant.status === 'Active' ? (
                    <button className="bg-red-100 text-red-500 px-3 py-1 text-xs rounded-md">
                      Ban
                    </button>
                  ) : (
                    <button className="bg-green-100 text-green-600 px-3 py-1 text-xs rounded-md">
                      Unban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
