import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useFirebase } from "../context/FirebaseContext";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState([]);
  const { retreiveData,uploadData } = useFirebase();
  

  useEffect(() => {
    const fetch = async () => {
      const data = await retreiveData();

      const booksArr = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBooks(booksArr);
    };

    fetch();
  }, [retreiveData]);
  return (
  <Container className="my-4">
    <h2 className="text-center mb-4 fw-bold">{books.length!=0?"Available Books":"No books available. List some books !"}</h2>
    <Row className="g-3 container-box">
      {books.map((book) => (
        <Col xs={12} sm={6} md={4} lg={3} key={book.id}>
          <Card className=" border-0 cards">
            <Card.Img
              variant="top"
              src={book.coverURL}
              alt={book.title}
              style={{ 
                height: "150px", 
                objectFit: "contain",
                borderRadius: "0.3rem" 
              }}
              className="mb-2"
            />
            <Card.Body className="d-flex flex-column p-2">
              <Card.Title className="fw-bold fs-6 mb-1">
                {book.title}
              </Card.Title>
              <Card.Text className="text-muted mb-2 fs-7 d-flex justify-content-between align-items-center ">
               <span>{book.username}</span>
               <span>Rs.{book.price}</span>
              </Card.Text>
              <div className="">
                <Link to={`/book/${book.id}`}>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="w-100"
                  >
                    Go to Book Details
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

}

export default Home;
