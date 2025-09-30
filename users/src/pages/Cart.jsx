import { useSelector } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const Cart = () => {
  const { items } = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h4>Your cart is empty.</h4>
        <Link to="/" className="btn btn-primary mt-3">
          Browse Recipes
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Your Cart</h2>
      <Row className="mb-3 fw-bold border-bottom pb-2">
        <Col xs={1}>Image</Col>
        <Col xs={3}>Name</Col>
        <Col xs={2}>Price</Col>
        <Col xs={2}>Quantity</Col>
        <Col xs={2}>Action</Col>
      </Row>

      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}

      <Row className="mt-4">
        <Col xs={12} className="text-end">
          <h5>Total: ${totalPrice.toFixed(2)}</h5>
          <Link to="/checkout" className="btn btn-success mt-2">
            Proceed to Checkout
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
