/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaUser, FaLock, FaCloudUploadAlt, FaTrash, FaFileImage, FaLink, FaTimes } from "react-icons/fa";
import { useChangePasswordMutation, useGetSingleUserQuery } from "@/features/AuthApi";
import clsx from "clsx";
import { useProfileUpdateMutation } from "@/features/UserApi";
import toast, { Toaster } from "react-hot-toast";

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
  const [changePassword, {isLoading:passwordChangeLoading, error:changePasswordError}] = useChangePasswordMutation();

  const [activeTab, setActiveTab] = useState<"personal" | "security">("personal");
  const [saving, setSaving] = useState(false);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resumeLink, setResumeLink] = useState("");

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
  const [ profileUpdate, {isLoading:updateLoading, error}] = useProfileUpdateMutation()

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
  

  const passwordHandler = async(e)=>{
    e.preventDefault();
    try {

const oldPassword = e.target.oldPassword.value;
const newPassword = e.target.newPassword.value;
const passwordData = {
  email,
  oldPassword,
  newPassword
};

await changePassword(passwordData).unwrap();
toast.success("Password Change Successfull")
      
    } catch (error) {
      console.log(error)
      toast.error(error?.data?.message || "Failed Please try again later!")
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  // ==== Upload helpers ====
  const uploadToImgbb = async (file: File): Promise<string> => {
    const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!key) throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY");
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=e08b74beabe30fbab72611c231923e98`, { method: "POST", body: fd });
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

  const addCertificateLink = (link: string) => {
    if (link.trim()) {
      setFormData((s) => ({ ...s, certificates: [...(s.certificates || []), link.trim()] }));
    }
  };

  const removeCertificate = (url: string) =>
    setFormData((s) => ({ ...s, certificates: (s.certificates || []).filter((c) => c !== url) }));

  // Resume Modal Handlers
  const handleResumeLinkSave = () => {
    console.log("Resume Link:", resumeLink);
    setFormData((s) => ({ ...s, resume: resumeLink }));
    setShowResumeModal(false);
    setResumeLink("");
  };

  // === Save handlers for different sections ===
  const handleSavePersonalInfo = async () => {
    setSavingSection("personal");
    setSaving(true);
    
    const personalData = {
      email,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      professionalTitle: formData.professionalTitle,
      bio: formData.bio,
      img: formData.img
    };

 

    try {
      await  profileUpdate(personalData).unwrap();
      toast.success("Profile Update Successfull")
        setSaving(false);
      setSavingSection(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed! Please try again later!");
      
    } 
  };

  const handleSaveResume = async () => {
    setSavingSection("resume");
    setSaving(true);

    const resumeData = {
      email,
      resume: formData.resume
    };

 

    try {
   

    
      await profileUpdate(resumeData)
      toast.success("Resume Update Successfull")
        setSaving(false);
      setSavingSection(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed Please try again later!');
    } 
  };

  const handleSaveCertificates = async () => {
    setSavingSection("certificates");
    setSaving(true);

    const certificatesData = {
      email,
      certificates: formData.certificates
    };

    console.log("=== CERTIFICATES DATA ===");
    console.log("Certificates:", certificatesData);
    console.log("=========================");

    try {
      

      await profileUpdate(certificatesData).unwrap();
  
      toast.success("Certificates updated successfully!");
        setSaving(false);
      setSavingSection(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed Please Try again later!");
    } 
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-[#f9fafb] py-10 px-6">
      <Toaster/>
      {/* Resume Link Modal */}
      {showResumeModal && (
        <div className="fixed inset-0  backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Resume Link</h3>
              <button
                onClick={() => setShowResumeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            <input
              type="url"
              placeholder="Paste your resume link here..."
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:ring-1 focus:ring-blue-500 outline-none"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleResumeLinkSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save Link
              </button>
            </div>
          </div>
        </div>
      )}

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
            <div className="border border-gray-100 rounded-lg p-5">
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

                  <div className="mb-6">
                    <label className="block text-sm text-gray-600 mb-1">Professional Summary (BIO)</label>
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

              {/* Personal Info Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSavePersonalInfo}
                  disabled={saving && savingSection === "personal"}
                  className="bg-[linear-gradient(180deg,rgba(229,232,203,0.91)_0%,#92B1DA_100%)] text-black px-5 py-2 rounded-md transition disabled:opacity-50"
                >
                  {saving && savingSection === "personal" ? "Saving..." : "Save Personal Info"}
                </button>
              </div>
            </div>

            {/* Resume Upload */}
            {isJobSeeker && (
              <div className="border border-gray-100 rounded-lg p-5">
                <p className="font-medium text-gray-800 mb-2">Resume Management</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <FaCloudUploadAlt className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p className="text-gray-700 font-medium mb-3">Add your resume via link </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setShowResumeModal(true)}
                      className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 flex items-center gap-2"
                    >
                      <FaLink /> Add Resume Link
                    </button>
                  </div>
                </div>
                {formData.resume && (
                  <div className="mt-4 border rounded-md p-3 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      <FaFileImage className="text-gray-500" />
                      <a href={formData.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                        {formData.resume}
                      </a>
                    </div>
                    <button
                      onClick={() => setFormData(s => ({ ...s, resume: "" }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}

                {/* Resume Save Button */}
                <div className="flex justify-end pt-4  mt-4">
                  <button
                    onClick={handleSaveResume}
                    disabled={saving && savingSection === "resume"}
                    className="bg-[linear-gradient(180deg,rgba(229,232,203,0.91)_0%,#92B1DA_100%)] text-black px-5 py-2 rounded-md transition disabled:opacity-50"
                  >
                    {saving && savingSection === "resume" ? "Saving..." : "Save Resume"}
                  </button>
                </div>
              </div>
            )}

            {/* Certificates Upload */}
            {isJobSeeker && (
              <div className="border border-gray-100 rounded-lg p-5">
                <p className="font-medium text-gray-800 mb-2">Certificates</p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 mb-4">
                  <FaCloudUploadAlt className="mx-auto text-3xl text-gray-400 mb-2" />
                  <p className="text-gray-700 font-medium mb-3">
                    Add certificates via link or upload files (Multiple JPG/PNG, Max 25MB each)
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <CertificateLinkInput onAddLink={addCertificateLink} />
                    <label className="bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-100 flex items-center gap-2">
                      <FaCloudUploadAlt /> Upload Files
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        multiple
                        hidden
                        onChange={(e) => handleCertUpload(e.target.files)}
                      />
                    </label>
                  </div>
                </div>

                {!!formData.certificates?.length && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {formData.certificates.map((url) => (
                      <div key={url} className="relative border border-gray-300 rounded-md overflow-hidden group">
                        <div className="h-40 bg-gray-100 flex items-center justify-center">
                          {url.startsWith('http') ? (
                            <Image src={url} alt="certificate" width={400} height={300} className="object-cover w-full h-full" />
                          ) : (
                            <div className="text-center p-4">
                              <FaLink className="text-2xl text-gray-400 mx-auto mb-2" />
                              <p className="text-xs text-gray-600 break-words">{url}</p>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeCertificate(url)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certificates Save Button */}
                <div className="flex justify-end pt-4  mt-4">
                  <button
                    onClick={handleSaveCertificates}
                    disabled={saving && savingSection === "certificates"}
                    className="bg-[linear-gradient(180deg,rgba(229,232,203,0.91)_0%,#92B1DA_100%)] text-black px-5 py-2 rounded-md transition disabled:opacity-50"
                  >
                    {saving && savingSection === "certificates" ? "Saving..." : "Save Certificates"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SECURITY */}
        {activeTab === "security" && (
          <form onSubmit={passwordHandler} className="space-y-4">
            <p className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <FaLock className="text-blue-500" /> Security
            </p>
            <p className="text-sm text-gray-500 mb-3">Change your password</p>
            <input
            name="oldPassword"
              type="password"
              placeholder="Current Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            <div className="flex justify-end">
              <button type="submit" className="bg-[linear-gradient(180deg,rgba(229,232,203,0.91)_0%,#92B1DA_100%)] text-black px-5 py-2 rounded-md transition disabled:opacity-50">
              { passwordChangeLoading ? "Loading..." : "Update Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Certificate Link Input Component
const CertificateLinkInput = ({ onAddLink }: { onAddLink: (link: string) => void }) => {
  const [link, setLink] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddLink = () => {
    if (link.trim()) {
      onAddLink(link.trim());
      setLink("");
      setShowInput(false);
    }
  };

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 flex items-center gap-2"
      >
        <FaLink /> Add Certificate Link
      </button>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <input
        type="url"
        placeholder="Paste certificate link..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none min-w-48"
      />
      <button
        onClick={handleAddLink}
        className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700"
      >
        Add
      </button>
      <button
        onClick={() => setShowInput(false)}
        className="text-gray-500 hover:text-gray-700 px-2"
      >
        <FaTimes />
      </button>
    </div>
  );
};