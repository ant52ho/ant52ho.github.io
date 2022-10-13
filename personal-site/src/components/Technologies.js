import Container from "react-bootstrap/Container";
import "./Technologies.css";

const Technologies = ({ technologies }) => {
  var technologies = technologies;
  if (!technologies) {
    technologies = [];
  }

  return (
    <>
      <Container className="d-flex">
        {technologies.map((technology, i) => (
          <div key={i} className="technology">
            {technology}
          </div>
        ))}
      </Container>
    </>
  );
};

export default Technologies;
