import Image from "next/image";
import Link from "next/link";
import image1 from "../../public/jobs/job4.jpg";

const JobListing = () => {
  return (
    <section
      className='min-h-screen w-full flex flex-col items-center justify-center px-6 py-24'
      style={{
        background: "linear-gradient(135deg, #eef0cf, #8fb1de)",
      }}>
      {/* Header */}
      <div className='flex flex-col justify-center items-center text-center gap-5'>
        <h1 className='text-3xl md:text-6xl font-bold'>Job Opportunities</h1>
        <p>Explore exciting roles in the health and beauty industry.</p>
      </div>

      {/* Content */}
      <div className='max-w-6xl w-full mt-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
        {/* Left Image */}
        <div className='flex justify-center'>
          <Image
            src={image1}
            alt='Job Opportunity'
            width={420}
            height={320}
            className='rounded-2xl object-cover'
            priority
          />
        </div>

        {/* Right Text */}
        <div className='space-y-8 text-left'>
          <div>
            <h3 className='text-2xl font-semibold text-[#0d141a]'>
              Find Your Fit
            </h3>
            <p className='text-gray-600 mt-1'>
              Connect with top companies in the industry.
            </p>
          </div>

          <div>
            <h3 className='text-2xl font-semibold text-[#0d141a]'>
              Specialty Roles
            </h3>
            <p className='text-gray-600 mt-1'>
              Discover roles for your health and beauty niche.
            </p>
          </div>

          <div>
            <h3 className='text-2xl font-semibold text-[#0d141a]'>
              Career Growth
            </h3>
            <p className='text-gray-600 mt-1'>
              Advance your career to the next level.
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className='mt-20'>
        <Link href='/all-jobs'>
          {/* <SecondaryButton type='button' text='Explore Jobs Here' /> */}
          <button className='px-4 py-2 md:px-14 md:py-4 text-black cursor-pointer hover:bg-[#1f1c1c] text-center mx-auto rounded-full my-2 lg:my-10 bg-white hover:text-white transition'>
            Explore Jobs Here
          </button>
        </Link>
      </div>
    </section>
  );
};

export default JobListing;
