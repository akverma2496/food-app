import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";
import { fetchOrders } from "../store/actions/orderActions"; // To fetch orders from Firestore or Redux

const OrderTrackingPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchOrders(user.uid));
    }
  }, [dispatch, user]);

  // Function to determine the color of the order status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning"; // Yellow for pending
      case "preparing":
        return "info"; // Blue for preparing
      case "delivered":
        return "success"; // Green for delivered
      default:
        return "secondary"; // Default gray
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-4">My Orders</h3>

              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              ) : error ? (
                <div className="text-danger text-center">{error}</div>
              ) : orders.length === 0 ? (
                <div className="text-center">You have no orders yet.</div>
              ) : (
                <ListGroup>
                  {orders.map((order) => (
                    <ListGroup.Item key={order.id} className="mb-3">
                      <div className="d-flex justify-content-between">
                        <strong>Order ID: {order.id}</strong>
                        <span
                          className={`badge bg-${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-2">
                        <strong>Order Details:</strong>
                        <ul>
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.name} (x{item.quantity}) - ${(
                                item.price * item.quantity
                              ).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-2">
                        <strong>Total: </strong>${order.totalAmount.toFixed(2)}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderTrackingPage;
