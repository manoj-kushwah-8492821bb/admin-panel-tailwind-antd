import { createSlice } from "@reduxjs/toolkit";
import {
  addService,
  bannerList,
  serviceList,
  createBanner,
  removeBanner,
  removeService,
  updateService,
  affiliateBannerList,
  createAffilliateBanner,
  removeAffilliateBanner,
} from "../action/serviceAction";

const initialState = {
  fetchLoad: false,
  loading: false,
  services: [],
  banners: [],
  affilliateBanner: [],
};

const serviceReducer = createSlice({
  name: "Service",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //........... service list
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

    //............ create service
    builder.addCase(addService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addService.rejected, (state) => {
      state.loading = false;
    });

    //............... update service
    builder.addCase(updateService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateService.rejected, (state) => {
      state.loading = false;
    });

    //............... remove service
    builder.addCase(removeService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeService.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(removeService.rejected, (state) => {
      state.loading = false;
    });

    //............... banner list
    builder.addCase(bannerList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(bannerList.fulfilled, (state, action) => {
      state.banners = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(bannerList.rejected, (state) => {
      state.fetchLoad = false;
    });

    //................. create banner
    builder.addCase(createBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBanner.fulfilled, (state, action) => {
      state.banners = [action.payload.Data, ...state.banners];
      state.loading = false;
    });
    builder.addCase(createBanner.rejected, (state) => {
      state.loading = false;
    });

    //.................. remove banner
    builder.addCase(removeBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeBanner.fulfilled, (state, action) => {
      state.banners = state.banners.filter(
        (item) => item._id != action.payload.Data._id
      );
      state.loading = false;
    });
    builder.addCase(removeBanner.rejected, (state) => {
      state.loading = false;
    });

    //............... banner list
    builder.addCase(affiliateBannerList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(affiliateBannerList.fulfilled, (state, action) => {
      state.affilliateBanner = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(affiliateBannerList.rejected, (state) => {
      state.fetchLoad = false;
    });

    //................. create banner
    builder.addCase(createAffilliateBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAffilliateBanner.fulfilled, (state, action) => {
      state.affilliateBanner = [action.payload.Data, ...state.affilliateBanner];
      state.loading = false;
    });
    builder.addCase(createAffilliateBanner.rejected, (state) => {
      state.loading = false;
    });

    //.................. remove banner
    builder.addCase(removeAffilliateBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeAffilliateBanner.fulfilled, (state, action) => {
      state.affilliateBanner = state.affilliateBanner.filter(
        (item) => item._id != action.payload.Data._id
      );
      state.loading = false;
    });
    builder.addCase(removeAffilliateBanner.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default serviceReducer.reducer;
