import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./About.css";
import logo from "../logo.svg";
import { AiFillMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { GrDocumentPdf } from "react-icons/gr";

const About = () => {
  return (
    <>
      <Container fluid className="pt-5 border-b">
        <Row>
          <h1>About</h1>
        </Row>
        <Row className="flex-md-row-reverse border-b">
          <Col
            xs={12}
            md={8}
            className="d-flex flex-column justify-content-center"
          >
            <div>
              Hello! I'm Anthony Ho. I'm a 2nd year student pursuing a Computer
              Science and Business Administration Double Degree at the
              University of Waterloo and Wilfrid Laurier University.
            </div>
            <div className="pt-3">
              I've done a handful of data-related projects and Python-based
              software development. Feel free to view my resume or contact me at
              anthony52ho@gmail.com.
            </div>
            <Container className="d-flex flex-row justify-content-center pt-4">
              <AiFillMail className="aboutLogo" />
              <AiFillLinkedin className="aboutLogo" />
              <AiFillGithub className="aboutLogo" />
              <GrDocumentPdf className="aboutLogo m-0" />
            </Container>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex align-items-center justify-content-center"
          >
            <img src={logo} className="imgScale border-b"></img>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
