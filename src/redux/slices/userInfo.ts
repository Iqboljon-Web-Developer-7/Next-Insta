import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";

const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    userInfo:
      (isBrowser && JSON.parse(localStorage.getItem("userInfo")!)) || {},
  },
  reducers: {
    saveUserInfo: (state, action) => {
      state.userInfo = action.payload.data;
      if (isBrowser) {
        localStorage.setItem("userInfo", JSON.stringify(action.payload.data));
      }
    },
  },
});

export const { saveUserInfo } = userInfo.actions;
export default userInfo.reducer;
