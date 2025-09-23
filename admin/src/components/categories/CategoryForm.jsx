import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../store/actions/categoryActions";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const { addLoading } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({ name: "", imageFile: null });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.imageFile) return;
    dispatch(createCategory(formData));
    setFormData({ name: "", imageFile: null });
    e.target.reset();
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="align-items-center g-2">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Category Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="file"
            accept="image/*"
            name="imageFile"
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <Button type="submit" variant="primary" className="w-100" disabled={addLoading}>
            {addLoading ? <Spinner animation="border" size="sm" /> : "Add Category"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CategoryForm;
