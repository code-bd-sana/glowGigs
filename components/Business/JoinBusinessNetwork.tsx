import React from "react";

const JoinBusinessNetwork = () => {
  return (
    <section className="flex items-center justify-center text-white bg-gradient-to-br from-[#f0efca] to-[#83a7dc] py-24">
      <div className="max-w-2xl mx-auto text-center px-4">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-serif  mb-3">
          Join Our Business Network
        </h2>
        <p className=" mb-10">
          Connect with professionals and grow your business
        </p>

        {/* Form */}
        <form className="space-y-6">
          <div className="text-left">
            <label
              htmlFor="businessName"
              className="block font-medium mb-1"
            >
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              placeholder="Enter your business name"
              className="w-full border bg-white text-gray-600 border-gray-300 rounded-lg px-4 py-3  focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#176be0] text-white font-semibold px-12 py-4 rounded-full hover:bg-blue-600 transition-all"
            >
              Submit Your Listing
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default JoinBusinessNetwork;
