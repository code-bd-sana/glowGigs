/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaUser, FaLock, FaCloudUploadAlt, FaTrash, FaFileImage } from "react-icons/fa";
import { useGetSingleUserQuery } from "@/features/AuthApi";
import clsx from "clsx";

// === REQUIRED ENV ===
// NEXT_PUBLIC_IMGBB_API_KEY = your_imgbb_api_key
// =====================

type Role = "JOB_SEEKER" | "EMPLOYER";

interface UserDoc {
  _id?: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
  role?: Role;
  img?: string;
  email?: string;
  bio?: string;
  resume?: string;
  certificates?: string[];
  professionalTitle?: string;
}

const MAX_RESUME_MB = 5;
const MAX_CERT_MB = 25;

export default function ProfilePage() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? "";
  const userId = (session as any)?.user?.id;

  const { data: singleUser, isLoading } = useGetSingleUserQuery(email, { skip: !email });

  const [activeTab, setActiveTab] = useState<"personal" | "security">("personal");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<UserDoc>({
    fullName: "",
    phoneNumber: "",
    address: "",
    role: "JOB_SEEKER",
    img: "/profile.png",
    email: "",
    bio: "",
    resume: "",
    certificates: [],
    professionalTitle: "",
  });

  const isJobSeeker = useMemo(() => formData.role === "JOB_SEEKER", [formData.role]);

  useEffect(() => {
    if (singleUser?.data) {
      const u = singleUser.data as UserDoc;
      setFormData({
        fullName: u.fullName || "",
        phoneNumber: u.phoneNumber || "",
        address: u.address || "",
        role: u.role || "JOB_SEEKER",
        img: u.img || "/profile.png",
        email: u.email || "",
        bio: u.bio || "",
        resume: u.resume || "",
        certificates: u.certificates || [],
        professionalTitle: u.professionalTitle || "",
      });
    }
  }, [singleUser]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  // ==== Upload helpers ====
  const uploadToImgbb = async (file: File): Promise<string> => {
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!key) throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY");
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: fd });
    const json = await res.json();
    if (!json?.success) throw new Error("Upload failed");
    return json.data.url;
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) return alert("Only JPG/PNG allowed");
    const url = await uploadToImgbb(file);
    setFormData((s) => ({ ...s, img: url }));
  };

  const handleResumeUpload = async (file: File) => {
    const size = file.size / (1024 * 1024);
    if (size > MAX_RESUME_MB) return alert("Max 5MB");
    if (!["image/jpeg", "image/png"].includes(file.type)) return alert("Only JPG/PNG allowed");
    const url = await uploadToImgbb(file);
    setFormData((s) => ({ ...s, resume: url }));
  };

  const handleCertUpload = async (files: FileList | null) => {
    if (!files) return;
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const size = file.size / (1024 * 1024);
      if (size > MAX_CERT_MB) {
        alert(`${file.name} too large`);
        continue;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert(`${file.name} invalid type`);
        continue;
      }
      const url = await uploadToImgbb(file);
      uploaded.push(url);
    }
    if (uploaded.length) setFormData((s) => ({ ...s, certificates: [...(s.certificates || []), ...uploaded] }));
  };

  const removeCertificate = (url: string) =>
    setFormData((s) => ({ ...s, certificates: (s.certificates || []).filter((c) => c !== url) }));

  // === Save to backend ===
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Update failed");
      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-[#f9fafb] py-10 px-6">
      <div className=" mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
          <p className="text-gray-500 text-sm">Manage your profile and account preferences</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab("personal")}
              className={clsx(
                "flex items-center gap-2 pb-3 transition-colors",
                activeTab === "personal"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              )}
            >
              <FaUser /> Personal Information
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={clsx(
                "flex items-center gap-2 pb-3 transition-colors",
                activeTab === "security"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              )}
            >
              <FaLock /> Security
            </button>
          </nav>
        </div>

        {/* PERSONAL */}
        {activeTab === "personal" && (
          <div className="space-y-8">
            {/* Personal Info */}
            <div>
              <p className="text-lg font-medium text-gray-900 mb-2">Personal Information</p>
              <p className="text-gray-500 text-sm mb-6">
                Update your personal details and profile information
              </p>

              <div className="flex items-center gap-5 mb-6">
                <div className="relative w-20 h-20">
                  <Image
                    src={formData.img || "/profile.png"}
                    alt="Profile"
                    fill
                    className="rounded-full object-cover border"
                  />
                </div>
                <label className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
                  Change Photo
                  <input type="file" accept="image/png,image/jpeg" hidden onChange={handlePhotoChange} />
                </label>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName || ""}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    readOnly
                    className="w-full border border-gray-200 rounded-md px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={onChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {isJobSeeker && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Professional Title</label>
                      <input
                        type="text"
                        name="professionalTitle"
                        value={formData.professionalTitle || ""}
                        onChange={onChange}
                        placeholder="e.g., Frontend Developer"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Professional Summary</label>
                    <textarea
                      name="bio"
                      rows={4}
                      value={formData.bio || ""}
                      onChange={onChange}
                      placeholder="Write a short professional summary..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Resume Upload */}
            {isJobSeeker && (
              <div className="border rounded-lg p-5">
                <p className="font-medium text-gray-800 mb-2">Resume Upload</p>
                <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50">
                  <FaCloudUploadAlt className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p className="text-gray-700 font-medium mb-1">Upload Resume Image (Max 5MB)</p>
                  <label className="inline-block bg-white border px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-100">
                    Choose File
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      hidden
                      onChange={(e) => e.target.files && handleResumeUpload(e.target.files[0])}
                    />
                  </label>
                </div>
                {formData.resume && (
                  <div className="mt-4 border rounded-md p-3 flex items-center gap-3 bg-white">
                    <FaFileImage className="text-gray-500" />
                    <a href={formData.resume} target="_blank" className="text-blue-600 hover:underline break-all">
                      View Resume
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Certificates Upload */}
            {isJobSeeker && (
              <div className="border rounded-lg p-5">
                <p className="font-medium text-gray-800 mb-2">Certificates</p>
                <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50">
                  <FaCloudUploadAlt className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p className="text-gray-700 font-medium mb-1">
                    Upload Certificates (Multiple JPG/PNG, Max 25MB each)
                  </p>
                  <label className="inline-block bg-white border px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-100">
                    Browse Files
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      multiple
                      hidden
                      onChange={(e) => handleCertUpload(e.target.files)}
                    />
                  </label>
                </div>

                {!!formData.certificates?.length && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {formData.certificates.map((url) => (
                      <div key={url} className="relative border rounded-md overflow-hidden">
                        <Image src={url} alt="certificate" width={400} height={300} className="object-cover w-full h-40" />
                        <button
                          onClick={() => removeCertificate(url)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Save button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* SECURITY */}
        {activeTab === "security" && (
          <div className="space-y-4">
            <p className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <FaLock className="text-blue-500" /> Security
            </p>
            <p className="text-sm text-gray-500 mb-3">Change your password</p>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
