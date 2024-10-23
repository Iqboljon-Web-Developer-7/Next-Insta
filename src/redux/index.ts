import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/check";
import userInfo from "./slices/userInfo";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userInfo,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
