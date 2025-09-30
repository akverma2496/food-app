// store/actions/orderActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;

// --- PLACE ORDER ---
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // Place the order in Firestore
      const res = await axios.post(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/orders?key=${API_KEY}`,
        {
          fields: {
            userId: { stringValue: orderData.userId },
            items: { arrayValue: { values: orderData.items.map(item => ({ mapValue: { fields: { name: { stringValue: item.name }, price: { doubleValue: item.price }, quantity: { integerValue: item.quantity } } } })) } },
            totalAmount: { doubleValue: parseFloat(orderData.totalAmount) },
            address: { stringValue: orderData.address },
            status: { stringValue: orderData.status },
            timestamp: { stringValue: orderData.timestamp },
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message || err.message);
    }
  }
);

// --- FETCH ORDERS ---
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (uid, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/orders?key=${API_KEY}`
      );

      // Filter orders placed by the current user
      const orders = res.data.documents.filter(
        (doc) => doc.fields.userId.stringValue === uid
      );

      return orders.map((order) => ({
        id: order.name.split("/").pop(), // Extract order ID from Firestore document path
        status: order.fields.status.stringValue,
        totalAmount: order.fields.totalAmount.doubleValue,
        items: order.fields.items.arrayValue.values.map((item) => ({
          name: item.mapValue.fields.name.stringValue,
          quantity: item.mapValue.fields.quantity.integerValue,
          price: item.mapValue.fields.price.doubleValue
        })),
      }));
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message || err.message);
    }
  }
);
