import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaReact } from "react-icons/fa";
import { useFirebase } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const { user, isLoggedIn, signout } = useFirebase();

  const navigate = useNavigate();
  const name = user?.displayName || user?.email || "";
  const src = user?.photoURL || null;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
      <Container>
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <FaReact size={28} className="me-2 text-info" />
          <span className="fw-bold fs-4">Bookify</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex-column flex-lg-row align-items-center align-items-lg-center gap-lg-3">
            <Nav.Link
              onClick={() => navigate("/")}
              className="text-white"
              style={{ cursor: "pointer" }}
            >
              Home
            </Nav.Link>

            {isLoggedIn && (
              <>
                <Nav.Link
                  onClick={() => navigate("/book-listing")}
                  className="text-white"
                  style={{ cursor: "pointer" }}
                >
                  List Your Book
                </Nav.Link>

                <Nav.Link
                  onClick={() => navigate(`/user/sales/${user.uid}`)}
                  className="text-white"
                  style={{ cursor: "pointer" }}
                >
                  Sales
                </Nav.Link>

                <Nav.Link
                  onClick={() => navigate(`/user/orders/${user.uid}`)}
                  className="text-white"
                  style={{ cursor: "pointer" }}
                >
                  Orders
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto d-flex flex-column flex-lg-row align-items-center align-items-lg-center gap-2 gap-lg-3 mt-lg-0">
            {!isLoggedIn ? (
              <div className="d-flex flex-lg-row flex-column">
                <Button
                  variant="outline-light"
                  style={{ width: "100px" }}
                  onClick={() => navigate("/signin")}
                >
                  Sign In
                </Button>
                <Button
                  variant="outline-light"
                  style={{ width: "100px" }}
                  onClick={() => navigate("/register")}
                  className="ms-lg-3 mt-2 mt-lg-0"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <>
                {src && (
                  <img
                    src={src}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                      border: "2px solid #0dcaf0",
                    }}
                  />
                )}
                <span className="text-white">{name}</span>
                <Button
                  variant="outline-light"
                  size="sm"
                  style={{ width: "100px" }}
                  className="mb-3 mb-lg-0"
                  onClick={async () => {
                    try {
                      await signout(isLoggedIn);
                      navigate("/");
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                >
                  Sign Out
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
