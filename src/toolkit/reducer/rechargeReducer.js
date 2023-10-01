import { createSlice } from "@reduxjs/toolkit";
import { rechargeRefundList } from "../action/rechargeAction";

const initialState = { loading: false, fetchLoad: false, rechargeRefunds: [] };

const rechargeReducer = createSlice({
  name: "Recharge",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //............. recharge refund list
    builder.addCase(rechargeRefundList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(rechargeRefundList.fulfilled, (state, action) => {
      state.rechargeRefunds = action.payload;
      state.loading = false;
    });
    builder.addCase(rechargeRefundList.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default rechargeReducer.reducer;
