"use client";
import Image from "next/image";
import hand from "../../public/Home/hand.avif";
import inject from "../../public/Home/inject.avif";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

const OurMission = () => {
  return (
    <section className='flex   flex-col-reverse text-white  md:flex-row   max-w-7xl mx-auto rounded-3xl'>
      {/* Left Image */}
      <div className='relative'>
        <div className='md:w-[300px] lg:w-[450px]'>
          <Image
            src={hand} // replace with your image name in /public
            alt='Spa treatment'
            width={400}
            height={400}
            className='rounded-xl lg:rounded-3xl object-cover w-full'
          />
        </div>
        <div className='w-[180px] lg:w-[250px] absolute top-38 md:top-32 -right-3 md:-right-40'>
          <Image
            src={inject} // replace with your image name in /public
            alt='Spa treatment'
            width={200}
            height={300}
            className='rounded-xl lg:rounded-3xl object-cover w-full'
          />
        </div>
      </div>

      {/* Right Content */}

      <div className=' p-6 pl-48 bg-[#F8F8E7] lg:max-h-[250px] text-center md:text-left space-y-4 text-white'>
        <SectionHeader
          title='Our Mission'
          description='We aim to provide a seamless platform for specialists to find rewarding opportunities and for companies to discover exceptional talent'
          align='left'
        />
      </div>
    </section>
  );
};

export default OurMission;
