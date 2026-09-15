import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Panel } from "../components/ui/Panel";
import { Badge } from "../components/ui/Badges";
import { PROJECTS, STATUS_STYLE } from "../data/mockData";
import { btnPrimary, chip, chipActive } from "../styles/shared";

function Projects() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.status === filter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Projects</h1>
        <button style={btnPrimary}>New project</button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["all", "done", "reconstructing", "queued", "failed"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            ...chip, ...(filter === f ? chipActive : {}),
          }}>{f === "all" ? "All" : STATUS_STYLE[f].label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
        {filtered.map(p => (
          <div key={p.id} onClick={() => navigate("/reconstruction")} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px", background: "#151B23", border: "1px solid #2A323D",
            borderRadius: 6, cursor: "pointer",
          }}>
            <div>
              <div style={{ fontSize: 14, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "#8B94A3", fontFamily: "ui-monospace, monospace" }}>
                {p.input === "video" ? "video input" : "image sequence"} · {p.frames} frames · {p.device}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Badge status={p.status} />
              <ChevronRight size={16} color="#8B94A3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;