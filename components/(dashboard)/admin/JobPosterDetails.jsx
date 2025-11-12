'use client'
import React from 'react';
import { GrFormSchedule } from 'react-icons/gr';
import { MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md';
import userimg from '@/app/(public)/dashboard/user.png'
import Image from 'next/image';
import profile from '@/app/(public)/dashboard/profile2.png'
import { useParams, useRouter } from 'next/navigation';
import { useGetSingleUserQuery } from '@/features/UserApi';
import { useGetJobsByPosterQuery } from '@/features/JobSlice';

const JobPosterDetails = () => {
  const {id} = useParams();
  const router = useRouter();
  
  console.log(id, "this is params id");

  const { data, isLoading, error } = useGetSingleUserQuery(id, {
    skip: !id, 
  });
  
  const { data:jobDetails, isLoading:JobLoading, error:jobError } = useGetJobsByPosterQuery(id, {
    skip: !id, 
  });

  console.log(jobDetails?.data, "amar sob personal job ayyyyyyyy")
  console.log(data?.data, "ami tomar users");
  
  const user = data?.data;
  const jobs = jobDetails?.data || [];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'closed':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-green-100 text-green-600'; // Default to active
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading || JobLoading) {
    return (
      <div className="md:p-6 bg-gray-50 min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="md:p-6 bg-gray-50 min-h-screen">
      <button 
        onClick={handleBack}
        className="text-blue-500 text-sm mb-4 hover:underline"
      >
        {`← Back to List`}
      </button>
      <h6 className="text-xl font-semibold mb-6">Job Poster Details</h6>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Profile - Exactly Same Design */}
        <div className="bg-white p-6 rounded-lg shadow col-span-1">
          <div className="flex flex-col items-center text-center">
            <Image 
              src={user?.img || userimg} 
              alt='img' 
              width={200} 
              height={200} 
              className='rounded-full w-24 h-24 object-cover'
            />
            <h6 className="text-lg font-semibold mt-4">{user?.fullName || 'N/A'}</h6>
            <p className="text-sm text-gray-500 mb-2 py-2">{user?.companyName || 'No company'}</p>
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 capitalize">
              {user?.status || 'active'}
            </span>
          </div>
          <div className="mt-6 text-sm space-y-6 text-gray-700">
            <p className='flex items-center gap-2 text-[#9CA3AF]'>
              <strong><MdOutlineMail className='text-lg'/></strong> 
              <span className='text-[#4B5563]'>{user?.email || 'No email'}</span>
            </p>
            <p className='flex items-center gap-2 text-[#9CA3AF]'>
              <strong><MdOutlineLocalPhone className='text-lg'/></strong> 
              <span className='text-[#4B5563]'>{user?.phoneNumber || 'No phone'}</span>
            </p>
            {/* <p className='flex items-center gap-2 text-[#9CA3AF]'><strong><GrFormSchedule className='text-lg'/></strong> <span className='text-[#4B5563]'>Joined 2024-01-15</span></p> */}
          </div>
        </div>

        {/* Right - Posted Jobs - Exactly Same Design */}
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h4 className="text-md font-semibold mb-4">Posted Jobs</h4>
          <div className="space-y-3">
            {jobs.length > 0 ? (
              jobs.map((job, idx) => (
                <div
                  key={job._id || idx}
                  className="flex justify-between items-center border border-[#E5E7EB] p-4 rounded-md"
                >
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-xs text-gray-500">{job.applicants?.length || 0} applicants</p>
                  </div>
                  <div className="text-right text-xs">
                    <span
                      className={`inline-block mt-1 px-2 py-1 rounded-full font-semibold text-xs ${getStatusBadge('active')}`}
                    >
                      active
                    </span>
                    <p className='mt-1.5 text-[#6B7280]'>{formatDate(job.createdAt)}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No jobs posted yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosterDetails;