import { createSlice } from "@reduxjs/toolkit";
import {
  allTransaction,
  dthHistory,
  rechargeHistory,
} from "../action/reportAction";

const initialState = { fetchLoad: false, recharges: [], dths: [], allTxn: [] };

const reportReducer = createSlice({
  name: "Report",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //.................. recharge history
    builder.addCase(rechargeHistory.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(rechargeHistory.fulfilled, (state, action) => {
      state.recharges = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(rechargeHistory.rejected, (state) => {
      state.fetchLoad = false;
    });

    //................... dth history
    builder.addCase(dthHistory.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(dthHistory.fulfilled, (state, action) => {
      state.fetchLoad = false;
      state.dths = action.payload;
    });
    builder.addCase(dthHistory.rejected, (state) => {
      state.fetchLoad = false;
    });

    //................... all txn history
    builder.addCase(allTransaction.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(allTransaction.fulfilled, (state, action) => {
      state.fetchLoad = false;
      state.allTxn = action.payload;
    });
    builder.addCase(allTransaction.rejected, (state) => {
      state.fetchLoad = false;
    });
  },
});

export default reportReducer.reducer;
