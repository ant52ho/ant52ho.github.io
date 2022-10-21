import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Experience from "./Experience";
import "./Experiences.css";

import reactLogo from "../logo.svg";
import uwLogo from "../images/uwlogo.png";

const Experiences = () => {
  return (
    <>
      <Container className="py-2">
        <h1>Experience</h1>
        <p>haha put some experience here</p>
        {/* <div className="shadowBorder my-3"> */}
        <Experience className="" logo={reactLogo} />
        {/* <hr className="m-1" /> */}
        <Experience className="" logo={uwLogo} />
        {/* <hr className="m-1" /> */}
        <Experience className="" logo={uwLogo} />
        {/* </div> */}
      </Container>
    </>
  );
};

export default Experiences;
