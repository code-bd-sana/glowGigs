"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { RiCheckboxCircleFill } from "react-icons/ri";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

export default function Pricing() {
  interface Pricing {
    type: string;
    price: number;
    stripePriceId: string;
    description: string;
    activeFeature: string[];
    deactiveFeature?: string[];
  }

  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const pricing: Pricing[] = [
    {
      type: "Basic Pack",
      price: 19.99,
      stripePriceId: "price_1SR9WdLgZdKW43fRYUriYdM2",
      description: "",
      activeFeature: [
        "Apply up to 5 listings a month",
        "Create a searchable profile",
      ],
      deactiveFeature: [
        "Chat directly with employers",
        "Create showcase portfolio",
      ],
    },
    {
      type: "Pro Pack",
      price: 99.99,
      stripePriceId: "price_1SR9XsLgZdKW43fRNcAHUday",
      description: "",
      activeFeature: [
        "Apply to unlimited listings",
        "Chat directly with employers",
        "Create showcase portfolio",
        "VIP listing placement",
      ],
    },
    {
      type: "Bronze Pack",
      price: 49.99,
      stripePriceId: "price_1SR9YYLgZdKW43fRWCu3p9rF",
      description: "",
      activeFeature: [
        "Apply up to 15 listings a month",
        "Chat directly with employers",
        "Full access to directory",
      ],
      deactiveFeature: ["Create showcase portfolio"],
    },
  ];

  const handleCheckout = async (priceId: string, plan: string) => {
    try {
      setLoading(priceId);
      const userId = session?.user?.id;
      if (!userId) {
        alert("Please log in before purchasing a plan.");
        setLoading(null);
        return;
      }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, userId, plan: plan.toLowerCase() }),
      });

      const data = await res.json();

      if (res.ok && data?.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe error:", data);
        alert(data?.error || "Unable to start checkout session.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className='mt-16  mx-auto  '>
      <SectionHeader
        title="It's your time to shine"
        description=''
        align='center'
      />
      <p className='text-base text-center text-gray-600 mt-2 w-full md:w-9/12 mx-auto'>
        Discover flexible pricing plans to connect with employers in your
        industry.
      </p>

      <section className='flex flex-col bg-[linear-gradient(86deg,rgba(201,199,56,0.27),rgba(40,103,199,0.6))] p-12 lg:flex-row justify-center gap-8 mt-16'>
        {pricing.map((plan, idx) => (
          <div
            key={idx}
            className={`w-full p-6 rounded-2xl border ${
              idx === 1
                ? "lg:w-96 p-12 border-black border-2"
                : "border lg:w-80 border-gray"
            } bg-gradient-to-br ${
              idx === 0 ? "" : idx === 1 ? "" : ""
            } flex flex-col justify-between`}>
            {/* Header */}
            <div className='flex flex-col justify-center items-center gap-2 mb-4'>
              <h3 className='font-bold text-xl'>{plan.type}</h3>
              <p className='font-bold text-xl'>${plan.price} /Month</p>
            </div>

            {/* Features */}
            <div className='mt-16'>
              {plan.activeFeature.map((feature, fIdx) => (
                <div key={fIdx} className='flex items-start gap-2 mb-2'>
                  <RiCheckboxCircleFill className='text-green-600 text-2xl mt-0.5 flex-shrink-0' />
                  <p className='text-gray-800 text-lg'>{feature}</p>
                </div>
              ))}
              {plan.deactiveFeature?.map((feature, fIdx) => (
                <div key={fIdx} className='flex items-start gap-2 mb-2'>
                  <IoCloseCircle className='text-black text-2xl mt-0.5 flex-shrink-0' />
                  <p className='text-gray-500 text-lg'>{feature}</p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className='mt-6  flex justify-center'>
              <button
                disabled={loading === plan.stripePriceId}
                onClick={() => handleCheckout(plan.stripePriceId, plan.type)}>
                {/* <SecondaryButton
                  type='button'
                  text={
                    loading === plan.stripePriceId
                      ? "Redirecting..."
                      : "Choose Your Plan"
                  }
                /> */}
                <button className='px-4 py-2 md:px-14 md:py-4 text-white cursor-pointer hover:bg-[#1f1c1c] text-center mx-auto rounded-full my-2 lg:my-10 bg-[#166be0] hover:text-white transition'>
                  {loading === plan.stripePriceId
                    ? "Redirecting..."
                    : "Choose Your Plan"}
                </button>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
