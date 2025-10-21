"use client";

import { useCreateJobMutation } from "@/features/JobSlice";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
interface JobForm {
  title: string;
  department: string;
  jobType: string;
  minSalary: string;
  maxSalary: string;
  description: string;
}
export default function CreateJobPost() {
  const [formData, setFormData] = useState<JobForm>({
    title: "",
    department: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    description: "",
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [createJob, { isLoading }] = useCreateJobMutation();

  // handle text, select, textarea changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle file input
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formdata ", formData);

    const jobData = {
      ...formData,
      logoName: logo?.name || null,
    };

    try {
      await createJob(jobData).unwrap();
      alert("Job created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create job!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm rounded-2xl p-8 mt-10"
    >
      <p className="text-2xl font-semibold mb-4">Create New Job Post</p>
      <p className="text-gray-500 mb-6">
        Fill in the details to post a new job opening
      </p>

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
            placeholder="e.g. Senior Frontend Developer"
            className="w-full border border-gray-200 rounded-md px-4 py-3 focus:ring focus:ring-blue-100 outline-none"
          />
        </div>
        <div>
          <label className="block border-b- text-sm font-medium text-gray-600 mb-1">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md px-4 py-[13px] text-gray-600"
          >
            <option value="">Select Department</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="hr">Human Resources</option>
          </select>
        </div>
      </div>

      {/* Job Type & Salary */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md px-4 py-[13px] text-gray-600"
          >
            <option value="">Select Job Type</option>
            <option value="fulltime">Full-Time</option>
            <option value="parttime">Part-Time</option>
            <option value="remote">Remote</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Minimum Salary
          </label>
          <input
            name="minSalary"
            value={formData.minSalary}
            onChange={handleChange}
            type="number"
            placeholder="50000"
            className="w-full border border-gray-200 rounded-md px-4 py-3 focus:ring focus:ring-blue-100 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Maximum Salary
          </label>
          <input
            name="maxSalary"
            value={formData.maxSalary}
            onChange={handleChange}
            type="number"
            placeholder="80000"
            className="w-full border border-gray-200 rounded-md px-4 py-3 focus:ring focus:ring-blue-100 outline-none"
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
          className="w-full border border-gray-200 rounded-md px-4 py-3 h-32 focus:ring focus:ring-blue-100 outline-none"
        ></textarea>
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Company Logo/Banner
        </label>
        <label
          htmlFor="logoUpload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:bg-gray-50 transition"
        >
          <FiUpload className="text-3xl text-gray-400 mb-2" />
          {logo ? (
            <p className="text-gray-700">{logo.name}</p>
          ) : (
            <>
              <p className="text-gray-600">
                Click to upload logo or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</p>
            </>
          )}
          <input
            id="logoUpload"
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
        >
          Save as Draft
        </button>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          Publish Job
        </button>
      </div>
    </form>
  );
}
