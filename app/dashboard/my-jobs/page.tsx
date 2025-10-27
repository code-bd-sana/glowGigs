"use client";
import { useDeleteJobMutation, useGetJobsQuery } from "@/features/JobSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";

const MyJobs = () => {
  const { data: jobs, isLoading, error } = useGetJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
  const [selectedJob, setSelectedJob] = useState<any>(null);
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );

  const handleDelete = async (id: string) => {
    try {
      await deleteJob(id).unwrap();
      toast.success("Job deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job");
    }
  };
  const handleUpdate = (id: string) => {
    console.log(id);
  };

  const openModal = (job: any) => {
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
            {jobs?.map((job, index) => (
              <tr
                key={job?._id}
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
                <td className="py-4 px-4">{job.department}</td>
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
                    onClick={() => handleUpdate(job?._id)}
                    className="text-green-500 cursor-pointer hover:scale-110 transition"
                  />
                  <FiTrash2
                    onClick={() => handleDelete(job?._id)}
                    className="text-red-500 cursor-pointer hover:scale-110 transition"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="job_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-lg">Job Details</h3>
          {selectedJob && (
            <div className="mt-4 space-y-2">
              <p>
                <strong>Title:</strong> {selectedJob.title}
              </p>
              <p>
                <strong>Department:</strong> {selectedJob.department}
              </p>
              <p>
                <strong>Company:</strong> {selectedJob.companyName}
              </p>
              <p>
                <strong>Location:</strong> {selectedJob.companyLocation}
              </p>
              <p>
                <strong>Job Type:</strong> {selectedJob.jobType}
              </p>
              <p>
                <strong>Pay Type:</strong> {selectedJob.payType}
              </p>
              <p>
                <strong>Description:</strong> {selectedJob.description}
              </p>
              <p>
                <strong>Perks:</strong> {selectedJob.companyPerks?.join(", ")}
              </p>
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
    </div>
  );
};

export default MyJobs;
