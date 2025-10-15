import React from "react";
import Image, { StaticImageData } from "next/image";
import image1 from "@/public/professionals/blog1.jpg";
import image2 from "@/public/professionals/blog2.jpg";

export default function Blog() {
  interface Blog {
    image: StaticImageData;
    heading: string;
    description: string;
    date: string;
  }
  const blogs: Blog[] = [
    {
      image: image1,
      heading: "Connecting Health and Beauty Professionals with Top Employers",
      description: `At Glowgigs, we bridge the gap between talented health and beauty specialists and
reputable companies looking to hire the best in the industry. Discover exciting job
opportunities and connect with licensed professionals to elevate your career.`,
      date: "5/8/2024",
    },
    {
      image: image2,
      heading: "Connecting Health and Beauty Professionals with Top Employers",
      description: `At Glowgigs, we bridge the gap between talented health and beauty specialists and
reputable companies. Our platform simpl ifies the job search process, ensuring that
licensed professionals find the best opportunities in the industry while employers
discover exceptional talent.`,
      date: "5/8/2024",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4  lg:px-0">
      <section className="lg:flex  mt-28 gap-12">
        {blogs?.map((blog, idx) => (
          <div key={idx} className="mt-8 lg:mt-0">
            <Image src={blog.image} alt="image" className="h-[300px]" />
            <h6 className="text-2xl font-bold mt-4">{blog.heading}</h6>
            <p className="text-base mt-4 text-gray-600  ">
              {blog?.description}
            </p>
            <p className="text-base mt-2 text-gray-600  ">
              {blog?.date} - 1 min read
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
