import { toast } from "react-hot-toast";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { service_create, service_list } from "../../utils/endpoints";

// service list
export const serviceList = createAsyncThunk("getService", async () => {
  try {
    const response = await API.get(service_list);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

// create service
export const addService = createAsyncThunk(
  "postService",
  async (payload, callBack) => {
    try {
      const response = await API.post(service_create, payload);
      const { Remarks } = response.data;
      // dispatch(serviceList());
      toast.success(Remarks);
      callBack();
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

// update service
export const updateService = createAsyncThunk(
  "updateService",
  async (serviceId, payload, callBack) => {
    try {
      await API.patch(`service/${serviceId}`, payload);
      // dispatch(serviceList());
      callBack && callBack();
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

// remove service
export const removeService = createAsyncThunk(
  "removeService",
  async (serviceId, callBack) => {
    try {
      const response = await API.delete(`service/${serviceId}`);
      const { Remarks } = response.data;
      // dispatch(serviceList());
      toast.success(Remarks);
      callBack();
    } catch (error) {
      if (error.response.status === 500) {
        toast.error(error.message);
      } else {
        const { Remarks } = error?.response?.data;
        toast.error(Remarks);
      }
      callBack();
    }
  }
);
