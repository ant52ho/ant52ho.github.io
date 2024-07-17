import styles from "./ComingSoon.module.css";
const ComingSoon = () => {
  return (
    <div
      className={`${styles.comingSoon} d-flex justify-content-center align-items-center flex-column`}
    >
      <div className="display-2 pb-4 text-center">Coming soon!</div>
      <div className="display-4 text-center">Stay tuned for more updates</div>
    </div>
  );
};

export default ComingSoon;
