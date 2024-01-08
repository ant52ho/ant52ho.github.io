import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "images/logo.png";
import "./MyNavbar.css";
import resume from "files/f22resume.pdf";
import { HashLink as Link } from "react-router-hash-link";
// import { useState } from "react";
// import { Link } from "react-router-dom";

const MyNavbar = () => {
  const sizes = [false, "sm", "md", "lg", "xl", "xxl"];
  const expand = "md";
  return (
    <>
      <div className="navWrap bg-dark position-fixed">
        <div className="navContainer">
          <Navbar collapseOnSelect expand={expand} bg="dark" variant="dark">
            <Container fluid className="d-flex justify-content-between">
              <Link to="/#home">
                <Navbar.Brand>
                  <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top navLogo"
                  />{" "}
                </Navbar.Brand>
              </Link>
              <Link to="/#home" className="text-decoration-none">
                <Navbar.Brand>Anthony Ho</Navbar.Brand>
              </Link>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Contents
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-md-end justify-content-start flex-grow-1 navText">
                    {/* <Nav className="justify-content-between pe-3"> */}
                    {/* <a href="#about">
                      <div className="navText border">Hello</div>
                    </a> */}
                    <Link to="/#about" className="nav-link px-4">
                      About
                    </Link>
                    <Link to="/#experiences" className="nav-link px-4">
                      Experience
                    </Link>
                    <Link to="/#projects" className="nav-link px-4">
                      Projects
                    </Link>
                    <Link to="/blog" className="nav-link px-4">
                      Blog
                    </Link>
                    <a className="nav-link px-4" href={resume} target="_blank">
                      Resume
                    </a>
                    {/* <Nav.Link className="px-4" href="/#about">
                      About
                    </Nav.Link>
                    <Nav.Link className="px-4" href="/#experiences">
                      Experience
                    </Nav.Link>
                    <Nav.Link className="px-4" href="/#projects">
                      Projects
                    </Nav.Link>
                    <Nav.Link className="px-4" href="/comingsoon">
                      Blog
                    </Nav.Link>
                    <Nav.Link className="px-4" href={resume}>
                      Resume
                    </Nav.Link> */}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </div>
        {/* </Container> */}
      </div>
    </>
  );
};

export default MyNavbar;
