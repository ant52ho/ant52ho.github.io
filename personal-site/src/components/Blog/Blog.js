import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  function onSignupClick() {
    navigate("/login");
  }

  return (
    <>
      <div className="vh-100">
        <div className="h-100 d-flex justify-content-center align-items-center flex-column">
          <Row className="m-3">
            <h1>Blog</h1>
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
