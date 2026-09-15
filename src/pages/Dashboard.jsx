import React from "react";
import { Boxes } from "lucide-react";
import {useNavigate} from "react-router-dom";
import { Badge } from "../components/ui/Badges";
import { Panel} from "../components/ui/Panel";
import { PROJECTS } from "../data/mockData";

//used useNavigate instead of go here
function Dashboard() {
  const navigate = useNavigate();
  const stats = [
    { label: "Projects", value: "24" },
    { label: "Avg. reconstruction time", value: "18m" },
    { label: "GPU runs / CPU runs", value: "19 / 5" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Dashboard</h1>
        <button onClick={() => navigate("/projects")} style={btnPrimary}>New project</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 28 }}>
        {stats.map(s => (
          <Panel key={s.label}>
            <div style={{ fontSize: 12, color: "#8B94A3", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 24, fontFamily: "ui-monospace, monospace", color: "#E6E9EE" }}>{s.value}</div>
          </Panel>
        ))}
      </div>

      <h2 style={{ fontSize: 14, color: "#8B94A3", fontWeight: 500, marginBottom: 12 }}>Recent projects</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {PROJECTS.slice(0, 4).map(p => (
          <div key={p.id} onClick={() => navigate("/processing")} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "14px 16px", background: "#151B23", border: "1px solid #2A323D",
            borderRadius: 6, cursor: "pointer",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 4, background: "#1C232D",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Boxes size={16} color="#E8A33D" />
              </div>
              <div>
                <div style={{ fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#8B94A3" }}>{p.frames} frames · {p.device} · {p.date}</div>
              </div>
            </div>
            <Badge status={p.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
