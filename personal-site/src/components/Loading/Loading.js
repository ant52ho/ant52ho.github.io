import { Spinner } from "react-bootstrap";
import styles from "./Loading.module.css";
const Loading = () => {
  return (
    <>
      <div className={styles.fadeIn}>
        <div
          className="d-flex align-items-center justify-content-center flex-column"
          style={{
            paddingTop: "60px",
            minHeight: "100vh",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ width: "4rem", height: "4rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h1 className="display-4">Please wait a moment</h1>
        </div>
      </div>
    </>
  );
};

export default Loading;
