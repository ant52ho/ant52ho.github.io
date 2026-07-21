const INKSCAPE_NS = "http://www.inkscape.org/namespaces/inkscape";
const SKIP_LABELS = new Set(["Background", "Path"]);
const RESERVED_PREFIX = "Reserved nodes:";

export function createWebSerialApp({
  container,
  tooltip,
  reservedInput,
  statusEl,
  applyBtn,
  connectBtn,
  svgUrl,
}) {
  /** @type {SVGSVGElement | null} */
  let svgRoot = null;
  /** @type {AbortController | null} */
  let serialAbort = null;
  /** @type {Set<string>} */
  let activeReserved = new Set();
  let dumpTick = 0;
  let serialLive = false;

  function normalizeToken(token) {
    return token.trim().toLowerCase();
  }

  function toDisplayToken(token) {
    const match = token.match(/^(br|mr|([a-e]))(\d+)([sc])?$/i);
    if (!match) {
      return token.toUpperCase();
    }
    const [, prefix, letter, number, direction] = match;
    if (letter) {
      return `${letter.toUpperCase()}${number}`;
    }
    const name = `${prefix.toUpperCase()}${number}`;
    return direction ? `${name}${direction.toLowerCase()}` : name;
  }

  function parseReserved(input) {
    return new Set(
      input
        .split(",")
        .map(normalizeToken)
        .filter(Boolean)
    );
  }

  function getInkscapeLabel(element) {
    return (
      element.getAttributeNS(INKSCAPE_NS, "label") ||
      element.getAttribute("inkscape:label") ||
      ""
    );
  }

  function labelTokens(label) {
    return label
      .split(",")
      .map(normalizeToken)
      .filter(Boolean);
  }

  function pathShouldHighlight(label, reserved) {
    if (reserved.size === 0) {
      return false;
    }
    return labelTokens(label).some((token) => reserved.has(token));
  }

  function dist2(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy;
  }

  function cursorSvgPoint(svg, event) {
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const matrix = svg.getScreenCTM();
    if (!matrix) {
      return point;
    }
    return point.matrixTransform(matrix.inverse());
  }

  function nearestNodeToken(pathEl, label, event) {
    const tokens = labelTokens(label);
    if (tokens.length === 0) {
      return { token: "", index: -1 };
    }
    if (tokens.length === 1) {
      return { token: tokens[0], index: 0 };
    }

    const cursor = cursorSvgPoint(pathEl.ownerSVGElement, event);
    const start = pathEl.getPointAtLength(0);
    const end = pathEl.getPointAtLength(pathEl.getTotalLength());
    return dist2(cursor, start) <= dist2(cursor, end)
      ? { token: tokens[0], index: 0 }
      : { token: tokens[tokens.length - 1], index: tokens.length - 1 };
  }

  function showTooltip(event, pathEl, label) {
    const { token } = nearestNodeToken(pathEl, label, event);
    const pathId = pathEl.id || "(no id)";
    const allTokens = labelTokens(label).map(toDisplayToken).join(", ");

    tooltip.innerHTML = [
      `<span class="node-name">${toDisplayToken(token)}</span>`,
      `<span class="path-id">inkscape:label = ${allTokens || "(none)"}</span>`,
      `<span class="path-id">id = ${pathId}</span>`,
    ].join("\n");

    tooltip.classList.add("visible");
    tooltip.style.left = `${event.clientX + 14}px`;
    tooltip.style.top = `${event.clientY + 14}px`;
  }

  function hideTooltip() {
    tooltip.classList.remove("visible");
  }

  function formatStatus(reserved, highlightedCount) {
    const nodeCount = reserved.size;
    const tickSuffix = serialLive && dumpTick > 0 ? ` · tick ${dumpTick}` : "";
    if (nodeCount === 0) {
      return serialLive
        ? `Live — no reserved nodes${tickSuffix}`
        : "No reservations applied";
    }
    return serialLive
      ? `Live — ${nodeCount} node${nodeCount === 1 ? "" : "s"}, ${highlightedCount} segment${highlightedCount === 1 ? "" : "s"}${tickSuffix}`
      : `${nodeCount} node${nodeCount === 1 ? "" : "s"}, ${highlightedCount} segment${highlightedCount === 1 ? "" : "s"} highlighted`;
  }

  function restorePathLayer(pathEl) {
    const parent = pathEl.__trackParent;
    if (!parent || pathEl.parentNode !== parent) {
      return;
    }

    const next = pathEl.__trackNext;
    if (next && next.parentNode === parent) {
      parent.insertBefore(pathEl, next);
      return;
    }

    parent.appendChild(pathEl);
  }

  function updatePathLayers() {
    if (!svgRoot) {
      return;
    }

    for (const pathEl of svgRoot.querySelectorAll("path.track-segment")) {
      if (!pathEl.classList.contains("highlighted")) {
        restorePathLayer(pathEl);
      }
    }

    for (const pathEl of svgRoot.querySelectorAll(
      "path.track-segment.highlighted"
    )) {
      const parent = pathEl.__trackParent;
      if (parent) {
        parent.appendChild(pathEl);
      }
    }
  }

  function setReserved(reserved, { updateInput = true, fromSerial = false } = {}) {
    activeReserved = new Set(reserved);

    if (updateInput) {
      const display = [...activeReserved].map(toDisplayToken).join(",");
      reservedInput.value = display;
    }

    if (!svgRoot) {
      statusEl.textContent = formatStatus(activeReserved, 0);
      return;
    }

    container.classList.toggle("has-reservation", activeReserved.size > 0);

    for (const pathEl of svgRoot.querySelectorAll("path.track-segment")) {
      const label = pathEl.dataset.label || "";
      pathEl.classList.toggle(
        "highlighted",
        pathShouldHighlight(label, activeReserved)
      );
    }

    updatePathLayers();

    const highlightedCount = svgRoot.querySelectorAll(
      "path.track-segment.highlighted"
    ).length;
    statusEl.textContent = formatStatus(activeReserved, highlightedCount);

    if (fromSerial) {
      dumpTick += 1;
      statusEl.textContent = formatStatus(activeReserved, highlightedCount);
    }
  }

  function wirePath(pathEl) {
    const label = getInkscapeLabel(pathEl);
    if (!label || SKIP_LABELS.has(label)) {
      return;
    }

    pathEl.classList.add("track-segment");
    pathEl.dataset.label = label;
    pathEl.__trackParent = pathEl.parentNode;
    pathEl.__trackNext = pathEl.nextSibling;
    pathEl.style.stroke = "#8491a3";
    pathEl.style.strokeOpacity = "0.9";

    pathEl.addEventListener("mousemove", onPathMouseMove);
    pathEl.addEventListener("mouseleave", hideTooltip);
  }

  function onPathMouseMove(event) {
    const pathEl = event.currentTarget;
    const label = pathEl.dataset.label || "";
    showTooltip(event, pathEl, label);
  }

  function initSvg(svg) {
    svgRoot = svg;
    container.replaceChildren(svg);

    for (const group of svg.querySelectorAll("g")) {
      if (getInkscapeLabel(group) !== "Path") {
        continue;
      }
      for (const pathEl of group.querySelectorAll("path")) {
        wirePath(pathEl);
      }
    }

    setReserved(parseReserved(reservedInput.value), { updateInput: false });
  }

  async function loadSvg() {
    const response = await fetch(svgUrl);
    if (!response.ok) {
      throw new Error(`Failed to load track_b.svg (${response.status})`);
    }

    const text = await response.text();
    const doc = new DOMParser().parseFromString(text, "image/svg+xml");
    const parseError = doc.querySelector("parsererror");
    if (parseError) {
      throw new Error("SVG parse error");
    }

    const svg = doc.documentElement;
    initSvg(svg);
  }

  function applyFromInput() {
    serialLive = false;
    dumpTick = 0;
    setReserved(parseReserved(reservedInput.value));
  }

  function applyReservedDump(payload) {
    setReserved(parseReserved(payload), { fromSerial: true });
  }

  function handleSerialLine(line) {
    const trimmed = line.replace(/\r/g, "").trim();
    const prefixAt = trimmed.indexOf(RESERVED_PREFIX);
    if (prefixAt === -1) {
      return;
    }

    const payload = trimmed.slice(prefixAt + RESERVED_PREFIX.length).trim();
    applyReservedDump(payload);
  }

  async function connectWebSerial() {
    if (!("serial" in navigator)) {
      statusEl.textContent = "WebSerial not supported in this browser";
      return;
    }

    if (serialAbort) {
      serialAbort.abort();
      serialAbort = null;
      serialLive = false;
      dumpTick = 0;
      connectBtn.textContent = "Connect WebSerial";
      statusEl.textContent = "Disconnected";
      return;
    }

    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });

    serialAbort = new AbortController();
    connectBtn.textContent = "Disconnect";
    serialLive = true;
    dumpTick = 0;
    statusEl.textContent = "WebSerial connected — waiting for dump";

    const decoder = new TextDecoder();
    let buffer = "";

    (async () => {
      const reader = port.readable.getReader();
      try {
        while (!serialAbort.signal.aborted) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          buffer += decoder.decode(value, { stream: true });
          buffer = buffer.replace(/\r/g, "");
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            console.log("[WebSerial]", line);
            handleSerialLine(line);
          }
        }
      } catch (error) {
        if (!serialAbort.signal.aborted) {
          statusEl.textContent = `WebSerial error: ${error.message}`;
        }
      } finally {
        reader.releaseLock();
        await port.close().catch(() => {});
        serialAbort = null;
        serialLive = false;
        dumpTick = 0;
        connectBtn.textContent = "Connect WebSerial";
      }
    })();
  }

  function onReservedKeyDown(event) {
    if (event.key === "Enter") {
      applyFromInput();
    }
  }

  function onConnectClick() {
    connectWebSerial().catch((error) => {
      statusEl.textContent = error.message;
    });
  }

  applyBtn.addEventListener("click", applyFromInput);
  reservedInput.addEventListener("keydown", onReservedKeyDown);
  connectBtn.addEventListener("click", onConnectClick);

  loadSvg().catch((error) => {
    container.textContent = `Error: ${error.message}`;
  });

  return () => {
    if (serialAbort) {
      serialAbort.abort();
      serialAbort = null;
    }

    applyBtn.removeEventListener("click", applyFromInput);
    reservedInput.removeEventListener("keydown", onReservedKeyDown);
    connectBtn.removeEventListener("click", onConnectClick);

    if (svgRoot) {
      for (const pathEl of svgRoot.querySelectorAll("path.track-segment")) {
        pathEl.removeEventListener("mousemove", onPathMouseMove);
        pathEl.removeEventListener("mouseleave", hideTooltip);
      }
    }

    hideTooltip();
    container.replaceChildren();
    svgRoot = null;
  };
}
