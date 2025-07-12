import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate=useNavigate();
    const handleAbout=()=>{
        navigate('/about');
    }
    const handleListing=()=>{
        navigate('/book-listing');
    }
    const handleBooks=()=>{
        navigate('/');
    }

  return (
    <footer className="bg-dark text-white mt-5 py-4 px-4 px-lg-0">
      <Container>
        <Row>
          <Col md={6}>
            <h5 className="fw-bold">BookiFy</h5>
            <p style={{ maxWidth: '400px' }}>
              Your trusted platform for discovering and buying second-hand books from fellow readers.
            </p>
          </Col>
          <Col md={6} className="d-flex justify-content-md-end justify-content-start">
            <ul className="list-unstyled">
              <li className=''>
                <a className="cursor-pointer" onClick={handleAbout}>About me</a>
              </li>
              <li className=''>
                <a className="cursor-pointer" onClick={handleListing}>List Your Book</a>
              </li>
              <li className=''>
                <a className="cursor-pointer" onClick={handleBooks}>Browse Books</a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="border-light" />
        <p className="text-center mb-0">
          &copy; {new Date().getFullYear()} BookiFy. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
