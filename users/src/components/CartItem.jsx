import { Row, Col, Button, Image, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../store/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Row className="align-items-center mb-3">
      <Col xs={1}>
        <Image
          src={item.image || "https://via.placeholder.com/100x80"}
          fluid
          rounded
        />
      </Col>
      <Col xs={3}>{item.name}</Col>
      <Col xs={2}>${item.price}</Col>
      <Col xs={2}>
        <Form.Control
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => {
            const qty = parseInt(e.target.value) || 1;
            dispatch(addToCart({ ...item, quantity: qty }));
          }}
        />
      </Col>
      <Col xs={2}>
        <Button variant="danger" size="sm" onClick={() => dispatch(removeFromCart(item.id))}>
          Remove
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;
