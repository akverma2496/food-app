// src/components/OrderList.jsx
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import OrderItem from "./OrderItem";
import OrderDetailsModal from "./OrderDetailsModal";

const OrderList = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                onView={() => setSelectedOrder(order)}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};

export default OrderList;
