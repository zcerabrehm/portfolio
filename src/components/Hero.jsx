import { lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { useHeroAnimation } from "../hooks/useHeroAnimation";
import { useMagnetic } from "../hooks/useMagnetic";

const ParticleScene = lazy(() => import("./ParticleScene"));

/**
 * Immersive hero — gradient mesh + WebGL particles, masked type, magnetic CTA.
 */
export default function Hero({ ready = true }) {
  const scope = useHeroAnimation(ready);
  const magneticRef = useMagnetic(0.35);

  return (
    <section
      id="top"
      ref={scope}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-20"
    >
      {/* CSS gradient mesh */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="mesh-blob"
          style={{
            width: "55vw",
            height: "55vw",
            top: "-10%",
            left: "-8%",
            background:
              "radial-gradient(circle, rgba(232,255,77,0.22) 0%, transparent 70%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: "48vw",
            height: "48vw",
            bottom: "-5%",
            right: "-10%",
            background:
              "radial-gradient(circle, rgba(124,156,255,0.18) 0%, transparent 70%)",
            animationDelay: "-6s",
          }}
        />
        <div
          className="mesh-blob"
          style={{
            width: "36vw",
            height: "36vw",
            top: "35%",
            left: "40%",
            background:
              "radial-gradient(circle, rgba(255,184,108,0.12) 0%, transparent 70%)",
            animationDelay: "-11s",
          }}
        />
      </div>

      <Suspense fallback={null}>
        <ParticleScene accent="#e8ff4d" className="pointer-events-none z-0" />
      </Suspense>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-ink via-ink/45 to-ink/15" />

      <div
        className="absolute bottom-10 left-5 z-[2] hidden font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40 lg:left-10 lg:block"
        data-hero-fade
      >
        © 2026 — Full-Stack & AI Engineer
      </div>
      <div
        className="absolute right-5 top-1/2 z-[2] hidden -translate-y-1/2 rotate-90 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40 lg:right-10 lg:block"
        data-hero-fade
        data-hero-drift
      >
        Scroll to explore ↓
      </div>

      <div className="relative z-[2] max-w-[1600px]">
        <p
          className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ember"
          data-hero-fade
        >
          <span className="inline-block h-px w-10 bg-ember" />
          [ 01 // Creative Developer ]
        </p>

        <h1 className="font-display text-[clamp(2.4rem,9vw,8.5rem)] font-extrabold uppercase leading-[0.92] tracking-mega text-paper">
          <span className="block overflow-hidden">
            <span className="block" data-hero-mask>
              Full-Stack
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block text-transparent"
              style={{ WebkitTextStroke: "1.5px rgba(243,243,240,0.45)" }}
              data-hero-mask
            >
              &amp; AI Engineer
            </span>
          </span>
        </h1>

        <div
          className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          data-hero-fade
        >
          <p className="max-w-md text-base leading-relaxed text-paper/60 md:text-lg">
            I architect product-grade systems that pair full-stack foundations
            with AI + computer vision — turning camera feeds and language models
            into tools people actually ship with.
          </p>

          <div data-hero-cta>
            <a
              href="#work"
              ref={magneticRef}
              data-cursor="open"
              data-magnetic
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-ember px-8 py-4 font-mono text-sm uppercase tracking-[0.2em] text-paper"
            >
              <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-ember transition-transform duration-500 ease-out group-hover:scale-x-100" />
              <span className="relative transition-colors duration-300 group-hover:text-ink">
                Explore Work
              </span>
              <span className="relative text-ember transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  ready: PropTypes.bool,
};
