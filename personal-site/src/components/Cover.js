import React from "react";
import "./Cover.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import logo from "../logo.svg";

const Cover = () => {
  return (
    <>
      <Container className="coverContainer border d-flex align-items-center justify-content-center">
        <div className="coolBorder px-3 py-5 p-md-5">
          <Container className="coverCard d-flex justify-content-center align-items-center flex-column flex-md-row">
            <div className="">
              <h1 className="py-1 display-6">Hello, I'm</h1>
              <h1 className="py-1 display-3">Anthony Ho</h1>
              <div className="py-4 d-flex justify-content-start">
                <a href="#" className="cardLink">
                  <div className="underline">About</div>
                </a>
                <a href="#" className="cardLink">
                  <div className="underline">Experiences</div>
                </a>
                <a href="#" className="cardLink">
                  <div className="underline">Projects</div>
                </a>
              </div>
            </div>
            <img
              src={logo}
              className="imgScale border-b d-none d-md-block"
            ></img>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Cover;
