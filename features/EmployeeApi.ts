import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EmployeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ['Applicants', 'Jobs'],
  endpoints: (builder) => ({
    getAllJobPoster: builder.query({
      query: () => "/allEmployee",
    }),
    getAllApplicantr: builder.query({
      query: (params = {}) => {
        const { page = 1, limit = 10, search = '', sortOrder = 'desc' } = params;
        
        const queryParams = new URLSearchParams();
        queryParams.append('page', page.toString());
        queryParams.append('limit', limit.toString());
        if (search) queryParams.append('search', search);
        queryParams.append('sortOrder', sortOrder);

        return `/allapplicants?${queryParams.toString()}`;
      },
      providesTags: ['Applicants'],
    }),
    
    updateApplicantStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/allapplicants/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Applicants'],
    }),

    getAllJobs: builder.query({
      query: (params = {}) => {
        const { 
          page = 1, 
          limit = 10, 
          search = '', 
          status = '', 
          department = '',
          sortOrder = 'desc' 
        } = params;
        
        const queryParams = new URLSearchParams();
        queryParams.append('page', page.toString());
        queryParams.append('limit', limit.toString());
        if (search) queryParams.append('search', search);
        if (status) queryParams.append('status', status);
        if (department) queryParams.append('department', department);
        queryParams.append('sortOrder', sortOrder);

        return `/jobAll?${queryParams.toString()}`;
      },
      providesTags: ['Jobs'],
    }),
 updateStatus: builder.mutation({
      query: (data) => ({
        url: '/updateStatus',
        method: "PUT",
        body: data
      }),
   
    })
  }),
});

export const { 
  useGetAllJobPosterQuery, 
  useGetAllApplicantrQuery,
  useUpdateApplicantStatusMutation,
  useGetAllJobsQuery ,
  useUpdateStatusMutation
} = EmployeeApi;