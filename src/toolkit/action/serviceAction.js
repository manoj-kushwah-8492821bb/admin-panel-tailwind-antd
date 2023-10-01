import { toast } from "react-hot-toast";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { service_create, service_list } from "../../utils/endpoints";

// ------------------------------- SERVICES
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

export const addService = createAsyncThunk(
  "postService",
  async ({ payload, callback }) => {
    try {
      const response = await API.post(service_create, payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return response.data;
      } else {
        toast.error(Remarks);
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

export const updateService = createAsyncThunk(
  "updateService",
  async ({ serviceId, payload, callback }) => {
    try {
      const response = await API.patch(`service/${serviceId}`, payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return response.data;
      } else {
        toast.error(Remarks);
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

export const removeService = createAsyncThunk(
  "removeService",
  async ({ serviceId, callback }) => {
    try {
      const response = await API.delete(`service/${serviceId}`);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return response.data;
      } else {
        toast.error(Remarks);
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
  async ({ payload, callback }) => {
    try {
      const response = await API.post("banner/create", payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
      } else {
        toast.error(Remarks);
      }
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

export const updateBanner = createAsyncThunk(
  "updateBanner",
  async ({ payload, bannerId, callback }) => {
    try {
      const response = await API.patch(`banner/${bannerId}`, payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
      } else {
        toast.error(Remarks);
      }
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

// -------------------------------AFFILLIATE BANNERS

export const affiliateBannerList = createAsyncThunk(
  "affiliateBannerList",
  async () => {
    try {
      const response = await API.get("affiliate-banner/list");
      const { Data } = response.data;
      return Data;
    } catch (error) {
      throw error;
    }
  }
);

export const createAffilliateBanner = createAsyncThunk(
  "createAffilliateBanner",
  async ({ payload, callback }) => {
    try {
      const response = await API.post("affiliate-banner/create", payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
      } else {
        toast.error(Remarks);
      }
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

export const updateAffilliateBanner = createAsyncThunk(
  "updateAffilliateBanner",
  async ({ payload, bannerId, callback }) => {
    try {
      const response = await API.patch(`affiliate-banner/${bannerId}`, payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
      } else {
        toast.error(Remarks);
      }
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

export const removeAffilliateBanner = createAsyncThunk(
  "removeAffilliateBanner",
  async (bannerId) => {
    try {
      const response = await API.delete(`affiliate-banner/${bannerId}`);
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
