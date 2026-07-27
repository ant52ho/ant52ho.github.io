import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { createWebSerialApp } from "./webSerialApp";
import "./WebSerial.css";

const DEFAULT_TRAINS = `{trains: [
{num: 14, path: "A5,BR11C,A3,A4,", reservations: "A5,BR11C,A3,", location: (A5, 420)},
{num: 15, path: "B6,C10,BR14S,C9,", reservations: "B6,C10,", location: (C10, 185)},
{num: 17, path: "D7,E8,E9,", reservations: "D7,E8,E9,", location: (E8, 0)},
]}`;

const SVG_URL = `${process.env.PUBLIC_URL}/webserial/track_b_direction.svg`;

const WebSerial = () => {
  const containerRef = useRef(null);
  const tooltipRef = useRef(null);
  const trainsInputRef = useRef(null);
  const statusRef = useRef(null);
  const applyBtnRef = useRef(null);
  const connectBtnRef = useRef(null);
  const legendRef = useRef(null);

  useEffect(() => {
    const cleanup = createWebSerialApp({
      container: containerRef.current,
      tooltip: tooltipRef.current,
      trainsInput: trainsInputRef.current,
      statusEl: statusRef.current,
      applyBtn: applyBtnRef.current,
      connectBtn: connectBtnRef.current,
      legendEl: legendRef.current,
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
        <label className="trains-input-label">
          Train dump:
          <textarea
            id="trains-input"
            ref={trainsInputRef}
            defaultValue={DEFAULT_TRAINS}
            spellCheck={false}
            rows={8}
          />
        </label>
        <button id="apply-btn" ref={applyBtnRef} type="button">
          Apply
        </button>
        <button id="connect-btn" ref={connectBtnRef} type="button">
          Connect WebSerial
        </button>
        <span id="hint">
          Live dumps replace all trains each tick · hover a segment for its
          inkscape label · location is (node, 0–1000) · Ctrl+Enter to apply
        </span>
        <span id="status" ref={statusRef} />
      </header>
      <div id="train-legend" ref={legendRef} hidden />
      <div id="tooltip" ref={tooltipRef} aria-hidden="true" />
      <div id="svg-container" ref={containerRef}>
        Loading track map…
      </div>
    </div>
  );
};

export default WebSerial;
