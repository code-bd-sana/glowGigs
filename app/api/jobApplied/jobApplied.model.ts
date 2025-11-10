import mongoose, { Schema, model, models, Model } from "mongoose";
import { JobAppliedType } from "@/types/jobApplied.types";

const JobAppliedSchema = new Schema<JobAppliedType>(
  {
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
    applicationDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Rejected"],
      default: "Applied",
    },
    coverLetter: { type: String, default: "" },
    resume: { type: String, default: "" },
    interviewDate: { type: Date },
  },
  { timestamps: true }
);

// Prevent duplicate applications
JobAppliedSchema.index({ job: 1, applicant: 1 }, { unique: true });

// ✅ Explicitly type the model to remove the “union” problem
const JobApplied: Model<JobAppliedType> =
  (models.JobApplied as Model<JobAppliedType>) ||
  model<JobAppliedType>("JobApplied", JobAppliedSchema);

export default JobApplied;
