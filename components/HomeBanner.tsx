import React from "react";

const HomeBanner = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #f0efca, #83a7dc)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center">
        <div className="flex justify-center">
            <h1 className="text-[56px] leading-[73px] max-w-xl font-extrabold text-white mb-16">
          Your pathway to glowing career opportunities
        </h1>
        </div>
        <p className="text-lg text-[#262868] font-extrabold mb-16">
          Join our platform to find top job opportunities in health and beauty.
        </p>
        <button className="text-white px-12 mb-6 py-3 text-lg font-medium rounded-full  border border-white">
          Get Started
        </button>

         <h1 className="text-[56px] leading-[73px] max-w-5xl font-extrabold text-white my-4">
          Employers, find your next star
        </h1>
      </div>

      <div className="mt-16 grid grid-cols-1 text-[#363972] sm:grid-cols-3 gap-3 text-center">
        <div className="bg-[#ccd9e0] p-12 ">
          <p className="text-xl font-semibold mb-4">
            Find Specialists
          </p>
          <p className="">Connect with talented professionals.</p>
        </div>
        <div className="bg-[#ccd9e0] p-12 ">
          <p className="text-xl font-semibold mb-4">
            Post Jobs
          </p>
          <p className="">
            Start the search for new team members.
          </p>
        </div>
        <div className="bg-[#ccd9e0] p-12 ">
          <p className="text-xl font-semibold  mb-4">
            Unlock Talent
          </p>
          <p className="">Join our growing network today.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
