// ==========================
// 🔹 Base fields (common to all users)
// ==========================
export interface IUserBase {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  img?: string;

  status?: string;
  postedJob?: number;
  totalApplicants?: number;
  role: "JOB_SEEKER" | "EMPLOYER";

  // 🟢 Stripe & Subscription Fields (common for both)
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  plan?: "free" | "basic" | "bronze" | "pro" | "premium";
  planStatus?: "inactive" | "active" | "canceled" | "past_due";
  currentPeriodEnd?: Date | null;

  // 🟣 Employer usage limits (optional for all users)
  jobPostLimit?: number;
  jobsPostedThisMonth?: number;

  createdAt?: Date;
  updatedAt?: Date;
      departments?: string[];
}

// ==========================
// 🔹 Job Seeker–specific fields
// ==========================
export interface IJobSeekerFields {
  dob: string;
  professionalTitle: string;
  bio?: string;
  resume?: string;
  certificates?: string[];
  isAdult: boolean;
  isAuthorizedToWorkInUS: boolean;
  requiresVisaSponsorship: boolean;
  applications?: number;
  employmentEligibility:
    | "US_CITIZEN"
    | "PERMANENT_RESIDENT"
    | "AUTHORIZED_NONCITIZEN";
  certificationAcknowledged: boolean;
}

// ==========================
// 🔹 Employer–specific fields
// ==========================
export interface IEmployerFields {
  companyName: string;
   portfolio?: {}
  companyWebsite?: string;
  companyDescription?: string;
  industry?: string;
  companySize: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
  isVerified?: boolean;
}

// ==========================
// 🔹 Combined Type (final export)
// ==========================
// Every user always has IUserBase + either JobSeeker OR Employer fields
export type IUser = IUserBase & (IJobSeekerFields | IEmployerFields);
