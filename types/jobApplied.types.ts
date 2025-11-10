import mongoose, { Document } from "mongoose";

export interface JobAppliedType extends Document {
  job: mongoose.Types.ObjectId;
  applicant: mongoose.Types.ObjectId;
  applicationDate: Date;
  status: "Applied" | "Shortlisted" | "Rejected";
  coverLetter?: string;
  resume?: string;
  interviewDate?: Date;
}
