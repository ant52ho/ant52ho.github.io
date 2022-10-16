import Container from "react-bootstrap/Container";
import "./Technologies.css";

const Technologies = ({ technologies }) => {
  if (!technologies) {
    technologies = [];
  }

  return (
    <>
      <Container className="d-flex flex-wrap">
        {technologies.map((technology, i) => (
          <div key={i} className="technology">
            <span className={`dot ${technology.toLowerCase()}`}></span>
            <span>{technology}</span>
          </div>
        ))}
      </Container>
    </>
  );
};

export default Technologies;
