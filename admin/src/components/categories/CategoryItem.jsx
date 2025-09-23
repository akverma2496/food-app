import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCategory, removeCategory } from "../../store/actions/categoryActions";
import { Card, Button, Form, Row, Col, Spinner } from "react-bootstrap";

const CategoryItem = ({ category }) => {
  const dispatch = useDispatch();
  const { updateLoading, deleteLoading } = useSelector((state) => state.categories);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [imageFile, setImageFile] = useState(null);

  const handleUpdate = () => {
    dispatch(editCategory(category.id, { name, imageFile, image: category.image }));
    setIsEditing(false);
    setImageFile(null);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(removeCategory(category.id));
    }
  };

  return (
    <Card style={{ width: "14rem" }} className="shadow-sm border-0">
      <Card.Img
        variant="top"
        src={imageFile ? URL.createObjectURL(imageFile) : category.image}
        alt={category.name}
        style={{ height: "120px", objectFit: "cover" }}
      />
      <Card.Body className="p-2">
        {isEditing ? (
          <>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2"
              size="sm"
            />
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              size="sm"
              className="mb-2"
            />
          </>
        ) : (
          <Card.Title className="text-center mb-2" style={{ fontSize: "1rem" }}>
            {category.name}
          </Card.Title>
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
                  disabled={updateLoading}
                >
                  {updateLoading ? <Spinner animation="border" size="sm" /> : "Save"}
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-100"
                  onClick={() => {
                    setIsEditing(false);
                    setName(category.name);
                    setImageFile(null);
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </>
          ) : (
            <>
              <Col>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="w-100"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </Col>
              <Col>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="w-100"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? <Spinner animation="border" size="sm" /> : "Delete"}
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CategoryItem;
