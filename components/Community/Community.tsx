"use client";
import React from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

const Community = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-2xl mx-auto text-center px-4">
        {/* Heading */}

        <SectionHeader
          title="Join Our Community Today"
          subtitle="Connect with top health and beauty professionals"
          align="center"
        />

        {/* Form */}
        <form className="space-y-6">
          <div className="text-left">
            <label
              htmlFor="name"
              className="block  font-medium text-black mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-black text-white  text-lg px-12 py-4 rounded-full hover:bg-gray-900 transition-all"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Community;
