import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import Card from "react-bootstrap/Card";
import { useSignIn } from "react-auth-kit";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { HashLink as Link } from "react-router-hash-link";

function Register() {
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().required(),
    reason: yup.string().required(),
  });

  const onSubmit = async (values) => {
    console.log("Values: ", values);
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/register",
        values
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      // navigate("/");
      setMsg(response.data.message);
      setLoading(false);
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setError(err.message);
      }
      console.log("Error: ", err);
      setLoading(false);
      setMsg("");
      return;
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <Card style={{ width: "50rem" }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title className="mb-0">Register for an account</Card.Title>
          <Card.Text className="mb-3 text-muted">
            Or <Link to="/login">login</Link> if you already have one
          </Card.Text>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => onSubmit(values)}
            initialValues={{
              email: "",
              reason: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                    />
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control
                      type="text"
                      name="reason"
                      value={values.reason}
                      onChange={handleChange}
                      isValid={touched.reason && !errors.reason}
                      isInvalid={!!errors.reason}
                      as="textarea"
                      rows={3}
                      placeholder={"Tell me about yourself o.o"}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.reason}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>{msg}</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <h6 className="text-danger">{error}</h6>
                {loading ? (
                  <Button variant="primary w-100" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">Loading...</span>
                  </Button>
                ) : (
                  <Button variant="primary" className="w-100" type="submit">
                    Register
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
