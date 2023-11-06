import { createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "../action/dashboard.action";

const initialState = {
  fetchLoad: false,
  loading: false,
  dashboardData: [],
};

const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // category list
    builder.addCase(dashboardApi.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(dashboardApi.fulfilled, (state, action) => {
      state.dashboardData = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(dashboardApi.rejected, (state) => {
      state.fetchLoad = false;
    });
  },
});
export default dashboardReducer.reducer;
