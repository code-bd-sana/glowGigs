// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const userApi = createApi({
//   reducerPath: "userApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   endpoints: (builder) => ({
//     allEmployeer: builder.query<any, void>({
//       query: () => /allEmployee,
//     }),
//   }),
// });

// // hook export
// export const { useAllEmployeerQuery } = userApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface UserRoleCountResponse {
  success: boolean;
  roles: {
    ADMIN: number;
    EMPLOYER: number;
    SEEKER: number;
  };
}

export const userApi = createApi({
  
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // ✅ Get all users
    getAllUsers: builder.query<unknown, void>({   
      query: () =>  "/users/roles",
      providesTags: ["Users"],
    }),

    // ✅ Get user role counts (EMPLOYER, ADMIN, SEEKER)
    getUserRoleCount: builder.query<UserRoleCountResponse, void>({
      query: () => "/users/roles",
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserRoleCountQuery } = userApi;

