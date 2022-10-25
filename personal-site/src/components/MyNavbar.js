import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../images/logo.svg";
import "./MyNavbar.css";
import resume from "../files/f22resume.pdf";

const MyNavbar = () => {
  const sizes = [false, "sm", "md", "lg", "xl", "xxl"];
  const expand = "md";
  return (
    <>
      <div className="navWrap bg-dark position-fixed">
        <div className="navContainer">
          <Navbar collapseOnSelect expand={expand} bg="dark" variant="dark">
            <Container fluid className="d-flex justify-content-between">
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top navLogo"
                />{" "}
              </Navbar.Brand>
              <Navbar.Brand href="/">Anthony Ho</Navbar.Brand>
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
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 navText">
                    {/* <Nav className="justify-content-between pe-3"> */}
                    {/* <a href="#about">
                      <div className="navText border">Hello</div>
                    </a> */}

                    <Nav.Link className="px-4" href="/#about">
                      About
                      {/* <div className="navText">Hello</div> */}
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
                    </Nav.Link>
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
