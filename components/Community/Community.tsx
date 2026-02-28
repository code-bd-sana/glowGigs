"use client";
import Link from "next/link";
import SectionHeader from "../shared/SectionHeader/SectionHeader";

const Community = () => {
  return (
    <section className='bg-white py-24'>
      <div className='max-w-2xl mx-auto text-center px-4'>
        {/* Heading */}

        <SectionHeader
          title='Join Our Community Today'
          subtitle='Connect with top health and beauty professionals'
          align='center'
        />

        <div>
          <Link href={"/register"}>
            <button
              type='submit'
              className='bg-black text-white cursor-pointer text-lg px-12 py-4 rounded-full hover:bg-gray-900 transition-all'>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Community;
