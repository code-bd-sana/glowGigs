"use client";
import React from "react";
import Image from "next/image";

const GetInTouch = () => {
  return (
    <section className="bg-white py-24 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start relative">
        {/* LEFT SIDE */}
        <div className="relative flex flex-col justify-start">
          <h2 className="text-5xl font-serif text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-10 max-w-md">
            Contact us to list your business or inquire about job opportunities.
          </p>

        
          
        </div>

        {/* RIGHT SIDE FORM (FLOATING OVER IMAGE) */}
        <div className="relative">
          <div className="absolute -top-40 -right-20 bg-white rounded-2xl  p-8 border border-gray-100 w-[90%] md:w-[95%] lg:w-[90%] z-5">
            <form className="space-y-6">
              {/* Business Name */}
              <div>
                <label
                  htmlFor="businessName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  placeholder="Enter your business name"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contact Email*
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>

              {/* Job Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Job Listing Description*
                </label>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe your job openings"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-[#156EF4] text-white font-semibold px-10 py-3 rounded-full hover:bg-blue-600 transition-all"
                >
                  Submit Your Listing
                </button>
              </div>
            </form>
          </div>
        </div>

        
      </div>
      <div className="rounded-2xl mx-auto max-w-7xl h-[450px] overflow-hidden relative z-0">
            <Image
              src="/Home/getintouch.avif"
              alt="Get in touch visual"
              width={700}
              height={450}
              className="w-full h-auto object-cover"
            />
          </div>
    </section>
  );
};

export default GetInTouch;
