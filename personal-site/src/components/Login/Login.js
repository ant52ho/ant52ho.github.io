import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useSignIn } from "react-auth-kit";
import * as formik from "formik";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { HashLink as Link } from "react-router-hash-link";
import useIsAuthenticated from "react-auth-kit/dist/hooks/useIsAuthenticated";

function Login() {
  const { Formik } = formik;
  const [loading, setLoading] = useState(false);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/blog");
    }
  }, [submitted]);

  const onSubmit = async (values) => {
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        values
      );

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
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
          <Formik
            onSubmit={(values) => onSubmit(values)}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group className="mb-3" controlId="validationFormik01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      // isValid={touched.firstName && !errors.firstName}
                    />
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="validationFormik02">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      // isValid={touched.lastName && !errors.lastName}
                    />

                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
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
                    Login
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

export default Login;
