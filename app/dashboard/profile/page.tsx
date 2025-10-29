"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export default function ProfilePage() {
  const { data: session } = useSession();
  console.log(session)
  const [activeTab, setActiveTab] = useState<"personal" | "security">("personal");

  const [formData, setFormData] = useState({
    firstName: session?.user?.name?.split(" ")[0],
    lastName: session?.user?.name?.split(" ")[1],
    email: session?.user?.email || "alex.johnson@jobboardpro.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Platform Administrator",
    department: "Operations",
    bio: "Experienced platform administrator with over 5 years in managing job board platforms and user communities. Passionate about creating seamless user experiences and driving platform growth.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = () => {
    // Example: Call RTK Query mutation here to update backend
    console.log("Updated Profile Data:", formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
          <p className="text-gray-500 text-sm">
            Manage your profile and account preferences
          </p>
        </div>

        {/* TABS */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab("personal")}
              className={`flex items-center gap-2 pb-3 ${
                activeTab === "personal"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <FaUser /> Personal Information
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex items-center gap-2 pb-3 ${
                activeTab === "security"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <FaLock /> Security
            </button>
          </nav>
        </div>

        {/* PERSONAL INFO TAB */}
        {activeTab === "personal" && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Update your personal details and profile information
            </p>

            {/* PROFILE PICTURE */}
            <div className="flex items-center gap-5 mb-8">
              <div className="relative w-20 h-20">
                <Image
                  src={session?.user?.image || "/profile.png"}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover border"
                />
              </div>
              <button className="text-blue-600 text-sm font-medium hover:underline">
                Change Photo
              </button>
            </div>

            {/* BASIC INFO */}
            <h3 className="font-medium text-gray-800 mb-3">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* PROFESSIONAL INFO */}
            <h3 className="font-medium text-gray-800 mb-3">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* BIO */}
            <div className="mb-8">
              <label className="block text-sm text-gray-600 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 focus:ring-1 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-400 mt-1">
                {formData.bio.length}/300 characters
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Update Profile
              </button>
            </div>
          </div>
        )}

        {/* SECURITY TAB */}
        {activeTab === "security" && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <FaLock className="text-blue-500" /> Security
            </h2>
            <h3 className="font-medium text-gray-800 mb-4">Change Password</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition">
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
