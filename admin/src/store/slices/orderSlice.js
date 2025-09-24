// src/redux/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,          // for initial fetch
    updateLoadingId: null,   // track which order is being updated
    error: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) order.status = status;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUpdateLoading: (state, action) => {
      state.updateLoadingId = action.payload; // orderId or null
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setOrders,
  addOrder,
  updateOrder,
  setLoading,
  setUpdateLoading,
  setError,
} = ordersSlice.actions;

export default ordersSlice.reducer;
