const INKSCAPE_NS = "http://www.inkscape.org/namespaces/inkscape";
const SKIP_LABELS = new Set(["Background", "Path"]);
const TRAINS_MARKER = "{trains:";

const TRAIN_COLORS = [
  "#e06c75",
  "#61afef",
  "#98c379",
  "#c678dd",
  "#d19a66",
  "#56b6c2",
  "#e5c07b",
  "#f472b6",
  "#7dcfff",
];

const TRAIN_ENTRY_RE =
  /\{\s*num:\s*(\d+)\s*,\s*path:\s*"([^"]*)"\s*,\s*reservations:\s*"([^"]*)"\s*,\s*location:\s*\(\s*([^,]+)\s*,\s*([^)]+)\)\s*\}/g;

export function createWebSerialApp({
  container,
  tooltip,
  trainsInput,
  statusEl,
  applyBtn,
  connectBtn,
  legendEl,
  svgUrl,
}) {
  /** @type {SVGSVGElement | null} */
  let svgRoot = null;
  /** @type {AbortController | null} */
  let serialAbort = null;
  /** @type {Array<{ num: number, path: Set<string>, pathNodes: string[], reservations: Set<string>, location: { node: string | null, offset: number } }>} */
  let activeTrains = [];
  /** @type {Map<string, Array<{ pathEl: SVGPathElement, tokens: string[] }>>} */
  let segmentsByNode = new Map();
  /** @type {SVGGElement | null} */
  let trainMarkersLayer = null;
  let dumpTick = 0;
  let serialLive = false;
  /** @type {string | null} */
  let serialTrainsBuffer = null;

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

  function parseNodeList(input) {
    return new Set(parseOrderedNodeList(input));
  }

  function parseOrderedNodeList(input) {
    return input
      .split(",")
      .map(normalizeToken)
      .filter(Boolean);
  }

  function parseLocation(nodeRaw, offsetRaw) {
    const nodeToken = normalizeToken(nodeRaw);
    const node = nodeToken === "none" ? null : nodeToken;
    const offset = Number.parseFloat(String(offsetRaw).trim());
    return {
      node,
      offset: Number.isFinite(offset) ? offset : 0,
    };
  }

  /**
   * Map a location on a directed segment to a fraction along the SVG path.
   * Offset is 0–1000 (divided by 1000 before use).
   * Two-token labels: start at 0%, end at 100%.
   * Three-token shared-track labels (a,b,end): both a and b are at 0%, end at 100%.
   */
  function getLengthFraction(tokens, locationNode, offset) {
    if (!locationNode || tokens.length === 0) {
      return null;
    }

    const clampedOffset = Math.max(0, Math.min(1, offset / 1000));

    if (tokens.length === 3) {
      const [startA, startB, end] = tokens;
      if (locationNode === end) {
        return 1 - clampedOffset;
      }
      if (locationNode === startA || locationNode === startB) {
        return clampedOffset;
      }
      return null;
    }

    if (tokens.length >= 2) {
      const start = tokens[0];
      const end = tokens[tokens.length - 1];
      if (locationNode === end) {
        return 1 - clampedOffset;
      }
      if (locationNode === start) {
        return clampedOffset;
      }
    }

    return null;
  }

  function parseTrainsDump(text) {
    const trains = [];
    TRAIN_ENTRY_RE.lastIndex = 0;
    let match;
    while ((match = TRAIN_ENTRY_RE.exec(text)) !== null) {
      const num = Number(match[1]);
      const pathNodes = parseOrderedNodeList(match[2]);
      const path = new Set(pathNodes);
      const reservations = parseNodeList(match[3]);
      const location = parseLocation(match[4], match[5]);
      if (path.size === 0 && reservations.size === 0 && !location.node) {
        continue;
      }
      trains.push({ num, path, pathNodes, reservations, location });
    }
    return trains;
  }

  function getTrainColor(trainNum) {
    const index = activeTrains.findIndex((train) => train.num === trainNum);
    return TRAIN_COLORS[
      index >= 0 ? index % TRAIN_COLORS.length : trainNum % TRAIN_COLORS.length
    ];
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

  function segmentMatchesTokens(label, tokens) {
    if (tokens.size === 0) {
      return false;
    }
    return labelTokens(label).some((token) => tokens.has(token));
  }

  function pickSegmentRole(label) {
    let activeRole = null;
    for (const train of activeTrains) {
      if (segmentMatchesTokens(label, train.reservations)) {
        activeRole = { train, role: "reservation" };
      } else if (segmentMatchesTokens(label, train.path)) {
        if (!activeRole || activeRole.role === "path") {
          activeRole = { train, role: "path" };
        }
      }
    }
    return activeRole;
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

  /** Map a path-local getPointAtLength result into root SVG user space. */
  function pathPointAtLengthInRoot(pathEl, length) {
    const local = pathEl.getPointAtLength(length);
    const svg = pathEl.ownerSVGElement;
    if (!svg) {
      return local;
    }

    const point = svg.createSVGPoint();
    point.x = local.x;
    point.y = local.y;

    const pathMatrix = pathEl.getCTM?.();
    const svgMatrix = svg.getCTM?.();
    if (!pathMatrix || !svgMatrix) {
      return local;
    }

    return point.matrixTransform(svgMatrix.inverse().multiply(pathMatrix));
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
    const start = pathPointAtLengthInRoot(pathEl, 0);
    const end = pathPointAtLengthInRoot(pathEl, pathEl.getTotalLength());
    return dist2(cursor, start) <= dist2(cursor, end)
      ? { token: tokens[0], index: 0 }
      : { token: tokens[tokens.length - 1], index: tokens.length - 1 };
  }

  function showTooltip(event, pathEl, label) {
    const { token } = nearestNodeToken(pathEl, label, event);
    const pathId = pathEl.id || "(no id)";
    const allTokens = labelTokens(label).map(toDisplayToken).join(", ");
    const roles = [];
    for (const train of activeTrains) {
      if (segmentMatchesTokens(label, train.reservations)) {
        roles.push({ train, role: "reservation" });
      }
      if (segmentMatchesTokens(label, train.path)) {
        roles.push({ train, role: "path" });
      }
    }

    const lines = [
      `<span class="node-name">${toDisplayToken(token)}</span>`,
      `<span class="path-id">inkscape:label = ${allTokens || "(none)"}</span>`,
      `<span class="path-id">id = ${pathId}</span>`,
    ];

    for (const { train, role } of roles) {
      const color = getTrainColor(train.num);
      lines.push(
        `<span class="path-id"><span style="color:${color}">Train ${train.num}</span> · ${role}</span>`
      );
    }

    tooltip.innerHTML = lines.join("\n");

    tooltip.classList.add("visible");
    tooltip.style.left = `${event.clientX + 14}px`;
    tooltip.style.top = `${event.clientY + 14}px`;
  }

  function hideTooltip() {
    tooltip.classList.remove("visible");
  }

  function formatStatus(highlightedCount) {
    const trainCount = activeTrains.length;
    const tickSuffix = serialLive && dumpTick > 0 ? ` · tick ${dumpTick}` : "";
    if (trainCount === 0) {
      return serialLive
        ? `Live — no trains${tickSuffix}`
        : "No trains applied";
    }
    return serialLive
      ? `Live — ${trainCount} train${trainCount === 1 ? "" : "s"}, ${highlightedCount} segment${highlightedCount === 1 ? "" : "s"}${tickSuffix}`
      : `${trainCount} train${trainCount === 1 ? "" : "s"}, ${highlightedCount} segment${highlightedCount === 1 ? "" : "s"} highlighted`;
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
      if (
        !pathEl.classList.contains("track-train-path") &&
        !pathEl.classList.contains("track-train-reservation")
      ) {
        restorePathLayer(pathEl);
      }
    }

    for (const pathEl of svgRoot.querySelectorAll("path.track-segment.track-train-path")) {
      const parent = pathEl.__trackParent;
      if (parent) {
        parent.appendChild(pathEl);
      }
    }

    for (const pathEl of svgRoot.querySelectorAll(
      "path.track-segment.track-train-reservation"
    )) {
      const parent = pathEl.__trackParent;
      if (parent) {
        parent.appendChild(pathEl);
      }
    }
  }

  function clearPathStyle(pathEl) {
    pathEl.classList.remove("track-train-path", "track-train-reservation");
    pathEl.removeAttribute("data-train-num");
    pathEl.style.removeProperty("--train-stroke");
  }

  function applySegmentStyle(pathEl, train, role) {
    const color = getTrainColor(train.num);
    pathEl.dataset.trainNum = String(train.num);
    pathEl.style.setProperty("--train-stroke", color);
    pathEl.classList.add(
      role === "reservation" ? "track-train-reservation" : "track-train-path"
    );
  }

  function buildSegmentIndex() {
    segmentsByNode = new Map();
    if (!svgRoot) {
      return;
    }

    for (const pathEl of svgRoot.querySelectorAll("path.track-segment")) {
      const tokens = labelTokens(pathEl.dataset.label || "");
      for (const token of tokens) {
        const entries = segmentsByNode.get(token) ?? [];
        entries.push({ pathEl, tokens });
        segmentsByNode.set(token, entries);
      }
    }
  }

  /** Where a node sits at an endpoint of a directed segment: 0 = start, 1 = end. */
  function nodeEndpointFraction(tokens, node) {
    if (tokens.length === 3) {
      const [startA, startB, end] = tokens;
      if (node === end) {
        return 1;
      }
      if (node === startA || node === startB) {
        return 0;
      }
      return null;
    }

    if (tokens.length >= 2) {
      if (node === tokens[tokens.length - 1]) {
        return 1;
      }
      if (node === tokens[0]) {
        return 0;
      }
    }

    return null;
  }

  function findSegmentForPathNode(node, train) {
    const candidates = segmentsByNode.get(node) ?? [];
    const pool = candidates.filter(
      ({ tokens }) => nodeEndpointFraction(tokens, node) !== null
    );
    if (pool.length === 0) {
      return null;
    }
    if (pool.length === 1) {
      return pool[0];
    }

    for (const segment of pool) {
      if (
        segment.tokens.some(
          (token) => token !== node && train.path.has(token)
        )
      ) {
        return segment;
      }
    }

    return pool[0];
  }

  function getPathDestinationPoint(train) {
    const node = train.pathNodes[train.pathNodes.length - 1];
    if (!node) {
      return null;
    }

    const segment = findSegmentForPathNode(node, train);
    if (!segment) {
      return null;
    }

    const fraction = nodeEndpointFraction(segment.tokens, node);
    if (fraction === null) {
      return null;
    }

    const totalLength = segment.pathEl.getTotalLength();
    return pathPointAtLengthInRoot(segment.pathEl, totalLength * fraction);
  }

  function starPolygonPoints(cx, cy, outerR, innerR, points = 5) {
    const coords = [];
    for (let i = 0; i < points * 2; i += 1) {
      const radius = i % 2 === 0 ? outerR : innerR;
      const angle = -Math.PI / 2 + (i * Math.PI) / points;
      coords.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`);
    }
    return coords.join(" ");
  }

  function createPathDestinationStar(point, color) {
    const star = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    star.classList.add("path-destination-star");
    star.setAttribute("points", starPolygonPoints(point.x, point.y, 16, 7));
    star.style.setProperty("--train-stroke", color);
    return star;
  }

  function findSegmentForLocation(train) {
    const node = train.location.node;
    if (!node) {
      return null;
    }

    const candidates = segmentsByNode.get(node) ?? [];
    if (candidates.length === 0) {
      return null;
    }

    const usable = candidates.filter(({ tokens }) =>
      getLengthFraction(tokens, node, train.location.offset) !== null
    );
    const pool = usable.length > 0 ? usable : candidates;

    if (pool.length === 1) {
      return pool[0];
    }

    for (const segment of pool) {
      if (
        segment.tokens.some(
          (token) =>
            token !== node &&
            (train.path.has(token) || train.reservations.has(token))
        )
      ) {
        return segment;
      }
    }

    return pool[0];
  }

  function getTrainPoint(train) {
    const segment = findSegmentForLocation(train);
    if (!segment) {
      return null;
    }

    const fraction = getLengthFraction(
      segment.tokens,
      train.location.node,
      train.location.offset
    );
    if (fraction === null) {
      return null;
    }

    const totalLength = segment.pathEl.getTotalLength();
    return pathPointAtLengthInRoot(segment.pathEl, totalLength * fraction);
  }

  function ensureTrainMarkersLayer() {
    if (!svgRoot) {
      return null;
    }

    if (!trainMarkersLayer || trainMarkersLayer.ownerSVGElement !== svgRoot) {
      trainMarkersLayer = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      trainMarkersLayer.setAttribute("id", "train-markers");
      svgRoot.appendChild(trainMarkersLayer);
    }

    return trainMarkersLayer;
  }

  function updateTrainMarkers() {
    const layer = ensureTrainMarkersLayer();
    if (!layer) {
      return;
    }

    layer.replaceChildren();

    const markers = [];

    for (const train of activeTrains) {
      const color = getTrainColor(train.num);
      const destination = getPathDestinationPoint(train);
      if (destination) {
        layer.appendChild(createPathDestinationStar(destination, color));
      }

      const point = getTrainPoint(train);
      if (!point) {
        continue;
      }

      const marker = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );
      marker.classList.add("train-marker");
      marker.dataset.trainNum = String(train.num);

      const dot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      dot.setAttribute("cx", String(point.x));
      dot.setAttribute("cy", String(point.y));
      dot.setAttribute("r", "18");
      dot.style.setProperty("--train-stroke", color);

      const label = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );
      label.setAttribute("x", String(point.x));
      label.setAttribute("y", String(point.y));
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("dominant-baseline", "central");
      label.setAttribute(
        "transform",
        `rotate(180 ${point.x} ${point.y})`
      );
      label.textContent = String(train.num);
      label.style.setProperty("--train-stroke", color);

      marker.append(dot, label);
      markers.push(marker);
    }

    for (const marker of markers) {
      layer.appendChild(marker);
    }
  }

  function updateLegend() {
    if (!legendEl) {
      return;
    }

    if (activeTrains.length === 0) {
      legendEl.replaceChildren();
      legendEl.hidden = true;
      return;
    }

    legendEl.hidden = false;
    legendEl.replaceChildren();

    for (const train of activeTrains) {
      const color = getTrainColor(train.num);
      const item = document.createElement("span");
      item.className = "train-legend-item";

      const swatch = document.createElement("span");
      swatch.className = "train-legend-swatch";
      swatch.style.background = color;

      const pathSwatch = document.createElement("span");
      pathSwatch.className = "train-legend-path";
      pathSwatch.style.background = color;

      const label = document.createElement("span");
      label.className = "train-legend-label";
      label.textContent = `Train ${train.num}`;

      item.append(swatch, pathSwatch, label);
      legendEl.appendChild(item);
    }
  }

  function setTrains(trains, { updateInput = true, fromSerial = false } = {}) {
    activeTrains = trains;

    if (updateInput && trainsInput) {
      trainsInput.value = serializeTrainsDump(trains);
    }

    if (!svgRoot) {
      statusEl.textContent = formatStatus(0);
      updateLegend();
      return;
    }

    container.classList.toggle("has-trains", activeTrains.length > 0);

    let highlightedCount = 0;

    for (const pathEl of svgRoot.querySelectorAll("path.track-segment")) {
      clearPathStyle(pathEl);
      const label = pathEl.dataset.label || "";
      const activeRole = pickSegmentRole(label);

      if (activeRole) {
        applySegmentStyle(pathEl, activeRole.train, activeRole.role);
        highlightedCount += 1;
      }
    }

    updatePathLayers();
    updateTrainMarkers();
    updateLegend();
    statusEl.textContent = formatStatus(highlightedCount);

    if (fromSerial) {
      dumpTick += 1;
      statusEl.textContent = formatStatus(highlightedCount);
    }
  }

  function serializeTrainsDump(trains) {
    const entries = trains.map((train) => {
      const node = train.location.node
        ? toDisplayToken(train.location.node)
        : "none";
      const offset = train.location.offset;
      return `{num: ${train.num}, path: "${train.pathNodes.map(toDisplayToken).join(",")},", reservations: "${[...train.reservations].map(toDisplayToken).join(",")},", location: (${node}, ${offset})}`;
    });
    return `{trains: [\n${entries.join(",\n")},\n]}`;
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

    buildSegmentIndex();
    setTrains(parseTrainsDump(trainsInput?.value ?? ""), { updateInput: false });
  }

  async function loadSvg() {
    const response = await fetch(svgUrl);
    if (!response.ok) {
      throw new Error(`Failed to load track map (${response.status})`);
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
    setTrains(parseTrainsDump(trainsInput.value));
  }

  function applyTrainsDump(payload) {
    setTrains(parseTrainsDump(payload), { fromSerial: true, updateInput: true });
  }

  function handleSerialLine(line) {
    const trimmed = line.replace(/\r/g, "").trim();
    if (!trimmed) {
      return;
    }

    if (serialTrainsBuffer !== null) {
      serialTrainsBuffer += `\n${trimmed}`;
      if (serialTrainsBuffer.includes("]}")) {
        applyTrainsDump(serialTrainsBuffer);
        serialTrainsBuffer = null;
      }
      return;
    }

    const markerAt = trimmed.indexOf(TRAINS_MARKER);
    if (markerAt === -1) {
      return;
    }

    const payload = trimmed.slice(markerAt);
    if (payload.includes("]}")) {
      applyTrainsDump(payload);
      return;
    }

    serialTrainsBuffer = payload;
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
      serialTrainsBuffer = null;
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
    serialTrainsBuffer = null;
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
        serialTrainsBuffer = null;
        connectBtn.textContent = "Connect WebSerial";
      }
    })();
  }

  function onTrainsKeyDown(event) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      applyFromInput();
    }
  }

  function onConnectClick() {
    connectWebSerial().catch((error) => {
      statusEl.textContent = error.message;
    });
  }

  applyBtn.addEventListener("click", applyFromInput);
  trainsInput.addEventListener("keydown", onTrainsKeyDown);
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
    trainsInput.removeEventListener("keydown", onTrainsKeyDown);
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
    trainMarkersLayer = null;
    segmentsByNode = new Map();
  };
}
