interface IuserBase {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

interface IJobSeekerFields {
  role: "jobSeeker";
  dob: string;
  isAdult: boolean;
  isAuthorizedToWorkInUS: boolean;
  requiresVisaSponsorship: boolean;
  employmentEligibility:
    | "US_CITIZEN"
    | "PERMANENT_RESIDENT"
    | "AUTHORIZED_NONCITIZEN";
  certificationAcknowledged: boolean;
}

interface IEmpoloyerFields {
  role: "employer";
  companyName: string;
  companyWebsite?: string;
  companyDescription?: string;
  industry?: string;
  companySize: string;
  isVerified?: boolean;
}



export type IUser = (IuserBase & IJobSeekerFields ) | (IuserBase & IEmpoloyerFields )