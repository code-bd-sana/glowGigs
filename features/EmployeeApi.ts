import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EmployeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getAllJobPoster: builder.query({
      query: () => "/allEmployee",
    }),
  }),
});

export const { useGetAllJobPosterQuery } = EmployeeApi;
