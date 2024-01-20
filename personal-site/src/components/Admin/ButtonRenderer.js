import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Button from "react-bootstrap/Button";

function ButtonRenderer(props) {
  const setMsg = props.setMsg;
  const setSuccess = props.setSuccess;
  const setShowAlert = props.setShowAlert;
  const getRegistrations = props.getRegistrations;
  const buttonClicked = async (params) => {
    setShowAlert(false);
    console.log(params, props.data);

    try {
      const endpoint = `http://localhost:5000/api/v1/register/${
        params === "Accept" ? "accept" : "reject"
      }`;

      const response = await axios
        .post(endpoint, props.data, { withCredentials: true })
        .then();

      console.log(response);
      const ret = response.data.message
        ? response.data.message
        : response.data.error;
      setMsg(ret);
      setSuccess(true);
      setShowAlert(true);
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setMsg(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setMsg(err.message);
      }
      console.log("Error: ", err.response);
      setSuccess(false);
      setShowAlert(true);
    }

    getRegistrations();
  };

  return (
    <>
      <div className="d-flex">
        <Button variant="primary" onClick={() => buttonClicked("Accept")}>
          Accept
        </Button>
        <Button
          variant="secondary"
          onClick={() => buttonClicked("Reject")}
          className="ms-1"
        >
          Reject
        </Button>{" "}
      </div>
    </>
  );
}

export default ButtonRenderer;
