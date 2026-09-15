import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Boxes, LayoutGrid, Activity, Box, FileCheck2, ChevronRight, Download, Play, Pause, X } from "lucide-react";

/* ---------------------------------------------------------
   D3S — Drone Single-Shot 3D Reconstruction
   Frontend demo covering all 5 pages with a shared style system.

   Design tokens
   - bg base:      #0D1117 (near-black slate, not pure black)
   - bg panel:     #151B23
   - bg raised:    #1C232D
   - border:       #2A323D
   - text primary: #E6E9EE
   - text muted:   #8B94A3
   - accent:       #E8A33D  (signal amber — drone telemetry / status)
   - accent dim:   #5B4526
   - success:      #4FAE7C
   - error:        #E0654F
   - Type: Inter (UI) + JetBrains-style mono (all data/metrics/coords)
   --------------------------------------------------------- */

const STAGES = ["Ingest", "Quality Filter", "Keyframe Selection", "MASt3R-SfM Alignment", "Evaluation", "Export"];

const PROJECTS = [
  { id: 1, name: "AGZ_subset_run4", input: "video", frames: 312, device: "RTX 4060", status: "done", date: "Sep 14" },
  { id: 2, name: "rooftop_survey_west", input: "images", frames: 83, device: "Colab T4", status: "reconstructing", date: "Sep 15" },
  { id: 3, name: "warehouse_exterior", input: "video", frames: 540, device: "CPU", status: "queued", date: "Sep 15" },
  { id: 4, name: "AGZ_subset_run3", input: "video", frames: 312, device: "RTX 4060", status: "failed", date: "Sep 12" },
];

const STATUS_STYLE = {
  done: { color: "#4FAE7C", label: "Done" },
  reconstructing: { color: "#E8A33D", label: "Reconstructing" },
  queued: { color: "#8B94A3", label: "Queued" },
  failed: { color: "#E0654F", label: "Failed" },
};

function Badge({ status }) {
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

function Panel({ children, style }) {
  return (
    <div style={{
      background: "#151B23", border: "1px solid #2A323D", borderRadius: 6,
      padding: 20, ...style,
    }}>{children}</div>
  );
}

/* ---------------- Dashboard ---------------- */
function Dashboard({ go }) {
  const stats = [
    { label: "Projects", value: "24" },
    { label: "Avg. reconstruction time", value: "18m" },
    { label: "GPU runs / CPU runs", value: "19 / 5" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>Dashboard</h1>
        <button onClick={() => go("projects")} style={btnPrimary}>New project</button>
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
          <div key={p.id} onClick={() => go("processing")} style={{
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

/* ---------------- Projects ---------------- */
function Projects({ go }) {
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
          <div key={p.id} onClick={() => go("reconstruction")} style={{
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

/* ---------------- Processing ---------------- */
function Processing() {
  const [stageIdx, setStageIdx] = useState(3);
  const [iter, setIter] = useState(180);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIter(i => (i < 300 ? i + 3 : 300)), 400);
    return () => clearInterval(t);
  }, []);

  const logs = [
    "[MASt3R-SfM] scene_graph=swin-5, image_size=512",
    "[align] iter 175/300  loss=0.0412",
    "[align] iter 178/300  loss=0.0398",
    "[align] iter 180/300  loss=0.0391",
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>rooftop_survey_west</h1>
        <span style={{ fontSize: 12, color: "#8B94A3", fontFamily: "ui-monospace, monospace" }}>Colab T4 · ETA ~12m</span>
      </div>
      <p style={{ color: "#8B94A3", fontSize: 13, marginTop: 4, marginBottom: 24 }}>83 frames · started 09:14</p>

      {/* Stepper */}
      <div style={{ display: "flex", marginBottom: 28 }}>
        {STAGES.map((s, i) => (
          <div key={s} style={{ flex: 1, textAlign: "center", position: "relative" }}>
            <div style={{
              height: 3, background: i <= stageIdx ? "#E8A33D" : "#2A323D",
              marginBottom: 8, borderRadius: 2,
            }} />
            <div style={{
              fontSize: 11, color: i === stageIdx ? "#E8A33D" : i < stageIdx ? "#E6E9EE" : "#8B94A3",
              fontWeight: i === stageIdx ? 600 : 400,
            }}>{s}</div>
          </div>
        ))}
      </div>

      <Panel style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: "#8B94A3" }}>Global alignment</span>
          <span style={{ fontSize: 13, fontFamily: "ui-monospace, monospace", color: "#E8A33D" }}>{iter}/300 iterations</span>
        </div>
        <div style={{ height: 6, background: "#1C232D", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: `${(iter / 300) * 100}%`, height: "100%", background: "#E8A33D", transition: "width .3s" }} />
        </div>
      </Panel>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button style={btnSecondary}><Pause size={14} /> Pause</button>
        <button style={{ ...btnSecondary, color: "#E0654F", borderColor: "#3A2620" }}><X size={14} /> Cancel</button>
        <button onClick={() => setShowLog(!showLog)} style={{ ...btnSecondary, marginLeft: "auto" }}>
          {showLog ? "Hide logs" : "Show logs"}
        </button>
      </div>

      {showLog && (
        <Panel style={{ background: "#0D1117", fontFamily: "ui-monospace, monospace", fontSize: 12, color: "#8B94A3" }}>
          {logs.map((l, i) => <div key={i} style={{ marginBottom: 4 }}>{l}</div>)}
        </Panel>
      )}
    </div>
  );
}

/* ---------------- Reconstruction (3D viewer) ---------------- */
function Reconstruction() {
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
        <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>rooftop_survey_west</h1>
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
  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>rooftop_survey_west</h1>
      <p style={{ color: "#8B94A3", fontSize: 13, marginBottom: 24 }}>Completed in 12m 22s on Colab T4</p>

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

/* ---------------- Shell ---------------- */
const btnPrimary = {
  background: "#E8A33D", color: "#0D1117", border: "none", borderRadius: 5,
  padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
};
const btnSecondary = {
  display: "flex", alignItems: "center", gap: 6,
  background: "#1C232D", color: "#E6E9EE", border: "1px solid #2A323D", borderRadius: 5,
  padding: "8px 14px", fontSize: 13, cursor: "pointer",
};
const chip = {
  background: "#151B23", color: "#8B94A3", border: "1px solid #2A323D", borderRadius: 5,
  padding: "6px 12px", fontSize: 12, cursor: "pointer",
};
const chipActive = { background: "#1C232D", color: "#E8A33D", borderColor: "#5B4526" };

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "projects", label: "Projects", icon: Boxes },
  { id: "processing", label: "Processing", icon: Activity },
  { id: "reconstruction", label: "Reconstruction", icon: Box },
  { id: "results", label: "Results", icon: FileCheck2 },
];

export default function D3SApp() {
  const [page, setPage] = useState("dashboard");
  const pages = {
    dashboard: <Dashboard go={setPage} />,
    projects: <Projects go={setPage} />,
    processing: <Processing />,
    reconstruction: <Reconstruction />,
    results: <Results />,
  };

  return (
    <div style={{
      display: "flex", minHeight: "100vh", background: "#0D1117", color: "#E6E9EE",
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    }}>
      <div style={{
        width: 72, borderRight: "1px solid #2A323D", display: "flex",
        flexDirection: "column", alignItems: "center", paddingTop: 20, gap: 4, flexShrink: 0,
      }}>
        {NAV.map(n => {
          const Icon = n.icon;
          const active = page === n.id;
          return (
            <button key={n.id} onClick={() => setPage(n.id)} title={n.label} style={{
              width: 48, height: 48, border: "none", borderRadius: 6,
              background: active ? "#1C232D" : "transparent",
              color: active ? "#E8A33D" : "#8B94A3",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <Icon size={18} />
            </button>
          );
        })}
      </div>
      <div style={{ flex: 1, padding: "28px 32px", maxWidth: 760 }}>
        {pages[page]}
      </div>
    </div>
  );
}
