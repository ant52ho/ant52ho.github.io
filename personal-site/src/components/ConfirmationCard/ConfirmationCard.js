import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmationCard({ setShow, show, onConfirm, onDeny, message }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  const handleDeny = () => {
    onDeny();
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <h5>{message}</h5>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleConfirm}>Yes</Button>
          <Button variant="secondary" onClick={handleDeny}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationCard;
