import React from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import Image from "next/image";
import image1 from "../../public/jobs/job1.jpg";
import image2 from "../../public/jobs/job2.jpg";
import image3 from "../../public/jobs/job3.jpg";
import image4 from "../../public/jobs/job4.jpg";
import { StaticImageData } from "next/image";
import Button from "../shared/Button";
import SecondaryButton from "../shared/SecondaryButton";
import Link from "next/link";

const JobListing = () => {
  interface Job {
    image: StaticImageData;
    heading: string;
    description: string;
  }

  const jobs: Job[] = [
    {
      image: image1,
      heading: "Find Your Fit",
      description: "Connect with top companies in the industry.",
    },

    {
      image: image2,
      heading: "Specialist Roles",
      description: "Discover roles for health and beauty experts.",
    },
    {
      image: image3,
      heading: "Flexible Positions",
      description: "Work on your terms with various options.",
    },
    {
      image: image4,
      heading: "Career Growth",
      description: "Enhance your skills and advance your career.",
    },
  ];
  return (
    <div
      className="min-h-screen flex flex-col items-center pt-20 px-4"
      style={{
        background: "linear-gradient(135deg, #f0efca, #83a7dc)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SectionHeader title="Job Opportunities" description="" align="center" />
      <p className="text-base text-center text-gray-600  w-full md:w-9/12">
        Explore exciting roles in health and beauty.
      </p>

      {/* Job listing */}

      <section className="grid max-w-7xl mx-auto grid-cols-1 mt-24  lg:grid-cols-2 gap-24">
        {jobs.map((job, idx) => (
          <div key={idx}>
            <Image src={job.image} alt={job.heading} width={600} height={600}  className="rounded-3xl"/>

         <div className="mt-6 ml-2 ">
           <div className="flex items-center justify-between">
                <strong className="text-[#0d141a] text-3xl">{job.heading}</strong>
               <p className="text-[#0d141a] text-4xl mr-4 cursor-pointer">→</p>
           </div>
                <p className="text-base  text-gray-600 mt-2 w-full md:w-9/12">
       {job?.description}


      </p>
         </div>
          </div>
        ))}
    
      </section>
       <div className="mx-auto flex justify-center mt-6">
           <Link href="/all-jobs">
            <SecondaryButton type="button" text="Explore Jobs Here"/>
           </Link>
     </div>
    </div>
  );
};

export default JobListing;
