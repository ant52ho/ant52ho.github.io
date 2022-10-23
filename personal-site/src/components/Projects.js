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
        {/* <p>Tap on each to learn more!</p> */}
        <Row className="gx-3">
          <Project
            title="Staples Studio Startups"
            date="August 2022"
            subtitle="[HT6 Winner] A platform that connects startups' products to consumers"
            body={`Won the HT6 Staples Studio Challenge (400+ participants) by building a platform using MongoDB, Express, and React that connects startups' products to consumers.
            Visualized data on interactive charts with a stylish page built using Material UI`}
            articleLink="google.com"
            technologies={["JavaScript", "React", "Express", "MongoDB", "CSS"]}
            bgImage={yorushika}
          />
          <Project
            title="CoverMaster"
            date="January 2022"
            subtitle="Subtitle 2"
            body={`Built a Google Chrome Extension with Javascript and Python that automates cover letter creation using Google Cloud's Natural Language AI
            Used webscraped job postings from WaterlooWorks, GCP NLP, and a Flask server to generate cover letters.`}
            articleLink="google.com"
            technologies={["Python", "JavaScript", "GCP"]}
            bgImage={yorushika}
          />
          <Project
            title="Balloon Deflation Modelling"
            date="January 2021 ~ February 2021"
            // subtitle="Subtitle 3"
            body={`Developed an algorithm that models a balloonʼs deflation using OpenCV, resulting in the find of a high correlation model. (R-squared = 0.94)
            Used Taylor polynomials and non-linear Numpy regressions to generalize a mathematical equation for balloon deflations.`}
            articleLink="google.com"
            technologies={["Python", "OpenCV"]}
            bgImage={reactLogo}
          />
          <Project
            title="Maze Input & Pathfinding"
            date="December 2018 ~ January 2019"
            // subtitle="Subtitle 4"
            body={`Implemented the A* pathfinding algorithm.
             Used Python's PIL imaging library to further detect maze openings and convert maze images to nodes, effectively solving mazes even when in photo format.`}
            articleLink="google.com"
            technologies={["Python"]}
            bgImage={yorushika}
          />
        </Row>
      </Container>
    </>
  );
};

export default Projects;
