import { IUser } from "@/types/user.types";
import mongoose, { Schema, Document, Model } from "mongoose";

// IUserDocument interface extends IUser + mongoose Document
export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    img: { type: String },
    role: { type: String, enum: ["JOB_SEEKER", "EMPLOYER"], required: true },
    professionalTitle: { type: String },
    bio: { type: String },
    resume: { type: String },
    certificates: [{ type: String }],
    dob: { type: String },
    isAdult: { type: Boolean },
    isAuthorizedToWorkInUS: { type: Boolean },
    requiresVisaSponsorship: { type: Boolean },
    employmentEligibility: {
      type: String,
      enum: ["US_CITIZEN", "PERMANENT_RESIDENT", "AUTHORIZED_NONCITIZEN"],
    },
    certificationAcknowledged: { type: Boolean },
    companyName: { type: String },
    companyWebsite: { type: String },
    companyDescription: { type: String },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },
    status: { type: String, default: "active" },
    postedJob: { type: Number, default: 0 },
    totalApplicants: { type: Number, default: 0 },
    applications: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Explicitly cast the model to Model<IUserDocument>
const User: Model<IUserDocument> =
  (mongoose.models.User as Model<IUserDocument>) || mongoose.model<IUserDocument>("User", userSchema);

export default User;
