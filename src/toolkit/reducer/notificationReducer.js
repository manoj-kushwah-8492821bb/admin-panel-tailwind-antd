import { createSlice } from "@reduxjs/toolkit";
import {
  notificationList,
  pushNotification,
} from "../action/notificationAction";

const initialState = {
  fetchLoad: false,
  loading: false,
  notifications: [],
};

const notificationReducer = createSlice({
  name: "Notification",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //......... notification list
    builder.addCase(notificationList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(notificationList.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(notificationList.rejected, (state) => {
      state.fetchLoad = false;
    });

    //............ push notification KYC
    builder.addCase(pushNotification.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(pushNotification.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(pushNotification.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default notificationReducer.reducer;
