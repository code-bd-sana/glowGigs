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
  jobPoster?: string; // ✅ added to send poster id
}

// Single Job type returned by API
export type Job = JobPayload & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

// ✅ Add this at the top
export interface JobsResponse {
  success: boolean;
  data: Job[];
  total: number;
}

export interface Applicant {
  applicantName: string;
  applicantEmail: string;
  applicantImg?: string;
  jobTitle: string;
  appliedDate: string;
}

export interface JobApplied {
  _id: string;
  jobId: string;
  applicantId: string;
  status: string;
  createdAt: string;
}
// API slice
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Jobs", "JobApplied","Applicants"],
  endpoints: (builder) => ({
    // ✅ Create a new job
    createJob: builder.mutation<Job, JobPayload>({
      query: (jobPayload) => ({
        url: "/jobs",
        method: "POST",
        body: jobPayload,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // Get all jobs
    getJobs: builder.query<JobsResponse, void>({
      query: () => "/jobs",
      providesTags: ["Jobs"],
    }),

    // ✅ Get jobs by poster ID (NEW)
    getJobsByPoster: builder.query<JobsResponse, string>({
      query: (posterId) => `/jobs?jobPoster=${posterId}`,
      providesTags: ["Jobs"],
    }),

    // ✅ Delete job
    deleteJob: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),

    // ✅ Update job (PATCH)
    updateJob: builder.mutation<
      void,
      { id: string; data: Partial<JobPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/jobs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    // ✅ Get applicants for a specific poster
    getApplicantsForPoster: builder.query<
      { success: boolean; applicants: Applicant[] },
      string
    >({
      query: (posterId) => `/jobs/jobApplicants?posterId=${posterId}`,
    }),

    /* 🚀✅ Update JobApplied status */
    updateJobAppliedStatus: builder.mutation<
      { message: string; data: JobApplied }, // ✅ no 'any' — properly typed
      { id: string; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/jobApplied/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["JobApplied"], // ✅ works because added to tagTypes
    }),

    // ✅ Reject applicant mutation
    rejectApplicant: builder.mutation({
      query: (id: string) => ({
        url: `/jobApplied/applicant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applicants"], // automatically refresh list
    }),
  }),
});

// ✅ Export hooks for components
export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useGetJobsByPosterQuery, // ✅ new hook
  useDeleteJobMutation,
  useUpdateJobMutation,
  useGetApplicantsForPosterQuery,
  useUpdateJobAppliedStatusMutation,
  useRejectApplicantMutation
} = jobApi;
