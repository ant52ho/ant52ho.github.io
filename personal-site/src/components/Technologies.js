import Container from "react-bootstrap/Container";
import "./Technologies.css";

const Technologies = ({ technologies }) => {
  if (!technologies) {
    technologies = [];
  }

  return (
    <>
      <div className="d-flex flex-wrap">
        {technologies.map((technology, i) => (
          <div key={i} className="technology">
            <span className={`dot ${technology.toLowerCase()}`}></span>
            <span>{technology}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Technologies;
