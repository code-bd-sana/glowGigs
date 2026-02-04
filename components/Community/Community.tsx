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

        {/* Form */}
        <form className='space-y-6'>
          <div className='text-left'>
            <label
              htmlFor='email'
              className='block  font-medium text-black mb-2'>
              Your Email
            </label>
            <input
              type='text'
              id='email'
              placeholder='Enter your email'
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400'
            />
          </div>

          <div>
            <Link href={"/register"}>
              <button
                type='submit'
                className='bg-black text-white cursor-pointer text-lg px-12 py-4 rounded-full hover:bg-gray-900 transition-all'>
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Community;
