import { toast } from "react-hot-toast";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { service_create, service_list } from "../../utils/endpoints";

// service list
export const serviceList = createAsyncThunk("getService", async () => {
  try {
    const response = await API.get(service_list);
    const { Data, ResponseStatus } = response.data;
    if (ResponseStatus === 1) {
      return Data;
    }
  } catch (error) {
    throw error;
  }
});

// create service
export const addService = createAsyncThunk("postService", async (payload) => {
  try {
    const response = await API.post(service_create, payload);
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
});

// update service
export const updateService = createAsyncThunk(
  "updateService",
  async (serviceId, payload) => {
    try {
      const response = await API.patch(`service/${serviceId}`, payload);
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

// remove service
export const removeService = createAsyncThunk(
  "removeService",
  async (serviceId) => {
    try {
      const response = await API.delete(`service/${serviceId}`);
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

// ------------------------------- BANNERS

export const bannerList = createAsyncThunk("bannerList", async () => {
  try {
    const response = await API.get("banner/list");
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

export const createBanner = createAsyncThunk(
  "createBanner",
  async (payload) => {
    try {
      const response = await API.post("banner/create", payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        toast.success(Remarks);
        return response.data;
      }
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

export const updateBanner = createAsyncThunk(
  "updateBanner",
  async (payload, bannerId) => {
    try {
      const response = await API.patch(`banner/${bannerId}`, payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        toast.success(Remarks);
        return response.data;
      }
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

export const removeBanner = createAsyncThunk(
  "removeBanner",
  async (bannerId) => {
    try {
      const response = await API.delete(`banner/${bannerId}`);
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
