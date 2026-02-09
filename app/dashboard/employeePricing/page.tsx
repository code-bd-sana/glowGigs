"use client";

import SecondaryButton from "@/components/shared/SecondaryButton";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { RiCheckboxCircleFill } from "react-icons/ri";

export default function EmployeePricing() {
  interface Pricing {
    type: string;
    price: number;
    stripePriceId: string;
    description: string;
    activeFeature: string[];
    deactiveFeature?: string[];
  }

  const { data: session } = useSession();
  const userId = session?.user?.id;
  console.log(userId);

  const [loading, setLoading] = useState<string | null>(null);

  // ✅ Employer pricing plans
  const pricing: Pricing[] = [
    {
      type: "Starter",
      price: 29,
      stripePriceId: "price_1SRrDSLgZdKW43fRuVF1DXCC",
      description: "Perfect for small businesses or occasional job postings.",
      activeFeature: [
        `Post up to 5 job listings per month`,
        `Receive applications via email`,
        `Basic analytics on job performance`,
        `Edit and update job listings anytime`,
      ],
      deactiveFeature: [
        `Priority placement in search results`,
        `Featured listing on homepage`,
        `Direct messaging with top candidates`,
      ],
    },
    {
      type: "Growth",
      price: 99,
      stripePriceId: "price_1SRrEJLgZdKW43fRHQB05bZ8",
      description: "Ideal for growing companies with frequent hiring needs.",
      activeFeature: [
        `Post up to 20 job listings per month`,
        `Receive applications via email`,
        `Advanced analytics on job performance`,
        `Priority placement in search results`,
        `Highlight jobs for better visibility`,
        `Message candidates directly`,
      ],
      deactiveFeature: [
        `Featured listing on homepage`,
        `Access to premium candidate pool`,
      ],
    },
    {
      type: "Enterprise",
      price: 199,
      stripePriceId: "price_1SRrEhLgZdKW43fRE1VlXVnl",
      description:
        "Best for large organizations with continuous hiring demands.",
      activeFeature: [
        `Unlimited job postings`,
        `Receive applications via email & dashboard`,
        `Advanced analytics and detailed reporting`,
        `Priority placement in search results`,
        `Highlight and feature jobs`,
        `Direct messaging to candidates`,
        `Access to premium candidate pool`,
        `Featured listing on homepage`,
      ],
    },
  ];

  // ✅ Stripe Checkout
  const handleCheckout = async (priceId: string, plan: string) => {
    if (!userId) {
      alert("You must be logged in to subscribe.");
      return;
    }

    try {
      setLoading(priceId);

      console.log("🟢 Checkout request:", {
        priceId,
        userId,
        plan,
        role: "EMPLOYER",
      });

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          userId,
          plan,
          role: "EMPLOYER",
        }),
      });

      const data = await res.json();
      console.log("Stripe Response:", data);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert(data?.error || "Unable to start checkout. Please try again.");
      }
    } catch (err) {
      console.error("❌ Checkout Error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className='mt-16 max-w-7xl mx-auto px-6 md:px-12 lg:px-0 pb-24 flex flex-col items-center justify-center'>
      <SectionHeader
        title='Find the perfect hiring plan'
        description=''
        align='center'
      />
      <p className='text-base text-center text-gray-600 mt-2 max-w-2xl'>
        Flexible plans for every employer — from startups to enterprises.
      </p>

      {/* ✅ Centered Pricing Cards */}
      <section
        className='
        flex flex-wrap justify-center items-stretch 
        gap-10 mt-20 w-full 
        md:px-10 lg:px-0'>
        {pricing.map((plan, idx) => (
          <div
            key={idx}
            className={`bg-[#f0f4fa] w-full sm:w-[340px] border rounded-2xl p-6 border-[#8cade0] flex flex-col justify-between
            ${
              idx === 1
                ? "lg:scale-110 shadow-xl border-[#5a8be0]"
                : "shadow-md"
            }
            transition-transform duration-300 ease-in-out hover:scale-105
          `}>
            <div>
              <div className='flex justify-between mt-4'>
                <h4 className='font-bold text-xl'>{plan.type}</h4>
                <h4 className='font-bold text-xl'>${plan.price} / mo</h4>
              </div>

              <p className='mx-auto text-center my-6 text-gray-700 text-[15px] leading-relaxed'>
                {plan.description}
              </p>

              {/* ✅ Active features */}
              {plan.activeFeature.map((feature, i) => (
                <div key={i} className='flex gap-3 my-2'>
                  <RiCheckboxCircleFill className='text-green-700 text-2xl flex-shrink-0 mt-1' />
                  <p className='text-base leading-tight text-gray-800'>
                    {feature}
                  </p>
                </div>
              ))}

              {/* ❌ Inactive features */}
              {plan.deactiveFeature?.map((feature, i) => (
                <div key={i} className='flex gap-3 my-2'>
                  <IoCloseCircle className='text-red-600 text-2xl flex-shrink-0 mt-1' />
                  <p className='text-base leading-tight text-gray-600'>
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* 🟩 Button */}
            <div className='mt-8 flex justify-center'>
              <button
                disabled={loading === plan.stripePriceId}
                onClick={() =>
                  handleCheckout(plan.stripePriceId, plan.type.toLowerCase())
                }>
                <SecondaryButton
                  type='button'
                  text={
                    loading === plan.stripePriceId
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
