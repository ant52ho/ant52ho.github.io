import { Container, Row, Col } from "react-bootstrap";
import globalStyles from "../../styles.module.css";
import ClareHomeItem from "../ClareHomeItem/ClareHomeItem";
import { Link } from "react-router-dom";

const linkInfo = [
  { link: "/", text: "Homepage" },
  {
    link: "/blog/post/9ab69e9c-2867-438b-aa45-c1f7287148e6",
    text: "Bradford Visit 2",
  },
  { link: "/clare/birthday23", text: "Happy 23rd Birthday!" },
  { link: "/clare/valentines2025", text: "Valentines 2025" },
];

const ClareHome = () => {
  return (
    <>
      <div
        className="d-flex justify-content-start align-items-center flex-column"
        style={{
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <Container fluid>
          <h1 className="justify-content-start">
            Hi Clare! I made a homepage for you :>
          </h1>
          <Row className="gx-3">
            {linkInfo.map((data, i) => (
              <Col md={6} sm={12} className="pt-4">
                <ClareHomeItem link={data.link} text={data.text} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ClareHome;
