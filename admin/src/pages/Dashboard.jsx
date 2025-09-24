// src/pages/Dashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const { categories } = useSelector((state) => state.categories);
  const { recipes } = useSelector((state) => state.recipes);
  const { orders } = useSelector((state) => state.orders);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <Card.Body>
              <Card.Title>Total Categories</Card.Title>
              <Card.Text className="fs-3 fw-bold">
                {categories.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <Card.Body>
              <Card.Title>Total Recipes</Card.Title>
              <Card.Text className="fs-3 fw-bold">
                {recipes.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text className="fs-3 fw-bold">{orders.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
