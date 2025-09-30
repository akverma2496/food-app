import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;

// helper to map firebase error codes


// --- SIGN UP ---
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        { email, password, returnSecureToken: true }
      );

      const { localId, idToken } = res.data;

      // create user profile in Firestore
      await axios.post(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users?documentId=${localId}`,
        {
          fields: {
            name: { stringValue: name },
            email: { stringValue: email },
          },
        }
      );

      return { uid: localId, email, name, idToken };
    } catch (err) {
      const code = err.response?.data?.error?.message;
      return rejectWithValue(code);
    }
  }
);

// --- LOGIN ---
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        { email, password, returnSecureToken: true }
      );
      const { localId, idToken } = res.data;

      return { uid: localId, email, idToken };
    } catch (err) {
      const code = err.response?.data?.error?.message;
      console.log(code)
      return rejectWithValue(code);
    }
  }
);

// --- FORGOT PASSWORD ---
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
        { requestType: "PASSWORD_RESET", email }
      );
      return "Password reset email sent!";
    } catch (err) {
      const code = err.response?.data?.error?.message;
      return rejectWithValue(code);
    }
  }
);

