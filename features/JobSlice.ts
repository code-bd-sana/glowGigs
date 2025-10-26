import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Payload type sent to backend
export interface JobPayload {
  title: string;
  department: string;
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
}

// Response type from backend
export interface JobResponse {
  success: boolean;
  data: JobPayload & { _id: string; createdAt: string; updatedAt: string };
}

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    createJob: builder.mutation<JobResponse, JobPayload>({
      query: (jobPayload) => ({
        url: "/jobs",
        method: "POST",
        body: jobPayload,
      }),
    }),
    getJobs: builder.query<JobResponse[], void>({
      query: () => "/jobs",
    }),
  }),
});

export const { useCreateJobMutation, useGetJobsQuery } = jobApi;
