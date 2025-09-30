import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { clearCart } from "../store/slices/cartSlice";
import { placeOrder } from "../store/actions/orderActions"; // We'll create this action

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleOrderPlace = () => {
    if (!address) {
      toast.error("Please enter a delivery address.");
      return;
    }

    setLoading(true);
    const order = {
      userId: user.uid,
      items,
      totalAmount: calculateTotal(),
      address,
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    dispatch(placeOrder(order)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
      } else {
        toast.error("Failed to place order.");
      }
      setLoading(false);
    });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-4">Checkout</h3>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your delivery address"
                    required
                  />
                </Form.Group>

                <h5 className="mt-4">Order Summary</h5>
                {items.map((item) => (
                  <div key={item.id} className="d-flex justify-content-between">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="d-flex justify-content-between mt-3">
                  <strong>Total:</strong>
                  <strong>${calculateTotal()}</strong>
                </div>

                <div className="d-grid mt-4">
                  <Button
                    variant="primary"
                    onClick={handleOrderPlace}
                    disabled={loading}
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
