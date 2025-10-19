import { dbConnect } from "@/lib/dbConnect";
import User from "../users/user.model";
import JobApplied from "./jobApplied.model";
import Job from "../jobs/job.model";


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

  const application = await JobApplied.create({
    job,
    applicant,
    coverLetter,
    resume,
    interviewDate,
  });

  return application;
};

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
  return await JobApplied.find({ applicant: applicantId })
    .populate("job", "title company location")
    .populate("applicant", "name email");
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
