import React from "react";
import Image from "next/image";

const BusinessListings = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-0 text-center">
        {/* Section Heading */}
        <h2 className="text-5xl font-serif text-gray-900 mb-3">
          Business Listings
        </h2>
        <p className="text-gray-600 mb-16">
          Connect with professionals and showcase your business opportunities
          effectively.
        </p>

        {/* Two-column Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="flex flex-col h-full">
            <div className="bg-gray-100 flex-1 flex flex-col justify-center text-left px-8 py-10">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Job Applications
              </p>
              <p className="text-gray-600 leading-relaxed">
                Professionals can apply directly to your job listings or message
                you for opportunities.
              </p>
            </div>
            <Image
              src="/Home/bl1.avif"
              alt="Job Applications"
              width={800}
              height={500}
              className="w-full h-[380px] object-cover"
            />
          </div>

          {/* Card 2 */}
          <div className="flex flex-col h-full">
            <div className="bg-gray-100 flex-1 flex flex-col justify-center text-left px-8 py-10">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Submit Your Listing
              </p>
              <p className="text-gray-600 leading-relaxed">
                Easily submit your business listing to attract potential
                employees and clients.
              </p>
            </div>
            <Image
              src="/Home/bl2.avif"
              alt="Submit Listing"
              width={800}
              height={500}
              className="w-full h-[380px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessListings;
