interface IuserBase {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  img?: string;
}

interface IJobSeekerFields {
  role: "JOB_SEEKER";
  dob: string;
  professionalTitle: string;
  bio?: string;
  resume?: string;
  certificates?: string[];
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
  role: "EMPLOYER";
  companyName: string;
  companyWebsite?: string;
  companyDescription?: string;
  industry?: string;
  companySize: string;
  isVerified?: boolean;
}

export type IUser =
  | (IuserBase & IJobSeekerFields)
  | (IuserBase & IEmpoloyerFields);
