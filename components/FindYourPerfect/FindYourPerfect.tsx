"use client";
import Image from "next/image";
import React from "react";
import find from "../../public/Home/find.avif";
import Button from "../shared/Button";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

const FindYourPerfect = () => {
  return (
    <section className="flex my-10 text-white flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto rounded-3xl">
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left space-y-4 text-white">
        <SectionHeader
          title="Find your perfect fit"
          description="GlowGigs is your online bridge to connect health and beauty specialists with top employers in the industry."
          align="left"
        />
        <Button text="Join Us Now" />
      </div>

      {/* Right Image */}
      <div className="flex-1">
        <Image
          src={find} // replace with your image name in /public
          alt="Spa treatment"
          width={600}
          height={400}
          className="rounded-2xl object-cover w-full"
        />
      </div>
    </section>
  );
};

export default FindYourPerfect;
