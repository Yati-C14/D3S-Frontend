import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pause, X } from "lucide-react";
import { Panel } from "../components/ui/Panel";
import { btnSecondary } from "../styles/shared";

const STAGES = [
  "Extract Frames",
  "Feature Matching",
  "Pose Estimation",
  "Global Alignment",
  "Export",
];

function Processing() {
  const navigate = useNavigate();
  const [stageIdx, setStageIdx] = useState(3);
  const [iter, setIter] = useState(180);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIter((i) => (i < 300 ? i + 3 : 300)), 400);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 4,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ ...btnSecondary, padding: "6px 8px" }}
          >
            <ArrowLeft size={14} />
          </button>
          <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>
            rooftop_survey_west
          </h1>
        </div>
        <span
          style={{
            fontSize: 12,
            color: "#8B94A3",
            fontFamily: "ui-monospace, monospace",
          }}
        >
          Colab T4 · ETA ~12m
        </span>
      </div>
      <p
        style={{
          color: "#8B94A3",
          fontSize: 13,
          marginTop: 4,
          marginBottom: 24,
        }}
      >
        83 frames · started 09:14
      </p>

      {/* Stepper */}
      <div style={{ display: "flex", marginBottom: 28 }}>
        {STAGES.map((s, i) => (
          <div
            key={s}
            style={{ flex: 1, textAlign: "center", position: "relative" }}
          >
            <div
              style={{
                height: 3,
                background: i <= stageIdx ? "#E8A33D" : "#2A323D",
                marginBottom: 8,
                borderRadius: 2,
              }}
            />
            <div
              style={{
                fontSize: 11,
                color:
                  i === stageIdx
                    ? "#E8A33D"
                    : i < stageIdx
                      ? "#E6E9EE"
                      : "#8B94A3",
                fontWeight: i === stageIdx ? 600 : 400,
              }}
            >
              {s}
            </div>
          </div>
        ))}
      </div>

      <Panel style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 13, color: "#8B94A3" }}>
            Global alignment
          </span>
          <span
            style={{
              fontSize: 13,
              fontFamily: "ui-monospace, monospace",
              color: "#E8A33D",
            }}
          >
            {iter}/300 iterations
          </span>
        </div>
        <div
          style={{
            height: 6,
            background: "#1C232D",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(iter / 300) * 100}%`,
              height: "100%",
              background: "#E8A33D",
              transition: "width .3s",
            }}
          />
        </div>
      </Panel>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button style={btnSecondary}>
          <Pause size={14} /> Pause
        </button>
        <button
          style={{ ...btnSecondary, color: "#E0654F", borderColor: "#3A2620" }}
        >
          <X size={14} /> Cancel
        </button>
        <button
          onClick={() => setShowLog(!showLog)}
          style={{ ...btnSecondary, marginLeft: "auto" }}
        >
          {showLog ? "Hide logs" : "Show logs"}
        </button>
      </div>

      {showLog && (
        <Panel
          style={{
            background: "#0D1117",
            fontFamily: "ui-monospace, monospace",
            fontSize: 12,
            color: "#8B94A3",
          }}
        >
          {logs.map((l, i) => (
            <div key={i} style={{ marginBottom: 4 }}>
              {l}
            </div>
          ))}
        </Panel>
      )}
    </div>
  );
}

export default Processing;
