import { Document } from "mongoose";

export interface JobType extends Document {
  title: string;
  department: string;
  companyName: string;
  companyLocation: string;
  jobType: string;
  payType: string;
  // minSalary?: number;
  // maxSalary?: number;
  description: string;
  thumbnail?: string;
}
