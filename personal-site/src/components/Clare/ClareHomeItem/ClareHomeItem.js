import { Link } from "react-router-dom";
import globalStyles from "../../styles.module.css";

const ClareHomeItem = ({ link, text }) => {
  return (
    <Link to={link} className="text-decoration-none">
      <div className={`${globalStyles.hoverMove} border`}>
        <div
          style={{
            minHeight: "50px",
          }}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          {text}
        </div>
      </div>
    </Link>
  );
};

export default ClareHomeItem;
