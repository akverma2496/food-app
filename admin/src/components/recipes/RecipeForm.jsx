// src/components/RecipeForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Spinner } from "react-bootstrap";
import { createRecipe } from "../../store/actions/recipeActions";

const RecipeForm = () => {
  const dispatch = useDispatch();
  const { addLoading } = useSelector((state) => state.recipes);
  const { categories } = useSelector((state) => state.categories); // 🔹 get categories

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecipe(formData));
    setFormData({
      name: "",
      price: "",
      description: "",
      categoryId: "",
      imageFile: null,
    });
  };

  return (
    <Form
      className="d-flex gap-2 align-items-center mb-4"
      onSubmit={handleSubmit}
    >
      <Form.Control
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Form.Control
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <Form.Control
        type="text"
        name="description"
        placeholder="Ingredients"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <Form.Select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </Form.Select>
      <Form.Control
        type="file"
        name="imageFile"
        accept="image/*"
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="success" disabled={addLoading}>
        {addLoading ? <Spinner size="sm" animation="border" /> : "Add"}
      </Button>
    </Form>
  );
};

export default RecipeForm;
