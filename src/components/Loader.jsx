import { useEffect } from "react";
import gsap from "gsap";
import PropTypes from "prop-types";

/**
 * Full-screen intro: stuttered counter + progress, then curtain lift.
 * HUD lives inside the lid so it rides up with the exit.
 */
export default function Loader({ onComplete }) {
  useEffect(() => {
    const counter = { val: 0 };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setCount = () => {
      const el = document.querySelector("[data-loader-count]");
      if (el) el.textContent = String(Math.round(counter.val)).padStart(3, "0");
    };

    const tl = gsap.timeline({
      onComplete,
      defaults: { ease: "power3.out" },
    });

    if (reduce) {
      counter.val = 100;
      setCount();
      tl.to("[data-loader]", { autoAlpha: 0, duration: 0.2 }).set(
        "[data-loader]",
        { display: "none" },
      );
      return () => tl.kill();
    }

    // Realistic-but-fast load: burst → hitch → crawl → stall → finish
    tl.to(counter, {
      val: 38,
      duration: 0.38,
      ease: "power2.out",
      onUpdate: setCount,
    })
      .to(
        "[data-loader-bar]",
        { scaleX: 0.38, duration: 0.38, ease: "power2.out" },
        "<",
      )
      .to(counter, {
        val: 41,
        duration: 0.22,
        ease: "none",
        onUpdate: setCount,
      })
      .to(
        "[data-loader-bar]",
        { scaleX: 0.41, duration: 0.22, ease: "none" },
        "<",
      )
      .to(counter, {
        val: 72,
        duration: 0.42,
        ease: "power3.inOut",
        onUpdate: setCount,
      })
      .to(
        "[data-loader-bar]",
        { scaleX: 0.72, duration: 0.42, ease: "power3.inOut" },
        "<",
      )
      .to(counter, {
        val: 78,
        duration: 0.28,
        ease: "sine.inOut",
        onUpdate: setCount,
      })
      .to(
        "[data-loader-bar]",
        { scaleX: 0.78, duration: 0.28, ease: "sine.inOut" },
        "<",
      )
      // brief stall
      .to({}, { duration: 0.18 })
      .to(counter, {
        val: 100,
        duration: 0.32,
        ease: "power4.in",
        onUpdate: setCount,
      })
      .to(
        "[data-loader-bar]",
        { scaleX: 1, duration: 0.32, ease: "power4.in" },
        "<",
      )
      .to(
        "[data-loader-hud]",
        { autoAlpha: 0.35, duration: 0.2, ease: "power2.out" },
        "+=0.06",
      )
      // Entire panel (HUD + lids) lifts together
      .to(
        "[data-loader-panel]",
        {
          yPercent: -105,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.05",
      )
      .set("[data-loader]", { display: "none" });

    return () => tl.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      data-loader
      className="fixed inset-0 z-[90] overflow-hidden bg-ink"
      aria-hidden="true"
    >
      <div
        data-loader-panel
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute inset-0 bg-[#0c0c0e]/90" />

        <div
          data-loader-hud
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          <div className="flex items-center gap-4">
            <span
              data-loader-count
              className="font-mono text-sm tracking-widest text-ember"
            >
              000
            </span>
            <div className="h-px w-36 overflow-hidden bg-white/10 md:w-64">
              <div
                data-loader-bar
                className="h-full w-full origin-left scale-x-0 bg-ember"
              />
            </div>
            <span
              data-loader-text
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/40"
            >
              loading
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

Loader.propTypes = {
  onComplete: PropTypes.func.isRequired,
};
