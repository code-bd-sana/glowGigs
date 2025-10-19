import { dbConnect } from "@/lib/dbConnect";

import { JobType } from "@/types/job.types";
import JobModel from "./job.model";

// 🟢 Create a new job
export const createJob = async (data: JobType) => {
  await dbConnect();
  const job = await JobModel.create(data);
  return job;
};

// 🟢 Get all jobs
export const getAllJobs = async () => {
  await dbConnect();
  const jobs = await JobModel.find();
  return jobs;
  console.log('hey man');
};

// 🟢 Get job by ID
export const getJobById = async (id: string) => {
  await dbConnect();
  const job = await JobModel.findById(id);
  return job;
};

// 🟢 Update job
export const updateJob = async (id: string, data: Partial<JobType>) => {
  await dbConnect();
  const updated = await JobModel.findByIdAndUpdate(id, data, { new: true });
  return updated;
};

// 🟢 Delete job
export const deleteJob = async (id: string) => {
  await dbConnect();
  await JobModel.findByIdAndDelete(id);
  return { message: "Job deleted successfully" };
};
