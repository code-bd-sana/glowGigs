/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ====== Types ======
export interface JobApplicationPayload {
  job: string;
  applicant: string;
  coverLetter?: string;
  resume?: string;
}

export interface JobApplication {
  _id: string;
  job: {
    _id: string;
    title: string;
    companyName: string;
    companyLocation: string;
  };
  applicant: {
    _id: string;
    name: string;
    email: string;
  };
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  applicationDate: string;
  createdAt: string;
  updatedAt: string;
}

// ====== API Slice ======
export const jobAppliedApi = createApi({
  reducerPath: "jobAppliedApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["JobApplied"],

  endpoints: (builder) => ({
    // ✅ Apply for a job
    applyForJob: builder.mutation<any, JobApplicationPayload>({
      query: (data) => ({
        url: "/jobApplied",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["JobApplied"],
    }),

    // ✅ Get all applications of a specific applicant
    getApplicationsByApplicant: builder.query<JobApplication[], string>({
      query: (applicantId) => `/jobApplied?applicant=${applicantId}`,
      providesTags: ["JobApplied"],
    }),

    // ✅ Optional: Get all job applications (for admin dashboard)
    getAllApplications: builder.query<JobApplication[], void>({
      query: () => "/jobApplied",
      providesTags: ["JobApplied"],
    }),

    // ✅ Optional: Update status (Interview / Offer / etc.)
    updateApplicationStatus: builder.mutation<
      JobApplication,
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/jobApplied/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["JobApplied"],
    }),

    // ✅ Optional: Delete an application
    deleteApplication: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/jobApplied/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["JobApplied"],
    }),
  }),
});

// ====== Hooks ======
export const {
  useApplyForJobMutation,
  useGetApplicationsByApplicantQuery,
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} = jobAppliedApi;
