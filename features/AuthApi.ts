/* eslint-disable @typescript-eslint/no-explicit-any */

import { IUser } from "@/types/user.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
import { strict } from "assert";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    register: builder.mutation<{
    message:string,
    user:IUser,
    data
    }, IUser>({
      query: (data: IUser) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
  login: builder.mutation({
  query: (data) => ({
    url: "/login",
    method: "POST",
    body: data,
  }),
  


    }),
   getSingleUser: builder.query<any, string>({
  query: (email) => `/users/${email}`,
}),
sendOtp:builder.mutation({
  query:(email:string)=>({
    url:"/otp",
    method:"POST",
    body:{email}
  })
}),

changePasswordWithOtp: builder.mutation({
  query:(data)=>({
    url:'/forgotPassword',
    method:"POST",
    body:data
  })
}),




    
  }),
});

// Correct hook export for mutation
export const { useRegisterMutation, useLoginMutation, useGetSingleUserQuery, useSendOtpMutation, useChangePasswordWithOtpMutation } = authApi;
