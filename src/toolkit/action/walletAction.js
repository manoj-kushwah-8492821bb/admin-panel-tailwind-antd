import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { manage_wallet } from "../../utils/endpoints";

//................. manage wallet
export const manageWallet = createAsyncThunk(
  "manageWallet",
  async ({ payload, callback }) => {
    try {
      const response = await API.post(send, payload);
      const { Remarks } = response.data;
      callback();
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
