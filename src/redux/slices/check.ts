import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

const auth = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: isBrowser
      ? JSON.parse(localStorage.getItem("insta-isLogged")!) || false
      : false,
    token: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      if (isBrowser) {
        localStorage.setItem("insta-isLogged", JSON.stringify("false"));
      }
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
  },
});

export const { logout, login } = auth.actions;
export default auth.reducer;
