import User from "@/app/api/users/user.model";
import { NextRequest } from "next/server";
import Job from "@/app/api/jobs/job.model";
import jobAppliedModel from "../../jobApplied/jobApplied.model";
import { dbConnect } from "@/lib/dbConnect";


export const getAdminOverview = async () => {
  try {
      await dbConnect()
    const totalJobPoster = await User.countDocuments({ role: "EMPLOYER" });
    const totalJobCandidate = await User.countDocuments({ role: "JOB_SEEKER" });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await jobAppliedModel.countDocuments();
    const response = {
      totalJobPoster,
      totalJobCandidate,
      totalJobs,
      totalApplications,
    };

    return response;
  } catch (error) {
    return error;
  }
};
