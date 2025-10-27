// features/JobSlice.ts
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

// Single Job type returned by API (with _id, createdAt, updatedAt)
export type Job = JobPayload & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

// API slice
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    // Create a new job
    createJob: builder.mutation<Job, JobPayload>({
      query: (jobPayload) => ({
        url: "/jobs",
        method: "POST",
        body: jobPayload,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // Get all jobs
    getJobs: builder.query<Job[], void>({
      query: () => "/jobs",
      providesTags: ["Jobs"],
    }),

    // Optional: delete a job
    deleteJob: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // ✅ Update job (PATCH)
    updateJob: builder.mutation<void, { id: string; data: Partial<JobPayload> }>(
      {
        query: ({ id, data }) => ({
          url: `/jobs/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["Jobs"],
      }
    ),
  }),
});

// Export hooks for components
export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useDeleteJobMutation,
  useUpdateJobMutation,
} = jobApi;
