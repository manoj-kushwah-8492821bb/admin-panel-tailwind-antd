import { createSlice } from "@reduxjs/toolkit";
import {
  categoryList,
  subCategoryList,
  fetchProducts,
  createCategory,
  createSubCategory,
} from "../action/shoppingAction";

const initialState = {
  fetchLoad: false,
  loading: false,
  categoriesList: [],
  subCategoriesList: [],
  productsList: [],
};

const shoppingReducer = createSlice({
  name: "Shopping",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // category list
    builder.addCase(categoryList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(categoryList.fulfilled, (state, action) => {
      state.categoriesList = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(categoryList.rejected, (state) => {
      state.fetchLoad = false;
    });

    // create category
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categoriesList = [action.payload, ...state.categoriesList];
      state.loading = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.loading = false;
    });

    // sub category list
    builder.addCase(subCategoryList.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(subCategoryList.fulfilled, (state, action) => {
      state.subCategoriesList = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(subCategoryList.rejected, (state) => {
      state.fetchLoad = false;
    });

    // create sub category
    builder.addCase(createSubCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSubCategory.fulfilled, (state, action) => {
      state.subCategoriesList = [action.payload, ...state.subCategoriesList];
      state.loading = false;
    });
    builder.addCase(createSubCategory.rejected, (state) => {
      state.loading = false;
    });

    // products list
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchLoad = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsList = action.payload;
      state.fetchLoad = false;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.fetchLoad = false;
    });
  },
});

export default shoppingReducer.reducer;
