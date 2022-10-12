import "./Projects.css";
import Project from "./Project";
import Container from "react-bootstrap/Container";

const Projects = () => {
  return (
    <>
      <Container fluid className="pt-5 border-b">
        <h1>Projects</h1>
        <p1>Tap on each to learn more!</p1>
        <Project></Project>
        <Project></Project>
        <Project></Project>
      </Container>
    </>
  );
};

export default Projects;
