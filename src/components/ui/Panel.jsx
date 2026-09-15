import React from "react";

export function Panel({ children, style }) {
  return (
    <div style={{
      background: "#151B23", border: "1px solid #2A323D", borderRadius: 6,
      padding: 20, ...style,
    }}>{children}</div>
  );
}