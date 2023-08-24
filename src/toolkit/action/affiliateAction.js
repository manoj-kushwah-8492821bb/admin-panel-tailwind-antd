import { toast } from "react-hot-toast";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

//........... affiliate list
export const affiliateList = createAsyncThunk("affiliateList", async () => {
  try {
    const response = await API.get("affiliate/list");
    const { Data, ResponseStatus } = response.data;
    if (ResponseStatus === 1) {
      return Data;
    }
  } catch (error) {
    throw error;
  }
});

//.............. affiliate create
export const affiliateCreate = createAsyncThunk(
  "affiliateCreate",
  async ({ payload, callback }) => {
    try {
      const response = await API.post("affiliate/create", payload);
      const { ResponseStatus, Remarks } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

//................ affiliate remove
export const affiliateRemove = createAsyncThunk(
  "affiliateRemove",
  async (affiliateId) => {
    try {
      const response = await API.delete(`affiliate/remove/${affiliateId}`);
      const { ResponseStatus, Remarks } = response.data;
      if (ResponseStatus === 1) {
        toast.success(Remarks);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

//............. affiliate update
export const affiliateUpdate = createAsyncThunk(
  "affiliateUpdate",
  async ({ payload, affiliateId, callback }) => {
    try {
      const response = await API.patch(
        `affiliate/update/${affiliateId}`,
        payload
      );
      const { ResponseStatus, Remarks } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

// ---------------------- Whitelist IP Address
export const ipList = createAsyncThunk("ipList", async () => {
  try {
    const response = await API.get("ip-address/list");
    const { Data, ResponseStatus } = response.data;
    if (ResponseStatus === 1) {
      return Data;
    }
  } catch (error) {
    throw error;
  }
});

export const ipCreate = createAsyncThunk("ipCreate", async (payload) => {
  try {
    const response = await API.post("ip-address/new", payload);
    const { ResponseStatus, Remarks } = response.data;
    if (ResponseStatus === 1) {
      toast.success(Remarks);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const ipRemove = createAsyncThunk("ipRemove", async (ipID) => {
  try {
    const response = await API.delete(`ip-address/remove/${ipID}`);
    const { ResponseStatus, Remarks } = response.data;
    if (ResponseStatus === 1) {
      toast.success(Remarks);
      return response.data;
    }
  } catch (error) {
    throw error;
  }
});

export const ipUpdate = createAsyncThunk(
  "ipUpdate",
  async ({ payload, ipId }) => {
    try {
      const response = await API.patch(`ip-address/update/${ipId}`, payload);
      const { ResponseStatus, Remarks } = response.data;
      if (ResponseStatus === 1) {
        toast.success(Remarks);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const ipStatusUpdate = createAsyncThunk(
  "ipStatusUpdate",
  async ({ payload, ipId }) => {
    try {
      const response = await API.patch(
        `ip-address/update-status/${ipId}`,
        payload
      );
      const { ResponseStatus, Remarks } = response.data;
      if (ResponseStatus === 1) {
        toast.success(Remarks);
        return response.data;
      }
    } catch (error) {
      throw error;
    }
  }
);
