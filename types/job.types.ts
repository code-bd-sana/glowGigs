import mongoose, { Document } from "mongoose";

export interface JobType extends Document {
  title: string;
  // department: string;
  department: mongoose.Types.ObjectId;
  companyName: string;
  companyLocation: string;
  jobType: "Full-time" | "Part-time" | "Remote";
  payType:
    | "Competitive"
    | "Performance Bonus"
    | "Tips(for service-based roles)"
    | "Employee Discount on products/services"
    | "Referral bonus program"
    | "Paid training or certification";
  description: string;
  companyPerks?: string[];
  thumbnail?: string;
  perks?: string[];
  jobPoster: mongoose.Types.ObjectId; // new field
  applicants?: mongoose.Types.ObjectId[]; // array of applicant IDs
}
