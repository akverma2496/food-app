import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRecipe, removeRecipe } from "../../store/actions/recipeActions";
import { Card, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { useSelector as useCategoriesSelector } from "react-redux";

const RecipeItem = ({ recipe }) => {
  const dispatch = useDispatch();
  const { updateLoadingId, deleteLoadingId } = useSelector((state) => state.recipes);
  const { categories } = useCategoriesSelector((state) => state.categories);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...recipe, imageFile: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUpdate = () => {
    dispatch(editRecipe(recipe.id, formData));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this recipe?")) dispatch(removeRecipe(recipe.id));
  };

  return (
    <Card style={{ width: "16rem" }} className="shadow-sm border-0">
      <Card.Img
        variant="top"
        src={formData.imageFile ? URL.createObjectURL(formData.imageFile) : recipe.image}
        alt={recipe.name}
        style={{ height: "140px", objectFit: "cover" }}
      />
      <Card.Body>
        {isEditing ? (
          <>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} className="mb-2" size="sm" />
            <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} className="mb-2" size="sm" />
            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} className="mb-2" size="sm" />
            <Form.Select name="categoryId" value={formData.categoryId} onChange={handleChange} className="mb-2" size="sm">
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Form.Select>
            <Form.Control type="file" accept="image/*" name="imageFile" onChange={handleChange} size="sm" className="mb-2" />
          </>
        ) : (
          <>
            <Card.Title style={{ fontSize: "1rem" }}>{recipe.name} - ₹{recipe.price}</Card.Title>
            <Card.Text style={{ fontSize: "0.8rem" }}>{recipe.description}</Card.Text>
            <Card.Text style={{ fontSize: "0.75rem", color: "gray" }}>
              Category: {categories.find((c) => c.id === recipe.categoryId)?.name || "N/A"}
            </Card.Text>
          </>
        )}

        <Row className="g-2">
          {isEditing ? (
            <>
              <Col>
                <Button
                  variant="success"
                  size="sm"
                  className="w-100"
                  onClick={handleUpdate}
                  disabled={updateLoadingId === recipe.id}
                >
                  {updateLoadingId === recipe.id ? <Spinner size="sm" /> : "Save"}
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-100"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Col>
            </>
          ) : (
            <>
              <Col>
                <Button variant="outline-primary" size="sm" className="w-100" onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100"
                  onClick={handleDelete}
                  disabled={deleteLoadingId === recipe.id}
                >
                  {deleteLoadingId === recipe.id ? <Spinner size="sm" /> : "Delete"}
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default RecipeItem;
