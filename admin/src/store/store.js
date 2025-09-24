import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice"
import recipeReducer from "./slices/recipeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    recipes: recipeReducer,
  },
});

export default store;
