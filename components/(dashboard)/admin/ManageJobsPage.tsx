import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import JobManagementTable from "./JobManagementTable";
import ManageJobCard from "./ManageJobCard";

export default function ManageJobsPage() {
  return (
    <div>
      <section>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50  p-4 rounded-md mb-6'>
          {/* Left: Title and subtitle */}
          <div className='space-y-3'>
            <h6 className='text-lg font-semibold text-gray-800'>
              Job Management
            </h6>
            <p className='text-sm text-gray-500'>
              Manage and monitor all job postings across the platform
            </p>
          </div>

          {/* Right: Buttons */}
          <div className='flex gap-2 mt-4 md:mt-0'>
            <Link href={"/dashboard/create-job-post"}>
              <button className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition'>
                <FaPlus className='text-white' />
                Add New Job
              </button>
            </Link>
          </div>
        </div>
      </section>
      <ManageJobCard />

      <JobManagementTable />
    </div>
  );
}
