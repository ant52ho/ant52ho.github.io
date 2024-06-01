import heartLogo from "../../../images/heart.png";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./ClareBirthday.module.css";
import { GoGift } from "react-icons/go";

const ClarePage = () => {
  return (
    <>
      <div className="">
        <div
          className={`d-flex justify-content-center align-items-center flex-column`}
          style={{
            minHeight: "100vh",
            minWidth: "100%",
          }}
        >
          <div className="display-2 pb-4 text-center">
            Happy 23rd Birthday!!
          </div>
          <div className="display-4 text-center">🎂🎂🎂</div>
          <div className="display-6 text-center py-3">
            Don't let that dog in you ever escape
          </div>
          <p className="">woofwoofwoofwoof</p>
          <img
            src={heartLogo}
            alt="heart logo for clare"
            style={{
              height: "2em",
              width: "auto",
            }}
            className="m-3"
          />
          <div className={`${styles.bouncingArrow} pt-3`}>
            <IoIosArrowDown />
          </div>
        </div>
        <div
          className={`d-flex justify-content-start align-items-center flex-column`}
          style={{
            minHeight: "70vh",
            minWidth: "100%",
          }}
        >
          <div
            className={`${styles.hoverMove} d-flex justify-content-center align-items-center border border-3 border-dark`}
            style={{
              maxWidth: "600px",
              width: "80vw",
              maxHeight: "400px",
              height: "60vw",
              borderRadius: "3em",
              backgroundColor: "#f5deb3",
            }}
          >
            <a
              href="https://docs.google.com/drawings/d/1fQWTODcC2BVcbI1660JOceiZPyVyDwF77kPUs44JHws/edit?usp=sharing"
              target="_blank"
            >
              <div
                className="d-flex"
                style={{ fontSize: "10rem", color: "black" }}
              >
                <GoGift />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClarePage;
