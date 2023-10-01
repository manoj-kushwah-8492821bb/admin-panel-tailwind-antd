import { createSlice } from "@reduxjs/toolkit";
import {
  kycList,
  userList,
  manageKYC,
  withdrawList,
  merchantList,
  manageWithdraw,
  giftCardList,
} from "../action/userAction";

const initialState = {
  fetchLoad: false,
  loading: false,
  kycs: [],
  users: [],
  withdraws: [],
  merchants: [],
  giftCardsList: [],
  responseStatus: 10,
};

const userReducer = createSlice({
  name: "User",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //............. user list
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

    //................ merchant list
    builder.addCase(merchantList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(merchantList.fulfilled, (state, action) => {
      state.merchants = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(merchantList.rejected, (state) => {
      state.fetchLoad = false;
    });

    //................. key request list
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

    //...................... withdraw request list
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

    //................... manage KYC
    builder.addCase(manageKYC.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(manageKYC.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(manageKYC.rejected, (state) => {
      state.loading = false;
    });

    //..................... manage withdraw
    builder.addCase(manageWithdraw.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(manageWithdraw.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(manageWithdraw.rejected, (state) => {
      state.loading = false;
    });

    //..................... gift card list
    builder.addCase(giftCardList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(giftCardList.fulfilled, (state, action) => {
      state.giftCardsList = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(giftCardList.rejected, (state) => {
      state.fetchLoad = false;
    });
  },
});

export default userReducer.reducer;
