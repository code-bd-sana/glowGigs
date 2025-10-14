
import React from "react";
import Image from "next/image";

const BuisinessTestimonial = () => {
  return (
    <section className="max-w-7xl mx-auto pb-18">
      <div className="grid md:grid-cols-2">
        {/* Left Image */}
        <div className="relative w-full h-[450px]">
          <Image
            src="/Home/test1.jpg" 
            alt="Laptop workspace"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Blue Section */}
        <div className="bg-[#156EF4] flex flex-col justify-center items-center text-center text-white px-8 py-16">
          {/* Stars */}
          <div className="text-xl mb-6">★★★★★</div>

          {/* Testimonial Text */}
          <p className="max-w-md text-lg leading-relaxed mb-10">
            This platform made it easy to connect with potential employers and
            showcase my business.
          </p>

          {/* Profile */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-3">
              <Image
                src="/Home/test2.avif" 
                alt="John Doe"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-sm font-medium">John Doe</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuisinessTestimonial;
