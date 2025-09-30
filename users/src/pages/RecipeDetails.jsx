import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/recipes/${id}`
      );

      const doc = res.data;
      console.log(doc);
      const recipeData = {
        id: doc.name.split("/").pop(),
        name: doc.fields.name.stringValue,
        price: doc.fields.price?.doubleValue || doc.fields.price?.integerValue || 0,
        ingredients: doc.fields.description?.stringValue || "",
        image: doc.fields.image?.stringValue || "",
      };

      setRecipe(recipeData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load recipe");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...recipe, quantity: 1 }));
    toast.success("Recipe added to cart!");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (!recipe) {
    return <p className="text-center py-5">Recipe not found.</p>;
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={recipe.image || "https://via.placeholder.com/400x250"}
              style={{ height: "250px", objectFit: "cover" }}
            />
            <Card.Body>
              <h3>{recipe.name}</h3>
              <h5 className="text-primary">${recipe.price}</h5>

              <hr />
              <h6>Ingredients:</h6>
              <p>{recipe.ingredients}</p>

              <div className="d-grid">
                <Button variant="success" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeDetails;
