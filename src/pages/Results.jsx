import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Panel } from "../components/ui/Panel";
import { btnSecondary } from "../styles/shared";
import {
  ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line,
} from "recharts";

/* ---------------- Results ---------------- */
// NOTE: metrics.json fields below are illustrative placeholders — the d3s repo
// references this file as a pipeline output but doesn't document its schema yet.
// Swap these keys for the real ones once you check d3s/evaluation/ with your teammate.
const metrics = {
  reprojection_error_px: 0.84,
  point_count: 1284302,
  point_density_per_m3: 412,
  camera_poses_recovered: "83 / 83",
  processing_time_s: 742,
};

const errorHistory = [
  { iter: 0, loss: 0.31 }, { iter: 60, loss: 0.14 }, { iter: 120, loss: 0.07 },
  { iter: 180, loss: 0.045 }, { iter: 240, loss: 0.036 }, { iter: 300, loss: 0.033 },
];

function Results() {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <button onClick={() => navigate(-1)} style={{ ...btnSecondary, padding: "6px 8px" }}>
          <ArrowLeft size={14} />
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>rooftop_survey_west</h1>
      </div>
      <p style={{ color: "#8B94A3", fontSize: 13, marginBottom: 24, marginTop: 4 }}>Completed in 12m 22s on Colab T4</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 20 }}>
        {Object.entries(metrics).map(([k, v]) => (
          <Panel key={k}>
            <div style={{ fontSize: 11, color: "#8B94A3", marginBottom: 6 }}>{k.replaceAll("_", " ")}</div>
            <div style={{ fontSize: 18, fontFamily: "ui-monospace, monospace" }}>{v}</div>
          </Panel>
        ))}
      </div>

      <Panel style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#8B94A3", marginBottom: 12 }}>Alignment loss over iterations</div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={errorHistory}>
            <CartesianGrid stroke="#2A323D" strokeDasharray="3 3" />
            <XAxis dataKey="iter" stroke="#8B94A3" fontSize={11} />
            <YAxis stroke="#8B94A3" fontSize={11} />
            <Tooltip contentStyle={{ background: "#1C232D", border: "1px solid #2A323D", fontSize: 12 }} />
            <Line type="monotone" dataKey="loss" stroke="#E8A33D" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Panel>

      <div style={{ fontSize: 13, color: "#8B94A3", marginBottom: 10 }}>Downloads</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { name: "point_cloud.ply", note: "Open in MeshLab or CloudCompare" },
          { name: "camera_trajectory.csv", note: "Per-frame camera positions" },
          { name: "scene.npz", note: "Raw reconstruction data" },
        ].map(f => (
          <div key={f.name} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "12px 16px", background: "#151B23", border: "1px solid #2A323D", borderRadius: 6,
          }}>
            <div>
              <div style={{ fontSize: 13, fontFamily: "ui-monospace, monospace" }}>{f.name}</div>
              <div style={{ fontSize: 11, color: "#8B94A3" }}>{f.note}</div>
            </div>
            <Download size={16} color="#E8A33D" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Results;