import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the Category type
export interface Category {
  _id?: string;
  name: string;
  description?: string;
  image: string;
}

// RTK Query API slice
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // ✅ Get all categories
    getCategories: builder.query<Category[], void>({
      query: () => "/category",
      providesTags: ["Category"],
    }),

    // ✅ Add new category
    addCategory: builder.mutation<Category, Partial<Category>>({
      query: (newCategory) => ({
        url: "/category",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    // ✅ Delete category by ID
    deleteCategory: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
