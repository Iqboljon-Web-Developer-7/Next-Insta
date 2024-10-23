import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";

export const UserLogout = createSlice({
  name: "cart",
  initialState: {
    value: "",
  },
  reducers: {
    logout: (state, action) => {
      redirect("/auth/slice/login");
    },
  },
});

export const { logout } = UserLogout.actions;
export default UserLogout.reducer;
