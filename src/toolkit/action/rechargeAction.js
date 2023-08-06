import { toast } from "react-hot-toast";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  recharge_refund_accept,
  recharge_refund_list,
} from "../../utils/endpoints";

// recharge refund list
export const rechargeRefundList = createAsyncThunk(
  "rechargeRefundList",
  async () => {
    try {
      const response = await API.get(recharge_refund_list);
      const { Data } = response.data;
      return Data;
    } catch (error) {
      const { Remarks } = error?.response?.data;
      toast.error(Remarks);
    }
  }
);

// recharge refund accept
export const rechargeRefundAccept = createAsyncThunk(
  "rechargeRefundAccept",
  async (payload) => {
    try {
      const response = await API.post(recharge_refund_accept, payload);
      const { Remarks } = response.data;
      toast.success(Remarks);
      return response.data;
    } catch (error) {
      const { Remarks } = error?.response?.data;
      toast.error(Remarks);
    }
  }
);
