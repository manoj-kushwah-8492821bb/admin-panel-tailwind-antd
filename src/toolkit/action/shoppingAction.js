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
  async ({ payload, callback }) => {
    try {
      const response = await API.post("category/create", payload);
      const { Data, Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return Data;
      } else {
        toast.error(Remarks);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async ({ categoryId, payload, callback }) => {
    try {
      const response = await API.patch(`category/${categoryId}`, payload);
      const { Data, Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return Data;
      } else {
        toast.error(Remarks);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const removeCategory = createAsyncThunk(
  "removeCategory",
  async (categoryId) => {
    try {
      const response = await API.delete(`category/${categoryId}`);
      const { Remarks } = response.data;
      toast.success(Remarks);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// --------------Bussiness Categories
export const bussinessCategoryList = createAsyncThunk(
  "bussinessCategoryList",
  async () => {
    try {
      const response = await API.get("bussiness-category/list");
      const { Data } = response.data;
      return Data;
    } catch (error) {
      throw error;
    }
  }
);

export const createBussinessCategory = createAsyncThunk(
  "createBussinessCategory",
  async ({ payload, callback }) => {
    try {
      const response = await API.post("bussiness-category/create", payload);
      const { Data, Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return Data;
      } else {
        toast.error(Remarks);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const updateBussinessCategory = createAsyncThunk(
  "updateBussinessCategory",
  async ({ categoryId, payload, callback }) => {
    try {
      const response = await API.patch(
        `bussiness-category/${categoryId}`,
        payload
      );
      const { Data, Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return Data;
      } else {
        toast.error(Remarks);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const removeBussinessCategory = createAsyncThunk(
  "removeBussinessCategory",
  async ({ categoryId, callback }) => {
    try {
      const response = await API.delete(`bussiness-category/${categoryId}`);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return response.data;
      } else {
        toast.error(Remarks);
      }
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
  async ({ payload, callback }) => {
    try {
      const response = await API.post("sub-category/create", payload);
      const { Data, Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return Data;
      } else {
        toast.error(Remarks);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  "updateSubCategory",
  async ({ subCategoryId, payload, callback }) => {
    try {
      const response = await API.patch(
        `sub-category/${subCategoryId}`,
        payload
      );
      const { Data, Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return Data;
      } else {
        toast.error(Remarks);
      }
    } catch (error) {
      throw error;
    }
  }
);

export const removeSubCategory = createAsyncThunk(
  "removeSubCategory",
  async ({ subCategoryId, callback }) => {
    try {
      const response = await API.delete(`sub-category/${subCategoryId}`);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return response.data;
      } else {
        toast.error(Remarks);
      }
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

export const publishProduct = createAsyncThunk(
  "publishProduct",
  async ({ payload, callback }) => {
    try {
      const response = await API.patch("product/publish", payload);
      const { Remarks, ResponseStatus } = response.data;
      if (ResponseStatus === 1) {
        callback();
        toast.success(Remarks);
        return response.data;
      } else {
        toast.error(Remarks);
      }
    } catch (error) {
      throw error;
    }
  }
);

// -------------- Orders
export const fetchOrders = createAsyncThunk("orderList", async () => {
  try {
    const response = await API.get("order/list");
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

export const updateOrder = createAsyncThunk("updateOrder", async (payload) => {
  try {
    const response = await API.patch(`order/manage-cancel-request`, payload);
    const { Remarks } = response.data;
    toast.success(Remarks);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createOrder = createAsyncThunk("createOrder", async (payload) => {
  try {
    const response = await API.post(`shiprocket/orders/create/adhoc`, payload);
    const { Remarks } = response.data;
    toast.success(Remarks);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.Remarks.message);
    throw error;
  }
});

// --------------- Service Area
export const fetchAreas = createAsyncThunk("fetchAreas", async () => {
  try {
    const response = await API.get("service-area");
    const { Data } = response.data;
    return Data;
  } catch (error) {
    throw error;
  }
});

export const createAreas = createAsyncThunk(
  "createAreas",
  async ({ payload, callback }) => {
    try {
      const response = await API.post("service-area", payload);
      const { Data, Remarks, ResponseStatus } = response.data;
      callback();
      return Data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateAreas = createAsyncThunk(
  "updateAreas",
  async ({ payload, callback }) => {
    try {
      const response = await API.put("service-area", payload);
      const { Data } = response.data;
      callback();
      return Data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteAreas = createAsyncThunk(
  "deleteAreas",
  async ({ areaId, callback }) => {
    try {
      const response = await API.delete(`service-area/${areaId}`);
      const { Data } = response.data;
      callback();
      return Data;
    } catch (error) {
      throw error;
    }
  }
);
