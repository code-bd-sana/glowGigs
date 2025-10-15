"use client";
import React, { ReactNode } from "react";

type TestimonialsProps = {
  backgroundImage: string;
  height?: string;
  children: ReactNode;
  overlayOpacity?: string;
};

const Testimonial: React.FC<TestimonialsProps> = ({
  backgroundImage,
  height = "min-h-[360px]",
  children,
  overlayOpacity = "bg-black/40",
}) => {
  return (
    <section
      className={`relative bg-fixed bg-center bg-cover text-white mt-10 flex justify-center items-center ${height}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayOpacity}`}></div>

      {/* Children (dynamic content) */}
      <div className="relative z-10 w-full max-w-7xl">{children}</div>
    </section>
  );
};

export default Testimonial;
