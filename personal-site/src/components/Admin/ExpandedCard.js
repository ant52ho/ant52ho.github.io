import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ExpandedCard({ setShowExpand, showExpand, username, email, reason }) {
  const handleClose = () => setShowExpand(false);
  const handleShow = () => setShowExpand(true);
  return (
    <>
      <Modal show={showExpand} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration for {username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Name: {username}</p>
          <p>Email: {email}</p>
          <p>Reason: {reason}</p>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default ExpandedCard;
