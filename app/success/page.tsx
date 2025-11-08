"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    if (sessionId) {
      console.log("Stripe session:", sessionId);
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center"
    style={{
        background: "linear-gradient(135deg, #f0efca, #83a7dc)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      {loading ? (
        <h2 className="text-xl font-semibold text-gray-700 animate-pulse">
          Verifying payment...
        </h2>
      ) : (
        <>
          <h1 className="text-7xl font-bold text-white mb-3">
            🎉 Payment Successful!
          </h1>
          <p className="text-white text-xl mb-6">
            Thank you for subscribing! your plan is now active.
          </p>

          <Link
            href="/dashboard"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Go to Dashboard
          </Link>
        </>
      )}
    </div>
  );
}
