import { toast } from "react-hot-toast";
import { API } from "../../utils/interceptor";
import {
  send,
  login_url,
  txnHistory,
  profile_data,
} from "../../utils/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

//............... auth login
export const authLogin = createAsyncThunk("Auth", async (payload) => {
  try {
    const response = await API.post(login_url, payload);
    const { AccessToken, Remarks } = response.data;
    toast.success(Remarks);
    localStorage.setItem("AccessToken", AccessToken);
    return response.data;
  } catch (error) {
    const { Remarks } = error?.response?.data;
    toast.error(Remarks);
  }
});

//.............. send money
export const sendMoney = createAsyncThunk(
  "sendMoney",
  async ({ payload, callback }) => {
    try {
      const response = await API.post(send, payload);
      const { Remarks } = response.data;
      toast.success(Remarks);
      callback();
      return response.data;
    } catch (error) {
      const { Remarks } = error?.response?.data;
      toast.error(Remarks);
    }
  }
);

//................. txn list
export const txn_list = createAsyncThunk("txn_list", async (type) => {
  try {
    const response = await API.get(`${txnHistory}?type=${type}`);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    const { Remarks } = error?.response?.data;
    toast.error(Remarks);
  }
});

//................... profile data
export const adminProfile = createAsyncThunk("adminProfile", async () => {
  try {
    const response = await API.get(profile_data);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    const { Remarks } = error?.response?.data;
    toast.error(Remarks);
  }
});
