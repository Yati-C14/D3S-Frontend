import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Panel } from "../components/ui/Panel";
import { btnSecondary, chip, chipActive } from "../styles/shared";

function Reconstruction() {
  const navigate = useNavigate();
  const [conf, setConf] = useState(65);
  const [showTraj, setShowTraj] = useState(true);
  const [frame, setFrame] = useState(40);

  // Simulated point cloud for demo — swap for react-three-fiber + PLY loader in production
  const points = React.useMemo(() => {
    const pts = [];
    for (let i = 0; i < 900; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 60 + Math.random() * 140;
      const c = 40 + Math.random() * 60;
      if (c < conf) continue;
      pts.push({
        x: 300 + Math.cos(angle) * r + (Math.random() - 0.5) * 40,
        y: 200 + Math.sin(angle) * r * 0.6 + (Math.random() - 0.5) * 40,
        o: 0.3 + Math.random() * 0.5,
      });
    }
    return pts;
  }, [conf]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => navigate(-1)} style={{ ...btnSecondary, padding: "6px 8px" }}>
            <ArrowLeft size={14} />
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>rooftop_survey_west</h1>
        </div>
        <span style={{ fontSize: 12, color: "#4FAE7C", fontFamily: "ui-monospace, monospace" }}>● reconstruction complete</span>
      </div>

      <Panel style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
        <svg viewBox="0 0 600 400" style={{ width: "100%", height: 340, background: "#0D1117", display: "block" }}>
          {showTraj && (
            <polyline
              points="120,320 180,280 260,240 340,230 420,250 480,290"
              fill="none" stroke="#E8A33D" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"
            />
          )}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="1.4" fill="#E6E9EE" opacity={p.o} />
          ))}
        </svg>
      </Panel>

      <Panel style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "#8B94A3" }}>Confidence threshold</span>
          <span style={{ fontSize: 13, fontFamily: "ui-monospace, monospace" }}>{conf}%</span>
        </div>
        <input type="range" min="0" max="100" value={conf} onChange={e => setConf(+e.target.value)}
          style={{ width: "100%", accentColor: "#E8A33D" }} />
      </Panel>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setShowTraj(!showTraj)} style={{ ...chip, ...(showTraj ? chipActive : {}) }}>
          Camera trajectory
        </button>
        <button style={chip}>Point cloud</button>
      </div>

      <Panel>
        <div style={{ fontSize: 12, color: "#8B94A3", marginBottom: 8 }}>Frame {frame} / 83</div>
        <input type="range" min="0" max="83" value={frame} onChange={e => setFrame(+e.target.value)}
          style={{ width: "100%", accentColor: "#E8A33D" }} />
      </Panel>
    </div>
  );
}

export default Reconstruction;