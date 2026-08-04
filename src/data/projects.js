/**
 * Featured case studies.
 * Swap loaders in src/lib for a real CMS/API later without touching UI.
 */
export const PROJECTS = [
  {
    index: "01",
    slug: "spectra",
    title: "Spectra",
    role: "AI Engineer · Computer Vision",
    year: "2026",
    tagline: "Real-time object detection & inventory analytics",
    summary:
      "An AI system on a YOLOv8 + SSD detection pipeline. Cameras stream into an inference server that classifies, tracks, and quantifies inventory in real time — with live telemetry and threshold alerting.",
    image: "/images/spectra.webp",
    poster: "/images/spectra-poster.webp",
    accent: "#e8ff4d",
    stack: ["Python", "YOLOv8", "OpenCV", "TensorFlow", "Node.js"],
    metrics: [
      { label: "Detection FPS", value: "~30" },
      { label: "mAP@0.5", value: "0.87" },
    ],
  },
  {
    index: "02",
    slug: "genta",
    title: "GENTA",
    role: "ML Engineer · LLM Product",
    year: "2026",
    tagline: "Generative language model learning tool",
    summary:
      "An adaptive learning platform driven by a fine-tuned generative language model. RAG content generation, knowledge tracing, and spaced repetition personalise each learner’s path in real time.",
    image: "/images/genta.webp",
    poster: "/images/genta-poster.webp",
    accent: "#7c9cff",
    stack: ["Python", "PyTorch", "RAG", "LLM APIs", "React"],
    metrics: [
      { label: "Model", value: "Fine-tuned 7B" },
      { label: "Session retention", value: "+38%" },
    ],
  },
  {
    index: "03",
    slug: "rfid",
    title: "Student Identifier",
    role: "Full-Stack · Embedded Systems",
    year: "2025",
    tagline: "RFID campus security & entry-point workflows",
    summary:
      "Campus-wide RFID identity with optimised entry workflows. MIFARE tags, ESP32 readers, and a Laravel + Node console handle door events, attendance, and access policy under 400ms.",
    image: "/images/rfid.webp",
    poster: "/images/rfid-poster.webp",
    accent: "#ffb86c",
    stack: ["ESP32", "C++", "Laravel", "Node.js", "MySQL"],
    metrics: [
      { label: "Entry latency", value: "< 400ms" },
      { label: "Gates", value: "12" },
    ],
  },
];
