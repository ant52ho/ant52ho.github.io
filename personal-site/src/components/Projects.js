import "./Projects.css";
import Project from "./Project";
import Container from "react-bootstrap/Container";
import yorushika from "../images/yorushikaBannerCropped.jpg";
import reactLogo from "../logo.svg";
import Row from "react-bootstrap/Row";

const Projects = () => {
  // title, date, subtitle, articleLink, bgImage
  return (
    <>
      <Container fluid className="py-2 projects" id="projects">
        <h1>Projects</h1>
        <p>Tap on each to learn more!</p>
        <Row className="gx-3">
          <Project
            title="Project 1"
            date="Date 1"
            subtitle="Subtitle 1"
            articleLink="google.com"
            technologies={["Python", "JavaScript", "HTML", "CSS"]}
            bgImage={yorushika}
          />
          <Project
            title="Project 2"
            date="Date 2"
            subtitle="Subtitle 2"
            articleLink="google.com"
            technologies={["python", "javascript"]}
            bgImage={reactLogo}
          />
          <Project
            title="Project 3"
            date="Date 3"
            subtitle="Subtitle 3"
            articleLink="google.com"
            // technologies={["python", "javascript"]}
            bgImage={reactLogo}
          />
          <Project
            title="Project 4"
            date="Date 4"
            subtitle="Subtitle 4"
            articleLink="google.com"
            technologies={["html", "css"]}
            bgImage={yorushika}
          />
        </Row>
      </Container>
    </>
  );
};

export default Projects;
