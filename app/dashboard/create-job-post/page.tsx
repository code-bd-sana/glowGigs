"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useCreateJobMutation } from "@/features/JobSlice";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import { useGetCategoriesQuery } from "@/features/categorySlice";
import { useSession } from "next-auth/react";
import { LiaTelegramPlane } from "react-icons/lia";
import Image from "next/image";

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
  deadline: string;
  description: string;
  requirements: string[];
  companyPerks: string[];
  thumbnail?: string;
}

export default function CreateJobPost() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      console.log("Logged-in User ID:", session.user.id);
      console.log("Role:", session.user.role);
      console.log("Email:", session.user.email);
    }
  }, [session, status]);
  const [formData, setFormData] = useState<JobFormType>({
    title: "",
    department: "",
    companyName: "",
    companyLocation: "",
    jobType: "Full-time", // default valid value
    payType: "Competitive", // default valid value
    deadline: "",
    description: "",
    requirements: [],
    companyPerks: [],
  });
  console.log(formData);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [createJob, { isLoading }] = useCreateJobMutation();
  const { data: categories = [], isLoading: isCategoryLoading } =
    useGetCategoriesQuery();
  console.log(categories);

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
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file)); // Set preview URL
    }
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

      // Static IDs for testing
      const staticJobPosterId = session?.user?.id; // replace with a valid user ID from your DB
      const staticApplicantsIds = [
        "650c1234567890abcdef5678",
        "650c1234567890abcdef9012",
      ]; // array of applicant IDs for testing

      const jobPayload = {
        ...formData,
        thumbnail: thumbnailUrl,
        jobPoster: staticJobPosterId,
        applicants: staticApplicantsIds,
      };
      await createJob(jobPayload).unwrap();

      toast.success("Job created successfully!");
      setFormData({
        title: "",
        department: "",
        companyName: "",
        companyLocation: "",
        jobType: "Full-time",
        payType: "Competitive",
        deadline: "",
        description: "",
        requirements: [],
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
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring focus:ring-blue-100 outline-none"
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
            className="w-full border border-gray-300 rounded-md px-4 py-[13px] text-gray-600"
            required
          >
            <option value="">Select Category</option>
            {isCategoryLoading ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            )}
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
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring focus:ring-blue-100 outline-none"
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
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:ring focus:ring-blue-100 outline-none"
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
            className="w-full border border-gray-300 rounded-md px-4 py-[13px] text-gray-600"
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
            className="w-full border border-gray-300 rounded-md px-4 py-[13px] text-gray-600"
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
      {/* deadline & others*/}
      <div className="grid md:grid-cols-4 gap-6 mb-4">
        {/*deadline */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 text-sm mb-1">
            Application Deadline
          </label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent appearance-none"
            required
          />
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
          className="w-full border border-gray-300 rounded-md px-4 py-3 h-32 focus:ring focus:ring-blue-100 outline-none"
          required
        />
      </div>

      {/* Requirements */}
      <div className="mb-7">
        <label className="block text-sm font-medium mb-3">Requirements</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {["Certificates", "License"].map((req) => (
            <label
              key={req}
              className={`flex items-center border rounded-lg px-3 py-2 cursor-pointer transition ${
                formData.requirements?.includes(req)
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <input
                type="checkbox"
                className="checkbox checkbox-neutral rounded mr-2" // add a color class
                checked={formData.requirements?.includes(req) || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFormData((prev) => {
                    const requirements = prev.requirements || [];
                    return {
                      ...prev,
                      requirements: checked
                        ? [...requirements, req]
                        : requirements.filter((p) => p !== req),
                    };
                  });
                }}
              />

              {req}
            </label>
          ))}
        </div>
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

          {previewUrl ? (
            <div className="relative w-32 h-32 mb-2">
              <Image
                src={previewUrl}
                alt="Logo Preview"
                fill
                className="object-contain rounded"
                unoptimized
              />
            </div>
          ) : thumbnail ? (
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
        <div className="px-6 py-3 cursor-pointer border hover:border bg-black text-white rounded-xl hover:bg-white hover:text-black  flex items-center gap-2 transition-all duration-300">
          <LiaTelegramPlane className="text-2xl" />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Publishing..." : "Publish Job"}
          </button>
        </div>
      </div>
    </form>
  );
}
