import React from 'react';
import { GrFormSchedule } from 'react-icons/gr';
import { MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md';
import userimg from '@/app/(public)/dashboard/user.png'
import Image from 'next/image';
import profile from '@/app/(public)/dashboard/profile2.png'

interface Job {
  title: string;
  applicants: number;
  date: string;
  status: 'active' | 'pending' | 'closed';
}

interface JobPoster {
  name: string;
  company: string;
  email: string;
  phone: string;
  joined: string;
  status: 'active' | 'suspended';
  jobs: Job[];
}

const JobPosterDetails: React.FC = () => {
  const poster: JobPoster = {
    name: 'John Anderson',
    company: 'TechCorp Inc.',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    joined: '2024-01-15',
    status: 'active',
    jobs: [
      {
        title: 'Senior React Developer',
        applicants: 45,
        date: '2024-05-15',
        status: 'active',
      },
      {
        title: 'UI/UX Designer',
        applicants: 32,
        date: '2024-05-10',
        status: 'active',
      },
      {
        title: 'Product Manager',
        applicants: 28,
        date: '2024-03-28',
        status: 'pending',
      },
      {
        title: 'DevOps Engineer',
        applicants: 19,
        date: '2024-03-05',
        status: 'active',
      },
    ],
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'closed':
        return 'bg-gray-100 text-gray-600';
      default:
        return '';
    }
  };

  return (
    <div className="md:p-6 bg-gray-50 min-h-screen">
      <button className="text-blue-500 text-sm mb-4 hover:underline">{`← Back to List`}</button>
      <h6 className="text-xl font-semibold mb-6">Job Poster Details</h6>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Profile */}
        <div className="bg-white p-6 rounded-lg shadow col-span-1">
          <div className="flex flex-col items-center text-center">
            <Image src={userimg} alt='img'/>
            <h6 className="text-lg font-semibold mt-4">{poster.name}</h6>
            <p className="text-sm text-gray-500 mb-2 py-2">{poster.company}</p>
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-600 capitalize">
              {poster.status}
            </span>
          </div>
          <div className="mt-6 text-sm space-y-6 text-gray-700 ">
            <p className='flex items-center gap-2 text-[#9CA3AF]'><strong><MdOutlineMail className='text-lg'/></strong> <span className='text-[#4B5563]'>{poster.email}</span></p>
            <p className='flex items-center gap-2 text-[#9CA3AF]'><strong><MdOutlineLocalPhone  className='text-lg'/></strong> <span className='text-[#4B5563]'>+1 (555) 123-4567</span></p>
            <p className='flex items-center gap-2 text-[#9CA3AF]'><strong><GrFormSchedule className='text-lg'/></strong> <span className='text-[#4B5563]'>Joined 2024-01-15</span></p>
        
          </div>
        </div>

        {/* Right - Posted Jobs */}
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h4 className="text-md font-semibold mb-4">Posted Jobs</h4>
          <div className="space-y-3">
            {poster.jobs.map((job, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center border border-[#E5E7EB] p-4 rounded-md "
              >
                <div>
                  <p className="font-medium">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.applicants} applicants</p>
                </div>
                <div className="text-right text-xs">
                  
                  <span
                    className={`inline-block mt-1 px-2 py-1 rounded-full font-semibold text-xs ${getStatusBadge(
                      job.status
                    )}`}
                  >
                    {job.status}

                  </span>
                  <p className='mt-1.5 text-[#6B7280]'>{job.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosterDetails;
