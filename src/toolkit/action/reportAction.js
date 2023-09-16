import { toast } from "react-hot-toast";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  allTxnHistory,
  bbps_history,
  dth_history,
  recharge_history,
} from "../../utils/endpoints";

//............... recharge history
export const rechargeHistory = createAsyncThunk("rechargeHistory", async () => {
  try {
    const response = await API.get(recharge_history);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    const { Remarks } = error?.response?.data;
    toast.error(Remarks);
  }
});

//............... dth history
export const dthHistory = createAsyncThunk("dthHistory", async () => {
  try {
    const response = await API.get(dth_history);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    const { Remarks } = error?.response?.data;
    toast.error(Remarks);
  }
});

//............... all txn history
export const allTransaction = createAsyncThunk("allTransaction", async () => {
  try {
    const response = await API.get(allTxnHistory);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    const { Remarks } = error?.response?.data;
    toast.error(Remarks);
  }
});

//............... bbps reports history
export const bbpsHistory = createAsyncThunk("bbpsHistory", async () => {
  try {
    const response = await API.get(bbps_history);
    const { Data } = response.data;
    return Data;
  } catch (error) {
    const { Remarks } = error?.response?.data;
    toast.error(Remarks);
  }
});
