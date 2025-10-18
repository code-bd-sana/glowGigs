import { JobType } from "@/types/job.types";
import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema<JobType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Remote"],
      default: "Full-time",
    },
    salaryRange: {
      min: { type: Number },
      max: { type: Number },
    },
    skillsRequired: { type: [String] },
    experienceLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior"],
      default: "Entry",
    },
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Open", "Closed"], default: "Open" },
    thumbnail: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model<JobType>("Job", JobSchema);
