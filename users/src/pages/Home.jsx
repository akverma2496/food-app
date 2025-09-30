import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import CategoryCard from "../components/CategoryCard";
import { toast } from "react-toastify";

const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/categories`
      );

      // Transform Firestore REST data
      const data = res.data.documents?.map((doc) => ({
        id: doc.name.split("/").pop(),
        name: doc.fields.name.stringValue,
        image: doc.fields.image?.stringValue || "",
      })) || [];

      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Browse Categories</h2>
      <Row className="g-3">
        {categories.map((cat) => (
          <Col key={cat.id} xs={12} sm={6} md={4} lg={3}>
            <CategoryCard category={cat} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
