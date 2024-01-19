import { useState, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import EditorToolbar from "./EditorToolbar";
import { Quill } from "react-quill";
import axios from "axios";
import "react-quill/dist/quill.snow.css";

export const Editor = ({ value, setValue }) => {
  const quillRef = useRef();

  // Undo and redo functions for Custom Toolbar
  function undoChange() {
    this.quill.history.undo();
  }
  function redoChange() {
    this.quill.history.redo();
  }

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      // get secure url from server for file upload
      const response = await axios
        .get("http://localhost:5000/api/v1/s3-upload-url", {
          withCredentials: true,
        })
        .catch((err) => {
          console.log("Error", err);
        });

      const { url, key } = response.data;

      // post image
      await axios.put(url, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = url.split("?")[0];
      console.log(imageUrl);

      // put the image in the editor
      const quillEditor = quillRef.current.getEditor();
      const range = quillEditor.getSelection(true);
      quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
    };
  };

  // Modules object for setting up the Quill editor
  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          undo: undoChange,
          redo: redoChange,
          image: imageHandler,
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  // Formats objects for setting up the Quill editor
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];

  return (
    <div
      className="text-editor"
      style={{
        minHeight: "100px",
        minWidth: "100%",
        padding: "20px",
      }}
    >
      <EditorToolbar />
      <ReactQuill
        ref={(el) => (quillRef.current = el)}
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={(value) => setValue(value)}
        placeholder={"What's on your mind?"}
      />
    </div>
  );
};

export default Editor;
