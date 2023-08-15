import { createSlice } from "@reduxjs/toolkit";
import {
  categoryList,
  subCategoryList,
  fetchProducts,
  createCategory,
  createSubCategory,
  removeCategory,
  removeSubCategory,
  publishProduct,
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

    // remove category
    builder.addCase(removeCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeCategory.fulfilled, (state, action) => {
      state.categoriesList = state.categoriesList.filter(
        (item) => item._id != action.payload.Data._id
      );
      state.loading = false;
    });
    builder.addCase(removeCategory.rejected, (state) => {
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

    // remove sub category
    builder.addCase(removeSubCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeSubCategory.fulfilled, (state, action) => {
      state.subCategoriesList = state.subCategoriesList.filter(
        (item) => item._id != action.payload.Data._id
      );
      state.loading = false;
    });
    builder.addCase(removeSubCategory.rejected, (state) => {
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

    // products publish
    builder.addCase(publishProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(publishProduct.fulfilled, (state, action) => {
      state.productsList = state.productsList.map((item) => {
        {
          return action.payload.Data._id == item._id
            ? action.payload.Data
            : item;
        }
      });
      state.loading = false;
    });
    builder.addCase(publishProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default shoppingReducer.reducer;
