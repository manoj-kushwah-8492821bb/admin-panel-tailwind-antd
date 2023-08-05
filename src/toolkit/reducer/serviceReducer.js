import { createSlice } from "@reduxjs/toolkit";
import {
  addService,
  removeService,
  serviceList,
  updateService,
} from "../action/serviceAction";

const initialState = {
  fetchLoad: false,
  loading: false,
  services: [],
};

const serviceReducer = createSlice({
  name: "Service",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // service list
    builder.addCase(serviceList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(serviceList.fulfilled, (state, action) => {
      state.services = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(serviceList.rejected, (state) => {
      state.fetchLoad = false;
    });

    // create service
    builder.addCase(addService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addService.rejected, (state) => {
      state.loading = false;
    });

    // update service
    builder.addCase(updateService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateService.rejected, (state) => {
      state.loading = false;
    });

    // remove service
    builder.addCase(removeService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(removeService.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default serviceReducer.reducer;
