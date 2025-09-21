// src/actions/authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

// Login request
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message || "Login failed");
    }
  }
);

// Logout (just clears localStorage)
export const logoutUser = () => {
  localStorage.removeItem("token");
  return true;
};
