import mongoose, { Document } from "mongoose";

export interface JobType extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Internship" | "Remote";
  salaryRange?: {
    min: number;
    max: number;
  };
  skillsRequired: string[];
  experienceLevel: "Entry" | "Mid" | "Senior";
  postedBy: mongoose.Types.ObjectId;
  status: "Open" | "Closed";
  thumbnail?: string;
}
