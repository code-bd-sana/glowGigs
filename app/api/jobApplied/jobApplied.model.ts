import mongoose, { Schema } from "mongoose";
import { JobAppliedType } from "@/types/jobApplied.types"; 

const JobAppliedSchema = new Schema<JobAppliedType>(
  {
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true }, 
    applicant: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    applicationDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    coverLetter: { type: String, default: "" },
    resume: { type: String, default: "" }, 
    interviewDate: { type: Date },
  },
  { timestamps: true }
);

JobAppliedSchema.index({ job: 1, applicant: 1 }, { unique: true });

export default mongoose.models.JobApplied ||
  mongoose.model<JobAppliedType>("JobApplied", JobAppliedSchema);
