"use client";
import Image from "next/image";
import React from "react";

const Testimonials = () => {
  return (
    <section
      className="relative bg-fixed bg-center bg-cover text-white py-20 mt-10"
      style={{
        backgroundImage: "url('/Home/testi2.webp')", // তোমার background image path দাও
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 text-center z-10 relative ">
        {/* Testimonial 1 */}
        <div>
          <p className="text-white text-xl mb-3">★★★★★</p>
          <p className="mb-6 text-lg">
            Glowgigs helped me find my dream job in the beauty industry quickly
            and easily!
          </p>
          <div className="flex flex-col items-center">
            <Image
              src="https://i.ibb.co.com/92vzcF2/adventure-1850178-1280.jpg"
              alt="Emily"
              width={50}
              height={50}
              className="rounded-full  w-8 h-8 object-cover border-2 border-white"
            />
            <p className="mt-2 text-sm font-medium">Emily R.</p>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div>
          <p className="text-white text-xl mb-3">★★★★★</p>
          <p className="mb-6 text-lg">
            The platform connects me with top professionals, making hiring a
            breeze.
          </p>
          <div className="flex flex-col items-center">
            <Image
              src="https://i.ibb.co.com/nM2hxfx/pexels-latronico-709188.jpg"
              alt="Mark"
              width={50}
              height={50}
              className="rounded-full w-8 h-8 object-cover border-2 border-white"
            />
            <p className="mt-2 text-sm font-medium">Mark T.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
