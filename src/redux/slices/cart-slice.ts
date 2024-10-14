import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "cart",
  initialState: {
    value: [
      {
        id: 1,
        fname: "Iqboljon",
        lname: "Ummataliyev",
        phone: +998997976757,
        userName: "Iqboljon-Developer",
        gender: "male",
      },
      {
        id: 2,
        fname: "Islombek",
        lname: "Ummataliyev",
        phone: +998940952400,
        userName: "Islombek-Developer",
        gender: "male",
      },
      {
        id: 3,
        fname: "Boburjon",
        lname: "O'lponov",
        phone: +79774549489,
        userName: "Boburjon-Developer",
        gender: "male",
      },
      {
        id: 4,
        fname: "Hojimurod",
        lname: "O'lponov",
        phone: +998888331215,
        userName: "Hojimurod-Developer",
        gender: "male",
      },
    ],
  },
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload.cart];
    },
    remove: (state, action) => {
      state.value = state.value.filter((item) => item.id != action.payload.id);
    },
    update: (state, action) => {
      state.value = state.value.map((item, idx) =>
        item.id == action.payload.id
          ? (state.value[idx] = action.payload.cart)
          : item
      );
    },
  },
});

export const { add, remove, update } = cart.actions;
export default cart.reducer;
