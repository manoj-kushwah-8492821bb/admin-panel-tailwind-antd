import { createSlice } from "@reduxjs/toolkit";
import {
  ipList,
  ipCreate,
  ipRemove,
  ipUpdate,
  affiliateList,
  ipStatusUpdate,
  affiliateCreate,
  affiliateRemove,
  affiliateUpdate,
} from "../action/affiliateAction";

const initialState = {
  fetchLoad: false,
  loading: false,
  affiliates: [],
  ipAddresses: [],
};

const affiliateReducer = createSlice({
  name: "Affiliate",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // affiliate list
    builder.addCase(affiliateList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(affiliateList.fulfilled, (state, action) => {
      state.affiliates = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(affiliateList.rejected, (state) => {
      state.fetchLoad = false;
    });

    //.......... ip list
    builder.addCase(ipList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(ipList.fulfilled, (state, action) => {
      state.ipAddresses = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(ipList.rejected, (state) => {
      state.fetchLoad = false;
    });

    //........... affiliate create
    builder.addCase(affiliateCreate.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(affiliateCreate.fulfilled, (state, action) => {
      state.affiliates = [action.payload.Data, ...state.affiliates];
      state.fetchLoad = false;
    });
    builder.addCase(affiliateCreate.rejected, (state) => {
      state.fetchLoad = false;
    });

    //................. affiliate remove
    builder.addCase(affiliateRemove.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(affiliateRemove.fulfilled, (state, action) => {
      state.affiliates = state.affiliates.filter(
        (item) => item._id != action.payload.Data._id
      );
      state.fetchLoad = false;
    });
    builder.addCase(affiliateRemove.rejected, (state) => {
      state.fetchLoad = false;
    });

    //............... affiliate update
    builder.addCase(affiliateUpdate.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(affiliateUpdate.fulfilled, (state, action) => {
      state.affiliates = state.affiliates.map((item) =>
        item._id == action.payload.Data._id ? action.payload.Data : item
      );
      state.fetchLoad = false;
    });
    builder.addCase(affiliateUpdate.rejected, (state) => {
      state.fetchLoad = false;
    });

    //................. ip create
    builder.addCase(ipCreate.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(ipCreate.fulfilled, (state, action) => {
      state.ipAddresses = [action.payload.Data, ...state.ipAddresses];
      state.fetchLoad = false;
    });
    builder.addCase(ipCreate.rejected, (state) => {
      state.fetchLoad = false;
    });

    //............... ip remove
    builder.addCase(ipRemove.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(ipRemove.fulfilled, (state, action) => {
      state.ipAddresses = state.ipAddresses.filter(
        (item) => item._id != action.payload.Data._id
      );
      state.fetchLoad = false;
    });
    builder.addCase(ipRemove.rejected, (state) => {
      state.fetchLoad = false;
    });

    //................ ip update
    builder.addCase(ipUpdate.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(ipUpdate.fulfilled, (state, action) => {
      state.ipAddresses = state.ipAddresses.map((item) =>
        item._id == action.payload.Data._id ? action.payload.Data : item
      );
      state.fetchLoad = false;
    });
    builder.addCase(ipUpdate.rejected, (state) => {
      state.fetchLoad = false;
    });

    //..................... ip update
    builder.addCase(ipStatusUpdate.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(ipStatusUpdate.fulfilled, (state, action) => {
      state.ipAddresses = state.ipAddresses.map((item) =>
        item._id == action.payload.Data._id ? action.payload.Data : item
      );
      state.fetchLoad = false;
    });
    builder.addCase(ipStatusUpdate.rejected, (state) => {
      state.fetchLoad = false;
    });
  },
});

export default affiliateReducer.reducer;
