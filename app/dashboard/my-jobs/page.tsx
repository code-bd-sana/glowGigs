"use client";

import {
  JobPayload,
  useDeleteJobMutation,
  useGetJobsByPosterQuery,
  useUpdateJobMutation,
} from "@/features/JobSlice";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";


// ✅ 1️⃣ Define the Department interface
interface Department {
  _id: string;
  name: string;
}

// ✅ 2️⃣ Define Job interface (department can be string or Department object)
interface Job {
  _id: string;
  title: string;
  department: Department | string; // Important: union type to handle both cases
  companyName: string;
  companyLocation: string;
  jobType: string;
  payType: string;
  description: string;
  companyPerks?: string[];
  createdAt: string;
}

// ✅ 3️⃣ Type guard function to check if department is an object
function isDepartmentObject(
  department: string | Department
): department is Department {
  return typeof department === "object" && department !== null && "name" in department;
}

const MyJobs = () => {
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const { data: session, status } = useSession();
  const posterId = session?.user?.id;

  const { data: jobs, isLoading } = useGetJobsByPosterQuery(posterId ?? "", {
    skip: !posterId,
  });

  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      console.log("Logged-in User ID:", session.user.id);
      console.log("Role:", session.user.role);
      console.log("Email:", session.user.email);
    }
  }, [session, status]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );

  // ✅ Delete job
  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id).unwrap();
      toast.success("Job deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job");
    }
  };

  // ✅ Open edit modal
  const handleUpdate = (job: Job) => {
    setEditJob(job);
    (document.getElementById("edit_modal") as HTMLDialogElement).showModal();
  };

  // ✅ Handle job update submission
  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editJob) return;

    try {
      await updateJob({
        id: editJob._id,
        data: {
          ...editJob,
          // ✅ If department is an object, send its _id instead of name
          department: isDepartmentObject(editJob.department)
            ? editJob.department._id
            : editJob.department,
        } as Partial<JobPayload>,
      }).unwrap();

      toast.success("Job updated successfully!");
      (document.getElementById("edit_modal") as HTMLDialogElement).close();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update job");
    }
  };

  // ✅ Open view modal
  const openModal = (job: Job) => {
    setSelectedJob(job);
    const modal = document.getElementById("job_modal") as HTMLDialogElement;
    modal.showModal();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Jobs</h2>
        <select className="border border-gray-300 bg-white text-gray-600 px-6 py-3 rounded-md">
          <option>All Status</option>
          <option>Active</option>
          <option>Expired</option>
          <option>Draft</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Job Title</th>
              <th className="py-3 px-4 text-left">Department</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Applicants</th>
              <th className="py-3 px-4 text-left">Posted Date</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.data?.map((job, index) => (
              <tr
                key={job._id}
                className="border-b border-gray-300 hover:bg-gray-100 transition-all"
              >
                <td className="py-4 px-4">{index + 1}</td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-800">{job.title}</p>
                    <p className="text-xs text-gray-500">
                      Expires:{" "}
                      {new Date(job.createdAt).toISOString().slice(0, 10)}
                    </p>
                  </div>
                </td>

                {/* ✅ Type-safe Department display */}
                <td className="py-4 px-4">
                  {isDepartmentObject(job.department)
                    ? job.department.name
                    : job.department}
                </td>

                <td className="py-4 px-4">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    Active
                  </span>
                </td>

                <td className="py-4 px-4">23</td>
                <td className="py-4 px-4">
                  {new Date(job.createdAt).toISOString().slice(0, 10)}
                </td>
                <td className="py-4 px-4 flex justify-center gap-3">
                  <FiEye
                    onClick={() => openModal(job)}
                    className="text-blue-500 cursor-pointer hover:scale-110 transition"
                  />
                  <FiEdit2
                    onClick={() => handleUpdate(job)}
                    className="text-green-500 cursor-pointer hover:scale-110 transition"
                  />
                  <FiTrash2
                    onClick={() => handleDelete(job._id)}
                    className="text-red-500 cursor-pointer hover:scale-110 transition"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ View Modal */}
      <dialog id="job_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Job Details</h3>
          {selectedJob && (
            <div className="mt-4 space-y-2">
              <p><strong>Title:</strong> {selectedJob.title}</p>
              <p>
                <strong>Department:</strong>{" "}
                {isDepartmentObject(selectedJob.department)
                  ? selectedJob.department.name
                  : selectedJob.department}
              </p>
              <p><strong>Company:</strong> {selectedJob.companyName}</p>
              <p><strong>Location:</strong> {selectedJob.companyLocation}</p>
              <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
              <p><strong>Pay Type:</strong> {selectedJob.payType}</p>
              <p><strong>Description:</strong> {selectedJob.description}</p>
              <p><strong>Perks:</strong> {selectedJob.companyPerks?.join(", ")}</p>
              <p>
                <strong>Posted On:</strong>{" "}
                {new Date(selectedJob.createdAt).toISOString().slice(0, 10)}
              </p>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* ✅ Edit Modal */}
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white text-black rounded-2xl shadow-xl border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            ✏️ Edit Job Details
          </h3>

          {editJob && (
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={editJob.title}
                  onChange={(e) =>
                    setEditJob({ ...editJob, title: e.target.value })
                  }
                  placeholder="Enter job title"
                  className="input input-bordered w-full bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={
                    isDepartmentObject(editJob.department)
                      ? editJob.department.name
                      : editJob.department
                  }
                  onChange={(e) =>
                    setEditJob({
                      ...editJob,
                      department: isDepartmentObject(editJob.department)
                        ? { ...editJob.department, name: e.target.value }
                        : e.target.value,
                    })
                  }
                  placeholder="Enter department"
                  className="input input-bordered w-full bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70"
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={editJob.companyName}
                  onChange={(e) =>
                    setEditJob({ ...editJob, companyName: e.target.value })
                  }
                  placeholder="Enter company name"
                  className="input input-bordered w-full bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editJob.companyLocation}
                  onChange={(e) =>
                    setEditJob({ ...editJob, companyLocation: e.target.value })
                  }
                  placeholder="Enter company location"
                  className="input input-bordered w-full bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70"
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Type
                </label>
                <select
                  value={editJob.jobType}
                  onChange={(e) =>
                    setEditJob({ ...editJob, jobType: e.target.value })
                  }
                  className="select select-bordered w-full bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Pay Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pay Type
                </label>
                <input
                  type="text"
                  value={editJob.payType}
                  onChange={(e) =>
                    setEditJob({ ...editJob, payType: e.target.value })
                  }
                  placeholder="Enter pay type"
                  className="input input-bordered w-full bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={editJob.description}
                  onChange={(e) =>
                    setEditJob({ ...editJob, description: e.target.value })
                  }
                  placeholder="Enter job description"
                  className="textarea textarea-bordered w-full bg-white text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/70 min-h-[100px]"
                />
              </div>

              {/* Buttons */}
              <div className="modal-action flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="btn bg-black text-white hover:bg-gray-800 transition-all"
                >
                  💾 Save Changes
                </button>
                <form method="dialog">
                  <button className="btn border-gray-300 text-gray-700 hover:bg-gray-100 transition-all">
                    Cancel
                  </button>
                </form>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyJobs;
