import React from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import { Interface } from "readline";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import SecondaryButton from "../shared/SecondaryButton";

export default function Pricing() {
  interface Pricing {
    type: string;
    price: number;
    description: string;
    activeFeature: string[];
    deactiveFeature?: string[];
  }

  const pricing: Pricing[] = [
    {
      type: "Basic",
      price: 19,
      description:
        "Ideal for individuals just entering the industry or seeking part time work",
      activeFeature: [
        `Create a professional profile visible in search sults`,
        `Apply to up to 5 job listings per month`,
        `Receive email alerts for new jobs in your area`,
        `Bookmark/save jobs for`,
        `Limited visibility in the professional directions`,
      ],
      deactiveFeature: [
        `Full access to the employer directory`,
        `Ability to message employers directly`,
        `Priority listing placement`,
      ],
    },
    {
      type: "Pro",
      price: 99,
      description:
        "Ideal for professionals wanting maximum exposure and direct opportunities",
      activeFeature: [
        `Apply to up unlimited listing per month`,
        `Receive email alerts for new jobs in your area`,
        `Bookmark/save jobs for later`,
        `Full visibility in the professional directions`,
        `Full access to the employer directory`,
        `Ability to message employers directly`,
        `VIP listing placement`,
        `Featured placement on "Top Professionals" page`,
        `Showcase your portfolio, certifications and social links Direct connect requests from employers (without needing to apply)`,
      ],
  
    },
    {
      type: "Bronze",
      price: 19,
      description:
        "Ideal for actively job-seeking professionals wanting more reach and applications",
      activeFeature: [
        `Apply to up to 15 job listings per month`,
        `Receive email alerts for new jobs in your area`,
        `Bookmark/save jobs for later`,
        `Full visibility in the professional directions`,
        `Full access to the employer directory`,
        `Ability to message employers directly`,
        `Priority listing placement`,
      ],
      deactiveFeature: [
        `Featured placement on "Top Professionals" page`,
        `Ability to message employers directly`,
        `Showcase your portfolio, certifications and social links`,
      ],
    },
  ];

  return (
    <div className="mt-16 min-h-screen max-w-7xl mx-auto ">
      <SectionHeader
        title="It's your time to shine"
        description=""
        align="center"
      />
      <p className="text-base text-center flex mx-auto justify-center text-gray-600 mt-2 w-full md:w-9/12">
        Discover flexible pricing plans to connect employers in your industry.
      </p>

      {/* pricing */}

    <section className="lg:flex flex-wrap px-8 sm:px-16 lg:px-0 justify-center gap-16 mt-32 ">
  {pricing?.map((price, idx) => (
    <div
      key={idx}
      className={`bg-[#f0f4fa] w-full my-4 lg:my-0 lg:w-[340px] border rounded-2xl p-6 border-[#8cade0] flex flex-col justify-between
        ${idx === 1 ? 'lg:scale-110 shadow-xl border-[#5a8be0]' : 'shadow-md'}
        transition-transform duration-300 ease-in-out`}
    >
      <div>
        <div className="flex justify-between mt-4">
          <h4 className="font-bold text-xl">{price.type}</h4>
          <h4 className="font-bold text-xl">${price?.price} / mo</h4>
        </div>

        <p className="mx-auto w-[90%] text-center my-6 text-gray-700">
          {price?.description}
        </p>

        {/* Active features */}
        {price?.activeFeature?.map((item, idx2) => (
          <div key={idx2} className="flex  gap-3 my-2">
            <RiCheckboxCircleFill className="text-green-700 text-2xl flex-shrink-0 mt-1" />
            <p className="text-lg leading-tight">{item}</p>
          </div>
        ))}

        {/* Deactive features */}
        {price?.deactiveFeature?.map((item, idx3) => (
          <div key={idx3} className="flex  gap-3 my-2">
            <IoCloseCircle className="text-red-600 text-2xl flex-shrink-0" />
            <p className="text-lg leading-tight">{item}</p>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-6 flex justify-center">
        <SecondaryButton type="button" text="Choose Plan" />
      </div>
    </div>
  ))}
</section>

 
 
 
    </div>
  );
}
