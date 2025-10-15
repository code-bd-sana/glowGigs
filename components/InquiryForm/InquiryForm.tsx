"use client";
import React, { FormEvent } from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

const InquiryForm: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="pt-16">
      <SectionHeader
        title="Contact Us"
        subtitle="Get in touch for pricing and partnership inquiries."
        align="center"
        titleClassName="text-white"
        subTitleClassName="text-white"
      />
      <section className="flex justify-center items-center py-16 bg-[url('/your-bg.jpg')] bg-cover bg-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-[90%] md:w-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full border border-gray-300 rounded-md px-4 text-black placeholder-gray-600 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Message<span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                placeholder="Type your message here "
                rows={4}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black placeholder-gray-600"
                required
              ></textarea>
            </div>

            {/* Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-[#176be0] hover:bg-blue-700 text-white font-medium px-7 py-3 rounded-full transition"
              >
                Submit Your Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default InquiryForm;
