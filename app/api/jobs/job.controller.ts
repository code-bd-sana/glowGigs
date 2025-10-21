import { dbConnect } from "@/lib/dbConnect";
import { JobType } from "@/types/job.types";
import Job from "./job.model";
import { NextRequest, NextResponse } from "next/server";

export const createJob = async (data: JobType) => {
  try {
    await dbConnect();
    const newJob = await Job.create(data);
    return NextResponse.json({ success: true, data: newJob }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ success: false, message }, { status: 500 });
  }
};

// 🟢 Get all jobs
export const getAllJobs = async () => {
  await dbConnect();
  const jobs = await Job.find();
  return jobs;
  console.log("hey man");
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
