import { IUser } from "@/types/user.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    register: builder.mutation<{
    message:string,
    user:IUser,
    data:any
    }, IUser>({
      query: (data: IUser) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
  login: builder.mutation<{data:any,}, {email:string; password:string}>({
  query: (data) => ({
    url: "/login",
    method: "POST",
    body: data,
  }),
  


    }),
   getSingleUser: builder.query<any, string>({
  query: (email) => `/users/${email}`,
}),


    
  }),
});

// Correct hook export for mutation
export const { useRegisterMutation, useLoginMutation, useGetSingleUserQuery } = authApi;
