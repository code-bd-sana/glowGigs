import React from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import Image from "next/image";
import image1 from "../../public/jobs/job4.jpg";
import SecondaryButton from "../shared/SecondaryButton";
import Link from "next/link";

const JobListing = () => {
  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-24"
      style={{
        background: "linear-gradient(135deg, #eef0cf, #8fb1de)",
      }}
    >
      {/* Header */}
      <SectionHeader
        title="Job Opportunities"
        description="Explore exciting roles in the health and beauty industry."
        align="center"
      />

      {/* Content */}
      <div className="max-w-6xl w-full mt-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Image */}
        <div className="flex justify-center">
          <Image
            src={image1}
            alt="Job Opportunity"
            width={420}
            height={320}
            className="rounded-2xl object-cover"
            priority
          />
        </div>

        {/* Right Text */}
        <div className="space-y-8 text-left">
          <div>
            <h3 className="text-2xl font-semibold text-[#0d141a]">
              Find Your Fit
            </h3>
            <p className="text-gray-600 mt-1">
              Connect with top companies in the industry.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#0d141a]">
              Specialty Roles
            </h3>
            <p className="text-gray-600 mt-1">
              Discover roles for your health and beauty niche.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-[#0d141a]">
              Career Growth
            </h3>
            <p className="text-gray-600 mt-1">
              Advance your career to the next level.
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="mt-20">
        <Link href="/all-jobs">
          <SecondaryButton type="button" text="Explore Jobs Here" />
        </Link>
      </div>
    </section>
  );
};

export default JobListing;
