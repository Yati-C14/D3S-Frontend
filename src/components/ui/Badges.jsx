import React from "react";

const STATUS_STYLE = {
  done: { color: "#4FAE7C", label: "Done" },
  reconstructing: { color: "#E8A33D", label: "Reconstructing" },
  queued: { color: "#8B94A3", label: "Queued" },
  failed: { color: "#E0654F", label: "Failed" },
};

export function Badge({ status }) {
  const s = STATUS_STYLE[status];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 12, color: s.color, fontFamily: "ui-monospace, monospace",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, display: "inline-block" }} />
      {s.label}
    </span>
  );
}