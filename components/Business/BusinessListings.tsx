"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import SecondaryButton from "@/components/shared/SecondaryButton";

export default function PriceingEmployee() {
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

  // ✅ Employer pricing plans with fewer features
  const pricing: Pricing[] = [
    {
      type: "Starter",
      price: 29,
      stripePriceId: "price_1SRrDSLgZdKW43fRuVF1DXCC",
      description: "",
      activeFeature: [
        `Post up to 1 job listings`,
        `Receive direct applications`,
      ],
      deactiveFeature: [
        `Message talent directly`,
        `Access to showcase portfolios`,
      ],
    },
    {
      type: "Growth",
      price: 99,
      stripePriceId: "price_1SRrEJLgZdKW43fRHQB05bZ8",
      description: "",
      activeFeature: [
        `Post unlimited job listings`,
        `Message talent directly`,
        `Full talent directory access`,
        `Access showcase portfolios`,
      ],
    },
    {
      type: "Enterprise",
      price: 199,
      stripePriceId: "price_1SRrEhLgZdKW43fRE1VlXVnl",
      description: "",
      activeFeature: [
        `Post 5 job listings`,
        `Message talent directly`,
        `Access to premium candidate pool`,
        `Priority listing placement`,
      ],
        deactiveFeature: [
       
        `Access showcase portfolios`,
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
    <div className=" mx-auto">
   
  

      <section className="flex flex-col bg-[linear-gradient(86deg,rgba(201,199,56,0.27),rgba(40,103,199,0.6))] p-12 lg:flex-row justify-center gap-8 ">
        {pricing.map((plan, idx) => (
          <div
            key={idx}
            className={`w-full p-6 rounded-2xl border ${
              idx === 1
                ? "shadow-2xl lg:w-96 p-12 border-black border-2"
                : "border lg:w-80 border-gray"
            } bg-gradient-to-br flex flex-col justify-between`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">{plan.type}</h3>
              <p className="font-bold text-xl">${plan.price} /Month</p>
            </div>

            {/* Features */}
            <div className="mt-16">
              {plan.activeFeature.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 mb-2">
                  <RiCheckboxCircleFill className="text-green-600 text-2xl mt-0.5 flex-shrink-0" />
                  <p className="text-gray-800 text-lg">{feature}</p>
                </div>
              ))}
              {plan.deactiveFeature?.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2 mb-2">
                  <IoCloseCircle className="text-black text-2xl mt-0.5 flex-shrink-0" />
                  <p className="text-gray-500 text-lg">{feature}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-6 flex justify-center">
              <button
                disabled={loading === plan.stripePriceId}
                onClick={() =>
                  handleCheckout(plan.stripePriceId, plan.type.toLowerCase())
                }
              >
                <SecondaryButton
                  type="button"
                  text={
                    loading === plan.stripePriceId
                      ? "Redirecting..."
                      : "Choose Your Plan"
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