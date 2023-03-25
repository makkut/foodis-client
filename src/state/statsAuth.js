import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const { setIsMenuOpen } = authSlice.actions;

export default authSlice.reducer;
