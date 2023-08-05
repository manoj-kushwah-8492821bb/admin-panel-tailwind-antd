import { createSlice } from "@reduxjs/toolkit";
import {
  kycList,
  manageKYC,
  manageWithdraw,
  userList,
  withdrawList,
} from "../action/userAction";

const initialState = {
  fetchLoad: false,
  loading: false,
  kycs: [],
  users: [],
  withdraws: [],
};

const userReducer = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // user list
    builder.addCase(userList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(userList.fulfilled, (state, action) => {
      state.users = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(userList.rejected, (state) => {
      state.fetchLoad = false;
    });

    // key request list
    builder.addCase(kycList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(kycList.fulfilled, (state, action) => {
      state.kycs = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(kycList.rejected, (state) => {
      state.fetchLoad = false;
    });

    // withdraw request list
    builder.addCase(withdrawList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(withdrawList.fulfilled, (state, action) => {
      state.withdraws = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(withdrawList.rejected, (state) => {
      state.fetchLoad = false;
    });

    // manage KYC
    builder.addCase(manageKYC.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(manageKYC.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(manageKYC.rejected, (state) => {
      state.loading = false;
    });

    // manage withdraw
    builder.addCase(manageWithdraw.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(manageWithdraw.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(manageWithdraw.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userReducer.reducer;
