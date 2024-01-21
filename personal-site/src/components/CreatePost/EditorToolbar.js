import React from "react";
import { Quill } from "react-quill";
import styles from "./EditorToolbar.module.css";
import "./quillStyles.css";

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

function QuillToolbar() {
  return (
    <>
      <div id="toolbar-container">
        <span className="ql-formats">
          <select className="ql-header" defaultValue="3">
            <option value="3">Normal</option>
            <option value="2">Subheading</option>
            <option value="1">Heading</option>
          </select>
          <select className="ql-font">
            <option value="helvetica">Helvetica</option>
            <option value="helvetica-neue">Helvetica Neue</option>
            <option value="arial">Arial</option>
            <option value="courier-new">Courier New</option>
          </select>
          <select className="ql-size" value={"14px"} onChange={() => {}}>
            <option value="10px">10px</option>
            <option value="14px">14px</option>
            <option value="18px">18px</option>
            <option value="32px">32px</option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          {/* <button className="ql-indent" value="-1" /> */}
          {/* <button className="ql-indent" value="+1" /> not worth trouble*/}
        </span>
        <span className="ql-formats">
          <select className={`ql-align ${styles.shift}`} />
          <select className={"ql-color shift " + styles.shift} />
          <select className={"ql-background shift " + styles.shift} />
        </span>
        <span className="ql-formats">
          <button className="ql-script" value="super" />
          <button className="ql-script" value="sub" />
          <button className="ql-blockquote" />
          {/* <button className="ql-direction" /> */}
        </span>

        <span className="ql-formats">
          <button className="ql-link" />
          <button className="ql-image" />
          {/* <button className="ql-video" /> */}
        </span>
        <span className="ql-formats">
          {/* <button className="ql-formula" /> */}
          {/* <button className="ql-code-block" /> */}
          <button className="ql-clean" />
        </span>
        {/* <span className="ql-formats">
          <button className="ql-undo">
            <CustomUndo />
          </button>
          <button className="ql-redo">
            <CustomRedo />
          </button>
        </span> */}
      </div>
    </>
  );
}

export default QuillToolbar;
