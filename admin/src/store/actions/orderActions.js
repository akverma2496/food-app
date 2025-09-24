// src/redux/orderActions.js
import axios from "axios";
import {
  setOrders,
  updateOrder,
  setLoading,
  setUpdateLoading,
  setError,
} from "../slices/orderSlice";
import { toast } from "react-toastify";

const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/orders`;

// 🔹 Fetch all orders
export const fetchOrders = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(BASE_URL);
    const data = res.data.documents?.map((doc) => ({
      id: doc.name.split("/").pop(),
      customerName: doc.fields.customerName.stringValue,
      customerEmail: doc.fields.customerEmail.stringValue,
      totalPrice: doc.fields.totalPrice.doubleValue || 0,
      status: doc.fields.status.stringValue,
      items: doc.fields.items.arrayValue?.values?.map((i) => ({
        name: i.mapValue.fields.name.stringValue,
        qty: i.mapValue.fields.qty.integerValue,
        price: i.mapValue.fields.price.doubleValue,
      })) || [],
      createdAt: doc.fields.createdAt.timestampValue,
    })) || [];

    dispatch(setOrders(data));
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to fetch orders");
  } finally {
    dispatch(setLoading(false));
  }
};

// 🔹 Update order status
export const updateOrderStatus = (id, newStatus) => async (dispatch) => {
  dispatch(setUpdateLoading(id));
  try {
    const payload = {
      fields: {
        status: { stringValue: newStatus },
      },
    };
    await axios.patch(`${BASE_URL}/${id}?updateMask.fieldPaths=status`, payload);

    dispatch(updateOrder({ id, status: newStatus }));
    toast.success("Order status updated");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to update status");
  } finally {
    dispatch(setUpdateLoading(null));
  }
};
