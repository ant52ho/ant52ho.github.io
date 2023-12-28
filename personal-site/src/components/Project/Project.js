import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Project.css";
import Technologies from "components/Technologies/Technologies.js";
import { FaArrowRight } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { HashLink as Link } from "react-router-hash-link";

const Project = ({
  title,
  date,
  subtitle,
  articleLink,
  technologies,
  bgImage,
  body,
  githubLink,
}) => {
  var contentBody = body;
  if (body) {
    contentBody = body.split(/\n */);
  }

  const sectionStyle = {
    backgroundImage: `url(${bgImage})`,
  };

  return (
    <>
      <Col md={6} sm={12}>
        <div style={sectionStyle} className="hoverMove">
          <div className="projectBg">
            {/* <a className="projectLink" href={articleLink} target="_blank"> */}
            <Container className="project">
              <Row>
                <h4 className="m-0">{title}</h4>
                <p className="m-0">{date}</p>
                {body ? (
                  // <ul className="pt-2 m-0 experienceBody d-none d-md-block">
                  <ul className="pt-2 m-0 experienceBody">
                    {contentBody.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {/* <p className="m-0 mt-2">{subtitle}</p> */}
                <div className="pt-2 pb-1">
                  {/* <div className="pt-2 pb-1 d-none d-md-block"> */}
                  <Technologies technologies={technologies} />
                </div>
                <Row className="m-auto w-100 pb-1 pt-3 px-2 gx-2">
                  <Col>
                    <a
                      href={githubLink}
                      target="_blank"
                      className="text-decoration-none"
                    >
                      <Button
                        variant="outline-dark"
                        className="w-100 d-flex align-items-center justify-content-center"
                        // size="lg"
                      >
                        GitHub <AiFillGithub className="proBtn" />
                      </Button>
                    </a>
                  </Col>
                  <Col>
                    <Link to={articleLink} className="text-decoration-none">
                      <Button
                        variant="outline-secondary"
                        className="w-100 d-flex align-items-center justify-content-center"
                        // size="lg"
                      >
                        More <FaArrowRight className="proBtn" />
                      </Button>
                    </Link>
                  </Col>
                </Row>
                {/* <div className="d-flex justify-content-end pb-1 pt-3">
                    <a href="#" target="_blank" className="readMore py-1">
                    <Button
                      variant="outline-secondary"
                      className="readMore"
                    >
                      Read More <FaArrowRight />
                    </Button>
                    {""}
                    </a>
                  </div> */}
              </Row>
            </Container>
            {/* </a> */}
          </div>
        </div>
      </Col>
    </>
  );
};

export default Project;
