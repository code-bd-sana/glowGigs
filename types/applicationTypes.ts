// types.ts
export type ApplicantStatus = "New" | "Reviewed" | "Shortlisted";

export type Applicant = {
  name: string;
  role: string;
  status: ApplicantStatus;
  time: string;
};

export type JobsByWeek = {
  week: string;
  jobs: number;
};



// hi butler 
