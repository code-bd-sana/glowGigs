import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    allEmployeer: builder.query<any, void>({
      query: () => `/allEmployee`,
    }),
  }),
});

// hook export
export const { useAllEmployeerQuery } = userApi;
