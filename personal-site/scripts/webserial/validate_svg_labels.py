#!/usr/bin/env python3
"""Validate inkscape:label pairs in track SVG files against track_data distances."""

from __future__ import annotations

import argparse
import re
import sys
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SVG = REPO_ROOT / "webserial" / "track_b.svg"
DEFAULT_TRACK_DATA = REPO_ROOT / "kernel" / "track_data.cpp"

LABEL_TOKEN_RE = re.compile(r"^(br|mr|[a-e])(\d+)([sc])?$")
TRACK_NAME_RE = re.compile(r'track\[(\d+)\]\.name\s*=\s*"([^"]+)"')
TRACK_TYPE_RE = re.compile(r"track\[(\d+)\]\.type\s*=\s*NODE_(\w+)")
EDGE_DIST_RE = re.compile(
    r"track\[(\d+)\]\.edge\[DIR_(AHEAD|STRAIGHT|CURVED)\]\.dist\s*=\s*(\d+)"
)

SKIP_LABELS = {"Background", "Path"}


def parse_init_trackb(track_data_path: Path) -> dict[str, tuple[str, dict[str, int]]]:
    """Return node name -> (type, {edge_name: dist_mm})."""
    text = track_data_path.read_text()
    start = text.index("void init_trackb(track_node *track)")
    end = text.index("\n}", start)
    block = text[start:end]

    names: dict[int, str] = {}
    types: dict[int, str] = {}
    dists: dict[int, dict[str, int]] = {}

    for match in TRACK_NAME_RE.finditer(block):
        idx, name = match.groups()
        names[int(idx)] = name

    for match in TRACK_TYPE_RE.finditer(block):
        idx, node_type = match.groups()
        types[int(idx)] = node_type

    for match in EDGE_DIST_RE.finditer(block):
        idx, edge, dist = match.groups()
        dists.setdefault(int(idx), {})[edge] = int(dist)

    nodes: dict[str, tuple[str, dict[str, int]]] = {}
    for idx, name in names.items():
        nodes[name] = (types.get(idx, "UNKNOWN"), dists.get(idx, {}))
    return nodes


def label_token_to_dist(token: str, nodes: dict[str, tuple[str, dict[str, int]]]) -> int:
    match = LABEL_TOKEN_RE.match(token)
    if not match:
        raise ValueError(f"unrecognized label token '{token}'")

    prefix, number, direction = match.groups()
    if prefix in "abcde":
        node_name = f"{prefix.upper()}{number}"
    elif prefix == "mr":
        node_name = f"MR{number}"
    else:
        node_name = f"BR{number}"

    if node_name not in nodes:
        raise ValueError(f"unknown track node '{node_name}' for token '{token}'")

    node_type, edges = nodes[node_name]
    if node_type == "BRANCH":
        if direction == "s":
            edge = "STRAIGHT"
        elif direction == "c":
            edge = "CURVED"
        else:
            raise ValueError(
                f"branch token '{token}' must end with 's' (straight) or 'c' (curved)"
            )
    elif direction is not None:
        raise ValueError(f"token '{token}' must not use s/c suffix on a {node_type} node")
    else:
        edge = "AHEAD"

    if edge not in edges:
        raise ValueError(f"no {edge} edge distance for node '{node_name}' ({token})")
    return edges[edge]


def collect_path_labels(svg_path: Path) -> list[tuple[str, str]]:
    """Return (element_id, label) for each labeled path in the Path layer."""
    root = ET.parse(svg_path).getroot()
    ns = {
        "svg": "http://www.w3.org/2000/svg",
        "inkscape": "http://www.inkscape.org/namespaces/inkscape",
    }

    labels: list[tuple[str, str]] = []
    for group in root.findall(".//svg:g", ns):
        if group.get("{http://www.inkscape.org/namespaces/inkscape}label") != "Path":
            continue
        for path in group.findall("svg:path", ns):
            label = path.get("{http://www.inkscape.org/namespaces/inkscape}label")
            if not label or label in SKIP_LABELS:
                continue
            labels.append((path.get("id", "<no-id>"), label))
    return labels


def find_duplicates(
    path_labels: list[tuple[str, str]],
) -> tuple[list[str], list[str]]:
    """Return duplicate full-label and duplicate endpoint-token messages."""
    label_paths: dict[str, list[str]] = defaultdict(list)
    token_paths: dict[str, list[tuple[str, str]]] = defaultdict(list)

    for path_id, label in path_labels:
        label_paths[label.lower()].append(path_id)
        for token in (part.strip().lower() for part in label.split(",") if part.strip()):
            token_paths[token].append((path_id, label))

    dup_labels: list[str] = []
    for label, path_ids in sorted(label_paths.items()):
        if len(path_ids) > 1:
            dup_labels.append(f"'{label}' on {', '.join(path_ids)}")

    dup_tokens: list[str] = []
    for token, occurrences in sorted(token_paths.items()):
        if len(occurrences) > 1:
            detail = ", ".join(f"{path_id} ({label})" for path_id, label in occurrences)
            dup_tokens.append(f"'{token}' in {detail}")

    return dup_labels, dup_tokens


def validate_labels(
    svg_path: Path, track_data_path: Path
) -> tuple[list[str], list[str], list[str], list[str], list[str], list[str]]:
    nodes = parse_init_trackb(track_data_path)
    path_labels = collect_path_labels(svg_path)
    dup_labels, dup_tokens = find_duplicates(path_labels)
    ok: list[str] = []
    mismatches: list[str] = []
    errors: list[str] = []
    skipped: list[str] = []

    for path_id, label in path_labels:
        tokens = [part.strip().lower() for part in label.split(",") if part.strip()]
        if len(tokens) < 2:
            skipped.append(f"{path_id} ({label}): fewer than 2 endpoints")
            continue

        try:
            dists = {token: label_token_to_dist(token, nodes) for token in tokens}
        except ValueError as exc:
            errors.append(f"{path_id} ({label}): {exc}")
            continue

        unique = set(dists.values())
        if len(unique) == 1:
            dist = next(iter(unique))
            ok.append(f"{path_id} ({label}): all dist == {dist} mm")
        else:
            detail = ", ".join(f"{token}={dist}" for token, dist in dists.items())
            mismatches.append(f"{path_id} ({label}): mismatch ({detail})")

    return ok, mismatches, errors, skipped, dup_labels, dup_tokens


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--svg", type=Path, default=DEFAULT_SVG)
    parser.add_argument("--track-data", type=Path, default=DEFAULT_TRACK_DATA)
    args = parser.parse_args()

    ok, mismatches, errors, skipped, dup_labels, dup_tokens = validate_labels(
        args.svg, args.track_data
    )

    print(f"Validated {len(ok) + len(mismatches)} pair-labeled paths in {args.svg}")
    if ok:
        print(f"\nOK ({len(ok)}):")
        for line in ok:
            print(f"  {line}")

    if mismatches:
        print(f"\nMISMATCH ({len(mismatches)}):")
        for line in mismatches:
            print(f"  {line}")

    if dup_labels:
        print(f"\nDUPLICATE LABEL ({len(dup_labels)}):")
        for line in dup_labels:
            print(f"  {line}")

    if dup_tokens:
        print(f"\nDUPLICATE TOKEN ({len(dup_tokens)}):")
        for line in dup_tokens:
            print(f"  {line}")

    if errors:
        print(f"\nERROR ({len(errors)}):")
        for line in errors:
            print(f"  {line}")

    if skipped:
        print(f"\nSKIPPED ({len(skipped)}):")
        for line in skipped:
            print(f"  {line}")

    return 1 if mismatches or errors or dup_labels or dup_tokens else 0


if __name__ == "__main__":
    sys.exit(main())
