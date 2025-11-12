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
    getSingleUser:builder.query({
      query:(id)=> `/singleUser/${id}`
    }),

    deleteUser : builder.mutation({
      query:(id)=>({
        url:`/userDelete/${id}`,
        method:"DELETE",
      
      })
    })

  }),
});

export const { useGetAllUsersQuery, useGetUserRoleCountQuery, useGetSingleUserQuery, useDeleteUserMutation } = userApi;