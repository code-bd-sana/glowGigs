import { dbConnect } from "@/lib/dbConnect";
import User from "../../api/users/user.model"; // ✅ needed for populate
import { JobType } from "@/types/job.types";
import Job from "./job.model";
import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import "../../api/category/category.model";
import JobApplied from "../jobApplied/jobApplied.model";
// 🧩 Type for populated fields (so TS knows applicant & job are full objects)
type PopulatedJobApplied = {
  applicant: {
    _id: string;
    fullName: string;
  };
  job: {
    _id: string;
    title: string;
  };
  applicationDate: Date;
  status: string;
};

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

  const jobs = await Job.find({ jobPoster: jobPosterId })
    .populate("department", "name")
    .sort({
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

// Get all applicants for jobs posted by a specific job poster
export const getApplicantsForPoster = async (posterId: string) => {
  console.log(posterId);
  try {
    // Step 1: Find jobs created by this poster
    const jobs = await Job.find({
      jobPoster: new mongoose.Types.ObjectId(posterId), // use 'jobPoster', not 'jobPosterId'
    }).select("_id title");
    console.log(jobs);
    if (jobs.length === 0) {
      return NextResponse.json(
        { success: false, message: "No jobs found for this poster." },
        { status: 404 }
      );
    }

    const jobIds = jobs.map((job) => job._id);

    // Step 2: Find job applications for these jobs
    const applications = await JobApplied.find({ job: { $in: jobIds } })
      .populate("applicant", "fullName") // only applicant name
      .populate("job", "title") // only job title
      .sort({ applicationDate: -1 })
      .lean<PopulatedJobApplied[]>();

      console.log(applications);

    // Step 3: Format output
    const formatted = applications.map((app) => ({
      applicantName: app.applicant?.fullName,
      jobTitle: app.job?.title,
      appliedDate: app.applicationDate,
    }));

    return NextResponse.json({ success: true, applicants: formatted });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    );
  }
};
