# ✦ ALEN.DEV — Creative Engineering & Automation Portfolio

<div align="left">
  <img src="https://img.shields.io/badge/STATUS-COOKING%20IN%20PROGRESS-10b981?style=for-the-badge&labelColor=070707" alt="Status: Cooking" />
  <img src="https://img.shields.io/badge/STACK-VITE%20%2F%2F%20REACT-f3f3f3?style=for-the-badge&labelColor=070707&logo=vite" alt="Stack: Vite + React" />
  <img src="https://img.shields.io/badge/MOTION-FRAMER%20PHYSICS-f3f3f3?style=for-the-badge&labelColor=070707&logo=framer" alt="Motion: Framer" />
  <img src="https://img.shields.io/badge/CI%2FCD-GITHUB%20PAGES-f3f3f3?style=for-the-badge&labelColor=070707&logo=github" alt="Deploy: GitHub Pages" />
</div>

---

## **Overview**

**ALEN.DEV** is a high-contrast, editorial portfolio landing page engineered for creative engineering, full-stack systems, and core marketing automation architectures. 

Currently serving an interactive **"Work in Progress"** experience featuring real-time physics-based cursor telemetry, staggered exponential reveal animations, and a dynamic mercury/chrome lava lamp background—all optimized at an **80% compact editorial scale** for modern high-density displays.

---

## **✨ Key Architecture & Features**

* **Interactive X-Ray Mouse Spotlight:** Real-time Framer Motion spring physics (`useMotionValue` + `useSpring`) that project an ambient sheen tracking cursor coordinates across background layers.
* **High-Contrast Chrome Lava Lamp:** An ambient fluid background composed of three interlocking mercury blobs traveling along multi-point motion paths.
* **Kinetic Editorial Typography:** Stacked grotesque headers (`Neue Machina` / `Space Grotesk`) paired with pearlescent serif italics (`Gallery Modern` / `Instrument Serif`).
* **Live Telemetry HUD:** Frosted-glass navigation deck featuring real-time local clock synchronization and an animated availability status badge.
* **Staggered Cinematic Entrance:** Exponential easing (`cubic-bezier(0.16, 1, 0.3, 1)`) orchestrates a staggered slide-down header, hero cascade, and slide-up footer on load.
* **Responsive Editorial Scale:** Custom CSS baseline padding (`pb-8 -mb-8`) and horizontal buffers (`px-8 -mx-8`) prevent italic serif descenders and swashes from clipping under `bg-clip-text` gradient masks.

---

## **🛠️ Technical Stack & Domain Specialties**

| Category | Technology / Tooling | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | **React 18 + Vite** | High-performance component rendering & instant HMR |
| **Styling & Layout** | **Tailwind CSS + Custom CSS** | Utility-first layout grid, frosted glass HUDs (`backdrop-blur-20`), & typography scaling |
| **Animation Engine** | **Framer Motion** | Spring-physics cursor tracking, ambient SVG rotations, & entrance timelines |
| **Automation & CMS** | **GoHighLevel • WordPress • Shopify • Wix • WooCommerce** | Pipeline automation, CRM integration, lead triggers, & custom web solutions |
| **CI/CD Deployment** | **GitHub Actions** | Automated production bundling (`dist`) & deployment to GitHub Pages |

---

## **🚀 Local Development Setup**

### **1. Clone the Repository**
```bash
git clone [https://github.com/alenguiwan/portfolio.git](https://github.com/alenguiwan/portfolio.git)
cd portfolio
