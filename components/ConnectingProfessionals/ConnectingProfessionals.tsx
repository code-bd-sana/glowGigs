"use client";
import Image from "next/image";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

const ConnectingProfessionals = () => {
  return (
    <section className='bg-[#f7f7e3] mt-20 py-20'>
      <div className='max-w-7xl mx-auto px-6 mb-32 text-center'>
        {/* Header */}
        <SectionHeader
          title='Connecting Professionals'
          subtitle='We bridge the gap between health and beauty specialists and top employers.'
          align='center'
        />
      </div>

      {/* Content Section */}
      <div className='max-w-7xl mx-auto mt-16 flex flex-col md:flex-row items-center justify-between gap-26 px-6'>
        {/* Image */}
        <div className='w-full md:w-[812px] md:h-[440.5px]'>
          <Image
            src='/Home/spa.avif'
            alt='Massage therapy professional'
            width={700}
            height={500}
            className='rounded-2xl object-cover w-full h-auto'
          />
        </div>

        {/* Text Content */}
        <div className='w-full md:w-1/2 space-y-10'>
          <div>
            <p className='text-xl font-semibold text-gray-900'>
              Trusted Partnerships
            </p>
            <p className='text-gray-600 mt-1 text-lg leading-relaxed'>
              We partner with reputable companies to ensure quality placements.
            </p>
          </div>

          <div>
            <p className='text-xl font-semibold text-gray-900'>
              Job Opportunities
            </p>
            <p className='text-gray-600 mt-1 text-lg leading-relaxed'>
              Explore a variety of job openings in health and beauty.
            </p>
          </div>

          <div>
            <p className='text-xl font-semibold text-gray-900'>
              Expert Specialists
            </p>
            <p className='text-gray-600 mt-1 text-lg leading-relaxed'>
              Connect with licensed professionals ready to meet your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectingProfessionals;
