"use client";
import Image from "next/image";
import Link from "next/link";
import bg from "../../public/bg.jpg";
import img from "../../public/showcase.jpg";

export default function ShowcasePage() {
  return (
    <div className='w-full bg-white'>
      {/* ====================== HERO SECTION ====================== */}
      <section className='w-full'>
        <div className='pt-10 pb-6 text-center'>
          <h1 className='text-5xl font-bold'>
            Get <span className='italic'>Noticed</span>
          </h1>
          <p className='text-sm mt-2 text-gray-600'>
            Stand out. Showcase your work. Secure gigs.
          </p>
        </div>

        {/* Background Image */}
        <div className='relative  w-full h-[620px]'>
          <Image src={bg} alt='bg' fill className='object-cover bg-fixed' />

          {/* Browse Card */}
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='bg-[#FFFFFF] px-16 py-12 rounded shadow-xl text-center'>
              <h2 className='text-3xl font-semibold'>Browse The Talent</h2>
              <p className='text-sm mt-2 text-gray-600'>
                Businesses – Search for your next superstar here
              </p>

              <Link href={"/showcase/showcaseUser"}>
                <button className='mt-4 px-6 cursor-pointer py-2 bg-black text-white rounded-full text-sm'>
                  Launch Showcase
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== STAND OUT SECTION ====================== */}
      <section className='w-full py-20 grid grid-cols-1 md:grid-cols-2 gap-12 px-6 md:px-20 lg:px-32'>
        {/* Left Text */}
        <div className='flex flex-col justify-center'>
          <h6 className='text-4xl text-center font-semibold'>Stand Out Now</h6>

          <p className='mt-5 text-gray-700 text-center leading-relaxed text-[15px]'>
            Want full access to create your portfolio?
            <br />
            <br />
            Upgrade to Pro and turn your talent into opportunity.
            <br />
            <br />
            Showcase your work, certifications, and unique style so businesses
            can see your skill.
            <br />
            <br />
            Stand out, get noticed, and get hired faster.
          </p>

          <div className='flex justify-center'>
            <Link href='/register'>
              <button className='mt-6 px-6 cursor-pointer text-center flex justify-center py-2 bg-black text-white rounded-full text-sm w-fit'>
                Upgrade Now
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className='flex justify-center'>
          <div className='relative w-[330px] h-[420px] rounded-t-full overflow-hidden shadow-lg'>
            <Image src={img} alt='portrait' fill className='object-cover' />
          </div>
        </div>
      </section>
    </div>
  );
}
