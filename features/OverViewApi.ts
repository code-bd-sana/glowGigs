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
})
    })
});

export const { useAdminOverviewQuery, useChartOverviewQuery , useGraphOverviewQuery} = overViewApi;