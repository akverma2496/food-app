import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;

// --- FETCH PROFILE ---
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (uid, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}?key=${API_KEY}`
      );

      const fields = res.data.fields;
      return {
        name: fields?.name?.stringValue || "",
        email: fields?.email?.stringValue || "",
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message || "Failed to load profile");
    }
  }
);

// --- UPDATE PROFILE ---
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ uid, name, email }, { rejectWithValue }) => {
    try {
      await axios.patch(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}?key=${API_KEY}`,
        {
          fields: {
            name: { stringValue: name },
            email: { stringValue: email },
          },
        }
      );
      return { name, email };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error?.message || "Failed to update profile");
    }
  }
);
