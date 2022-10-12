import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Project.css";
import Technologies from "./Technologies";
import imgfile from "../images/yorushikaBannerCropped.jpg";

const Project = () => {
  const sectionStyle = {
    backgroundImage: `url(${imgfile})`,
  };

  return (
    <>
      <div style={sectionStyle}>
        <Container className="project border">
          <div>
            <Row className="">
              <h4 className="m-0">Linked title</h4>
              <p1 className="">Date</p1>
              <p1 className="mt-2">Brief subtitle</p1>
              <Technologies />
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Project;
