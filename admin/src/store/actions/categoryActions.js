import axios from "axios";
import { toast } from "react-toastify";
import {
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  setLoading,
  setAddLoading,
  setUpdateLoading,
  setDeleteLoading,
  setError,
} from "../slices/categorySlice";

const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/categories`;

// Upload Image via REST API
const uploadImageRest = async (file) => {
  if (!file) return "";
  const filePath = `categories/${Date.now()}-${file.name}`;
  const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o?uploadType=media&name=${encodeURIComponent(filePath)}`;
  await axios.post(uploadUrl, file, { headers: { "Content-Type": file.type } });
  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(filePath)}?alt=media`;
};

// Fetch categories
export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(BASE_URL);
    const data = res.data.documents?.map((doc) => ({
      id: doc.name.split("/").pop(),
      name: doc.fields.name.stringValue,
      image: doc.fields.image.stringValue,
    })) || [];
    dispatch(setCategories(data));
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to fetch categories");
  } finally {
    dispatch(setLoading(false));
  }
};

// Add category
export const createCategory = (category) => async (dispatch) => {
  dispatch(setAddLoading(true));
  try {
    let imageUrl = "";
    if (category.imageFile) imageUrl = await uploadImageRest(category.imageFile);

    const payload = { fields: { name: { stringValue: category.name }, image: { stringValue: imageUrl } } };
    const res = await axios.post(BASE_URL, payload);
    const newCategory = {
      id: res.data.name.split("/").pop(),
      name: res.data.fields.name.stringValue,
      image: res.data.fields.image.stringValue,
    };
    dispatch(addCategory(newCategory));
    toast.success("Category added successfully!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to add category");
  } finally {
    dispatch(setAddLoading(false));
  }
};

// Edit category
export const editCategory = (id, category) => async (dispatch) => {
  dispatch(setUpdateLoading(true));
  try {
    let imageUrl = category.image; // keep old image if not replaced
    if (category.imageFile) imageUrl = await uploadImageRest(category.imageFile);

    const payload = { fields: { name: { stringValue: category.name }, image: { stringValue: imageUrl } } };
    const res = await axios.patch(`${BASE_URL}/${id}?updateMask.fieldPaths=name&updateMask.fieldPaths=image`, payload);

    const updatedCategory = { id, name: res.data.fields.name.stringValue, image: res.data.fields.image.stringValue };
    dispatch(updateCategory(updatedCategory));
    toast.success("Category updated successfully!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to update category");
  } finally {
    dispatch(setUpdateLoading(false));
  }
};

// Delete category
export const removeCategory = (id) => async (dispatch) => {
  dispatch(setDeleteLoading(id)); // mark this card as loading
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    dispatch(deleteCategory(id));
    toast.success("Category deleted successfully!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to delete category");
  } finally {
    dispatch(setDeleteLoading(null)); // reset
  }
};
