import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaReact } from "react-icons/fa";
import { useFirebase } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";

const CustomNavbar = () => {
  const { user, isLoggedIn ,signout } = useFirebase();
  let name = user?.displayName || user?.email || "";
  let src = user?.photoURL || null;
  const navigate=useNavigate();
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-2">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <FaReact size={28} className="me-2 text-info" />
          <span className="fw-bold fs-4">Bookify</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto flex-column flex-lg-row align-items-center align-items-lg-center  gap-lg-3">
            <Nav.Link href="/" className="text-white" >
              Home
            </Nav.Link>
            {isLoggedIn ? <Nav.Link href="/book-listing" className="text-white nav-link">
              List Your Book
            </Nav.Link>:<></>} 
          </Nav>

      
          <Nav className="ms-auto d-flex flex-column flex-lg-row align-items-center align-items-lg-center gap-2 gap-lg-3 mt-lg-0">
            {!isLoggedIn ? (
                <div className="d-flex flex-lg-row flex-column">
                    <Nav.Link href="/signin" className="text-white">
                     <Button variant="outline-light" style={{width:"100px"}}>Sign In</Button>
                    </Nav.Link>
                    <Nav.Link href="/register" className="text-white">
                     <Button variant="outline-light" style={{width:"100px"}}>Sign up</Button>
                    </Nav.Link>
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
                  style={{width:"100px"}}
                  className="mb-3 mb-lg-0"
                  onClick={async() => {
                    try{
                         const res=await signout(isLoggedIn);
                         console.log(res);
                        navigate('/');
                    }catch(e){

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
