import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cart-slice";
import { api } from "./api";

export const store = configureStore({
  reducer: {
    cart: cartSlice,

    [api.reducerPath]: api.reducer, // caching
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
