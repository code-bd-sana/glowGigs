/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbConnect } from "@/lib/dbConnect";
import User from "../users/user.model";
import JobApplied from "./jobApplied.model";
import Job from "../jobs/job.model";
import mongoose from "mongoose";
import { PLAN_RULES } from "@/config/plans";

/**
 * Create a new job application
 */
export const createJobApplication = async (data: {
  job: string;
  applicant: string;
  coverLetter?: string;
  resume?: string;
  interviewDate?: Date;
}) => {
  await dbConnect();

  const { job, applicant, coverLetter, resume, interviewDate } = data;

  const jobExists = await Job.findById(job);
  if (!jobExists) throw new Error("Job not found");

  const userExists = await User.findById(applicant);
  if (!userExists) throw new Error("Applicant not found");

  // ---------------------------------------------
  // ✅ 1. SUBSCRIPTION VALIDATION
  // ---------------------------------------------
  const userPlan = userExists.plan;                // "basic" | "bronze" | "pro"
  const planStatus = userExists.planStatus;        // "active"
  const planEnd = userExists.currentPeriodEnd;     // Date

  if (!userPlan || !PLAN_RULES[userPlan]) {
    const error: any = new Error("You do not have an active subscription.");
    error.status = 403;
    throw error;
  }

  if (planStatus !== "active") {
    const error: any = new Error("Your subscription is inactive. Please upgrade.");
    error.status = 403;
    throw error;
  }

  if (new Date(planEnd) < new Date()) {
    const error: any = new Error("Your subscription has expired.");
    error.status = 403;
    throw error;
  }

  const rules = PLAN_RULES[userPlan];

  // ---------------------------------------------
  // ✅ 2. CHECK MONTHLY LIMIT (if not unlimited)
  // ---------------------------------------------
  if (rules.maxApplicationsPerMonth !== "unlimited") {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyApplied = await JobApplied.countDocuments({
      applicant,
      createdAt: { $gte: startOfMonth },
    });

    if (monthlyApplied >= rules.maxApplicationsPerMonth) {
      const error: any = new Error(
        `Your plan allows only ${rules.maxApplicationsPerMonth} applications per month.`
      );
      error.status = 403;
      throw error;
    }
  }

  // ---------------------------------------------
  // ✅ 3. STOP DUPLICATE APPLICATIONS
  // ---------------------------------------------
  const existingApplication = await JobApplied.findOne({ job, applicant });
  if (existingApplication) {
    const error: any = new Error("You have already applied for this job.");
    error.status = 409;
    throw error;
  }

  // ---------------------------------------------
  // ✅ 4. CREATE APPLICATION
  // ---------------------------------------------
  const application = await JobApplied.create({
    job,
    applicant,
    coverLetter,
    resume,
    interviewDate,
  });

  // Add applicant to job
  await Job.findByIdAndUpdate(job, { $addToSet: { applicants: applicant } });

  return application;
};

// ==================================================================================
// OTHER CONTROLLERS
// ==================================================================================

/**
 * Get all job applications
 */
export const getAllApplications = async () => {
  await dbConnect();
  return await JobApplied.find()
    .populate("job", "title company location")
    .populate("applicant", "name email");
};

/**
 * Get applications for a specific job
 */
export const getApplicationsByJob = async (jobId: string) => {
  await dbConnect();
  return await JobApplied.find({ job: jobId })
    .populate("applicant", "name email")
    .populate("job", "title company location");
};

/**
 * Get applications by applicant
 */
export const getApplicationsByApplicant = async (applicantId: string) => {
  await dbConnect();

  const id = new mongoose.Types.ObjectId(applicantId);

  return await JobApplied.find({ applicant: id })
    .populate({
      path: "job",
      select:
        "title companyName companyLocation jobType payType description thumbnail companyPerks",
    })
    .populate({
      path: "applicant",
      select: "fullName email img",
    });
};

/**
 * Update application status
 */
export const updateApplicationStatus = async (
  id: string,
  status: "Applied" | "Interview" | "Offer" | "Rejected"
) => {
  await dbConnect();
  const updated = await JobApplied.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!updated) throw new Error("Application not found");
  return updated;
};

/**
 * Delete application
 */
export const deleteApplication = async (id: string) => {
  await dbConnect();
  const deleted = await JobApplied.findByIdAndDelete(id);
  if (!deleted) throw new Error("Application not found");
  return deleted;
};

export const updateJobAppliedStatus = async (id: string, status: string) => {
  if (!status) throw new Error("Status required");

  const updated = await JobApplied.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  if (!updated) throw new Error("Application not found");

  return updated;
};

// Delete JobApplied
export const deleteJobApplied = async (id: string) => {
  try {
    await dbConnect();

    if (!id) return { status: 400, message: "ID is required" };

    const deleted = await JobApplied.findByIdAndDelete(id);
    if (!deleted) return { status: 404, message: "Job application not found" };

    return { status: 200, message: "Job application rejected successfully" };
  } catch (error) {
    console.error("❌ Error deleting JobApplied:", error);
    return { status: 500, message: "Failed to delete application" };
  }
};
