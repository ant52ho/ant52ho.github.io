import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./About.css";
import logo from "logo.svg";
import {
  AiFillMail,
  AiFillLinkedin,
  AiFillGithub,
  AiFillFilePdf,
} from "react-icons/ai";
// import { GrDocumentPdf } from "react-icons/gr";
// import pic from "images/apsan1.jpg";
// import pic from "images/thingvellir.jpg";
import pic from "images/cablecar.jpg";
import { resume } from "../../globals";
import yorushika from "images/yorushikaBannerCropped.jpg";

const About = () => {
  return (
    <>
      <Container fluid className="py-2 about" id="about">
        <Row>
          <h1>About</h1>
        </Row>
        <Row className="flex-md-row-reverse">
          <Col
            xs={12}
            md={7}
            className="d-flex flex-column justify-content-center"
          >
            <p className="m-0">
              Hello, I'm Anthony Ho. I'm a 4th year student pursuing a Computer
              Science and Business Administration Double Degree at the
              University of Waterloo and Wilfrid Laurier University.
            </p>
            <p className="pt-2">
              I've done a handful of data-related projects and Python-based
              software development. Feel free to{" "}
              <a href={resume} target="_blank" className="resumeLink">
                view my resume
              </a>{" "}
              or contact me at{" "}
              <a href="mailto:anthony52ho@gmail.com">anthony52ho@gmail.com</a>.
            </p>
            {/* <p className="">resume</p>
            <p className="">or contact me at anthony52ho@gmail.com.</p> */}
            <Container className="d-flex flex-row justify-content-center py-2">
              <a href="mailto:anthony52ho@gmail.com">
                <AiFillMail className="aboutLogo" />
              </a>
              <a href="https://www.linkedin.com/in/ant52ho/" target="_blank">
                <AiFillLinkedin className="aboutLogo" />
              </a>
              <a href="https://github.com/ant52ho" target="_blank">
                <AiFillGithub className="aboutLogo" />
              </a>
              <a href={resume} target="_blank">
                <AiFillFilePdf className="aboutLogo m-0" />
              </a>
            </Container>
          </Col>
          <Col xs={12} md={5}>
            <div className="p-2 d-flex flex-column align-items-center justify-content-center">
              <img src={pic} className="aboutImgScale mt-2 grow"></img>
              <span className="aboutImgCaption mt-2">
                My dad and I in a cable car
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
