import mongoose, { Schema, model, models, Model } from "mongoose";
import { IUser } from "@/types/user.types";

// 🧩 If your IUser type doesn't include these fields yet, make sure to add them later in user.types.ts too!

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    img: { type: String },


    // 👥 User role
    role: { type: String, enum: ["JOB_SEEKER", "EMPLOYER"], required: true },

    // 🧠 Job-Seeker fields
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

    // 🏢 Employer fields
    companyName: { type: String },
    companyWebsite: { type: String },
    companyDescription: { type: String },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
    },

    
     portfolio: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        resourceType: { type: String, required: true },
        originalFilename: { type: String, required: true },
        format: { type: String, required: true },
        createdAt: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now } // ✅ নতুন field
      }
    ],


    // 🟢 Subscription fields (for both job seekers & employers)
    stripeCustomerId: { type: String, default: null },
    stripeSubscriptionId: { type: String, default: null },
    plan: {
      type: String,
      enum: ["free", "basic", "bronze", "pro", "premium"],
      default: "free",
    },
    planStatus: {
      type: String,
      enum: ["inactive", "active", "canceled", "past_due"],
      default: "inactive",
    },
    currentPeriodEnd: { type: Date, default: null },

    // 💼 Employer-specific subscription limits
    jobPostLimit: { type: Number, default: 0 },
    jobsPostedThisMonth: { type: Number, default: 0 },

    // 📊 Common fields
    status: { type: String, default: "active" },
    postedJob: { type: Number, default: 0 },
    totalApplicants: { type: Number, default: 0 },
    applications: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", userSchema);

export default User;


