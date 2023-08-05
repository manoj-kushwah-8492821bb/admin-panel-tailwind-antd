import axios from "axios";
import { toast } from "react-hot-toast";
import { login_url } from "../../utils/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit";

// auth login
export const authLogin = createAsyncThunk("Auth", async (payload, callBack) => {
  try {
    const response = await axios.post(login_url, payload);
    const { AccessToken, Remarks } = response.data;
    toast.success(Remarks);
    localStorage.setItem("AccessToken", AccessToken);
    callBack();
  } catch (error) {
    const { Remarks } = error?.response?.data;
    toast.error(Remarks);
  }
});
