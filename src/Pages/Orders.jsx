import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';

function Orders() {
  const { orders, user } = useFirebase();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ordersFunction = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const res = await orders(user.uid);
        if (res) {
          console.log("Orders:", res);
          setData(res);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    ordersFunction();
  }, [user]);

  return (
    <Container className="mt-5 orders px-4">
      <h1 className="mb-4 text-center">My Orders</h1>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : data.length === 0 ? (
        <Alert variant="info" className="text-center">
          You have no orders yet.
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Book Name</th>
              <th>Quantity</th>
              <th>Amount (₹)</th>
              <th>Seller ID</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr key={order.order_id || index}>
                <td>{index + 1}</td>
                <td>{order.order_id}</td>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>₹{order.amount}</td>
                <td>{order.sellerId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Orders;
