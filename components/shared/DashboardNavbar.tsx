import React from 'react';

const DashboardNavbar: React.FC = () => {
  return (
    <div className="w-full bg-white shadow px-6 py-3 flex items-center justify-between">
      {/* Left Side - Title */}
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>

      {/* Middle - Search Bar */}
      <div className="relative w-full max-w-md mx-6">
        <input
          type="text"
          placeholder="Search agents, statements..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </div>

      {/* Right Side - Notification & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="relative">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://via.placeholder.com/32" // Replace with actual image
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-right">
            <p className="text-sm font-medium">Alamin Khan</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
