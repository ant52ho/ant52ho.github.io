import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Project.css";
import Technologies from "./Technologies";
import imgfile from "../images/yorushikaBannerCropped.jpg";

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
      <div style={sectionStyle}>
        <a className="projectLink" href={articleLink}>
          <Container className="project border">
            <div>
              <Row className="">
                <h4 className="m-0">{title}</h4>
                <p className="m-0">{date}</p>
                <p className="m-0 mt-2">{subtitle}</p>
                <Technologies technologies={technologies} />
              </Row>
            </div>
          </Container>
        </a>
      </div>
    </>
  );
};

export default Project;
