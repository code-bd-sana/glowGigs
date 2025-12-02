import React from "react";
import Image from "next/image";

const BusinessTestimonial = () => {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 bg-white">
        
        {/* LEFT IMAGE */}
        <div className="relative w-full h-[520px] md:h-[580px]">
          <Image
            src="/Home/test3.jpg"   // ← তোমার গ্রে-স্কেল ল্যাপটপ ইমেজ
            alt="Woman working on laptop"
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT LIGHT CREAM SECTION */}
        <div className="bg-[#F7F5E4] flex flex-col justify-center items-center text-center px-10 py-16">

          {/* TESTIMONIAL 1 */}
          <div className="mb-16 max-w-xl">
            <div className="text-2xl mb-6 tracking-wide">★★★★★</div>

            <p className="text-lg leading-relaxed mb-6 text-gray-800">
              This platform made it easy to connect with potential employees and
              cut hiring time in half.
            </p>

            <p className="text-sm font-medium text-gray-700">Stephanie D.</p>
          </div>

          {/* TESTIMONIAL 2 */}
          <div className="max-w-xl">
            <div className="text-2xl mb-6 tracking-wide">★★★★★</div>

            <p className="text-lg leading-relaxed mb-6 text-gray-800">
              No more wasting time on generic job sites or scouring social
              media for our next hire. This connected us directly with specialists
              in our industry actively seeking work.
            </p>

            <p className="text-sm font-medium text-gray-700">Sarah M.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BusinessTestimonial;
