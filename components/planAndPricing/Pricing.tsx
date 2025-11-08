"use client";
import React, { useState } from "react";
import SectionHeader from "../shared/SectionHeader/SectionHeader";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import SecondaryButton from "../shared/SecondaryButton";

export default function Pricing() {
  interface Pricing {
    type: string;
    price: number;
    stripePriceId: string; 
    description: string;
    activeFeature: string[];
    deactiveFeature?: string[];
  }

  const [loading, setLoading] = useState<string | null>(null);

  const pricing: Pricing[] = [
    {
      type: "Basic",
      price: 19,
      stripePriceId: "price_1SR9WdLgZdKW43fRYUriYdM2",
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
      stripePriceId: "price_1SR9XsLgZdKW43fRNcAHUday",
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
      stripePriceId: "price_1SR9YYLgZdKW43fRWCu3p9rF", 
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

  // 👇 Stripe checkout function
  const handleCheckout = async (priceId: string) => {
    try {
      setLoading(priceId);
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to start checkout.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mt-16 max-w-7xl mx-auto ">
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
        ${idx === 1 ? "lg:scale-110 shadow-xl border-[#5a8be0]" : "shadow-md"}
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
            {/* hi Butler */}

            {/* Button */}
            <div className="mt-6 flex justify-center">
              <button
                disabled={loading === price.stripePriceId}
                onClick={() => handleCheckout(price.stripePriceId)}
              >
                <SecondaryButton
                  type="button"
                  text={
                    loading === price.stripePriceId
                      ? "Redirecting..."
                      : "Choose Plan"
                  }
                />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
