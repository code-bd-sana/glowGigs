"use client";
import Image from "next/image";
import Link from "next/link";
import find from "../../public/Home/find.avif";
import Button from "../shared/Button";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

const FindYourPerfect = () => {
  return (
    <div>
      <section className='flex mt-10   text-white flex-col md:flex-row items-center justify-between  max-w-7xl mx-auto rounded-3xl'>
        {/* Left Content */}
        <div className='flex-1 text-center bg-[#F8F8E7] p-6 md:text-left space-y-4 text-white'>
          <SectionHeader
            title='Find your perfect fit'
            description='No more generalized job boards and months of searching'
            align='left'
          />
          <SectionHeader
            title=''
            description='We quiet the internet noise and connect businesses and talented specialists directly'
            align='left'
          />
        </div>

        {/* Right Image */}
        <div className='flex-1'>
          <Image
            src={find} // replace with your image name in /public
            alt='Spa treatment'
            width={600}
            height={400}
            className='rounded-2xl object-cover w-full'
          />
        </div>
      </section>

      <Link
        href={"/register"}
        className='text-center mx-auto flex justify-center'>
        <Button text='Connect Now' />
      </Link>
    </div>
  );
};

export default FindYourPerfect;
