import { authApi } from "@/features/AuthApi";
import { categoryApi } from "@/features/categorySlice";
import { jobApi } from "@/features/JobSlice";
import { overViewApi } from "@/features/OverViewApi";
import { userApi } from "@/features/UserApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [overViewApi.reducerPath] : overViewApi.reducer,
    [userApi.reducerPath] : userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware, authApi.middleware, overViewApi.middleware, userApi.middleware),
});

// ✅ For TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
