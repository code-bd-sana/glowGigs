"use client";
import { useRegisterMutation } from "@/features/AuthApi";
import { IUser } from "@/types/user.types";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"JOB_SEEKER" | "EMPLOYER">(
    "JOB_SEEKER"
  );
  const [register, { isLoading, error }] = useRegisterMutation();

  const [formData, setFormData] = useState<Partial<IUser>>({
    role: "JOB_SEEKER",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form submitted:", formData);

  //   try {
  //     const defaultAvatar =
  //       "https://i.ibb.co.com/pvmhnThC/matheus-ferrero-W7b3e-DUb-2-I-unsplash.jpg".trim();

  //     const finalData = {
  //       ...formData,
  //       img: defaultAvatar,
  //     };

  //     const resp = await register(finalData as IUser).unwrap();
  //     console.log(resp, "Registration response");
  //     toast.success("Registration successful!");
  //     window.location.href = "/login";
  //   } catch (error) {
  //     const err = error as FetchBaseQueryError | SerializedError;

  //     if ("data" in err && err.data && typeof err.data === "object") {
  //       const apiError = err.data as { message?: string };
  //       toast.error(apiError.message ?? "Something went wrong!");
  //       return;
  //     }

  //     toast.error("Registration failed. Please try again.");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      const defaultAvatar =
        "https://i.ibb.co.com/pvmhnThC/matheus-ferrero-W7b3e-DUb-2-I-unsplash.jpg".trim();

      const extraJobSeekerFields =
        formData.role === "JOB_SEEKER"
          ? {
              bio: "",
              resume: "",
              certificates: [],
            }
          : {};

      const finalData = {
        ...formData,
        img: defaultAvatar,
        ...extraJobSeekerFields,
      };

      const resp = await register(finalData as IUser).unwrap();
      console.log(resp, "Registration response");
      toast.success("Registration successful!");
      window.location.href = "/login";
    } catch (error) {
      const err = error as FetchBaseQueryError | SerializedError;

      if ("data" in err && err.data && typeof err.data === "object") {
        const apiError = err.data as { message?: string };
        toast.error(apiError.message ?? "Something went wrong!");
        return;
      }

      toast.error("Registration failed. Please try again.");
    }
  };

  const commonFields = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="text-left">
        <label
          htmlFor="fullName"
          className="block font-medium text-gray-900 mb-2"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          required
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          onChange={(e) => handleInputChange("fullName", e.target.value)}
        />
      </div>

      <div className="text-left">
        <label htmlFor="email" className="block font-medium text-gray-900 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          required
          placeholder="Enter your email address"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </div>

      <div className="text-left">
        <label
          htmlFor="password"
          className="block font-medium text-gray-900 mb-2"
        >
          Password *
        </label>
        <input
          type="password"
          id="password"
          required
          placeholder="Create a password"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          onChange={(e) => handleInputChange("password", e.target.value)}
        />
      </div>

      <div className="text-left">
        <label
          htmlFor="phoneNumber"
          className="block font-medium text-gray-900 mb-2"
        >
          Phone Number *
        </label>
        <input
          type="tel"
          id="phoneNumber"
          required
          placeholder="Enter your phone number"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
        />
      </div>

      <div className="text-left md:col-span-2">
        <label
          htmlFor="address"
          className="block font-medium text-gray-900 mb-2"
        >
          Address *
        </label>
        <input
          type="text"
          id="address"
          required
          placeholder="Enter your address"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
      </div>
    </div>
  );

  // const JOB_SEEKERFields = (
  //   <div className="space-y-6">
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //       <div className="text-left">
  //         <label htmlFor="dob" className="block font-medium text-gray-900 mb-2">
  //           Date of Birth *
  //         </label>
  //         <input
  //           type="date"
  //           id="dob"
  //           required
  //           className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
  //           onChange={(e) => handleInputChange("dob", e.target.value)}
  //         />
  //       </div>

  //       <div className="text-left">
  //         <label className="block font-medium text-gray-900 mb-2">
  //           Employment Eligibility *
  //         </label>
  //         <select
  //           className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
  //           onChange={(e) =>
  //             handleInputChange("employmentEligibility", e.target.value)
  //           }
  //         >
  //           <option value="">Select your employment eligibility</option>
  //           <option value="US_CITIZEN">US Citizen</option>
  //           <option value="PERMANENT_RESIDENT">Permanent Resident</option>
  //           <option value="AUTHORIZED_NONCITIZEN">
  //             Authorized Non-Citizen
  //           </option>
  //         </select>
  //       </div>
  //     </div>

  //     <div className="space-y-4">
  //       <div className="flex items-center">
  //         <input
  //           type="checkbox"
  //           id="isAdult"
  //           className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-400"
  //           onChange={(e) => handleCheckboxChange("isAdult", e.target.checked)}
  //         />
  //         <label htmlFor="isAdult" className="ml-2 text-gray-700">
  //           I am 18 years or older
  //         </label>
  //       </div>

  //       <div className="flex items-center">
  //         <input
  //           type="checkbox"
  //           id="isAuthorizedToWorkInUS"
  //           className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-400"
  //           onChange={(e) =>
  //             handleCheckboxChange("isAuthorizedToWorkInUS", e.target.checked)
  //           }
  //         />
  //         <label
  //           htmlFor="isAuthorizedToWorkInUS"
  //           className="ml-2 text-gray-700"
  //         >
  //           I am authorized to work in the US
  //         </label>
  //       </div>

  //       <div className="flex items-center">
  //         <input
  //           type="checkbox"
  //           id="requiresVisaSponsorship"
  //           className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-400"
  //           onChange={(e) =>
  //             handleCheckboxChange("requiresVisaSponsorship", e.target.checked)
  //           }
  //         />
  //         <label
  //           htmlFor="requiresVisaSponsorship"
  //           className="ml-2 text-gray-700"
  //         >
  //           I require visa sponsorship
  //         </label>
  //       </div>

  //       <div className="flex items-center">
  //         <input
  //           type="checkbox"
  //           id="certificationAcknowledged"
  //           required
  //           className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-400"
  //           onChange={(e) =>
  //             handleCheckboxChange(
  //               "certificationAcknowledged",
  //               e.target.checked
  //             )
  //           }
  //         />
  //         <label
  //           htmlFor="certificationAcknowledged"
  //           className="ml-2 text-gray-700"
  //         >
  //           I certify that the information provided is true and accurate *
  //         </label>
  //       </div>
  //     </div>
  //   </div>
  // );

  const JOB_SEEKERFields = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ✅ NEW FIELD: Professional Title */}
        <div className="text-left">
          <label
            htmlFor="professionalTitle"
            className="block font-medium text-gray-900 mb-2"
          >
            Professional Title *
          </label>
          <input
            type="text"
            id="professionalTitle"
            required
            placeholder="e.g., Software Engineer, Fitness Trainer, Makeup Artist"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            onChange={(e) =>
              handleInputChange("professionalTitle", e.target.value)
            }
          />
        </div>
        {/* ✅ END NEW FIELD */}

        <div className="text-left">
          <label htmlFor="dob" className="block font-medium text-gray-900 mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            id="dob"
            required
            className="w-full border bg-gray-200  border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            onChange={(e) => handleInputChange("dob", e.target.value)}
          />
        </div>

        <div className="text-left">
          <label className="block font-medium text-gray-900 mb-2">
            Employment Eligibility *
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            onChange={(e) =>
              handleInputChange("employmentEligibility", e.target.value)
            }
          >
            <option value="">Select your employment eligibility</option>
            <option value="US_CITIZEN">US Citizen</option>
            <option value="PERMANENT_RESIDENT">Permanent Resident</option>
            <option value="AUTHORIZED_NONCITIZEN">
              Authorized Non-Citizen
            </option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAdult"
            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-400"
            onChange={(e) => handleCheckboxChange("isAdult", e.target.checked)}
          />
          <label htmlFor="isAdult" className="ml-2 text-gray-700">
            I am 18 years or older
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isAuthorizedToWorkInUS"
            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-400"
            onChange={(e) =>
              handleCheckboxChange("isAuthorizedToWorkInUS", e.target.checked)
            }
          />
          <label
            htmlFor="isAuthorizedToWorkInUS"
            className="ml-2 text-gray-700"
          >
            I am authorized to work in the US
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="requiresVisaSponsorship"
            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-400"
            onChange={(e) =>
              handleCheckboxChange("requiresVisaSponsorship", e.target.checked)
            }
          />
          <label
            htmlFor="requiresVisaSponsorship"
            className="ml-2 text-gray-700"
          >
            I require visa sponsorship
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="certificationAcknowledged"
            required
            className="w-4 h-4 text-black border-gray-300 rounded focus:ring-gray-400"
            onChange={(e) =>
              handleCheckboxChange(
                "certificationAcknowledged",
                e.target.checked
              )
            }
          />
          <label
            htmlFor="certificationAcknowledged"
            className="ml-2 text-gray-700"
          >
            I certify that the information provided is true and accurate *
          </label>
        </div>
      </div>
    </div>
  );

  const employerFields = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="text-left">
          <label
            htmlFor="companyName"
            className="block font-medium text-gray-900 mb-2"
          >
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            required
            placeholder="Enter your company name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            onChange={(e) => handleInputChange("companyName", e.target.value)}
          />
        </div>

        <div className="text-left">
          <label
            htmlFor="companySize"
            className="block font-medium text-gray-900 mb-2"
          >
            Company Size *
          </label>
          <select
            id="companySize"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            onChange={(e) => handleInputChange("companySize", e.target.value)}
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
            <option value="1000+">1000+ employees</option>
          </select>
        </div>

        <div className="text-left">
          <label
            htmlFor="companyWebsite"
            className="block font-medium text-gray-900 mb-2"
          >
            Company Website
          </label>
          <input
            type="url"
            id="companyWebsite"
            placeholder="https://example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            onChange={(e) =>
              handleInputChange("companyWebsite", e.target.value)
            }
          />
        </div>

        <div className="text-left">
          <label
            htmlFor="industry"
            className="block font-medium text-gray-900 mb-2"
          >
            Industry
          </label>
          <input
            type="text"
            id="industry"
            placeholder="e.g., Technology, Healthcare, Finance"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            onChange={(e) => handleInputChange("industry", e.target.value)}
          />
        </div>
      </div>

      <div className="text-left">
        <label
          htmlFor="companyDescription"
          className="block font-medium text-gray-900 mb-2"
        >
          Company Description
        </label>
        <textarea
          id="companyDescription"
          placeholder="Brief description of your company"
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
          onChange={(e) =>
            handleInputChange("companyDescription", e.target.value)
          }
        />
      </div>
    </div>
  );

  return (
    <section className="bg-white py-16">
      <ToastContainer />
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Create Your Account
          </h2>
          <p className="text-gray-600 text-lg">
            Join our platform as a job seeker or employer
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            type="button"
            className={`flex-1 py-4 px-6 text-center font-medium text-lg border-b-2 transition-colors ${
              activeTab === "JOB_SEEKER"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => {
              setActiveTab("JOB_SEEKER");
              setFormData((prev) => ({ ...prev, role: "JOB_SEEKER" }));
            }}
          >
            Job Seeker
          </button>
          <button
            type="button"
            className={`flex-1 py-4 px-6 text-center font-medium text-lg border-b-2 transition-colors ${
              activeTab === "EMPLOYER"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => {
              setActiveTab("EMPLOYER");
              setFormData((prev) => ({ ...prev, role: "EMPLOYER" }));
            }}
          >
            Employer
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Basic Information
            </h3>
            {commonFields}
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              {activeTab === "JOB_SEEKER"
                ? "Job Seeker Information"
                : "Company Information"}
            </h3>
            {activeTab === "JOB_SEEKER" ? JOB_SEEKERFields : employerFields}
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-black text-white font-medium text-lg px-12 py-4 rounded-full hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-black font-medium hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
