import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

export const cart = createSlice({
  name: "cart",
  initialState: {
    value: "",
  },
  reducers: {
    logOut: (state, action) => {
      redirect("/auth/slice/login");
    },
    // add: (state, action) => {
    //   state.value = [...state.value, action.payload.cart];
    // },
    // remove: (state, action) => {
    //   state.value = state.value.filter((item) => item.id != action.payload.id);
    // },
    // update: (state, action) => {
    //   state.value = state.value.map((item, idx) =>
    //     item.id == action.payload.id
    //       ? (state.value[idx] = action.payload.cart)
    //       : item
    //   );
    // },
  },
});

export const { logOut } = cart.actions;
export default cart.reducer;
