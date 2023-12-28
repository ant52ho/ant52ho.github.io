import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Technologies from "components/Technologies/Technologies.js";
import { FaArrowRight } from "react-icons/fa";
import "./Experience.css";
import { HashLink as Link } from "react-router-hash-link";

// import reactLogo from "../logo.svg";
// import uwLogo from "../images/uwlogo.png";

const Experience = ({
  logo,
  title,
  employer,
  date,
  technologies,
  subtitle,
  body,
  link,
}) => {
  var contentBody = body;
  if (body) {
    contentBody = body.split(/\n */);
  }
  return (
    <>
      <Row className="my-2 shadowBorder oddSpacing">
        <Col className="experienceLogoContainer col-auto">
          <img src={logo} className="experienceLogo py-4"></img>
        </Col>
        <Col className="experienceContent py-3">
          <h4 className="m-0">{title}</h4>
          <p className="m-0 companyDate d-none d-md-block">
            {employer} {date ? "|" : null} {date}
          </p>
          <p className="m-0 companyDate d-block d-md-none">{employer}</p>
          <p className="m-0 companyDate d-block d-md-none">{date}</p>
          <p className="m-0">{subtitle}</p>
          {body ? (
            <ul className="pt-2 m-0 experienceBody d-none d-md-block">
              {contentBody.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : null}
          <div className="py-2 d-none d-md-block">
            <Technologies technologies={technologies} />
          </div>
          <div className="d-flex justify-content-end pb-1 pt-3">
            <Link to={link} target="_blank" className="readMore py-1">
              <Button
                variant="outline-secondary"
                className="readMore"
                size="lg"
              >
                Read More <FaArrowRight />
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Experience;
