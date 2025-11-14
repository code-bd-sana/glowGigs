import mongoose, { Schema, model, models, Model } from "mongoose";
import { JobType } from "@/types/job.types";

// ✅ Define the schema
const JobSchema = new Schema<JobType>(
  {
    title: { type: String, required: true },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    companyName: { type: String, required: true },
    companyLocation: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote"],
      required: true,
    },
    payType: {
      type: String,
      enum: [
        "Competitive",
        "Performance Bonus",
        "Tips(for service-based roles)",
        "Employee Discount on products/services",
        "Referral bonus program",
        "Paid training or certification",
      ],
      required: true,
    },
    description: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    deadline: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String],
      default: [],
    },
    companyPerks: {
      type: [String],
      default: [],
    },
    jobPoster: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    // applicants: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     default: [],
    //   },
    // ],
  },
  { timestamps: true }
);

// ✅ Ensure consistent typing to prevent union type error
const Job: Model<JobType> =
  (models.Job as Model<JobType>) || model<JobType>("Job", JobSchema);

export default Job;
