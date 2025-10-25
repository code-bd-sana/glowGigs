import { JobType } from "@/types/job.types";
import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema<JobType>(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    companyName: { type: String, required: true },
    companyLocation: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote"],
      required: true,
    },
    payType: {
      type: String,
      enum: ["Competitive", "Performance Bonus", "Tips(for service-based roles)","Employee Discount on products/services","Referral bonus program","Paid training or certification"],
      required: true,
    },
    // minSalary: { type: Number },
    // maxSalary: { type: Number },
    description: { type: String, required: true },
    thumbnail: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model<JobType>("Job", JobSchema);
