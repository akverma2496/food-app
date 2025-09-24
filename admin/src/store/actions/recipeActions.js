// src/redux/actions/recipeActions.js
import axios from "axios";
import { toast } from "react-toastify";
import {
  setRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  setLoading,
  setAddLoading,
  setUpdateLoadingId,
  setDeleteLoadingId,
  setError,
} from "../slices/recipeSlice";

const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/recipes`;

// Upload Image via REST API
const uploadImageRest = async (file) => {
  if (!file) return "";
  const filePath = `recipes/${Date.now()}-${file.name}`;
  const uploadUrl = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o?uploadType=media&name=${encodeURIComponent(filePath)}`;
  await axios.post(uploadUrl, file, { headers: { "Content-Type": file.type } });
  return `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(filePath)}?alt=media`;
};

// Fetch recipes
export const fetchRecipes = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get(BASE_URL);
    const data = res.data.documents?.map((doc) => ({
      id: doc.name.split("/").pop(),
      name: doc.fields.name.stringValue,
      price: doc.fields.price.doubleValue || parseFloat(doc.fields.price.integerValue),
      description: doc.fields.description.stringValue,
      categoryId: doc.fields.categoryId.stringValue,
      image: doc.fields.image.stringValue,
    })) || [];
    dispatch(setRecipes(data));
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to fetch recipes");
  } finally {
    dispatch(setLoading(false));
  }
};

// Add recipe
export const createRecipe = (recipe) => async (dispatch) => {
  dispatch(setAddLoading(true));
  try {
    let imageUrl = "";
    if (recipe.imageFile) imageUrl = await uploadImageRest(recipe.imageFile);

    const payload = {
      fields: {
        name: { stringValue: recipe.name },
        price: { doubleValue: parseFloat(recipe.price) },
        description: { stringValue: recipe.description },
        categoryId: { stringValue: recipe.categoryId },
        image: { stringValue: imageUrl },
      },
    };

    const res = await axios.post(BASE_URL, payload);
    const newRecipe = {
      id: res.data.name.split("/").pop(),
      name: res.data.fields.name.stringValue,
      price: res.data.fields.price.doubleValue || parseFloat(res.data.fields.price.integerValue),
      description: res.data.fields.description.stringValue,
      categoryId: res.data.fields.categoryId.stringValue,
      image: res.data.fields.image.stringValue,
    };

    dispatch(addRecipe(newRecipe));
    toast.success("Recipe added successfully!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to add recipe");
  } finally {
    dispatch(setAddLoading(false));
  }
};

// Edit recipe
export const editRecipe = (id, recipe) => async (dispatch) => {
  dispatch(setUpdateLoadingId(id));
  try {
    let imageUrl = recipe.image; // keep old image if not replaced
    if (recipe.imageFile) imageUrl = await uploadImageRest(recipe.imageFile);

    const payload = {
      fields: {
        name: { stringValue: recipe.name },
        price: { doubleValue: parseFloat(recipe.price) },
        description: { stringValue: recipe.description },
        categoryId: { stringValue: recipe.categoryId },
        image: { stringValue: imageUrl },
      },
    };

    const res = await axios.patch(
      `${BASE_URL}/${id}?updateMask.fieldPaths=name&updateMask.fieldPaths=price&updateMask.fieldPaths=description&updateMask.fieldPaths=categoryId&updateMask.fieldPaths=image`,
      payload
    );

    const updatedRecipe = {
      id,
      name: res.data.fields.name.stringValue,
      price: res.data.fields.price.doubleValue || parseFloat(res.data.fields.price.integerValue),
      description: res.data.fields.description.stringValue,
      categoryId: res.data.fields.categoryId.stringValue,
      image: res.data.fields.image.stringValue,
    };

    dispatch(updateRecipe(updatedRecipe));
    toast.success("Recipe updated successfully!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to update recipe");
  } finally {
    dispatch(setUpdateLoadingId(null));
  }
};

// Delete recipe
export const removeRecipe = (id) => async (dispatch) => {
  dispatch(setDeleteLoadingId(id));
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    dispatch(deleteRecipe(id));
    toast.success("Recipe deleted successfully!");
  } catch (err) {
    dispatch(setError(err.message));
    toast.error("Failed to delete recipe");
  } finally {
    dispatch(setDeleteLoadingId(null));
  }
};
