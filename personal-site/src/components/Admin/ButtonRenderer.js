import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Button from "react-bootstrap/Button";
import ConfirmationCard from "components/ConfirmationCard/ConfirmationCard";
import { useAuthHeader } from "react-auth-kit";

function ButtonRenderer(props) {
  const setMsg = props.setMsg;
  const setSuccess = props.setSuccess;
  const setShowAlert = props.setShowAlert;
  const getRegistrations = props.getRegistrations;
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const authHeader = useAuthHeader();

  const buttonClicked = async (params) => {
    setShowAlert(false);
    console.log(params, props.data);

    try {
      const endpoint = `${process.env.REACT_APP_SERVER_URL}/register/${
        params === "Accept" ? "accept" : "reject"
      }`;

      const response = await axios
        .post(endpoint, props.data, {
          headers: {
            Authorization: authHeader(),
          },
        })
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
      <ConfirmationCard
        setShow={setShowAcceptConfirm}
        show={showAcceptConfirm}
        onConfirm={() => buttonClicked("Accept")}
        onDeny={() => {
          return;
        }}
        message="Are you sure you want to accept this user?"
      />
      <ConfirmationCard
        setShow={setShowRejectConfirm}
        show={showRejectConfirm}
        onConfirm={() => buttonClicked("Reject")}
        onDeny={() => {
          return;
        }}
        message="Are you sure you want to reject this user?"
      />
      <div className="d-flex">
        <Button variant="primary" onClick={() => setShowAcceptConfirm(true)}>
          Accept
        </Button>
        <Button
          variant="secondary"
          onClick={() => setShowRejectConfirm(true)}
          className="ms-1"
        >
          Reject
        </Button>{" "}
      </div>
    </>
  );
}

export default ButtonRenderer;
