import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { useState, useEffect } from "react";
import useIsAuthenticated from "react-auth-kit/dist/hooks/useIsAuthenticated";

const Blog = () => {
  const [isSignedIn, setIsSignedIn] = useState(useIsAuthenticated());
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const signOut = useSignOut();
  function onSignupClick() {
    navigate("/login");
  }

  useEffect(() => {
    if (isAuthenticated()) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });
  const Logout = () => {
    signOut();
    console.log("signed out");
  };

  return (
    <>
      <div className="vh-100">
        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
          <Row className="m-3">
            <h1>Blog</h1>
          </Row>
          <Row>
            {isSignedIn ? (
              <Button variant="dark" onClick={Logout}>
                Sign out
              </Button>
            ) : (
              <div>
                <Button className="me-2" onClick={() => navigate("/login")}>
                  Sign in
                </Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </div>
            )}
          </Row>
          <Row className="flex-md-row text-center justify-content-center pt-4">
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Card className="m-3" style={{ width: "18rem" }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title>General Content</Card.Title>
                  <Card.Text>Just normal items</Card.Text>
                  <Button variant="primary">Go!</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Card className="m-3" style={{ width: "18rem" }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title>Exclusive Content</Card.Title>
                  <Card.Text>O_o</Card.Text>
                  <Button variant="primary" onClick={() => onSignupClick()}>
                    ??
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Blog;
