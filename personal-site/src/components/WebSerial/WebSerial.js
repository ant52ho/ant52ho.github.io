import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createWebSerialApp } from "./webSerialApp";
import "./WebSerial.css";

const DEFAULT_RESERVED = "A3,MR14,BR14s,BR11c,B16";
const SVG_URL = `${process.env.PUBLIC_URL}/webserial/track_b.svg`;

const WebSerial = () => {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const reservedInputRef = useRef(null);
  const statusRef = useRef(null);
  const applyBtnRef = useRef(null);
  const connectBtnRef = useRef(null);

  useEffect(() => {
    const cleanup = createWebSerialApp({
      container: containerRef.current,
      tooltip: tooltipRef.current,
      reservedInput: reservedInputRef.current,
      statusEl: statusRef.current,
      applyBtn: applyBtnRef.current,
      connectBtn: connectBtnRef.current,
      svgUrl: SVG_URL,
    });

    return cleanup;
  }, []);

  return (
    <div className="webserial-page">
      <header>
        <Link to="/" className="webserial-back-link">
          ← Site
        </Link>
        <label>
          Reserved nodes:
          <input
            id="reserved-input"
            ref={reservedInputRef}
            type="text"
            defaultValue={DEFAULT_RESERVED}
            spellCheck={false}
          />
        </label>
        <button id="apply-btn" ref={applyBtnRef} type="button">
          Apply
        </button>
        <button id="connect-btn" ref={connectBtnRef} type="button">
          Connect WebSerial
        </button>
        <span id="legend">
          Live dumps replace the full reservation each tick · hover a segment for
          its inkscape label
        </span>
        <span id="status" ref={statusRef} />
      </header>
      <div id="tooltip" ref={tooltipRef} aria-hidden="true" />
      <div id="svg-container" ref={containerRef}>
        Loading track map…
      </div>
    </div>
  );
};

export default WebSerial;
