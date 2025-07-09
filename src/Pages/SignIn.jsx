import React, { useEffect, useState } from "react";
import { Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,} from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useFirebase } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signin_email_pass, googleSignIn , isLoggedIn} = useFirebase();
    const navigate=useNavigate();
    useEffect(()=>{
        console.log("Navigating to Home on Logged In !");
        if(isLoggedIn){
            navigate('/');
        }
    },[isLoggedIn,navigate])
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add Firebase sign-in logic here later
        console.log("Email:", email);
        console.log("Password:", password);
        try {
            const res = await signin_email_pass(email, password);
            console.log(res);
        } catch (error) {
            console.log(error.message);
            alert(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        // Add Firebase Google sign-in logic here later
        try {
            console.log("Google sign-in clicked");
            const res = await googleSignIn();
            console.log(res);
            console.log(res.user.displayName, "Signed In !");
        } catch (error) {
            console.log(error.message);
        }

    };

    return (
       <Container className="py-5 px-4" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={6} lg={5}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Sign In</h3>
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

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  size="md"
                >
                  <b>Sign In</b>
                </Button>

                <Button
                  variant="danger"
                  type="button"
                  className="w-100 d-flex align-items-center justify-content-center"
                  onClick={handleGoogleSignIn}
                  size="md"
                >
                  <Image
                    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-white-icon.png"
                    alt="Google"
                    width={20}
                    className="me-2"
                  />
                  <b>Sign in with Google</b>
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    );
};

export default SignIn;
