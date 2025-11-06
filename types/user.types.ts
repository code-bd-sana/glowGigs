// Base fields common to all users
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
}

// Job Seeker–specific fields
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

// Employer–specific fields
export interface IEmployerFields {
  companyName: string;
  companyWebsite?: string;
  companyDescription?: string;
  industry?: string;
  companySize: string;
  isVerified?: boolean;
}

// ✅ Combined user type — every user always has base fields + either job-seeker or employer fields
export type IUser = IUserBase & (IJobSeekerFields | IEmployerFields);
