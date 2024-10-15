// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated:
      JSON.parse(localStorage.getItem("insta-isLogged")!) || false,
    token: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.setItem("insta-isLogged", JSON.stringify("false"));
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
  },
});

export const { logout, login } = auth.actions;
export default auth.reducer;
