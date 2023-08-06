import { toast } from "react-hot-toast";
import {
  kyc_list,
  kyc_manage,
  user_list,
  withdraw_list,
  withdraw_manage,
} from "../../utils/endpoints";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

// users list
export const userList = createAsyncThunk("getUser", async () => {
  try {
    const response = await API.get(user_list);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

// kyc request list
export const kycList = createAsyncThunk("getKYC", async () => {
  try {
    const response = await API.get(kyc_list);

    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

// withdraw request list
export const withdrawList = createAsyncThunk("getWithdraw", async () => {
  try {
    const response = await API.get(withdraw_list);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

// manage kyc
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

// manage withdraw
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
