import { createSlice } from "@reduxjs/toolkit";
import { authLogin } from "../action/authAction";

const initialState = { loading: false };

const authReducer = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // auth login
    builder.addCase(authLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(authLogin.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authReducer.reducer;
