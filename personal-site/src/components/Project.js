import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Project.css";
import Technologies from "./Technologies";

const Project = ({
  title,
  date,
  subtitle,
  articleLink,
  technologies,
  bgImage,
}) => {
  const sectionStyle = {
    backgroundImage: `url(${bgImage})`,
  };

  return (
    <>
      <Col md={6} sm={12}>
        <div style={sectionStyle} className="hoverMove">
          <div className="projectBg">
            <a className="projectLink" href={articleLink}>
              <Container className="project">
                <Row>
                  <h4 className="m-0">{title}</h4>
                  <p className="m-0">{date}</p>
                  <p className="m-0 mt-2">{subtitle}</p>
                  <Technologies technologies={technologies} />
                </Row>
              </Container>
            </a>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Project;
