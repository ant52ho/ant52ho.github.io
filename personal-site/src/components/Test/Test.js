// file for testing upload.
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios, { AxiosError } from "axios";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { HashLink as Link } from "react-router-hash-link";

function Test() {
  const { Formik } = formik;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = async (values) => {
    console.log("Values: ", values);
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/upload`,
        values
      );

      setLoading(false);
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setError(err.message);
      }
      console.log("Error: ", err);
      setLoading(false);
      return;
    }

    setSubmitted(!submitted);
    return;
  };
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <Card style={{ width: "26rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title className="mb-0">Log in to your account</Card.Title>
          <Card.Text className="mb-3 text-muted">
            Or <Link to="/register">register</Link> if you don't have an account
          </Card.Text>
          <form onSubmit={() => onSubmit()}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control type="file" />
              <Button variant="primary" className="w-100" type="submit">
                Submit
              </Button>
            </Form.Group>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Test;
