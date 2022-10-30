import "./Footer.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { AiFillMail, AiFillLinkedin, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <Container fluid className="footer bg-dark p-0">
        <Container fluid className="footerContents py-2">
          <div className="d-flex justify-content-between py-2">
            <div>© 2022 Anthony Ho</div>
            <div className="d-md-flex d-none">Built with React</div>
            <div className="footerIcons">
              <a href="https://github.com/ant52ho" target="_blank">
                <AiFillGithub className="footerLogo" />
              </a>
              <a href="https://www.linkedin.com/in/ant52ho/" target="_blank">
                <AiFillLinkedin className="footerLogo mx-2" />
              </a>
              <a href="mailto:anthony52ho@gmail.com">
                <AiFillMail className="footerLogo" />
              </a>
            </div>
          </div>
          <div className="d-flex">Last Updated: Oct 2022</div>
        </Container>
      </Container>
    </>
  );
};

export default Footer;
