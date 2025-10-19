import { dbConnect } from "@/lib/dbConnect";
import { JobType } from "@/types/job.types";
import Job from "./job.model";


// import JobModel from "./Job.model";

// 🟢 Create a new job
export const createJob = async (data: JobType) => {
  await dbConnect();
  const job = await Job.create(data);
  return job;
};

// 🟢 Get all jobs
export const getAllJobs = async () => {
  await dbConnect();
  const jobs = await Job.find();
  return jobs;
  console.log('hey man');
};

// 🟢 Get job by ID
export const getJobById = async (id: string) => {
  await dbConnect();
  const job = await Job.findById(id);
  return job;
};

// 🟢 Update job
export const updateJob = async (id: string, data: Partial<JobType>) => {
  await dbConnect();
  const updated = await Job.findByIdAndUpdate(id, data, { new: true });
  return updated;
};

// 🟢 Delete job
export const deleteJob = async (id: string) => {
  await dbConnect();
  await Job.findByIdAndDelete(id);
  return { message: "Job deleted successfully" };
};
