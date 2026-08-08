import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data/portfolioData";

const SECTIONS = [
  { id: "top", label: "00" },
  ...NAV_LINKS.map((l, i) => ({
    id: l.id,
    label: String(i + 1).padStart(2, "0"),
  })),
  { id: "footer", label: String(NAV_LINKS.length + 1).padStart(2, "0") },
];

function getActiveSectionId(): string {
  const mid = window.innerHeight * 0.45;
  let bestId = SECTIONS[0]?.id ?? "top";
  let bestDist = Number.POSITIVE_INFINITY;

  for (const s of SECTIONS) {
    const el = document.getElementById(s.id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const dist = Math.abs(center - mid);
    if (dist < bestDist) {
      bestDist = dist;
      bestId = s.id;
    }
  }

  return bestId;
}

export default function SectionProgress() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setActive(getActiveSectionId());
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      className="pointer-events-none fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-3 md:flex"
      aria-label="Section progress"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="pointer-events-auto group flex items-center gap-2"
            data-cursor="visit"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`block rounded-full transition-all duration-500 ease-out-expo ${
                isActive
                  ? "h-6 w-1.5 bg-signal shadow-signal"
                  : "h-1.5 w-1.5 bg-white/25 group-hover:bg-white/55"
              }`}
            />
            <span
              className={`font-mono text-[9px] uppercase tracking-label transition-all duration-300 ${
                isActive
                  ? "translate-x-0 opacity-100 text-signal"
                  : "-translate-x-1 opacity-0 text-mute group-hover:translate-x-0 group-hover:opacity-70"
              }`}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
