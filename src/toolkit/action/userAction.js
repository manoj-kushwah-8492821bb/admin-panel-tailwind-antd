import { toast } from "react-hot-toast";
import {
  kyc_list,
  user_list,
  kyc_manage,
  withdraw_list,
  withdraw_manage,
} from "../../utils/endpoints";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

//................. users list
export const userList = createAsyncThunk("getUser", async () => {
  try {
    const response = await API.get(user_list);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

//................. users status
export const userStatus = createAsyncThunk(
  "userStatus",
  async ({ payload, callback }) => {
    try {
      const response = await API.patch("user/status-update", payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        toast.success(Remarks);
        callback();
      } else {
        toast.error(Remarks);
      }
    } catch (error) {
      throw error;
    }
  }
);

//................ kyc request list
export const kycList = createAsyncThunk("getKYC", async () => {
  try {
    const response = await API.get(kyc_list);

    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

//............... withdraw request list
export const withdrawList = createAsyncThunk("getWithdraw", async () => {
  try {
    const response = await API.get(withdraw_list);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

//................. manage kyc
export const manageKYC = createAsyncThunk("postKYC", async (payload) => {
  try {
    const response = await API.post(kyc_manage, payload);
    const { Remarks } = response.data;
    toast.success(Remarks);
    return response.data;
  } catch (error) {
    if (error?.response?.status === 500) {
      toast.error(error.Remarks);
    } else {
      const { Remarks } = error?.response?.data;
      toast.error(Remarks);
    }
  }
});

//.................. manage withdraw
export const manageWithdraw = createAsyncThunk(
  "postWithdraw",
  async (payload) => {
    try {
      const response = await API.post(withdraw_manage, payload);
      const { Remarks } = response.data;
      toast.success(Remarks);
      return response.data;
    } catch (error) {
      if (error?.response?.status === 500) {
        toast.error(error.Remarks);
      } else {
        const { Remarks } = error?.response?.data;
        toast.error(Remarks);
      }
    }
  }
);

// ----------------------------------- MERCHANTS

export const merchantList = createAsyncThunk("merchantList", async (query) => {
  try {
    const url = query
      ? `auth/merchant-request-list/${query}`
      : `auth/merchant-request-list`;
    const response = await API.get(url);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

export const merchantSatusUpdate = createAsyncThunk(
  "merchantSatusUpdate",
  async ({ payload, callback }) => {
    try {
      const response = await API.post("auth/manage-request", payload);
      const { Data, ResponseStatus, Remarks } = response.data;
      if (ResponseStatus === 1) {
        toast.success(Remarks);
        callback();
        return Data;
      } else {
        toast.error(Remarks);
      }
    } catch (error) {
      throw error;
    }
  }
);
