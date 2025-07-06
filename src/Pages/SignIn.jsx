import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
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
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2 className="mb-4 text-center">Sign In</h2>
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

                        <Button variant="primary" type="submit" className="w-100 mb-3">
                            Sign In
                        </Button>

                        <Button
                            variant="danger"
                            type="button"
                            className="w-100 fw-bold d-flex align-items-center justify-content-center"
                            onClick={handleGoogleSignIn}
                        >
                            <FcGoogle size={24} className="me-2" />
                            Sign In using Google
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;
