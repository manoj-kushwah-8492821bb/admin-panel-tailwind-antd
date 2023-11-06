import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";
// -------------- dashboard
export const dashboardApi = createAsyncThunk("dashboard", async () => {
  try {
    const response = await API.get("dashboard");
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});
