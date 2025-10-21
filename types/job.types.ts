import  { Document, Types } from "mongoose";

export interface JobType extends Document {
  title: string;
  description: string;
  company: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Internship" | "Remote";
  minSalary?: number;
  maxSalary?: number;
  skillsRequired?: string[];
  experienceLevel: "Entry" | "Mid" | "Senior";
  postedBy: Types.ObjectId;
  thumbnail?: string;
  createdAt?: Date;
  updatedAt?: Date;
}