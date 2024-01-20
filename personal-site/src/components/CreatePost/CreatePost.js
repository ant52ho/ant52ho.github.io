import { useState, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import Button from "react-bootstrap/Button";
import "react-quill/dist/quill.snow.css";
import { Col, Row } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import Editor from "./Editor";
import * as formik from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Select from "react-select";

function CreatePost() {
  const [value, setValue] = useState("");
  const { Formik } = formik;
  const [msg, setMsg] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const schema = yup.object().shape({
    title: yup.string().required(),
  });

  function log() {
    console.log(value);
  }

  useEffect(() => {
    async function getRoles() {
      const response = await axios.get(
        "http://localhost:5000/api/v1/config/roles"
      );

      const roles = response.data.roles;
      const res = roles.map((item) => {
        // turns list into {value, label}
        return {
          value: item,
          label: item.charAt(0).toUpperCase() + item.slice(1),
        };
      });

      setRoles(res);
    }
    getRoles();
  }, []);

  const onSubmit = async (values) => {
    setMsg("");
    const selectedOptionsVal = selectedOptions.map((item) => {
      return item.value;
    });

    try {
      const data = { ...values, body: value, role: selectedOptionsVal };
      console.log(data);
      const response = await axios.post(
        "http://localhost:5000/api/v1/create-post",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setMsg(response.data.message);
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setMsg(err.response?.data.message);
      } else if (err && err instanceof Error) {
        setMsg(err.message);
      }
      console.log("Error: ", err);
      return;
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{
          paddingTop: "60px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            minWidth: "100%",
            padding: "20px",
          }}
        >
          <Formik
            validationSchema={schema}
            onSubmit={(values) => onSubmit(values)}
            initialValues={{
              title: "",
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <p className="h4">Title</p>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <p className="h4 pt-1">Body</p>
                <Editor value={value} setValue={setValue} />
                <p className="h4 pt-3">Settings</p>

                <p className="h6 pt-2">Viewable groups</p>
                <Select
                  className="w-50"
                  options={roles}
                  isMulti
                  value={selectedOptions}
                  onChange={(value) => {
                    setSelectedOptions(value);
                  }}
                />
                <div className="mt-4 mb-2">{msg}</div>
                <Button className="w-100" type="submit" onClick={log}>
                  Post!
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
