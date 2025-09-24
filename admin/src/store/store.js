import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice"
import recipeReducer from "./slices/recipeSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    recipes: recipeReducer,
    orders: orderReducer,
  },
});

export default store;
