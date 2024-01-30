import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "react-quill/dist/quill.snow.css";
import { Col, Row } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import Editor from "../Editor/Editor";
import * as formik from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Select from "react-select";

const PostConfig = ({ onSubmit, defaultConfig, clearOnSubmit = true }) => {
  const { Formik } = formik;
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [previewSummary, setPreviewSummary] = useState("");
  const [msg, setMsg] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const schema = yup.object().shape({
    title: yup.string().required(),
    previewSummary: yup.string(),
  });

  function log() {
    console.log(body);
  }

  useEffect(() => {
    setBody(defaultConfig.defaultBody);
    const res = defaultConfig.defaultSelected.map((item) => {
      // turns list into {value, label}
      return {
        value: item,
        label: item.charAt(0).toUpperCase() + item.slice(1),
      };
    });
    setSelectedOptions(res);
    setTitle(defaultConfig.defaultTitle);
    setPreviewSummary(defaultConfig.defaultSummary);
    // console.log(formikProps);
    // formikProps.setFieldValue("title", "hello1");
    // formikProps.setFieldValue("previewSummary", "hello2");
  }, [defaultConfig]);

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

  const onFormSubmit = async (titles, actions) => {
    setMsg("");
    const selectedOptionsVal = selectedOptions.map((item) => {
      return item.value;
    });

    try {
      const data = { ...titles, body: body, role: selectedOptionsVal };
      const response = await onSubmit(data);

      // clear form contents
      actions.resetForm({ values: { title: "", previewSummary: "" } });
      // actions.resetForm();
      if (clearOnSubmit) {
        setBody("");
        setSelectedOptions([]);
        setTitle("");
        setPreviewSummary("");
      }

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
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => onFormSubmit(values, actions)}
        enableReinitialize={true}
        initialValues={{
          title: title,
          previewSummary: previewSummary,
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <p className="h5">Title</p>
                <Form.Control
                  placeholder="Blog post title"
                  size="sm"
                  type="text"
                  name="title"
                  value={values.title || ""}
                  onChange={handleChange}
                  isValid={touched.title && !errors.title}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col}>
                <p className="h5">Preview Summary (optional)</p>
                <Form.Control
                  placeholder="Summary of body"
                  size="sm"
                  type="text"
                  name="previewSummary"
                  value={values.previewSummary || ""}
                  onChange={handleChange}
                  isValid={touched.previewSummary && !errors.previewSummary}
                  isInvalid={!!errors.previewSummary}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.previewSummary}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <p className="h5 pt-1">Body</p>
            <Editor value={body} setValue={setBody} />
            <p className="h5 pt-3">Settings</p>

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
    </>
  );
};

export default PostConfig;
