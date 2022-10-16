import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Experience.css";

// import reactLogo from "../logo.svg";
// import uwLogo from "../images/uwlogo.png";

const Experience = ({ logo }) => {
  return (
    <>
      <Row className="my-2 shadowBorder oddSpacing">
        <Col className="experienceLogoContainer col-auto">
          <img src={logo} className="experienceLogo py-4"></img>
        </Col>
        <Col className="experienceText py-3">
          <h4 className="m-0">title</h4>
          <p className="m-0">Company name</p>
          <p className="m-0">date</p>
          <p className="m-0 mt-2">Technologies</p>
          <p className="m-0">subtitle</p>
        </Col>
      </Row>
    </>
  );
};

export default Experience;
