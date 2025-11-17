/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const overViewApi = createApi({
    reducerPath: "overViewApi",
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
      adminOverview: builder.query<any, void>({
  query: () => `/overview/admin`,
}),


chartOverview:builder.query<any, void>({
  query:()=>`/overview/CategoryOverVIew`
}),

graphOverview:builder.query<any, void>({
  query:()=> `/overview/applicantsOverview`
}),

jobOverview:builder.query({
  query:()=> `/jobSummury`
}),
allPayment:builder.query({
  query:()=>`/adminPayment`

}),

    })
});

export const { useAdminOverviewQuery, useChartOverviewQuery , useGraphOverviewQuery, useJobOverviewQuery, useAllPaymentQuery} = overViewApi;