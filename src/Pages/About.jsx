import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card className="p-4 shadow-sm">
            <h2 className="text-center mb-4">About Me</h2>
            <p>
              Hello! I’m <strong>Wasim Akhtar Khan</strong>, the developer of BookiFy.
              I’m passionate about building web applications that solve real-world
              problems. BookiFy was born from my belief that books deserve new life
              in the hands of new readers, making great reads more affordable for everyone.
            </p>
            <p>
              I enjoy coding in modern JavaScript, React, Node.js, and exploring new tech.
              When I’m not coding, you’ll find me learning something new or diving into a good book!
            </p>

            <h4 className="mt-5 mb-3">Connect With Me</h4>

            <Form action="mailto:wasimakhtarkhan2003@gmail.com" method="post" encType="text/plain">
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="Enter your name" required />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Your Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter your email" required />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} name="message" placeholder="Your message..." required />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send Message
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
