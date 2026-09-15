export const PROJECTS = [
  { id: 1, name: "AGZ_subset_run4", input: "video", frames: 312, device: "RTX 4060", status: "done", date: "Sep 14" },
  { id: 2, name: "rooftop_survey_west", input: "images", frames: 83, device: "Colab T4", status: "reconstructing", date: "Sep 15" },
  { id: 3, name: "warehouse_exterior", input: "video", frames: 540, device: "CPU", status: "queued", date: "Sep 15" },
  { id: 4, name: "AGZ_subset_run3", input: "video", frames: 312, device: "RTX 4060", status: "failed", date: "Sep 12" },
];

export const STATUS_STYLE = {
  done: { color: "#4FAE7C", label: "Done" },
  reconstructing: { color: "#E8A33D", label: "Reconstructing" },
  queued: { color: "#8B94A3", label: "Queued" },
  failed: { color: "#E0654F", label: "Failed" },
};