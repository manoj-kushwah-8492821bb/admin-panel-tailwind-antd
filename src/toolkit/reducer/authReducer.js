import { createSlice } from "@reduxjs/toolkit";
import {
  txn_list,
  sendMoney,
  authLogin,
  adminProfile,
} from "../action/authAction";

const initialState = {
  loading: false,
  fetchLoad: false,
  transactions: [],
  profileData: {},
  responseStatus: 10,
};

const authReducer = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //......... auth login
    builder.addCase(authLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authLogin.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(authLogin.rejected, (state) => {
      state.loading = false;
    });

    //........... send money
    builder.addCase(sendMoney.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendMoney.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.responseStatus = action.payload.ResponseStatus;
    });
    builder.addCase(sendMoney.rejected, (state) => {
      state.loading = false;
    });

    //............ txn list
    builder.addCase(txn_list.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(txn_list.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(txn_list.rejected, (state) => {
      state.fetchLoad = false;
    });

    //................ profileData
    builder.addCase(adminProfile.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(adminProfile.fulfilled, (state, action) => {
      state.profileData = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(adminProfile.rejected, (state) => {
      state.fetchLoad = false;
    });
  },
});

export default authReducer.reducer;
