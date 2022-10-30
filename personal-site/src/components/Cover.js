import React from "react";
import "./Cover.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import logo from "../logo.svg";
import pic from "../images/agneslakejustrev.jpg";
// import { Link } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";

const Cover = () => {
  return (
    <>
      <Container
        className="coverContainer d-flex align-items-center justify-content-center"
        id="home"
      >
        <div className="coolBorder px-2 py-5 p-md-3">
          <Container className="coverCard d-flex justify-content-center align-items-center flex-column flex-md-row">
            <div>
              <h1 className="py-1 display-6 coverTitle">Hello, I'm</h1>
              <h1 className="py-1 display-3 coverSubtitle">Anthony Ho</h1>
              <div className="py-4 d-flex justify-content-start flex-wrap">
                <Link to="/#experiences" className="cardLink">
                  <div className="underline">Experience</div>
                </Link>
                <Link to="/#projects" className="cardLink">
                  <div className="underline">Projects</div>
                </Link>
                <Link to="/#about" className="cardLink">
                  <div className="underline">Contact</div>
                </Link>
              </div>
              <div className="d-block d-md-none">
                <div className="mt-1">Visit on desktop for a</div>
                <div className="">better experience!</div>
              </div>
              <div className="coverCaption mt-2">**WIP**</div>
            </div>
            <div className="coverImage m-4 d-none d-md-block">
              <img src={pic} className="coverImgScale grow"></img>
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Cover;
