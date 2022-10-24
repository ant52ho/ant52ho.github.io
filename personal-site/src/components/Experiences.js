import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Experience from "./Experience";
import "./Experiences.css";

import reactLogo from "../logo.svg";
import uwLogo from "../images/uwlogo.png";

const Experiences = () => {
  return (
    <>
      <Container className="py-2 experiences" id="experiences">
        <h1 className="pb-3">Experience</h1>
        <Experience
          logo={uwLogo}
          title="Tunnel Systems Research Assistant"
          employer="University of Waterloo"
          date="May 2022 ~ Present"
          technologies={[
            "Python",
            "Bash",
            "JavaScript",
            "AWS",
            "Redis",
            "SQLite",
            "React",
          ]}
          body={`Engineered an environment monitoring IoT system for industrial use using Raspberry Pis and AWS EC2, capable of scaling into multiple tunnel networks.
          Supported a dynamic number of nodes and consistent node identification using a customized static DHCP IP assignment protocol, designed for "plug and play" immediate installation.
          Designed a Redis primary database that aggregates datapoints by time-based downsampling, increasing data storage efficiency by 1800%.
          Implemented an interactive dashboard with React + Express containing data visualization of real-time sensor data and user alerts during emergencies.`}
          link="comingsoon"
        />
        <Experience
          className=""
          logo={uwLogo}
          title="Stereo / Computer Vision Research Assistant"
          employer="University of Waterloo"
          date="July 2019 ~ August 2019"
          technologies={["Python", "OpenCV"]}
          body={`Researched, implemented stereo vision models after analyzing multiple research papers using OpenCV, resulting in a passable "ground truth" output.
          Augmented training data using OpenCV and improved the efficacy of a colleague's CNN stereo model.`}
          link="comingsoon"
        />
        {/* <Experience className="" logo={uwLogo} /> */}
      </Container>
    </>
  );
};

export default Experiences;
