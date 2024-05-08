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
import { useAuthHeader } from "react-auth-kit";
import { jwtDecode } from "jwt-decode";
import ConfirmationCard from "components/ConfirmationCard/ConfirmationCard";
import { useNavigate } from "react-router-dom";

const PostConfig = ({
  onSubmit,
  onDelete,
  defaultConfig,
  clearOnSubmit = true,
  postId = "",
}) => {
  const getHeader = useAuthHeader();
  const navigate = useNavigate();
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPostConfirm, setShowPostConfirm] = useState(false);
  const [formikVals, setFormikVals] = useState({});
  const [published, setPublished] = useState(postId);

  function log() {
    console.log(body);
  }

  const onSelectDelete = () => {
    setShowDeleteConfirm(true);
  };

  const onSelectPost = () => {
    setShowPostConfirm(true);
  };

  const onFormSubmit = (titles, actions) => {
    setFormikVals({ titles, actions });
  };

  const publish = async () => {
    setMsg("");
    const selectedOptionsVal = selectedOptions.map((item) => {
      return item.value;
    });

    try {
      const data = {
        ...formikVals.titles,
        body: body,
        role: selectedOptionsVal,
      };
      const response = await onSubmit(data);

      // clear form contents
      formikVals.actions.resetForm({
        values: { title: "", previewSummary: "" },
      });
      // actions.resetForm();
      if (clearOnSubmit) {
        setBody("");
        setSelectedOptions([]);
        setTitle("");
        setPreviewSummary("");
      }

      setMsg(response.data.message);
      setPublished(response.data.postId);
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

  useEffect(() => {
    setBody(defaultConfig.defaultBody);
    const res = defaultConfig.defaultSelected.map((item) => {
      return {
        value: item,
        label: item.charAt(0).toUpperCase() + item.slice(1),
      };
    });
    setSelectedOptions(res);
    setTitle(defaultConfig.defaultTitle);
    setPreviewSummary(defaultConfig.defaultSummary);
  }, [defaultConfig]);

  useEffect(() => {
    const header = getHeader();
    const role = header === "" ? "guest" : jwtDecode(header).userRole;
    if (role === "guest") {
      setMsg("Must be registered to create a post");
    }
    async function getRoles() {
      const response = await axios.get(
        "http://localhost:5000/api/v1/config/writeAccess"
      );
      const roles = response.data.config[role];
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

  return (
    <>
      <ConfirmationCard
        setShow={setShowDeleteConfirm}
        show={showDeleteConfirm}
        onConfirm={() => onDelete()}
        onDeny={() => {
          return;
        }}
        message="Are you sure you want to delete this post?"
      />
      <ConfirmationCard
        setShow={setShowPostConfirm}
        show={showPostConfirm}
        onConfirm={() => publish()}
        onDeny={() => {
          return;
        }}
        message="Are you sure you want to save this post?"
      />
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
            <div className="mt-2">
              {/* {msg}{" "} */}
              {published !== "" ? (
                <Button
                  className=""
                  onClick={() => navigate(`/blog/post/${published}`)}
                  variant="link"
                >
                  {msg + " View post -->"}
                </Button>
              ) : null}
            </div>
            <div className="w-100 d-flex mt-4">
              <Button
                style={{ flex: 1, marginInlineEnd: "1em" }}
                type="submit"
                onClick={onSelectPost}
              >
                Post!
              </Button>
              <Button
                style={{ flex: 1 }}
                variant="secondary"
                onClick={onSelectDelete}
              >
                Delete
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PostConfig;
