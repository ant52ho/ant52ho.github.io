import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Technologies from "./Technologies";
import "./Experience.css";

// import reactLogo from "../logo.svg";
// import uwLogo from "../images/uwlogo.png";

const Experience = ({
  logo,
  title,
  employer,
  date,
  technologies,
  subtitle,
}) => {
  return (
    <>
      <Row className="my-2 shadowBorder oddSpacing">
        <Col className="experienceLogoContainer col-auto">
          <img src={logo} className="experienceLogo py-4"></img>
        </Col>
        <Col className="experienceText py-3">
          <h4 className="m-0">{title}</h4>
          <p className="m-0">{employer}</p>
          <p className="m-0">{date}</p>
          <Technologies technologies={technologies} />
          <p className="m-0">{subtitle}</p>
        </Col>
      </Row>
    </>
  );
};

export default Experience;
