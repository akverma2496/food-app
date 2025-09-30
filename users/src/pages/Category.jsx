import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import RecipeCard from "../components/RecipeCard";
import { toast } from "react-toastify";

const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;

const Category = () => {
  const { id } = useParams(); // category id from route
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  const fetchRecipes = async () => {
    try {
      setLoading(true);

      // 1️⃣ Fetch category name
      const catRes = await axios.get(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/categories/${id}`
      );
      setCategoryName(catRes.data.fields.name.stringValue);

      // 2️⃣ Fetch recipes where categoryId == id
      const res = await axios.get(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/recipes`
      );

      const allRecipes = res.data.documents?.map((doc) => ({
        id: doc.name.split("/").pop(),
        name: doc.fields.name.stringValue,
        price: doc.fields.price?.doubleValue || doc.fields.price?.integerValue || 0,
        shortDescription: doc.fields.shortDescription?.stringValue || "",
        categoryId: doc.fields.categoryId?.stringValue,
        image: doc.fields.image?.stringValue || "",
      })) || [];

      // Filter recipes for this category
      const filtered = allRecipes.filter((r) => r.categoryId === id);
      setRecipes(filtered);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">{categoryName}</h2>
      {recipes.length === 0 ? (
        <p className="text-center">No recipes found in this category.</p>
      ) : (
        <Row className="g-3">
          {recipes.map((recipe) => (
            <Col key={recipe.id} xs={12} sm={6} md={4} lg={3}>
              <RecipeCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Category;
