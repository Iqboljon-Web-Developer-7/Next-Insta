import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import authSlice from "./slices/check";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
