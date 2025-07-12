import React, { useState ,useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useFirebase } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
useNavigate
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {email_pass,isLoggedIn}=useFirebase();
  const navigate=useNavigate();
    useEffect(()=>{
        console.log("Navigating to Home on Logged In !");
        if(isLoggedIn){
            navigate('/');
        }
    },[isLoggedIn,navigate]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    try {
        const res= await email_pass(email,password);
        console.log(res.user.email," Signed Up !");
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center signin-container">
        <Col md={6}>
          <h2 className="mb-4 text-center">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
