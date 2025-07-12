import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';
import Modal from '../components/Modal';
function Intro() {
    const{isLoggedIn}=useFirebase();
  const navigate = useNavigate();

  const handleListYourBooks = () => {
    if(isLoggedIn)
    navigate('/book-listing');
    else
    navigate('/signin');
  };

  return (
    <Container className="py-lg-2 py-4 pb-2">
    <Modal/>
      <Row className="align-items-center">
        {/* Left Side */}
        <Col lg={6} className="mb-4 mb-lg-0">
          <h1 className="fw-bold display-5">
            Welcome to Bookify
          </h1>
          <p className="text-muted mt-3">
           Welcome to BookiFy — your trusted marketplace for second-hand books. Whether you’re searching for captivating reads at affordable prices or looking to give your pre-loved books a new home, our community of passionate readers and sellers makes it easy. Explore hidden gems, save money, and share the joy of reading today!
          </p>
          <div className="mt-4 d-flex flex-wrap gap-3">
            <Button 
              variant="warning" 
              size="md"
              href="#books"
              className='fw-bold'
            >
              View Books
            </Button>
            <Button 
              variant="danger" 
              size="md"
              onClick={handleListYourBooks}
              className='fw-bold'
            >
              List Your Books
            </Button>
          </div>
        </Col>

        {/* Right Side */}
        <Col lg={6} className="text-center">
          <img 
            src="https://img.freepik.com/premium-vector/man-reading-book-thinking_294791-297.jpg?ga=GA1.1.865801184.1752313415&semt=ais_hybrid&w=740" 
            alt="Man reading book" 
            className="img-fluid rounded"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        </Col>
      </Row>
      <div className='hr-div'>
                <hr className='hr' />
      </div>
    </Container>
  );
}

export default Intro;
