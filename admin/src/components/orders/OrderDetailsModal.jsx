// src/components/OrderDetailsModal.jsx
import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Order Details - {order.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Customer Info</h5>
        <p>
          <strong>Name:</strong> {order.customerName} <br />
          <strong>Email:</strong> {order.customerEmail}
        </p>

        <h5>Items</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <h5>Total Price: ${order.totalPrice.toFixed(2)}</h5>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailsModal;
