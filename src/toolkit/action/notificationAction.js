import { toast } from "react-hot-toast";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification_create, notification_list } from "../../utils/endpoints";

//............... notification list
export const notificationList = createAsyncThunk(
  "notificationList",
  async () => {
    try {
      const response = await API.get(notification_list);
      const { Data } = response.data;
      return Data;
    } catch (error) {
      throw error;
    }
  }
);

//................ push notification
export const pushNotification = createAsyncThunk(
  "pushNotification",
  async (payload) => {
    try {
      const response = await API.post(notification_create, payload);
      const { Remarks } = response.data;
      toast.success(Remarks);
      return response.data;
    } catch (error) {
      if (error.response.status === 500) {
        toast.error(error.message);
      } else {
        const { Remarks } = error?.response?.data;
        toast.error(Remarks);
      }
    }
  }
);
