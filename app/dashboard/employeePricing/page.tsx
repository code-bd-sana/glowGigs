"use client";
import React, { useState } from "react";

import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import SecondaryButton from "@/components/shared/SecondaryButton";


export default function EmployeePricing() {
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
    type: "Starter",
    price: 29,
    stripePriceId: "price_1XXXXStarter",
    description: "Perfect for small businesses or occasional job postings",
    activeFeature: [
      `Post up to 5 job listings per month`,
      `Receive applications via email`,
      `Basic analytics on job performance`,
      `Ability to edit and update job listings`,
    ],
    deactiveFeature: [
      `Priority placement in search results`,
      `Featured listing on homepage`,
      `Direct messaging to top candidates`,
    ],
  },
  {
    type: "Growth",
    price: 99,
    stripePriceId: "price_1XXXXGrowth",
    description: "Ideal for growing companies with frequent hiring needs",
    activeFeature: [
      `Post up to 20 job listings per month`,
      `Receive applications via email`,
      `Advanced analytics on job performance`,
      `Priority placement in search results`,
      `Highlight jobs for better visibility`,
      `Ability to message candidates directly`,
    ],
    deactiveFeature: [
      `Featured listing on homepage`,
      `Access to premium candidate pool`,
    ],
  },
  {
    type: "Enterprise",
    price: 199,
    stripePriceId: "price_1XXXXEnterprise",
    description: "Best for large companies with high-volume hiring",
    activeFeature: [
      `Unlimited job postings`,
      `Receive applications via email and dashboard`,
      `Advanced analytics and reporting`,
      `Priority placement in search results`,
      `Highlight and feature jobs`,
      `Direct messaging to candidates`,
      `Access to premium candidate pool`,
      `Featured listing on homepage`,
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
