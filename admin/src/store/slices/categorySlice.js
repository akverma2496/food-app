import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,        // only for initial fetch
  addLoading: false,
  updateLoading: false,
  deleteLoadingId: null,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.categories[index] = action.payload;
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter((c) => c.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAddLoading: (state, action) => {
      state.addLoading = action.payload;
    },
    setUpdateLoading: (state, action) => {
      state.updateLoading = action.payload;
    },
    setDeleteLoading: (state, action) => {
      state.deleteLoadingId = action.payload; // null or categoryId
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setLoading,
  setAddLoading,
  setUpdateLoading,
  setDeleteLoading,
  setError,
} = categorySlice.actions;

export default categorySlice.reducer;
