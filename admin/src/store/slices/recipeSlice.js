// src/redux/slices/recipeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  loading: false,         // for initial fetch
  addLoading: false,
  updateLoadingId: null,  // track update per item
  deleteLoadingId: null,  // track delete per item
  error: null,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    updateRecipe: (state, action) => {
      const index = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) state.recipes[index] = action.payload;
    },
    deleteRecipe: (state, action) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAddLoading: (state, action) => {
      state.addLoading = action.payload;
    },
    setUpdateLoadingId: (state, action) => {
      state.updateLoadingId = action.payload; // recipeId or null
    },
    setDeleteLoadingId: (state, action) => {
      state.deleteLoadingId = action.payload; // recipeId or null
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  setLoading,
  setAddLoading,
  setUpdateLoadingId,
  setDeleteLoadingId,
  setError,
} = recipeSlice.actions;

export default recipeSlice.reducer;
