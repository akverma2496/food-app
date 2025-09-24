// src/components/OrderItem.jsx
import React from "react";
import { Button, Spinner, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../store/actions/orderActions";

const statusOptions = [
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const OrderItem = ({ order, onView }) => {
  const dispatch = useDispatch();
  const { updateLoadingId } = useSelector((state) => state.orders);

  const handleStatusChange = (newStatus) => {
    if (newStatus !== order.status) {
      dispatch(updateOrderStatus(order.id, newStatus));
    }
  };

  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.customerName}</td>
      <td>${order.totalPrice.toFixed(2)}</td>
      <td>{order.status}</td>
      <td>{new Date(order.createdAt).toLocaleString()}</td>
      <td className="d-flex gap-2">
        <Button size="sm" variant="info" onClick={onView}>
          View
        </Button>
        <Dropdown>
          <Dropdown.Toggle
            size="sm"
            variant="warning"
            disabled={updateLoadingId === order.id}
          >
            {updateLoadingId === order.id ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Update"
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {statusOptions.map((status) => (
              <Dropdown.Item
                key={status}
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default OrderItem;
