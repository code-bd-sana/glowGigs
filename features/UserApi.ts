// features/UserApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ['Applicant'],
  endpoints: (builder) => ({
    allEmployeer: builder.query<any, void>({
      query: () => `/allEmployee`,
    }),
    allApplicants: builder.query<any, { 
      page: number; 
      limit: number;
      search?: string;
      sortOrder?: string;
    }>({
      query: ({ page, limit, search = '', sortOrder = 'desc' }) => 
        `/allapplicants?page=${page}&limit=${limit}&search=${search}&sortOrder=${sortOrder}`,
      providesTags: ['Applicant'],
    }),
    updateApplicantStatus: builder.mutation<any, { 
      id: string; 
      status: string;
    }>({
      query: ({ id, status }) => ({
        url: `/user/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Applicant'],
    }),
  }),
});

export const { 
  useAllEmployeerQuery, 
  useAllApplicantsQuery,
  useUpdateApplicantStatusMutation 
} = userApi;