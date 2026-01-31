const HomeBanner = () => {
  return (
    <div
      className='min-h-screen flex flex-col pt-20'
      style={{
        background: "linear-gradient(135deg, #f0efca, #83a7dc)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className=''>
        <div className='text-center'>
          <div className='flex justify-center'>
            <h1 className='text-[56px] leading-[73px] max-w-xl font-extrabold text-[#070F14] mb-16'>
              Your pathway to glowing career opportunities
            </h1>
          </div>
          <p className='text-[16px] text-[#000000] font-extrabold mb-16'>
            Join our platform to find top job opportunities in health and
            beauty.
          </p>
          <button className=' px-12 bg-white text-black mb-6 py-3 text-lg font-medium rounded-full  border border-white'>
            Get Started
          </button>

          <h1 className='text-[56px] text-center mx-auto leading-[73px] max-w-5xl font-extrabold text-[#000000] mt-4'>
            Employers, find your next star
          </h1>
        </div>

        <div className='mt-10 max-w-7xl mx-auto px-2 text-black  lg:px-0 grid grid-cols-1 text-[#363972] mb-16 md:grid-cols-3 gap-3 text-center'>
          <div className='bg-[#ccd9e0]  p-12 '>
            <p className='text-xl font-semibold mb-4'>Find Specialists</p>
            <p className=''>Connect with talented professionals.</p>
          </div>
          <div className='bg-[#ccd9e0] p-12 '>
            <p className='text-xl font-semibold mb-4'>Post Jobs</p>
            <p className=''>Keep your business moving smoothly</p>
          </div>
          <div className='bg-[#ccd9e0] p-12 '>
            <p className='text-xl font-semibold  mb-4'>Unlock Talent</p>
            <p className=''>Give your team the glow up it needs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
