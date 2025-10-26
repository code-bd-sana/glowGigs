"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useCreateJobMutation } from "@/features/JobSlice";
import { FiUpload } from "react-icons/fi";

// ✅ Updated interface with strict unions
export interface JobFormType {
  title: string;
  department: string;
  companyName: string;
  companyLocation: string;
  jobType: "Full-time" | "Part-time" | "Remote";
  payType:
    | "Competitive"
    | "Performance Bonus"
    | "Tips(for service-based roles)"
    | "Employee Discount on products/services"
    | "Referral bonus program"
    | "Paid training or certification";
  description: string;
  companyPerks: string[];
  thumbnail?: string;
}

export default function CreateJobPost() {
  const [formData, setFormData] = useState<JobFormType>({
    title: "",
    department: "",
    companyName: "",
    companyLocation: "",
    jobType: "Full-time", // default valid value
    payType: "Competitive", // default valid value
    description: "",
    companyPerks: [],
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [createJob, { isLoading }] = useCreateJobMutation();

  // Handle input/select/textarea changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnail(file);
  };

  // Upload thumbnail to imgbb
  const uploadThumbnail = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=08dd2c25fadca9984c9fe58a66d619e7`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error.message || "Image upload failed");

    return data.data.url;
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      let thumbnailUrl = "";
      if (thumbnail) {
        thumbnailUrl = await uploadThumbnail(thumbnail);
      }

      const jobPayload = { ...formData, thumbnail: thumbnailUrl };
      await createJob(jobPayload).unwrap();

      alert("Job created successfully!");
      setFormData({
        title: "",
        department: "",
        companyName: "",
        companyLocation: "",
        jobType: "Full-time",
        payType: "Competitive",
        description: "",
        companyPerks: [],
      });
      setThumbnail(null);
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to create job!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm rounded-2xl p-8 mt-10"
    >
      <p className="text-2xl font-semibold mb-4">Create New Job Post</p>

      {/* Job Title & Department */}
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Job Title
          </label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Junior Software Engineer"
            className="w-full border border-gray-200 rounded-md px-4 py-3 focus:ring focus:ring-blue-100 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md px-4 py-[13px] text-gray-600"
            required
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      {/* Company Name & Location */}
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Company Name
          </label>
          <input
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your Company Name"
            className="w-full border border-gray-200 rounded-md px-4 py-3 focus:ring focus:ring-blue-100 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Company Location
          </label>
          <input
            name="companyLocation"
            type="text"
            value={formData.companyLocation}
            onChange={handleChange}
            placeholder="Your Company Location"
            className="w-full border border-gray-200 rounded-md px-4 py-3 focus:ring focus:ring-blue-100 outline-none"
            required
          />
        </div>
      </div>

      {/* Job Type & Pay Type */}
      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md px-4 py-[13px] text-gray-600"
            required
          >
            <option value="Full-time">Full-Time</option>
            <option value="Part-time">Part-Time</option>
            <option value="Remote">Remote</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Pay Type
          </label>
          <select
            name="payType"
            value={formData.payType}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md px-4 py-[13px] text-gray-600"
            required
          >
            <option value="Competitive">Competitive</option>
            <option value="Performance Bonus">Performance Bonus</option>
            <option value="Tips(for service-based roles)">
              Tips(for service-based roles)
            </option>
            <option value="Employee Discount on products/services">
              Employee Discount on products/services
            </option>
            <option value="Referral bonus program">
              Referral bonus program
            </option>
            <option value="Paid training or certification">
              Paid training or certification
            </option>
          </select>
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Job Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the job responsibilities, requirements, and qualifications..."
          className="w-full border border-gray-200 rounded-md px-4 py-3 h-32 focus:ring focus:ring-blue-100 outline-none"
          required
        />
      </div>

      {/* Company Perks */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">Company Perks</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Wellness services",
            "Access to wellness facilities",
            "Employee wellness programs",
            "Flexible scheduling",
            "Schedule & Flexibility",
            "Flexibility hours or scheduling",
            "Part-time or full-time availability",
            "Remote or hybrid options",
            "Ability to set your own schedule",
          ].map((perk) => (
            <label
              key={perk}
              className={`flex items-center border rounded-lg px-3 py-2 cursor-pointer transition ${
                formData.companyPerks?.includes(perk)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                className="checkbox checkbox-neutral rounded mr-2" // add a color class
                checked={formData.companyPerks?.includes(perk) || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFormData((prev) => {
                    const companyPerks = prev.companyPerks || [];
                    return {
                      ...prev,
                      companyPerks: checked
                        ? [...companyPerks, perk]
                        : companyPerks.filter((p) => p !== perk),
                    };
                  });
                }}
              />

              {perk}
            </label>
          ))}
        </div>
      </div>

      {/* Thumbnail Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Thumbnail
        </label>
        <label
          htmlFor="thumbnailUpload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:bg-gray-50 transition"
        >
          <FiUpload className="text-3xl text-gray-400 mb-2" />
          {thumbnail ? (
            <p className="text-gray-700">{thumbnail.name}</p>
          ) : (
            <>
              <p className="text-gray-600">
                Click to upload logo or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
            </>
          )}
          <input
            id="thumbnailUpload"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          {isLoading ? "Publishing..." : "Publish Job"}
        </button>
      </div>
    </form>
  );
}
