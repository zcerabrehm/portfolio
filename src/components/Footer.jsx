import { useRef, useState } from "react";
import { useLocalTime } from "../hooks/useLocalTime";
import { useMagnetic } from "../hooks/useMagnetic";

const EMAIL = "alenguiwan@gmail.com";
const SOCIALS = [
  { label: "GitHub", href: "https://github.com", handle: "@alenguiwan" },
  { label: "LinkedIn", href: "https://linkedin.com", handle: "/in/alenguiwan" },
];

/**
 * Screen-filling contact CTA with cursor-sway type + live local time.
 */
export default function Footer() {
  const scopeRef = useRef(null);
  const time = useLocalTime();
  const [active, setActive] = useState(false);
  const magneticRef = useMagnetic(0.25);

  const handleMove = (e) => {
    const el = scopeRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    el.querySelectorAll("[data-contact-sway]").forEach((span, i) => {
      const depth = 1 + (i % 5) * 0.15;
      span.style.transform = `translate(${x * -28 * depth}px, ${y * -18 * depth}px)`;
    });
  };

  const handleLeave = () => {
    setActive(false);
    const el = scopeRef.current;
    if (!el) return;
    el.querySelectorAll("[data-contact-sway]").forEach((span) => {
      span.style.transform = "translate(0, 0)";
    });
  };

  return (
    <footer
      id="contact"
      ref={scopeRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleLeave}
      className={`relative overflow-hidden border-t border-white/10 px-6 py-24 transition-colors duration-700 md:px-12 md:py-32 ${
        active ? "bg-ink" : "bg-[#0c0c0e]"
      }`}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[50vw] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[100px] transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle, rgba(232,255,77,0.18), transparent 70%)",
          opacity: active ? 1 : 0,
        }}
      />

      <div className="relative z-[1] select-none overflow-hidden">
        <h2 className="whitespace-nowrap text-center font-display text-[clamp(3.5rem,18vw,22rem)] font-extrabold uppercase leading-[0.82] tracking-mega">
          {"Let's Talk".split("").map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              data-contact-sway
              className="inline-block"
              style={{
                transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
                WebkitTextStroke: active
                  ? "1.5px rgba(232,255,77,0.65)"
                  : "1.5px rgba(243,243,240,0.45)",
                color: "transparent",
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h2>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-[14%] z-[2] flex justify-center"
        style={{
          opacity: active ? 1 : 0,
          transition: "opacity 0.45s",
        }}
      >
        <span className="rounded-full border border-ember/50 bg-ember/10 px-5 py-2 font-mono text-xs uppercase tracking-[0.25em] text-ember backdrop-blur-md">
          currently open to work
        </span>
      </div>

      <div className="relative z-[2] mx-auto mt-20 max-w-[1600px] md:mt-28">
        <a
          href={`mailto:${EMAIL}`}
          ref={magneticRef}
          data-cursor="email me"
          data-magnetic
          className="group inline-block font-mono text-[clamp(1.1rem,3.5vw,2.4rem)] font-medium tracking-tight text-paper/80 transition-colors hover:text-ember"
        >
          <span className="underline-offset-8 group-hover:underline">
            {EMAIL}
          </span>
        </a>

        <div className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="open"
              className="group flex items-center gap-3 font-mono text-sm uppercase tracking-[0.15em] text-paper/60 transition-colors hover:text-paper"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-ember group-hover:text-ember">
                ↗
              </span>
              {s.label}
              <span className="text-paper/30">{s.handle}</span>
            </a>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Alen Guiwan</span>
          <span className="flex items-center gap-2">
            <span
              className={`inline-block h-1.5 w-1.5 rounded-full transition-colors ${
                active ? "bg-ember animate-pulse-soft" : "bg-paper/40"
              }`}
            />
            Local time — <time suppressHydrationWarning>{time}</time>
          </span>
          <span>Designed & built from scratch</span>
        </div>
      </div>
    </footer>
  );
}
