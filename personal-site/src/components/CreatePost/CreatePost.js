import { useState, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import Button from "react-bootstrap/Button";
import "react-quill/dist/quill.snow.css";
import { Row } from "react-bootstrap";
import axios from "axios";
import Editor from "./Editor";

function CreatePost() {
  const [value, setValue] = useState("");

  function log() {
    console.log(value);
  }

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{
          paddingTop: "60px",
          minHeight: "100vh",
        }}
      >
        <Editor value={value} setValue={setValue} />
        <Button onClick={log}>Submit</Button>
      </div>
    </>
  );
}

export default CreatePost;
