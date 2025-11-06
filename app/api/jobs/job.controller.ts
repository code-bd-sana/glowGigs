import { dbConnect } from "@/lib/dbConnect";
import { JobType } from "@/types/job.types";
import Job from "./job.model";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import "../../api/category/category.model" 


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
  const jobs = await Job.find().sort({ createdAt: -1 });

  // Count total jobs
  const total = await Job.countDocuments();
  
  // Return structured response
  return {
    success: true,
    data: jobs,
    total, // ✅ total count
  };
};

// ✅ Get jobs by jobPoster ID
export const getJobsByPoster = async (jobPosterId: string) => {
  await dbConnect();

  if (!Types.ObjectId.isValid(jobPosterId)) {
    return NextResponse.json(
      { success: false, message: "Invalid jobPoster ID" },
      { status: 400 }
    );
  }

  const jobs = await Job.find({ jobPoster: jobPosterId }).populate("department", "name").sort({
    createdAt: -1,
  });
  const total = await Job.countDocuments({ jobPoster: jobPosterId }); // ✅ total count for this poster
  return NextResponse.json(
    { success: true, data: jobs, total },
    { status: 200 }
  );
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

  if (!updated) {
    throw new Error("Job not found");
  }

  return updated;
};

// 🟢 Delete job
export const deleteJob = async (id: string) => {
  await dbConnect();
  await Job.findByIdAndDelete(id);
  return { message: "Job deleted successfully" };
};
