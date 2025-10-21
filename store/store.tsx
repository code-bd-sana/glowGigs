import { jobApi } from "@/features/JobSlice";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobApi.middleware),
});

// ✅ For TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
