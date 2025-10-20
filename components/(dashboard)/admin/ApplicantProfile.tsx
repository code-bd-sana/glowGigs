import React from 'react';
import profile from '@/app/(public)/dashboard/profile2.png'
import Image from 'next/image';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { LuDownload } from 'react-icons/lu';

const ApplicantProfile: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <button className="mb-4 text-[#4B5563] hover:underline">&larr; Back</button>

      <div className="flex justify-between  mb-6">
        <div className="flex items-center gap-4">
          <Image
            src={profile}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h6 className="text-xl font-semibold">David Thompson</h6>
            <p className="text-sm text-gray-600">david.thompson@email.com</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">Active</span>
          {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Contact Applicant
          </button> */}
        </div>
      </div>

      <div className="border-b border-gray-200 mb-4">
        <span className="inline-block pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">Overview</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1 bg-white p-4 rounded-lg space-y-6">
          <div>
            <h6 className="text-lg font-semibold mb-4">Personal Information</h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className='space-y-2'>
                <p className="font-medium text-[#6B7280]">Full Name</p>
                <p className='text-[#000000]'>David Thompson</p>
              </div>
              <div className='space-y-2'>
                <p className="font-medium text-[#6B7280]">Email</p>
                <p className='text-[#000000]'>david.thompson@email.com</p>
              </div>
              <div className='space-y-2'>
                <p className="font-medium text-[#6B7280]">Phone</p>
                <p className='text-[#000000]'>+1 (555) 456-7890</p>
              </div>
              <div className='space-y-2'>
                <p className="font-medium">Location</p>
                <p className='text-[#000000]'>Seattle, WA</p>
              </div>
              <div className='space-y-2'>
                <p className="font-medium text-[#6B7280]">Experience</p>
                <p className='text-[#000000]'>10 years</p>
              </div>
              <div className='space-y-2'>
                <p className="font-medium text-[#6B7280]">Education</p>
                <p className='text-[#000000]'>PhD in Data Science</p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-medium mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'R'].map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-medium text-[#6B7280] mb-2">Resume</p>
            <div className="flex items-center justify-between ml-4 border border-gray-200   px-4 py-6 rounded-md">
              <span className=" flex items-center gap-2"> <span><IoDocumentTextOutline className='text-[#DC2626] text-5xl p-1 rounded bg-red-200'/></span> <span className='text-[#000000] '>Resume.pdf <br /> <span className='text-[#6B7280]  text-sm'>PDF Document</span></span></span>
              <button className="bg-blue-600 text-white px-4  py-2 text-sm rounded-lg hover:bg-blue-700">
            <p className='flex items-center gap-2'>

              <LuDownload className='text-xl'/>

                 <span>  Download</span>
            </p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-white shadow-sm p-4 rounded-md">
          <h6 className="text-lg font-semibold mb-4">Statistics</h6>
          <div className="text-sm space-y-4">
            <div>
              <p className="font-medium  text-[#6B7280]">Total Applications</p>
              <p className='text-xl font-bold text-black'>15</p>
            </div>
            <div>
              <p className="font-medium text-[#6B7280]">Last Active</p>
              <p className='mt-2'>1/16/2024</p>
            </div>
            <div className='space-y-4'>
              <p className="font-medium text-[#6B7280]">Status</p>
              <span className="bg-green-100 text-green-700 px-2 py-1  rounded-full text-sm">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;
