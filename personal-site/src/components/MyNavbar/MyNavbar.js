import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "images/logo.png";
import "./MyNavbar.css";
import { HashLink as Link } from "react-router-hash-link";
import { getNavbarIcon } from "utils/iconUtils";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import { jwtDecode } from "jwt-decode";
import { resume } from "../../globals";

function selectNavlinks(user) {
  const links = [
    { to: "/#about", label: "About", className: "nav-link px-4" },
    { to: "/#experiences", label: "Experience", className: "nav-link px-4" },
    { to: "/#projects", label: "Projects", className: "nav-link px-4" },
    { to: "/blog", label: "Blog", className: "nav-link px-4" },
    {
      href: resume,
      label: "Resume",
      target: "_blank",
      className: "nav-link px-4",
    },
  ];

  const clareLinks = [
    {
      to: "/clare",
      label: "Clare",
      className: "nav-link px-4",
      style: { backgroundColor: "#e5737a", color: "white" },
    },
    { to: "/blog", label: "Blog", className: "nav-link px-4" },
  ];

  if (user.userRole && user.userRole === "clare") {
    return clareLinks;
  } else {
    return links;
  }
}

const MyNavbar = () => {
  const sizes = [false, "sm", "md", "lg", "xl", "xxl"];
  const authHeader = useAuthHeader();
  const userInfo = authHeader()
    ? jwtDecode(authHeader())
    : { username: "guest", userRole: "guest" };
  const links = selectNavlinks(userInfo);

  const expand = "md";
  return (
    <>
      <div className="navWrap bg-dark position-fixed">
        <div className="navContainer">
          <Navbar collapseOnSelect expand={expand} bg="dark" variant="dark">
            <Container fluid className="d-flex justify-content-between">
              <Link to="/#home">
                <Navbar.Brand>{getNavbarIcon(userInfo.userRole)}</Navbar.Brand>
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
                    {links.map((link, index) => {
                      return link.label !== "Resume" ? (
                        <Link
                          key={index}
                          to={link.to}
                          label={link.label}
                          className={link.className}
                          href={link.href}
                          target={link.target}
                          style={link.style}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={index}
                          to={link.to}
                          label={link.label}
                          className={link.className}
                          href={link.href}
                          target={link.target}
                          style={link.style}
                        >
                          {link.label}
                        </a>
                      );
                    })}
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
