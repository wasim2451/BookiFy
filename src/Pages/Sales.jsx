import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/FirebaseContext'
import { Container, Table, Spinner, Alert } from 'react-bootstrap';

function Sales() {
  const { sales, user } = useFirebase();
  const [dataArr, setDataArr] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      const salesFn = async () => {
        try {
          const res = await sales(user?.uid);
        //   console.log(res);
          setDataArr(res || []);
          
          const sum = (res || []).reduce((acc, item) => acc + (item.amount || 0), 0);
          setTotal(sum);
        } catch (error) {
          console.error("Error fetching sales:", error);
        } finally {
          setLoading(false);
        }
      };
      salesFn();
    } else {
      setLoading(false);
    }
  }, [user,dataArr]);

  return (
    <Container className="mt-5 sales">
      <h1 className="mb-4 text-center">My Sales</h1>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : dataArr.length === 0 ? (
        <Alert variant="info" className="text-center">
          You haven’t made any sales yet.
        </Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {dataArr.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.buyerName}</td>
                  <td>{item.buyerEmail}</td>
                  <td>₹{(item.amount || 0)}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h4 className="mt-4 text-end">
            Total Sales: <span className="text-success"><strong>₹{total}</strong></span>
          </h4>
        </>
      )}
    </Container>
  );
}

export default Sales;
