import { authApi } from "@/features/AuthApi";
import { categoryApi } from "@/features/categorySlice";
import { jobApi } from "@/features/JobSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware, authApi.middleware, categoryApi.middleware),
});

// ✅ For TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
