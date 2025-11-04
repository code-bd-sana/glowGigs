"use client";
import React, { useState } from "react";
import {
  FiUser,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

export default function JobDetailsPage() {
  const [activeTab, setActiveTab] = useState<"details" | "applicants">("details");

  const applicants = [
    {
      id: 1,
      name: "Alice Johnson",
      appliedDate: "Sep 12, 2025",
      status: "Interview Scheduled",
    },
    {
      id: 2,
      name: "Sarah Williams",
      appliedDate: "Sep 15, 2025",
      status: "Under Review",
    },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Senior Frontend Developer
        </h1>
        <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          Delete
        </button>
      </div>

      {/* Job Summary */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
          <FiUser className="w-5 h-5 text-rose-500" />
          <div>
            <p className="text-xs text-gray-500">Applicants</p>
            <p className="font-semibold text-gray-800">24</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
          <FiCalendar className="w-5 h-5 text-yellow-500" />
          <div>
            <p className="text-xs text-gray-500">Interviews</p>
            <p className="font-semibold text-gray-800">1</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
          <FiMapPin className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="font-semibold text-gray-800">San Francisco, CA</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
          <FiDollarSign className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-xs text-gray-500">Salary Range</p>
            <p className="font-semibold text-gray-800">$120,000 - $140,000</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("details")}
            className={`pb-2 font-medium text-sm transition-all ${
              activeTab === "details"
                ? "border-b-2 border-rose-500 text-rose-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Job Details
          </button>
          <button
            onClick={() => setActiveTab("applicants")}
            className={`pb-2 font-medium text-sm transition-all ${
              activeTab === "applicants"
                ? "border-b-2 border-rose-500 text-rose-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Applicants ({applicants.length})
          </button>
        </div>

        {/* Job Details */}
        {activeTab === "details" && (
          <div>
            {/* Image */}
            <div className="bg-white rounded-xl shadow mb-6 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                alt="Job Banner"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Job Info */}
            <div className="bg-white rounded-xl shadow p-6 space-y-6">
              {/* Job Information */}
              <section>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Job Information
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <p>Category: Technology</p>
                  <p>Job Type: Full-time</p>
                  <p>Experience: 5+ years</p>
                </div>
              </section>

              {/* Description */}
              <section>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Description
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We are seeking a highly skilled Senior Frontend Developer to
                  join our dynamic engineering team. You will be responsible for
                  developing and maintaining user-facing web applications using
                  modern JavaScript frameworks.
                </p>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Requirements
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {[
                    "5+ years of experience in frontend development",
                    "Strong knowledge of React or Next.js",
                    "Experience with TypeScript and Tailwind CSS",
                    "Understanding of RESTful APIs",
                    "Knowledge of Git and version control systems",
                  ].map((req, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <FiCheckCircle className="text-green-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Responsibilities */}
              <section>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Responsibilities
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Collaborate with designers and backend developers</li>
                  <li>Develop responsive and reusable UI components</li>
                  <li>Optimize performance for speed and scalability</li>
                  <li>Maintain code quality and ensure best practices</li>
                </ul>
              </section>

              {/* Benefits */}
              <section>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Benefits
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Competitive salary and annual bonus</li>
                  <li>Health, dental, and vision insurance</li>
                  <li>Flexible work hours and remote options</li>
                  <li>Learning and development opportunities</li>
                </ul>
              </section>
            </div>
          </div>
        )}

        {/* Applicants */}
        {activeTab === "applicants" && (
          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            {applicants.map((applicant) => (
              <div
                key={applicant.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-none"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{applicant.name}</h4>
                  <p className="text-sm text-gray-500">
                    Applied on {applicant.appliedDate}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {applicant.status}
                  </span>
                  <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm transition">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
