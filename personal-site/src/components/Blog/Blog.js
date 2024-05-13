import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import {
  useAuthHeader,
  useIsAuthenticated,
  useAuthUser,
  useSignOut,
} from "react-auth-kit";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Blog = () => {
  const [userRole, setUserRole] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(useIsAuthenticated());
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const getHeader = useAuthHeader();
  function onSignupClick() {
    if (isAuthenticated()) {
      navigate("/blog");
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    const header = getHeader();
    if (header) {
      const decoded = jwtDecode(header);
      setUserRole(decoded.userRole);
    }
  }, []);

  const Logout = () => {
    signOut();
    setIsSignedIn(false);
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
              <div>
                {userRole == "admin" ? (
                  <Button
                    variant="dark"
                    onClick={() => navigate("/blog/admin")}
                    className="me-2"
                  >
                    Admin console
                  </Button>
                ) : null}
                <Button variant="dark" onClick={Logout}>
                  Sign out
                </Button>
              </div>
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
                  <Card.Title>View Posts</Card.Title>
                  <Card.Text>See posts!</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/blog/posts")}
                  >
                    Go!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} className="d-flex justify-content-center">
              <Card className="m-3" style={{ width: "18rem" }}>
                <div
                  className={`w-100 h-100 position-absolute d-flex align-items-center justify-content-center ${
                    isSignedIn ? "d-none" : null
                  }`}
                  style={{
                    backgroundColor: "#ffffffe6",
                  }}
                >
                  Must be signed in to create posts!
                </div>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title>Create Post</Card.Title>
                  <Card.Text>Yes, I will moderate them</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => navigate("/blog/create")}
                  >
                    Create
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
