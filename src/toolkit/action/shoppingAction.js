import { toast } from "react-hot-toast";
import { API } from "../../utils/interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

// -------------- Categories
export const categoryList = createAsyncThunk("categoryList", async () => {
  try {
    const response = await API.get("category/list");
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

export const createCategory = createAsyncThunk(
  "createCategory",
  async (payload) => {
    try {
      const response = await API.post("category/create", payload);
      const { Data, Remarks } = response.data;
      toast.success(Remarks);
      return Data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (payload) => {
    try {
      const response = await API.post("category/create", payload);
      const { Data, Remarks } = response.data;
      toast.success(Remarks);
      return Data;
    } catch (error) {
      throw error;
    }
  }
);

// -------------- Sub Categories
export const subCategoryList = createAsyncThunk("subCategoryList", async () => {
  try {
    const response = await API.get("sub-category/list");
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

export const createSubCategory = createAsyncThunk(
  "createSubCategory",
  async (payload) => {
    try {
      const response = await API.post("sub-category/create", payload);
      const { Data, Remarks } = response.data;
      toast.success(Remarks);
      return Data;
    } catch (error) {
      throw error;
    }
  }
);

// -------------- Products
export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  try {
    const response = await API.get("product/list-by-admin");
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});
