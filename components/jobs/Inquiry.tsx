import React from "react";
import Image from "next/image";
import image from "../../public/jobs/inquery2.jpg";
import Link from "next/link";

export default function Inquiry() {
  return (
    <section className="max-w-7xl mx-auto min-h-screen flex items-center px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
        
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-serif text-[#0d141a] leading-tight">
            Land your dream job today
          </h1>

          <p className="text-gray-600 max-w-md">
            Connect with top health and beauty professionals now!
          </p>

          <Link href="/all-jobs" className="flex items-center justify-center mx-auto text-center">
            <button className="mt-4  px-8 py-3 rounded-full border border-black text-sm hover:bg-black hover:text-white transition">
              Get Started
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src={image}
            alt="Inquiry"
            width={520}
            height={380}
            className="rounded-2xl object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
}
